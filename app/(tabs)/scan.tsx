import { useAuth } from '@/hooks/useAuth';
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
} from 'expo-camera';
import { useEffect, useState, useCallback } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { API_URL } from '@/config';
import { Redirect } from 'expo-router';

export type ProductData = {
  ean: string;
  ean_tipo: string;
  nome: string;
  nome_acento: string;
  marca: string;
  pais: string;
  // image: string;
};

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const { jwtToken } = useAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<BarcodeScanningResult | null>(null);
  const [message, setMessage] = useState<string>('');
  const [productData, setProductData] = useState<ProductData | null>(null);
  const debounceDelay = 1000;

  const debounce = <F extends (...args: any[]) => any>(
    func: F,
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout | null = null;
    return (...args: Parameters<F>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced fetchProduct function
  const debouncedFetchProduct = useCallback(
    debounce(async (productCode: string) => {
      setMessage('Procurando produto...');
      try {
        const response = await fetch(
          `${API_URL}/api/products/scan?barcode=${productCode}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            setMessage(`Could not reach the server ${response.text()}`);

            return;
          }

          if (response.status === 403) {
            setMessage(`User not authenticated`);

            return;
          }

          throw new Error(
            `Fetching product failed with status: ${response.status}`
          );
        }

        const data = (await response.json()) as unknown as ProductData;

        setMessage('Redirecting...');

        setProductData(data);
      } catch (error) {
        setMessage('Unexpected error: ' + error);
      }
    }, debounceDelay),
    [jwtToken]
  );

  useEffect(() => {
    if (scanned) {
      setMessage('Carregando... ');
      debouncedFetchProduct(scanned.data);
    }
  }, [scanned, debouncedFetchProduct]);

  if (productData) {
    return (
      <Redirect
        href={{
          pathname: '/products/[ean]',
          params: { id: productData.ean, ...productData },
        }}
      ></Redirect>
    );
  }

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={(scanned) => setScanned(scanned)}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8'],
        }}
      >
        <View>
          <Text style={styles.text}>
            {scanned ? `Código de barras: ${scanned.data}` : 'Nada escaneado'}
          </Text>
          <Text style={styles.text}>{message || 'Escaneie um produto'}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Inverter câmera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'light',
    color: 'white',
    textAlign: 'center',
  },
});
