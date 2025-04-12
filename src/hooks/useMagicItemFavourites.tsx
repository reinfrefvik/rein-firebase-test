import { useEffect, useState } from "react";
import {
  addToRelationTable,
  deleteFromRelationTable,
  fetchRelationItems,
  isInRelationTable, // If you added the optional helper
} from "services/firebaseService";
import { useAuth } from "contexts/useAuth";

const FAVORITES_TABLE = "magic_item_favourites" as const;

export const useFavorites = () => {
  const { user } = useAuth();
  const [favoriteItemIds, setFavoriteItemIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.uid;

  // Fetch favorites for user
  const fetchFavorites = async () => {
    if (!userId) return;

    setLoading(true);
    const items = await fetchRelationItems(FAVORITES_TABLE, userId);
    const ids = items.map((item) => item.value2);
    setFavoriteItemIds(ids);
    setLoading(false);
  };

  // Check if an item is favorited
  const isFavorited = (itemId: string): boolean => {
    return favoriteItemIds.includes(itemId);
  };

  // Add to favorites
  const addFavorite = async (itemId: string) => {
    if (!userId) return;

    await addToRelationTable(FAVORITES_TABLE, userId, itemId);
    setFavoriteItemIds((prev) => [...prev, itemId]);
  };

  // Remove from favorites
  const removeFavorite = async (itemId: string) => {
    if (!userId) return;

    await deleteFromRelationTable(FAVORITES_TABLE, userId, itemId);
    setFavoriteItemIds((prev) => prev.filter((id) => id !== itemId));
  };

  // Toggle favorite
  const toggleFavorite = async (itemId: string) => {
    if (isFavorited(itemId)) {
      await removeFavorite(itemId);
    } else {
      await addFavorite(itemId);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  return {
    favoriteItemIds,
    isFavorited,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    loading,
  };
};
