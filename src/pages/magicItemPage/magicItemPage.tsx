import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase.js";
import React, { useContext, useEffect, useState } from "react";
import "./MagicItemPage.css"; // Import your CSS file for styling
import { AuthContext } from "../../contexts/authContexts";
import { MagicItem } from "../../components/magicItem/magicItem";
import { ItemModal } from "../../components/magicItem/magicItemModal";
import { AddMagicItem } from "../../components/magicItem/addMagicItemForm";
import { MagicItemGrid } from "./magicItemPageGrid/magicItemPageGrid";
import { MagicItemSearch } from "./magicItemPageSearch/magicItemPageSearch";

const MagicItemPage = () => {
  const { user } = useContext(AuthContext);
  const [itemList, setItemList] = useState(Array<any>);
  const [modalItem, setModalItem] = useState(null);
  const [fullItemList, setFullItemList] = useState(Array<any>);
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);

  const deleteMagicItem = async (id: any) => {
    console.log(id);
    setModalItem(null);
    try {
      const docRef = await deleteDoc(doc(db, "magic_items", id));
      console.log("Attempting Delete: ", docRef);
      fetchMagicItems();
    } catch (e) {
      console.log("Error Deleting: ", e);
    }
  };

  const addMagicItem = async (item: MagicItemType) => {
    console.log(item.mi_title);

    try {
      const docRef = await addDoc(collection(db, "magic_items"), {
        mi_title: item.mi_title,
        mi_type: item.mi_type,
        mi_attunement: item.mi_attunement,
        mi_description: item.mi_description,
      });
      console.log("Document written with ID: ", docRef.id);
      fetchMagicItems();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getModalItem = (item: any) => {
    setModalItem(item);
    console.log("Modal Item: ", item);
  };

  const updateMagicItem = async (obj, id) => {
    console.log("updating: ID: " + id + " OBJ: " + obj);
    console.log("attempting to update");

    try {
      const docRef = await updateDoc(doc(db, "magic_items", id), {
        ...obj,
      });
      console.log("editing done");
      fetchMagicItems();
    } catch (e) {
      console.error("failed updating: ", e);
    }
  };

  const fetchMagicItems = async () => {
    if (!user) {
      return;
    }

    await getDocs(collection(db, "magic_items")).then((querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(result);
      setItemList(result);
      setFullItemList(result);
      setSearching(false);
    });
  };

  const searchInMagicItems = (e) => {
    e.preventDefault();
    console.log("searching");

    if (searchText == "") {
      return;
    }

    const searchResult = [];

    for (let i = 0; i < fullItemList.length; i++) {
      const itemText = fullItemList[i].mi_title.toLowerCase();
      if (itemText.search(searchText.toLowerCase()) != -1) {
        console.log(fullItemList[i].mi_title);
        searchResult.push(fullItemList[i]);
      }
    }

    setSearching(true);
    setItemList(searchResult);
  };

  const resetSearch = (e) => {
    setSearching(false);
    setSearchText("");

    e.preventDefault();
    if (fullItemList.length > 0) {
      setItemList(fullItemList);
    } else {
      fetchMagicItems();
    }
  };

  useEffect(() => {
    fetchMagicItems();
  }, []);

  if (!user) {
    return (
      <div>
        <span>Fetching User</span>
      </div>
    );
  }

  return (
    <>
      <ItemModal
        modalItem={modalItem}
        onClose={() => setModalItem(null)}
        onDelete={deleteMagicItem}
        onEditSaved={updateMagicItem}
      />
      <div className="mil-body">
        <MagicItemGrid>
          <MagicItemSearch
            key="magic_item_search"
            searchText={searchText}
            setSearchText={setSearchText}
            searching={searching}
            setSearching={setSearching}
            searchInMagicItems={searchInMagicItems}
            resetSearch={resetSearch}
          />
          <AddMagicItem key="add_magic_item_form" addMagicItem={addMagicItem} />
          {itemList.map((item) => (
            <MagicItem key={item.id} item={item} getModalItem={getModalItem} />
          ))}
        </MagicItemGrid>
      </div>
    </>
  );
};
export { MagicItemPage };
