import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { usePlaySessions } from '@/hooks/usePlaySessions';
import { useLocalSearchParams } from 'expo-router';
import { Button, Image, SafeAreaView, View } from 'react-native';

function formatTimestamps(
  startEpoch: number,
  endEpoch: number
): { date: string; timeRange: string } {
  // Converter timestamps epoch (em segundos) para milissegundos e criar objetos Date
  const startDate = new Date(startEpoch * 1000);
  const endDate = new Date(endEpoch * 1000);

  // Formatar a data como "8 de Dez, 2024"
  const optionsDate = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  } as const;
  const formattedDate = startDate.toLocaleDateString('pt-BR', optionsDate);

  // Formatar o horário como "16:00-18:00"
  const optionsTime = { hour: '2-digit', minute: '2-digit' } as const;
  const startTime = startDate.toLocaleTimeString('pt-BR', optionsTime);
  const endTime = endDate.toLocaleTimeString('pt-BR', optionsTime);
  const timeRange = `${startTime}-${endTime}`;

  return {
    date: formattedDate,
    timeRange: timeRange,
  };
}

export default function PlaySessionsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [playSession] = usePlaySessions({ id });

  const { date, timeRange } = formatTimestamps(
    playSession.fromTime,
    playSession.toTime
  );

  if (!playSession) return;

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
          <ThemedText type="title">{playSession.sportLabel}</ThemedText>
          <ThemedText type="default" style={{marginLeft: 8}}>a 3 km</ThemedText>
        </View>
        <ThemedText type="subtitle">{playSession.location}</ThemedText>
        <ThemedText
          style={{
            fontWeight: 'thin',
            fontSize: 14,
            fontStyle: 'italic',
          }}
        >
          {date}
        </ThemedText>
        <ThemedText
          style={{
            fontWeight: 'thin',
            fontSize: 14,
            fontStyle: 'italic',
          }}
        >
          {timeRange}
        </ThemedText>
        <ThemedText>Interessados: {playSession.interestedPlayers}</ThemedText>
        <ThemedText>Confirmados: {playSession.confirmedPlayers}</ThemedText>
        <Button title="Confirmar presença" />
        <Button title="Declarar interesse" color="grey" />
      </ParallaxScrollView>
    </SafeAreaView>
  );
}
