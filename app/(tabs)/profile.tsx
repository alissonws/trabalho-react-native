import { SelectedSportsList } from '@/components/SelectedSportsList';
import { ThemedText } from '@/components/ThemedText';
import { SPORTS, TIME_OPTIONS } from '@/constants/mockData';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addSport, selectSports } from '@/store/reducers/userSlice';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView, ScrollView, View } from 'react-native';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();

  const selectedSports = useAppSelector(selectSports);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 32 }}>
        <ThemedText type="title">Alisson Corrêa</ThemedText>
        <View style={{ marginTop: 32 }}>
          <ThemedText style={{ fontWeight: 'bold' }}>
            Adicionar esporte:
          </ThemedText>
          <Picker
            onValueChange={(itemValue, itemIndex) => {
              const sport = SPORTS.find((sport) => sport.id === itemValue);

              if (sport) dispatch(addSport(sport));
            }}
          >
            {SPORTS.map((option, id) => (
              <Picker.Item
                key={id}
                label={option.label}
                value={option.id}
              ></Picker.Item>
            ))}
          </Picker>
          <ThemedText style={{ fontWeight: 'bold' }}>Meus esportes:</ThemedText>
          <SelectedSportsList sports={selectedSports} />
          <ThemedText style={{ fontWeight: 'bold' }}>
            Adicionar horário:
          </ThemedText>
          <Picker>
            {TIME_OPTIONS.map((option, id) => (
              <Picker.Item key={id} label={option}></Picker.Item>
            ))}
          </Picker>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
