import { useAuthUser } from "@/contexts/useAuth";
import { db } from "@/Firebase";
import {
  addItem,
  deleteItem,
  fetchItems,
  updateItem,
  updateItemFields,
} from "@/services/firebaseService";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

const GAMES_TABLE = "games" as const;

export const useGames = () => {
  const user = useAuthUser();
  const [games, setGames] = useState<GameType[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.uid;

  const refreshGames = useCallback(async () => {
    if (!userId) return;

    setLoading(true);

    // fetch all games
    const games = (await fetchItems<GameType>(GAMES_TABLE)) as GameType[];

    setGames(games);
    setLoading(false);
  }, [userId]);

  const addGame = async (game: GameType): Promise<boolean | GameType> => {
    const result = await addItem<GameType>(
      { name: game.name, players: [], playerUids: [] },
      GAMES_TABLE
    );
    if (result) {
      setGames((prev) => [...prev, result as GameType]);
      return result;
    } else {
      alert("Error adding game");
      return null;
    }
  };

  const joinGamePlayer = async (
    gameId: string,
    uId?: string
  ): Promise<boolean> => {
    const tempUserId = uId || userId;
    if (!tempUserId) return false;

    const game = games.find((g) => g.id === gameId);
    if (!game) {
      alert("Game not found");
      return false;
    }

    if (game.players?.some((p) => p.uid === tempUserId)) {
      return false;
    }

    const player: gamePlayerType = {
      uid: tempUserId,
      displayName: user?.displayName || "",
      playerRole: "player",
    };

    const updatedPlayers = [...(game.players || []), player];
    const updatedPlayerUids = [...(game.playerUids || []), tempUserId];

    const result = await updateItemFields(
      { players: updatedPlayers, playerUids: updatedPlayerUids },
      gameId,
      GAMES_TABLE
    );
    if (result) {
      setGames((prev) =>
        prev.map((g) =>
          g.id === gameId
            ? {
                ...g,
                ...{ players: updatedPlayers, playerUids: updatedPlayerUids },
              }
            : g
        )
      );
      return true;
    } else {
      alert("Error joining game");
      return false;
    }
  };

  const leaveGamePlayer = async (
    gameId: string,
    uId?: string
  ): Promise<boolean> => {
    const tempUserId = uId || userId;
    if (!tempUserId) return false;

    const game = games.find((g) => g.id === gameId);
    if (!game) {
      alert("Game not found");
      return false;
    }

    const updatedPlayers =
      game.players?.filter((p) => p.uid !== tempUserId) || [];
    const updatedPlayerUids =
      game.playerUids?.filter((uid) => uid !== tempUserId) || [];

    const result = await updateItemFields(
      { players: updatedPlayers, playerUids: updatedPlayerUids },
      gameId,
      GAMES_TABLE
    );

    if (result) {
      setGames((prev) =>
        prev.map((g) =>
          g.id === gameId
            ? {
                ...g,
                ...{ players: updatedPlayers, playerUids: updatedPlayerUids },
              }
            : g
        )
      );
      return true;
    } else {
      alert("Error leaving game");
      return false;
    }
  };

  const fetchMyGames = useCallback(async (): Promise<GameType[]> => {
    if (!userId) return [];
    const q = query(
      collection(db, GAMES_TABLE),
      where("playerUids", "array-contains", { uid: userId })
    );
    const snapshot = await getDocs(q);
    const myGames = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as GameType[];
    return myGames;
  }, [userId]);

  const deleteGame = async (id: string): Promise<boolean> => {
    setGames((prev) => prev.filter((game) => game.id !== id));
    const result = await deleteItem(id, GAMES_TABLE);
    if (!result) {
      alert("Error deleting game");
    }
    return !!result;
  };

  const editGame = async (item: GameType): Promise<boolean> => {
    const tempItem = {
      name: item.name,
      description: item.description || "",
    } as GameType;

    const result = await updateItem(tempItem, item.id, GAMES_TABLE);
    if (result) {
      setGames((prev) =>
        prev.map((game) => (game.id === item.id ? { ...game, ...item } : game))
      );
      return true;
    } else {
      alert("Error updating game");
      return false;
    }
  };

  useEffect(() => {
    if (userId) {
      refreshGames();
    }
  }, [refreshGames]);

  return {
    games,
    gamesLoading: loading,
    joinGamePlayer,
    leaveGamePlayer,
    addGame,
    refreshGames,
    deleteGame,
    editGame,
  };
};
