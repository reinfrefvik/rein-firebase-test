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

interface GameProps {
  game: GameType;
  deleteAction: (id: string) => void;
  editAction: (item: GameType) => Promise<boolean>;
}

const Game = (props: GameProps) => {
  const user = useAuthUser();
  const [editing, setEditing] = useState(false);
  const [gameNameInput, setGameNameInput] = useState(props.game.name);
  const [gameMembers, setGameMembers] = useState<any[]>(props.game.members);
  const { fetchGameMembers, addGameMember, removeGameMember } =
    useGameMembers();

  const handleSave = async (e) => {
    e.preventDefault();
    if (gameNameInput == props.game.name) {
      return false;
    }
    if (gameNameInput === "") {
      console.log("No Changes");
      return true;
    }

    const result = await props.editAction({
      ...props.game,
      name: gameNameInput,
    });
    if (result) {
      setEditing(false);
    }
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
      { id: user.uid, name: user.displayName || "" },
    ]);
    return true;
  };

  const handleLeaveGame = async (e) => {
    e.preventDefault();
    removeGameMember(props.game.id, user.uid);
    setGameMembers((prev) => prev.filter((member) => member.id !== user.uid));
    return true;
  };

  if (!user || !user.uid) {
    return <div>No User...</div>;
  }

  return (
    <div
      key={props.game.id}
      className="flex flex-col justify-start items-start p-4 bg-white rounded-md drop-shadow-md mt-2 space-y-2"
    >
      <div className="w-full text-end text-xs text-gray-500">
        {props.game.id}
      </div>
      {editing ? (
        <input
          className="w-full bg-gray-100 my-1 p-1 rounded-sm"
          type="text"
          placeholder="Game Name"
          name="title"
          defaultValue={props.game.name}
          onChange={(e) => setGameNameInput(e.target.value)}
        />
      ) : (
        <div className="">{props.game.name}</div>
      )}
      {gameMembers.map((member) => (
        <div
          key={member.id}
          className="flex flex-row justify-between items-center w-full"
        >
          <div className="text-sm text-gray-400">{member.name}</div>
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
        {editing && (
          <button
            className="p-2 bg-green-400 hover:bg-green-800 text-white ml-1 rounded-sm"
            onClick={handleSave}
          >
            <FaSave />
          </button>
        )}
        {!editing &&
          (gameMembers.some((member) => member.id === user.uid) ? (
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
  );
};

export { Game };
