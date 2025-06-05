import { useAuthUser } from "@/contexts/useAuth";
import { useGameMembers } from "@/hooks/useGameMembers";
import { useEffect, useState } from "react";

const GameNotesPage = () => {
  const { fetchGameMembers } = useGameMembers();
  const [gameRels, setGameRels] = useState<GameMemberType[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>("");
  const user = useAuthUser();

  useEffect(() => {
    const fetchGames = async () => {
      const gameMembers = await fetchGameMembers({ uid: user.uid });
      console.log("Game Members", gameMembers);
      setGameRels(gameMembers);
    };
    fetchGames();
  }, []);

  return (
    <div>
      <div>
        <select
          onChange={(e) => setSelectedGame(e.target.value)}
          value={selectedGame}
        >
          {gameRels.map((game) => (
            <option value={game.gameId} key={game.gameId}>
              {game.gameName}
            </option>
          ))}
        </select>
      </div>
      <h1>Notes Page</h1>
      {selectedGame !== "" && <h1>{selectedGame}</h1>}
      <p>This is the notes page.</p>
    </div>
  );
};
export { GameNotesPage };
