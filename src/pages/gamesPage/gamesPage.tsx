import { Game } from "@/components/game/game";
import { useAuthUser } from "@/contexts/useAuth";
import { useGames } from "@/hooks/useGames";
import { useState } from "react";
import { IconContext } from "react-icons";
import { FaSave } from "react-icons/fa";

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
        <div className="p-4 bg-white drop-shadow-md rounded-md my-2">
          <form
            className="flex flex-row justify-start items-center"
            onSubmit={submitAction}
          >
            <input
              className="w-full bg-gray-100 my-1 p-1 rounded-sm"
              type="text"
              placeholder="Game Name"
              name="title"
              value={gameNameInput}
              onChange={(e) => setGameNameInput(e.target.value)}
            />

            <IconContext.Provider value={{ size: "18px" }}>
              <button
                className="bg-green-600 text-white p-2 ml-1 rounded-sm"
                type="submit"
              >
                <FaSave />
              </button>
            </IconContext.Provider>
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
