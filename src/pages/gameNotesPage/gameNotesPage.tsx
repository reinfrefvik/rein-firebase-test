import { useAuthUser } from "@/contexts/useAuth";
import { useGameMembers } from "@/hooks/useGameMembers";
import { useGameNotes } from "@/hooks/useGameNotes";
import { useEffect, useState } from "react";
import { GameNotesForm } from "./gameNotesForm/gameNotesForm";

const GameNotesPage = () => {
  const { fetchGameMembers } = useGameMembers();
  const [gameRels, setGameRels] = useState<GameMemberType[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>("");
  const user = useAuthUser();
  const userId = user?.uid;

  useEffect(() => {
    const fetchGames = async () => {
      const gameMembers = await fetchGameMembers({ uid: user.uid });
      setGameRels(gameMembers);
      if (gameMembers.length > 0 && !selectedGame) {
        setSelectedGame(gameMembers[0].gameId);
      }
    };

    fetchGames();
  }, [userId]);

  const { addNoteToGame, notes, deleteNote, updateNote } =
    useGameNotes(selectedGame);

  // add note
  const handleAddNote = async (e) => {
    e.preventDefault();
    const tempItem = {
      gameId: selectedGame,
      userId: userId,
      noteType: "other",
      title: "New Note",
      content: "This is a new note.",
      createdAt: new Date(),
    } as GameNoteType;

    if (selectedGame) {
      const noteId = await addNoteToGame(selectedGame, tempItem);
    }
  };

  // delete note
  const handleDeleteNote = async (e, id) => {
    e.preventDefault();
    if (selectedGame) {
      await deleteNote(id);
    }
  };

  const noteTypes = [
    "character",
    "faction",
    "lore",
    "location",
    "item",
    "quest",
    "other",
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-start items-center bg-white mt-[0px] w-full">
        <div className="p-1">
          <span className="mr-1">Game:</span>
          <select
            className="p-2 border rounded mb-4 bg-gray-100 z-1"
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
        <div className="p-1 ml-4">
          <span className="mr-1">Type:</span>
          <select
            className="p-2 border rounded mb-4 bg-gray-100 z-1"
            onChange={(e) => {}}
            value="other"
          >
            {noteTypes.map((type) => (
              <option value={type} key={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row p-4">
        <span>Selected game id: </span>
        <div className="ml-4">{selectedGame ? selectedGame : "none"}</div>
      </div>
      {selectedGame !== "" && (
        <button
          className="p-2 bg-misc text-white rounded"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      )}
      <GameNotesForm gameId={selectedGame} addNoteToGame={addNoteToGame} />

      {notes.map((note) => (
        <div key={note.id} className="p-2 border-b">
          <p>{note.content}</p>
          <small>Created by: {note.createdBy}</small>
          <small>At: {new Date(note.createdAt).toLocaleString()}</small>
          <button
            className="p-2 bg-cancel text-white rounded ml-2"
            onClick={(e) => handleDeleteNote(e, note.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
export { GameNotesPage };
