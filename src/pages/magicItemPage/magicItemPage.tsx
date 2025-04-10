import { useCallback, useContext, useEffect, useState } from "react";
import "./MagicItemPage.css"; // Import your CSS file for styling
import { AuthContext } from "contexts/authContexts";
import { MagicItem } from "components/magicItem/magicItem";
import { ItemModal } from "components/magicItemModal/magicItemModal";
import { AddMagicItem } from "components/magicItem/addMagicItemForm";
import { MagicItemGrid } from "./magicItemPageGrid/magicItemPageGrid";
import { MagicItemSearch } from "./magicItemPageSearch/magicItemPageSearch";
import {
  deleteItem,
  addItem,
  updateItem,
  fetchItems,
} from "services/firebaseService";

const MagicItemPage = () => {
  const { user } = useContext(AuthContext);
  const [itemList, setItemList] = useState<MagicItemType[]>([]);
  const [modalItem, setModalItem] = useState<MagicItemType | null>(null);
  const [fullItemList, setFullItemList] = useState<MagicItemType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);

  const fetchMagicItems = useCallback(async () => {
    if (!user) return;

    const result = await fetchItems<MagicItemType>("magic_items");
    setItemList(result);
    setFullItemList(result);
    setSearching(false);
  }, [user]);

  const deleteMagicItem = async (id: any) => {
    setModalItem(null);
    setItemList((prev) => prev.filter((item) => item.id !== id));
    setFullItemList((prev) => prev.filter((item) => item.id !== id));
    const result = await deleteItem(id, "magic_items");
    if (!result) alert("Error deleting item");
  };

  const addMagicItem = async (item: MagicItemType) => {
    const result = await addItem<MagicItemType>(item, "magic_items");
    if (result) {
      setItemList((prev) => [...prev, result as MagicItemType]);
      setFullItemList((prev) => [...prev, result as MagicItemType]);
    } else {
      alert("Error adding item");
    }
  };

  const updateMagicItem = async (obj: MagicItemType, id: string) => {
    const result = await updateItem(obj, id, "magic_items");
    if (result) {
      setItemList((prev) =>
        prev.map((item) => (item.id === id ? (obj as MagicItemType) : item))
      );
      setFullItemList((prev) =>
        prev.map((item) => (item.id === id ? (obj as MagicItemType) : item))
      );
    } else {
      alert("Error updating item");
    }
  };

  const searchInMagicItems = (e) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    const results = fullItemList.filter((item) =>
      item.mi_title.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearching(true);
    setItemList(results);
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
  }, [fetchMagicItems]);

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
            <MagicItem key={item.id} item={item as MagicItemType} getModalItem={setModalItem} />
          ))}
          {itemList.length === 0 && <p>No magic items found.</p>}
        </MagicItemGrid>
      </div>
    </>
  );
};
export { MagicItemPage };
