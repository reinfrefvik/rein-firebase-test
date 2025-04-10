import { useContext, useEffect, useState } from "react";
import "./MagicItemPage.css"; // Import your CSS file for styling
import { AuthContext } from "../../contexts/authContexts";
import { MagicItem } from "../../components/magicItem/magicItem";
import { ItemModal } from "../../components/magicItem/magicItemModal";
import { AddMagicItem } from "../../components/magicItem/addMagicItemForm";
import { MagicItemGrid } from "./magicItemPageGrid/magicItemPageGrid";
import { MagicItemSearch } from "./magicItemPageSearch/magicItemPageSearch";
import {
  deleteItem,
  addItem,
  updateItem,
  fetchItems,
} from "../../services/firebaseService";

const MagicItemPage = () => {
  const { user } = useContext(AuthContext);
  const [itemList, setItemList] = useState(Array<any>);
  const [modalItem, setModalItem] = useState(null);
  const [fullItemList, setFullItemList] = useState(Array<any>);
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);

  const fetchMagicItems = async () => {
    if (!user) {
      return;
    }

    const result = await fetchItems<MagicItemType>("magic_items");
    setItemList(result);
    setFullItemList(result);
    setSearching(false);
  };

  const deleteMagicItem = async (id: any) => {
    setModalItem(null);
    setItemList((prev) => prev.filter((item) => item.id !== id));
    setFullItemList((prev) => prev.filter((item) => item.id !== id));
    await deleteItem(id, "magic_items");
  };

  const addMagicItem = async (item: MagicItemType) => {
    const result = await addItem<MagicItemType>(item, "magic_items");
    if (result) {
      setItemList((prev) => [...prev, result]);
      setFullItemList((prev) => [...prev, result]);
    }
  };

  const updateMagicItem = async (obj: MagicItemType, id: string) => {
    const result = await updateItem(obj, id, "magic_items");
    if (result) {
      fetchMagicItems();
    }
  };

  const searchInMagicItems = (e) => {
    e.preventDefault();

    if (searchText === "") {
      return;
    }

    const searchResult = [];
    for (let i = 0; i < fullItemList.length; i++) {
      const itemText = fullItemList[i].mi_title.toLowerCase();
      if (itemText.search(searchText.toLowerCase()) != -1) {
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
            <MagicItem key={item.id} item={item} getModalItem={setModalItem} />
          ))}
        </MagicItemGrid>
      </div>
    </>
  );
};
export { MagicItemPage };
