import { Timestamp } from "react-native-reanimated/lib/typescript/reanimated2/commonTypes";

export interface PlaySession {
  title: string;
  id: string;
  location: string;
  sportLabel: string;
  confirmedPlayers: number;
  interestedPlayers: number;
  fromTime: Timestamp;
  toTime: Timestamp;
}
