import { useGames } from "@/hooks/useGames";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthUser } from "./useAuth";

export const GamesContext = createContext(null);

export const GamesProvider = ({ children }) => {
  const user = useAuthUser();
  const {
    games,
    gamesLoading,
    addGame,
    refreshGames,
    joinGamePlayer,
    leaveGamePlayer,
    deleteGame,
    editGame,
  } = useGames();
  const [selectedGame, setSelectedGame] = useState(null);

  const myGames = useMemo(() => {
    return games.filter((game) =>
      game.players?.some((player) => player.uid === user.uid)
    );
  }, [games, user?.uid]);

  const value = useMemo(
    () => ({
      games,
      gamesLoading,
      addGame,
      refreshGames,
      deleteGame,
      editGame,
      joinGamePlayer,
      leaveGamePlayer,
      myGames,
      selectedGame,
      setSelectedGame,
    }),
    [games, gamesLoading, selectedGame]
  );

  return (
    <GamesContext.Provider value={value}>{children}</GamesContext.Provider>
  );
};

export const useGamesContext = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error("useGamesContext must be used within a gamesProvider");
  }
  return context;
};
