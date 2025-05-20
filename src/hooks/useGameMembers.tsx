import {
  addToRelationTable,
  deleteFromRelationTable,
  fetchRelationItems,
} from "@/services/firebaseService";
import { useAuth } from "@/contexts/useAuth";
import { User } from "firebase/auth";

const GAME_MEMBERS_TABLE = "game_members" as const;
type GameMemberQuery = {
  gameId?: string;
  uid?: string;
};

export const useGameMembers = () => {
  const { user } = useAuth();

  const userId = user?.uid;

  const fetchGameMembers = async (
    query: GameMemberQuery
  ): Promise<GameMemberType[]> => {
    if (!userId) return;

    let items;
    if (!query.gameId && !query.uid) {
      items = await fetchRelationItems<GameMemberType>(GAME_MEMBERS_TABLE);
    } else if (query.gameId) {
      items = await fetchRelationItems<GameMemberType>(
        GAME_MEMBERS_TABLE,
        "gameId",
        query.gameId
      );
    } else if (query.uid) {
      items = await fetchRelationItems<GameMemberType>(
        GAME_MEMBERS_TABLE,
        "uid",
        query.uid
      );
    }
    return items;
  };

  const addGameMember = async (
    game: GameType,
    user: User
  ): Promise<boolean> => {
    if (!userId) return;
    console.log("Adding game member", game.id, user.uid);

    const item = {
      uid: user.uid,
      gameId: game.id,
      displayName: user.displayName || "",
      gameName: game.name,
    } as GameMemberType;

    const result = await addToRelationTable<GameMemberType>(
      GAME_MEMBERS_TABLE,
      item,
      userId,
      game.id
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
