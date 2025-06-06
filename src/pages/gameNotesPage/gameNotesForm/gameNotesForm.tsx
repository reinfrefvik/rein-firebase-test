import { useAuthUser } from "@/contexts/useAuth";

interface gameNotesFormProps {
  gameId: string | null;
  addNoteToGame: (id: string, item: GameNoteType) => void;
}

const GameNotesForm = (props: gameNotesFormProps) => {
  const user = useAuthUser();
  const userId = user?.uid;

  if (!userId || !props.gameId) {
    return <div>Please log in to add notes.</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.addNoteToGame(props.gameId, {
      userId: userId,
      gameId: props.gameId,
      noteType: e.currentTarget.noteType.value,
      title: "title",
      content: "description",
      createdAt: new Date(),
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col">
      <h1>Game Notes</h1>
      <div></div>
      <form>
        <label>
          Note Type:
          <select
            name="noteType"
            className="bg-gray-100 p-2 rounded"
            defaultValue={"other"}
            required
          >
            <option value="character">Character</option>
            <option value="faction">Faction</option>
            <option value="lore">Lore</option>
            <option value="location">Location</option>
            <option value="item">Item</option>
            <option value="quest">Quest</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            name="title"
            className="bg-gray-100 p-2 rounded"
            required
          />
        </label>
        <br />
        <label>
          Content:
          <textarea
            name="content"
            className="bg-gray-100 p-2 rounded"
            required
          ></textarea>
        </label>
        <br />
        <button type="submit" className="bg-confirm text-white p-2 rounded">
          Add Note
        </button>
      </form>
    </div>
  );
};

export { GameNotesForm };
