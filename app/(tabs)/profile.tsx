import { ThemedText } from '@/components/ThemedText';
import { SPORTS, TIME_OPTIONS } from '@/constants/mockData';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

export default function ProfileScreen() {
  const [selectedTime, setSelectedTime] = useState();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 32 }}>
        <ThemedText type="title">Alisson Corrêa</ThemedText>
        <View style={{ marginTop: 32 }}>
          <ThemedText style={{ fontWeight: 'bold' }}>
            Adicionar esporte:
          </ThemedText>
          <Picker selectedValue={selectedTime}>
            {SPORTS.map((option, id) => (
              <Picker.Item key={id} label={option.label}></Picker.Item>
            ))}
          </Picker>
          <ThemedText style={{ fontWeight: 'bold' }}>
            Adicionar horário:
          </ThemedText>
          <Picker selectedValue={selectedTime}>
            {TIME_OPTIONS.map((option, id) => (
              <Picker.Item key={id} label={option}></Picker.Item>
            ))}
          </Picker>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
