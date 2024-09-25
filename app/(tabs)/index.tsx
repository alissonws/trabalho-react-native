import {
  Image,
  StyleSheet,
  Platform,
  View,
  ScrollView,
  FlatList,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AddressViewer } from '@/components/AddressViewer';
import Animated from 'react-native-reanimated';
import PlaySessionItem from '@/components/PlaySessionItem';
import CurrencyInput from '@/components/CurrencyInput';
import { useState } from 'react';
import { useLocations } from '@/hooks/useLocations';
import { useProducts } from '@/hooks/useProducts';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    location: 'Quadras externas da UFSC',
    sportLabel: 'Vôlei',
    confirmedPlayers: 3,
    interestedPlayers: 11,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    location: 'Quadras externas da UFSC',
    sportLabel: 'Vôlei',
    confirmedPlayers: 3,
    interestedPlayers: 11,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    location: 'Quadras externas da UFSC',
    sportLabel: 'Vôlei',
    confirmedPlayers: 3,
    interestedPlayers: 11,
  },
];

export default function HomeScreen() {
  const [newPrice, setNewPrice] = useState<number>(0);
  const { isLoggedIn } = useAuth();
  const { products } = useProducts();
  console.log('products', products)

  if (!isLoggedIn) {
    return (
      <Redirect
        href={{
          pathname: '/(tabs)/profile',
        }}
      ></Redirect>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText type="title">Itens salvos:</ThemedText>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ThemedView>
            <Link href={{ pathname: `/products/[ean]`, params: { ean: item.ean } }}>
              <ThemedText> {item.name}</ThemedText>
            </Link>
          </ThemedView>
        )}
        keyExtractor={(item) => item.ean}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
