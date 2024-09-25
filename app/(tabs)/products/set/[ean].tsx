import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { usePlaySessions } from '@/hooks/usePlaySessions';
import { useLocalSearchParams } from 'expo-router';
import { Button, Image, SafeAreaView, View } from 'react-native';
import { ProductData } from '../../scan';

export default function ProductsScreen() {
  const { ean, nome, nome_acento } = useLocalSearchParams<ProductData>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/maps.png')}
            style={{
              width: '100%',
            }}
          />
        }
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <ThemedText type="title" style={{ textTransform: 'capitalize' }}>
            {nome_acento || nome}
          </ThemedText>
        </View>
        <ThemedView>
          <ThemedText type="default" style={{ fontSize: 12, fontWeight: 300 }}>
            {ean}
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </SafeAreaView>
  );
}
