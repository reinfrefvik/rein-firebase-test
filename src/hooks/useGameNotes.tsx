import { useAuthUser } from "@/contexts/useAuth";
import {
  addItem,
  deleteItem,
  fetchItems,
  updateItem,
} from "@/services/firebaseService";
import { useCallback, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase.js"; // your Firebase config

const GAMES_NOTES_TABLE = "game_notes" as const;

export const useGameNotes = (gameId: string | null, userId?: string) => {
  const user = useAuthUser();
  const [notes, setNotes] = useState([]);
  const [gameLoading, setGameLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // fetch all notes for a game
  const fetchNotes = async () => {
    if (!gameId) {
      setNotes([]);
      return;
    }

    setGameLoading(true);
    setError(null);

    try {
      const notesRef = collection(db, "games", gameId, "game_notes");

      let q = query(notesRef, orderBy("createdAt", "desc"));
      if (userId) {
        q = query(
          notesRef,
          where("createdBy", "==", userId),
          orderBy("createdAt", "desc")
        );
      }

      const snapshot = await getDocs(q);
      const fetchedNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotes(fetchedNotes);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError(err as Error);
    } finally {
      setGameLoading(false);
    }
  };

  // add a new note to the game
  const addNoteToGame = useCallback(
    async (gameId: string, item: GameNoteType): Promise<string | null> => {
      const notesCollectionRef = collection(
        db,
        "games",
        gameId,
        GAMES_NOTES_TABLE
      );

      item.title = item.title || "Untitled Note";
      item.userId = user?.uid;
      item.createdAt = item.createdAt || new Date();
      item.gameId = item.gameId || gameId;
      item.noteType = item.noteType || "other";

      const result = await addDoc(notesCollectionRef, item);
      if (result) {
        setNotes((prevNotes) => [...prevNotes, { id: result.id, ...item }]);
        return result.id;
      } else {
        alert("Error adding note");
        return null;
      }
    },
    [gameId]
  );

  // Delete note
  const deleteNote = useCallback(
    async (itemId: string) => {
      if (!gameId) return;
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== itemId));
      await deleteDoc(doc(db, "games", gameId, "game_notes", itemId));
    },
    [gameId]
  );

  // Update note
  const updateNote = useCallback(
    async (item: GameNoteType) => {
      if (!gameId) return;
      const noteId = item.id;
      delete item.id;
      delete item.createdAt;

      const noteRef = doc(db, "games", gameId, "game_notes", noteId);
      await updateDoc(noteRef, {
        ...item,
        updatedAt: Timestamp.now(),
      });
    },
    [gameId]
  );

  useEffect(() => {
    fetchNotes();
  }, [gameId, userId]);

  return {
    notes,
    gameLoading,
    addNoteToGame,
    updateNote,
    deleteNote,
  };
};
