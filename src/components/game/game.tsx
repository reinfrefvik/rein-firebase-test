import { useCallback, useEffect, useState } from "react";
import { useGameMembers } from "@/hooks/useGameMembers";
import {
  FaHeartCirclePlus,
  FaHeartCircleXmark,
  FaTrashCan,
  FaPenToSquare,
} from "react-icons/fa6";
import { FaTimesCircle, FaSave } from "react-icons/fa";
import { useAuthUser } from "@/contexts/useAuth";
import { IconContext } from "react-icons";

interface GameProps {
  game: GameType;
  deleteAction: (id: string) => void;
  editAction: (item: GameType) => Promise<boolean>;
}

const Game = (props: GameProps) => {
  const user = useAuthUser();
  const [editing, setEditing] = useState(false);
  const [gameNameInput, setGameNameInput] = useState(props.game.name);
  const [loading, setLoading] = useState(false);
  const [gameMembers, setGameMembers] = useState<any[]>(props.game.members);
  const { addGameMember, removeGameMember } = useGameMembers();

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (gameNameInput == props.game.name) {
      setLoading(false);
      return false;
    }
    if (gameNameInput === "") {
      console.log("No Changes");
      setLoading(false);
      return true;
    }

    const result = await props.editAction({
      ...props.game,
      name: gameNameInput,
    });
    if (result) {
      setEditing(false);
    }
    setLoading(false);
  };

  const handleJoinGame = async (e) => {
    e.preventDefault();
    const result = await addGameMember(props.game, user);
    if (!result) {
      alert("Error joining game");
      return false;
    }
    setGameMembers((prev) => [
      ...prev,
      {
        uid: user.uid,
        displayName: user.displayName || "",
        id: user.uid + "-" + props.game.id,
        gameId: props.game.id,
        name: props.game.name,
      },
    ]);
    return true;
  };

  const handleLeaveGame = async (e) => {
    e.preventDefault();
    removeGameMember(user.uid, props.game.id);
    setGameMembers((prev) => prev.filter((member) => member.uid !== user.uid));
    return true;
  };

  if (!user || !user.uid) {
    return <div>No User...</div>;
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-start items-center w-full min-w-[200px] p-4 bg-white rounded-md drop-shadow-md mt-2 space-y-2">
        <div className="w-full text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  console.log("Game Members", gameMembers);

  return (
    <IconContext.Provider value={{ size: "18px" }}>
      <div
        key={props.game.id}
        className="flex flex-col justify-start items-start p-4 bg-white rounded-md drop-shadow-md mt-2"
      >
        <div className="w-full text-end text-xs text-gray-500">
          {props.game.id}
        </div>
        {editing ? (
          <form
            className="flex flex-row justify-between items-center w-full mb-2"
            onSubmit={handleSave}
          >
            <input
              className="w-full bg-gray-100 my-1 p-1 rounded-sm"
              type="text"
              placeholder="Game Name"
              name="title"
              defaultValue={props.game.name}
              onChange={(e) => setGameNameInput(e.target.value)}
            />
            <button
              className="p-2 bg-green-400 hover:bg-green-800 text-white ml-1 rounded-sm"
              type="submit"
            >
              <FaSave />
            </button>
          </form>
        ) : (
          <div className="text-lg mb-2">{props.game.name}</div>
        )}
        {gameMembers.length !== 0 && (
          <div className="text-sm text-gray-400">Members:</div>
        )}
        {gameMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-row justify-between items-center w-full"
          >
            <div className="text-sm text-gray-400 pl-2">{member.displayName}</div>
            {editing && (
              <button
                className="bg-red-400 text-white p-2 ml-2 rounded-sm cursor-pointer"
                onClick={(e) => handleLeaveGame(e)}
              >
                <FaTrashCan />
              </button>
            )}
          </div>
        ))}
        <div className="flex flex-row justify-end items-center w-full">
          {!editing &&
            (gameMembers.some((member) => member.uid === user.uid) ? (
              <button
                className="bg-red-400 text-white p-2 ml-2 rounded-sm cursor-pointer"
                onClick={(e) => handleLeaveGame(e)}
              >
                <FaHeartCircleXmark />
              </button>
            ) : (
              <button
                className="bg-blue-400 text-white p-2 ml-2 rounded-sm cursor-pointer"
                onClick={(e) => handleJoinGame(e)}
              >
                <FaHeartCirclePlus />
              </button>
            ))}
          <button
            className="bg-blue-400 text-white p-2 ml-2 rounded-sm cursor-pointer"
            onClick={() => setEditing((prev) => !prev)}
          >
            {editing ? <FaTimesCircle /> : <FaPenToSquare />}
          </button>
          <button
            className="bg-red-400 text-white p-2 ml-2 rounded-sm cursor-pointer"
            onClick={() => props.deleteAction(props.game.id)}
          >
            <FaTrashCan />
          </button>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export { Game };
