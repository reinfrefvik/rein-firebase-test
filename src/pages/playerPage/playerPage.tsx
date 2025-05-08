import { MagicItem } from "../../components/magicItem/magicItem";
import { useAuthUser } from "../../contexts/useAuth";
import { useFavorites } from "../../hooks/useMagicItemFavourites";
import { useMagicItems } from "../../hooks/useMagicItems";
import { useMemo } from "react";

const PlayerPage = () => {
  const user = useAuthUser();
  const { magicItems, loading } = useMagicItems();
  const { favoriteItemIds } = useFavorites();

  const favouritedItems = useMemo(() => {
    return magicItems.filter((item) => favoriteItemIds.includes(item.id));
  }, [magicItems, favoriteItemIds]);

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
    <div>
      <h1>Player Page</h1>
      <div>
        List of player characters
      </div>
      <div>
        List of campaigns
      </div>
      <div>
        {favouritedItems.map((item) => (
          <MagicItem
            key={item.id}
            item={item as MagicItemType}
            getModalItem={() => item}
          />
        ))}
      </div>
    </div>
  );
};

export { PlayerPage };
