import { useContext, useMemo, useState } from "react";
import { AuthContext } from "@/contexts/authContexts";
import { MagicItem } from "@/components/magicItem/magicItem";
import { ItemModal } from "@/components/magicItemModal/magicItemModal";
import { AddMagicItem } from "@/components/magicItem/addMagicItemForm";
import { MagicItemGrid } from "./magicItemPageGrid/magicItemPageGrid";
import { MagicItemSearch } from "./magicItemPageSearch/magicItemPageSearch";
import { useMagicItems } from "@/hooks/useMagicItems";

const MagicItemPage = () => {
  const { user } = useContext(AuthContext);
  const {
    magicItems,
    addMagicItem,
    deleteMagicItem,
    updateMagicItem,
    loading,
  } = useMagicItems();
  const [modalItem, setModalItem] = useState<MagicItemType | null>(null);
  const [searchText, setSearchText] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchText) return magicItems;
    return magicItems.filter((item) => {
      return item.mi_title.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [magicItems, searchText]);

  const handleDeleteMagicItem = async (id: any) => {
    setModalItem(null);
    await deleteMagicItem(id);
  };

  if (!user) {
    return (
      <div>
        <span>Fetching User</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <ItemModal
        modalItem={modalItem}
        onClose={() => setModalItem(null)}
        onDelete={handleDeleteMagicItem}
        onEditSaved={updateMagicItem}
      />
      <div className="flex items-start justify-center">
        <MagicItemGrid>
          <MagicItemSearch
            key="magic_item_search"
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <AddMagicItem key="add_magic_item_form" addMagicItem={addMagicItem} />
          {filteredItems.map((item) => (
            <MagicItem
              key={item.id}
              item={item as MagicItemType}
              getModalItem={setModalItem}
            />
          ))}
          {filteredItems.length === 0 && (
            <p key="no_magic_items_found">No magic items found.</p>
          )}
        </MagicItemGrid>
      </div>
    </>
  );
};
export { MagicItemPage };
