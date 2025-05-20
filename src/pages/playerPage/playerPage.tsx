import { useGameMembers } from "@/hooks/useGameMembers";
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

const PlayerPage = () => {
  const user = useAuthUser();
  const { magicItems, loading } = useMagicItems();
  const { favoriteItemIds } = useFavorites();
  const { fetchGameMembers } = useGameMembers();
  const [gameMembers, setGameMembers] = useState<GameMemberType[]>([]);
  const [loadingGames, setLoadingGames] = useState(true);

  const favouritedItems = useMemo(() => {
    return magicItems.filter((item) => favoriteItemIds.includes(item.id));
  }, [magicItems, favoriteItemIds]);

  useEffect(() => {
    const fetchGames = async () => {
      if (!user) return;
      const gameMembers = await fetchGameMembers({ uid: user.uid });
      setGameMembers(gameMembers);
      setLoadingGames(false);
    };
    fetchGames();
  }, []);

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
          <div>List of campaigns</div>
          <div className="w-[400px]">
            {loadingGames && <div>Loading...</div>}
            {setGameMembers.length === 0 && <div>No games</div>}
            {gameMembers.map((gameMember) => (
              <div
                key={gameMember.id}
                className="flex flex-row justify-between items-center w-full p-2 bg-white rounded-md drop-shadow-md my-2"
              >
                <span>{gameMember.gameName}</span>
                <button className="bg-red-600 text-white p-2">
                  <FaTrashCan />
                </button>
              </div>
            ))}
          </div>
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
