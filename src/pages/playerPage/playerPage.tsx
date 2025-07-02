import { MagicItem } from "../../components/magicItem/magicItem";
import { useAuthUser } from "../../contexts/useAuth";
import { useFavorites } from "../../hooks/useMagicItemFavourites";
import { useMagicItems } from "../../hooks/useMagicItems";
import { useEffect, useMemo, useState } from "react";
import {
  FaHeartCirclePlus,
  FaHeartCircleXmark,
  FaTrashCan,
  FaPenToSquare,
} from "react-icons/fa6";
import { useGamesContext } from "@/contexts/gamesProvider";

const PlayerPage = () => {
  const user = useAuthUser();
  const { magicItems, loading } = useMagicItems();
  const { favoriteItemIds } = useFavorites();
  const { myGames } = useGamesContext();

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
      <div className="flex flex-row justify-start items-start w-full">
        <div className="flex flex-col w-[50%]">
          <div>Your games</div>
          <div className="w-[400px]"></div>
          {myGames.length === 0 && <div>No campaigns found</div>}
          {myGames.map((game) => (
            <div
              key={game.id}
              className="flex flex-col mb-4 bg-white p-4 rounded-md shadow-md"
            >
              <h2>{game.name}</h2>
              <div className="flex flex-row justify-start items-center">
                <span>Players: </span>
                {game.players?.map((player) => (
                  <span key={player.uid} className="ml-2">
                    {player.name}
                  </span>
                ))}
              </div>
              <div className="flex flex-row justify-start items-center mt-2">
                <button className="bg-cancel text-white p-2 rounded-md">
                  <FaHeartCircleXmark className="mr-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-[50%]">
          <div>
            <h2>Favourited Items</h2>
            {favouritedItems.length === 0 && <div>No favourited items</div>}
          </div>
          <div className="w-[400px]">
            {favouritedItems.map((item) => (
              <MagicItem
                key={item.id}
                item={item as MagicItemType}
                getModalItem={() => item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { PlayerPage };
