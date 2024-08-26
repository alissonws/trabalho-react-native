import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  ScrollView,
  FlatList,
} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AddressViewer } from '@/components/AddressViewer';
import Animated from 'react-native-reanimated';
import PlaySessionItem from '@/components/PlaySessionItem';

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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AddressViewer></AddressViewer>
      <Animated.ScrollView>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <PlaySessionItem
              title={item.title}
              id={item.id}
              location={item.location}
              sportLabel={item.sportLabel}
              confirmedPlayers={item.confirmedPlayers}
              interestedPlayers={item.interestedPlayers}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
