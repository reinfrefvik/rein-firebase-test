import { useAuthUser } from "@/contexts/useAuth";
import {
  addItem,
  deleteItem,
  fetchItems,
  updateItem,
} from "@/services/firebaseService";
import { useCallback, useEffect, useState } from "react";
import { useGameMembers } from "./useGameMembers";

const GAMES_TABLE = "games" as const;

export const useGames = () => {
  const user = useAuthUser();
  const [games, setGames] = useState<GameType[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    fetchGameMembers,
    addGameMember,
    removeGameMember,
  } = useGameMembers();

  const userId = user?.uid;

  const refreshGames = useCallback(async () => {
    if (!userId) return;

    setLoading(true);

    // fetch all games
    const games = (await fetchItems<GameType>(GAMES_TABLE)) as GameType[];

    // fetch game members for each game
    for (const game of games) {
      const members = (await fetchGameMembers({
        gameId: game.id,
      })) as GameMemberType[];
      game.members = members;
    }

    setGames(games);
    setLoading(false);
  }, []);

  const addGame = async (game: GameType): Promise<boolean | GameType> => {
    // Simulate adding a game to a database
    const result = await addItem<GameType>({ name: game.name }, GAMES_TABLE);
    if (result) {
      setGames((prev) => [...prev, result as GameType]);
      return result;
    } else {
      alert("Error adding game");
      return null;
    }
  };

  const deleteGame = async (id: string): Promise<boolean> => {
    setGames((prev) => prev.filter((game) => game.id !== id));
    const result = await deleteItem(id, GAMES_TABLE);
    if (!result) {
      alert("Error deleting game");
    }
    return !!result;
  };

  const editGame = async (item: GameType): Promise<boolean> => {
    const result = await updateItem(item, item.id, GAMES_TABLE);
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
    refreshGames();
  }, [refreshGames]);

  return {
    games,
    gamesLoading: loading,
    addGame,
    refreshGames,
    deleteGame,
    editGame,
  };
};
