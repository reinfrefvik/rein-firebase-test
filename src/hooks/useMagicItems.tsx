import { useCallback, useEffect, useState } from "react";

import { useAuthUser } from "@/contexts/useAuth";
import {
  addItem,
  deleteItem,
  fetchItems,
  updateItem,
} from "@/services/firebaseService";
import { useFavorites } from "@/hooks/useMagicItemFavourites";

const MAGIC_ITEM_TABLE = "magic_items" as const;

export const useMagicItems = () => {
  const user = useAuthUser();
  const [magicItems, setMagicItems] = useState<MagicItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const { favoriteItemIds } = useFavorites();

  const userId = user?.uid;

  const refreshMagicItems = useCallback(async () => {
    if (!userId) return;

    setLoading(true);

    const favoriteIds = new Set(favoriteItemIds);
    const items = (await fetchItems<MagicItemType>(
      MAGIC_ITEM_TABLE
    )) as MagicItemType[];
    const mergedItems: MagicItemType[] = items.map((item: MagicItemType) => ({
      ...item,
      is_favorite: favoriteIds.has(item.id),
    }));

    setMagicItems(mergedItems);
    console.log("Merged Items", mergedItems);

    setLoading(false);
  }, [favoriteItemIds, userId]);

  // Add a new magic item
  const addMagicItem = async (
    item: MagicItemType
  ): Promise<boolean | MagicItemType> => {
    const result = await addItem<MagicItemType>(item, MAGIC_ITEM_TABLE);
    if (result) {
      setMagicItems((prev) => [...prev, result as MagicItemType]);
      return result;
    } else {
      alert("Error adding item");
      return null;
    }
  };

  // Delete a magic item
  const deleteMagicItem = async (id: string): Promise<boolean> => {
    setMagicItems((prev) => prev.filter((item) => item.id !== id));
    const result = await deleteItem(id, MAGIC_ITEM_TABLE);
    if (!result) {
      alert("Error deleting item");
    }
    return !!result;
  };

  // Update an existing magic item
  const updateMagicItem = async (
    item: MagicItemType,
    id: string
  ): Promise<boolean> => {
    const tempItem = { ...item };
    delete tempItem.is_favorite;
    delete tempItem.id;
    const result = await updateItem(tempItem, id, MAGIC_ITEM_TABLE);
    if (result) {
      setMagicItems((prev) =>
        prev.map((magicItem) =>
          magicItem.id === id ? (item as MagicItemType) : magicItem
        )
      );
    } else {
      alert("Error updating item");
    }
    return !!result;
  };

  useEffect(() => {
    refreshMagicItems();
  }, [refreshMagicItems]);

  return {
    magicItems,
    addMagicItem,
    deleteMagicItem,
    updateMagicItem,
    refreshMagicItemsHook: refreshMagicItems,
    loading,
  };
};
