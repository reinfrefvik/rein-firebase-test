import { useCallback, useEffect, useState } from "react";
import {
  addToRelationTable,
  deleteFromRelationTable,
  fetchRelationItems,
} from "@/services/firebaseService";
import { useAuth } from "@/contexts/useAuth";

const FAVORITES_TABLE = "magic_item_favorites" as const;

export const useFavorites = () => {
  const { user } = useAuth();
  const [favoriteItemIds, setFavoriteItemIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.uid;

  // Fetch favorites for user
  const fetchFavorites = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    const items = await fetchRelationItems(FAVORITES_TABLE, userId);
    const ids = items.map((item) => item.value2);
    setFavoriteItemIds(ids);
    setLoading(false);
  }, [userId]);

  // Check if an item is favorited
  const isFavorited = (itemId: string): boolean => {
    return favoriteItemIds.includes(itemId);
  };

  // Add to favorites
  const addFavorite = async (itemId: string, itemName?: string) => {
    if (!userId) return;
    if (isFavorited(itemId)) return;

    await addToRelationTable(
      FAVORITES_TABLE,
      userId,
      itemId,
      user?.displayName || "",
      itemName || ""
    );
    setFavoriteItemIds((prev) => [...prev, itemId]);
  };

  // Remove from favorites
  const removeFavorite = async (itemId: string) => {
    if (!userId) return;

    await deleteFromRelationTable(FAVORITES_TABLE, userId, itemId);
    setFavoriteItemIds((prev) => prev.filter((id) => id !== itemId));
  };

  // Toggle favorite
  const toggleFavorite = async (itemId: string, itemName?: string) => {
    if (isFavorited(itemId)) {
      await removeFavorite(itemId);
    } else {
      await addFavorite(itemId, itemName || undefined);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    favoriteItemIds,
    isFavorited,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    loadingFavourites: loading,
  };
};
