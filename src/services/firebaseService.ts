import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "Firebase.js";

export interface Item {
  id?: string;
  name: string;
  // add other fields here
}

export type CollectionName = "magic_items" | "users";

// Fetch all items
export const fetchItems = async <T>(table: CollectionName): Promise<[T]> => {
  const snapshot = await getDocs(collection(db, table));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as [T];
};

export const deleteItem = async (
  id: string,
  table: CollectionName
): Promise<boolean> => {
  try {
    const docRef = await deleteDoc(doc(db, table, id));
    console.log(`Deleted item with ID: ${id} from collection: ${table}`);
    return true;
  } catch (e) {
    console.log("Error Deleting: ", e);
    return false;
  }
};

export const addItem = async <T>(
  item: T,
  table: CollectionName
): Promise<boolean | T> => {
  try {
    const docRef = await addDoc(collection(db, table), {
      ...item,
    });
    console.log("Document written with ID: ", docRef.id);
    return { id: docRef.id, ...item } as T;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

export const updateItem = async (
  item: Item | MagicItemType,
  id: string,
  table: CollectionName
): Promise<boolean> => {
  try {
    const docRef = await updateDoc(doc(db, table, id), {
      ...item,
    });
    console.log("Document updated with ID: ", id);
    return true;
  } catch (e) {
    console.error("Error updating document: ", e);
    return false;
  }
};
