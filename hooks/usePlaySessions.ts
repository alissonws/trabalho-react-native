import { PLAY_SESSIONS } from '@/constants/mockData';
import { PlaySession } from '@/types/playSession';

type usePlaySessionsProps = {
  id: string;
};

export function usePlaySessions({ id }: usePlaySessionsProps): PlaySession[] {
  if (id) return PLAY_SESSIONS.filter((session) => session.id === id);

  return PLAY_SESSIONS;
}
