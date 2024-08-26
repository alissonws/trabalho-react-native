import { Sport } from '@/types/sport';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Button, TouchableHighlight, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '@/store/hooks';
import { removeSport } from '@/store/reducers/userSlice';
import { SPORTS } from '@/constants/mockData';

type SelectedSportsListProps = {
  sports: Sport[];
};

export function SelectedSportsList({ sports }: SelectedSportsListProps) {
  const dispatch = useAppDispatch();

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
      {sports.length === 0 ? (
        <ThemedText>Nenhum esporte selecionado</ThemedText>
      ) : (
        sports.map((selectedSport, index) => (
          <TouchableHighlight
            key={index}
            onPress={() => {
              const sportToRemove = SPORTS.find(
                (sport) => sport.id === selectedSport.id
              );

              if (sportToRemove) dispatch(removeSport(sportToRemove));
            }}
          >
            <ThemedView
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 4,
                paddingLeft: 16,
                paddingRight: 8,
                borderRadius: 16,
              }}
            >
              <ThemedText>{selectedSport.label}</ThemedText>
              <Ionicons name="close" size={20} style={[{ marginTop: 2 }]} />
            </ThemedView>
          </TouchableHighlight>
        ))
      )}
    </View>
  );
}
