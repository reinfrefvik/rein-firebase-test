// import { useEffect, useState, useCallback } from "react";
// import { firestore } from "../firebase"; // Adjust based on your Firebase config
// import firebase from "firebase/app";

// type Note = {
//   id: string;
//   content: string;
//   createdBy: string;
// };

// export function useGameNotes(gameId: string | null, userId: string | null) {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch notes
//   useEffect(() => {
//     if (!gameId) {
//       setNotes([]);
//       return;
//     }

//     setLoading(true);

//     const unsubscribe = firestore
//       .collection("games")
//       .doc(gameId)
//       .collection("notes")
//       .orderBy("createdAt", "desc")
//       .onSnapshot((snapshot) => {
//         const fetchedNotes: Note[] = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...(doc.data() as Omit<Note, "id">),
//         }));
//         setNotes(fetchedNotes);
//         setLoading(false);
//       });

//     return () => unsubscribe();
//   }, [gameId]);

//   // Add a note
//   const addNote = useCallback(
//     async (content: string) => {
//       if (!gameId || !userId) return;

//       await firestore.collection("games").doc(gameId).collection("notes").add({
//         content,
//         createdBy: userId,
//       });
//     },
//     [gameId, userId]
//   );

//   return { notes, loading, addNote };
// }
