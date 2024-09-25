import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { usePlaySessions } from '@/hooks/usePlaySessions';
import { useLocalSearchParams } from 'expo-router';
import { Button, FlatList, Image, SafeAreaView, View } from 'react-native';
import { ProductData } from '../scan';
import CurrencyInput from '@/components/CurrencyInput';
import { useEffect, useState } from 'react';
import { usePriceEntries } from '@/hooks/usePriceEntries';
import { createIntl, createIntlCache } from '@formatjs/intl';
import { Picker } from '@react-native-picker/picker';
import { useLocations } from '@/hooks/useLocations';
import { useThemeColor } from '@/hooks/useThemeColor';
import { API_URL } from '@/config';

const cache = createIntlCache();
const intl = createIntl(
  {
    locale: 'en-US',
    messages: {},
  },
  cache
);

export default function ProductsScreen() {
  const { id, ean, nome, nome_acento } = useLocalSearchParams<
    { id: string } & ProductData
  >();

  const [newPrice, setNewPrice] = useState<number>(0);

  const { entries, loading, error } = usePriceEntries(ean);

  console.log(entries.length);

  const product = entries.length
    ? entries[0].attributes.product.data.attributes
    : null;

  const { locations } = useLocations();

  const textColor = useThemeColor({}, 'text');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={{ uri: `${API_URL}/product_images/${ean}.jpg` }}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        }
      >
        {error && <ThemedText>Error: {error}</ThemedText>}
        {product && (
          <>
            <ThemedView
              style={{ flexDirection: 'row', alignItems: 'flex-end' }}
            >
              <ThemedText type="title" style={{ textTransform: 'capitalize' }}>
                {product.name}
              </ThemedText>
            </ThemedView>
            <ThemedView>
              <ThemedText
                type="default"
                style={{ fontSize: 12, fontWeight: 300 }}
              >
                {product.ean}
              </ThemedText>
            </ThemedView>

            <ThemedView>
              <Picker mode="dropdown">
                {locations.map((location) => (
                  <Picker.Item
                    key={location.id}
                    label={location.attributes.name}
                    value={location.id}
                    style={{
                      // color: textColor,
                      backgroundColor: 'white',
                    }}
                  />
                ))}
              </Picker>
              <CurrencyInput value={newPrice} onChange={setNewPrice} />
            </ThemedView>
            <ThemedView
              style={{
                padding: 26,
                backgroundColor: 'grey',
                borderRadius: 8,
              }}
            >
              {entries.map((entry) => (
                <ThemedView
                  key={entry.id.toString()}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 12,
                    backgroundColor: 'grey',
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                  }}
                >
                  <ThemedText
                    style={{
                      fontWeight: 200,
                      fontSize: 16,
                      color: 'white',
                    }}
                  >
                    {intl.formatNumber(entry.attributes.price / 100, {
                      maximumFractionDigits: 2,
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </ThemedText>
                  <ThemedText
                    style={{
                      fontWeight: 200,
                      fontSize: 16,
                      color: 'white',
                    }}
                  >
                    {new Date(entry.attributes.createdAt).toLocaleDateString()}
                  </ThemedText>
                  <ThemedText
                    style={{
                      fontWeight: 200,
                      fontSize: 16,
                      color: 'white',
                    }}
                  >
                    {entry.attributes.location.data.attributes.name}
                  </ThemedText>
                </ThemedView>
              ))}
            </ThemedView>
          </>
        )}
      </ParallaxScrollView>
    </SafeAreaView>
  );
}
