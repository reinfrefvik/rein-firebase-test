import {
  collection,
  setDoc,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "../Firebase.js";

export interface Item {
  id?: string;
  name: string;
  // add other fields here
}

export type CollectionName = "magic_items" | "users";
export type CollectionRelationName = "magic_item_favorites";

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
    console.log(
      `Deleted item with ID: ${id} from collection: ${table}`,
      " dockref: ",
      docRef
    );
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
    console.log("Document updated with ID: ", id, " docref: ", docRef);
    return true;
  } catch (e) {
    console.error("Error updating document: ", e);
    return false;
  }
};

export const addToRelationTable = async (
  table: CollectionRelationName,
  value1: string,
  value2: string,
  semantic1?: string,
  semantic2?: string
): Promise<string | false> => {
  const existingRelation = await isInRelationTable(table, value1, value2);
  if (existingRelation) {
    console.log("Relation already exists");
    return false;
  }
  const relationId = `${value1}-${value2}`;

  const item = {
    value1,
    value2,
    semantic1,
    semantic2,
    createdAt: new Date(),
  };

  try {
    await setDoc(doc(db, table, relationId), item);
    console.log("Relation added with ID: ", relationId);
    return relationId;
  } catch (e) {
    console.error("Error adding relation: ", e);
    return false;
  }
};

export const fetchRelationItems = async (
  table: CollectionRelationName,
  value1: string
): Promise<any[]> => {
  const q = query(collection(db, table), where("value1", "==", value1));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteFromRelationTable = async (
  table: CollectionRelationName,
  value1: string,
  value2: string
): Promise<boolean> => {
  const relationId = `${value1}-${value2}`;

  try {
    const existingRelation = await isInRelationTable(table, value1, value2);
    if (!existingRelation) {
      console.log("Relation does not exist");
      return true;
    }
  } catch (e) {
    console.error("Error checking relation: ", e);
    return false;
  }

  try {
    await deleteDoc(doc(db, table, relationId));
    console.log("Relation deleted with ID: ", relationId);
    return true;
  } catch (e) {
    console.error("Error deleting relation: ", e);
    return false;
  }
};

export const isInRelationTable = async (
  table: CollectionRelationName, // or just `string` if not using a type
  value1: string,
  value2: string
): Promise<boolean> => {
  const relationId = `${value1}-${value2}`;
  const docRef = doc(db, table, relationId);
  const snapshot = await getDoc(docRef);
  return snapshot.exists();
};
