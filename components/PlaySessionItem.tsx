import { Link } from 'expo-router';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type PlaySessionItemProps = {
  title: string;
  id: string;
  location: string;
  sportLabel: string;
  confirmedPlayers: number;
  interestedPlayers: number;
};

export default function PlaySessionItem({
  title,
  id,
  location,
  sportLabel,
  confirmedPlayers,
  interestedPlayers,
}: PlaySessionItemProps) {
  return (
    <ThemedView>
      <Link
        href={{
          pathname: '/play-sessions/[id]',
          params: { id },
        }}
      >
        <ThemedText>{location}</ThemedText>
        <ThemedText>{sportLabel}</ThemedText>
        <ThemedText>{confirmedPlayers}</ThemedText>
        <ThemedText>{interestedPlayers}</ThemedText>
      </Link>
    </ThemedView>
  );
}
