// declare type GameNoteType = {
//   id?: string;
//   noteType: 'character'|'faction'|'lore'|'location'|'item'|'quest'|'other';
//   gameId: string;
//   title: string;
//   content: string;
//   createdBy: string;
//   createdAt?: Date;
// };

// declare type NoteType = {
//   id?: string;
//   content: string;
//   relationType: string;
//   relationId: string;
//   createdBy: string;
//   createdAt?: Date;
// };

import { useAuthUser } from "@/contexts/useAuth";
import {
  addItem,
  deleteItem,
  fetchItems,
  updateItem,
} from "@/services/firebaseService";
import { useCallback, useEffect, useState } from "react";
import { useGameMembers } from "./useGameMembers";

const GAMES_NOTES_TABLE = "game_notes" as const;

export const useGameNotes = () => {
  const user = useAuthUser();
  const [gameId, setGameId] = useState<string>("");
  const [gameNotes, setGameNotes] = useState<GameType[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.uid;

  const refreshGameNotes = useCallback(async () => {
    // do something
  }, []);
};
