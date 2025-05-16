import {
  addToRelationTable,
  deleteFromRelationTable,
  fetchRelationItems,
} from "@/services/firebaseService";
import { useAuth } from "@/contexts/useAuth";
import { User } from "firebase/auth";

const GAME_MEMBERS_TABLE = "game_members" as const;

export const useGameMembers = () => {
  const { user } = useAuth();

  const userId = user?.uid;

  const fetchGameMembers = async (gameId: string) => {
    if (!userId) return;

    const items = await fetchRelationItems(GAME_MEMBERS_TABLE, gameId);
    return items;
  };

  const addGameMember = async (
    game: GameType,
    user: User
  ): Promise<boolean> => {
    if (!userId) return;
    console.log("Adding game member", game.id, user.uid);

    const result = await addToRelationTable(
      GAME_MEMBERS_TABLE,
      game.id,
      user.uid,
      game.name,
      user.displayName || ""
    );
    return !!result;
  };

  const removeGameMember = async (gameId: string, memberId: string) => {
    if (!userId) return;

    await deleteFromRelationTable(GAME_MEMBERS_TABLE, gameId, memberId);
  };

  return {
    fetchGameMembers,
    addGameMember,
    removeGameMember,
  };
};
