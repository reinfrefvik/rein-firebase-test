import { Game } from "@/components/game/game";
import { useAuthUser } from "@/contexts/useAuth";
import { useGames } from "@/hooks/useGames";
import { useState } from "react";

const GamesPage = () => {
  const user = useAuthUser();
  const [gameNameInput, setGameNameInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { games, gamesLoading, addGame, refreshGames, deleteGame, editGame } =
    useGames();

  const submitAction = async (e) => {
    e.preventDefault();

    if (gameNameInput === "") {
      alert("Please enter a game name");
      return;
    }
    const result = await addGame({ name: gameNameInput });
    if (result) {
      setGameNameInput("");
    } else {
      alert("Error adding game");
    }
  };

  const deleteAction = async (id: string) => {
    setLoading(true);
    const result = await deleteGame(id);
    if (!result) {
      alert("Error deleting game");
    }
    setLoading(false);
  };

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  if (gamesLoading || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-start items-center w-full min-w-[200px]">
      <div className="w-[330px]">
        <div className="flex flex-col justify-start p-4 bg-white drop-shadow-md rounded-md my-2">
          <form onSubmit={submitAction}>
            <input
              className="w-full bg-gray-100 my-1 p-1 rounded-sm"
              type="text"
              placeholder="Game Name"
              name="title"
              value={gameNameInput}
              onChange={(e) => setGameNameInput(e.target.value)}
            />
            <button
              className="bg-green-600 text-white p-1 rounded-sm"
              type="submit"
            >
              Add Game
            </button>
          </form>
        </div>
        {games.map((game) => (
          <Game
            key={game.id}
            game={game}
            deleteAction={deleteAction}
            editAction={editGame}
          />
        ))}
      </div>
    </div>
  );
};
export { GamesPage };
