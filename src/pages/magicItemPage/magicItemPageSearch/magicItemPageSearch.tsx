import "../MagicItemPage.css"; // Import your CSS file for styling

interface MagicItemSearchProps {
  searchText: string;
  setSearchText: (string) => void;
  searching: boolean;
  setSearching: (bool) => void;
  searchInMagicItems: (e) => void;
  resetSearch: (e) => void;
}

const MagicItemSearch = (props: MagicItemSearchProps) => {
  return (
    <div className="mil-search-container">
      <div className="mil-search">
        <input
          name="search_text"
          placeholder="Search title..."
          value={props.searchText}
          onChange={(e) => props.setSearchText(e.target.value)}
        />
        <button onClick={props.searchInMagicItems}>Search</button>
      </div>
      {props.searching && (
        <div className="mil-search-info">
          <span>Filtering for: "{props.searchText}"</span>
          <button onClick={props.resetSearch}>Reset</button>
        </div>
      )}
    </div>
  );
};

export { MagicItemSearch };
