import LoginForm from '@/components/LoginForm';
import { SelectedSportsList } from '@/components/SelectedSportsList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SPORTS, TIME_OPTIONS } from '@/constants/mockData';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addSport, selectSports } from '@/store/reducers/userSlice';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAuth();
  const [isLogged, setIsLoggedIn] = useState(isLoggedIn);
  const selectedSports = useAppSelector(selectSports);

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={{ padding: 32 }}>
        <ThemedText style={{ color: 'white', textAlign: 'center' }}>{isLoggedIn ? 'logado' : 'Não conectado'}</ThemedText>
        <LoginForm />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 32 }}>
        <ThemedText type="title">Alisson Corrêa</ThemedText>
        <ThemedView style={{ marginTop: 32 }}>
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
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
