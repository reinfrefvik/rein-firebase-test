import { FaSearch } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";

interface MagicItemSearchProps {
  searchText: string;
  setSearchText: (string) => void;
}

const MagicItemSearch = (props: MagicItemSearchProps) => {
  const searchItems = (e) => {
    e.preventDefault();
    if (!props.searchText.trim()) return;
  };

  const resetSearch = (e) => {
    e.preventDefault();
    props.setSearchText("");
  };

  return (
    <div className="flex flex-col my-2">
      <div className="flex flex-row p-4 bg-white drop-shadow-md rounded-md z-2">
        <input
          className="block m-0 p-0 px-2 mr-1 w-full bg-gray-200 rounded-sm"
          name="search_text"
          type="text"
          placeholder="Search title..."
          value={props.searchText}
          onChange={(e) => props.setSearchText(e.target.value)}
        />
        <button
          className="p-2 bg-green-600 text-white rounded-sm"
          onClick={searchItems}
        >
          <FaSearch />
        </button>
      </div>
      {props.searchText !== "" && (
        <div className="flex flex-row items-center z-1 bg-amber-50 p-4 rounded-b-md drop-shadow-md mt-[-4px]">
          <span className="w-full">Filtering for: "{props.searchText}"</span>
          <button
            className="p-2 bg-blue-600 text-white rounded-sm"
            onClick={resetSearch}
          >
            <FaRedo />
          </button>
        </div>
      )}
    </div>
  );
};

export { MagicItemSearch };
