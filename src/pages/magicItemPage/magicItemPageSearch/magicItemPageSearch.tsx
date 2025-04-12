import "../MagicItemPage.css"; // Import your CSS file for styling

interface MagicItemSearchProps {
  searchText: string;
  setSearchText: (string) => void;
}

const MagicItemSearch = (props: MagicItemSearchProps) => {
  const searchItems = (e) => {
    e.preventDefault();
    if (!props.searchText.trim()) return;
  }

  const resetSearch = (e) => {
    e.preventDefault();
    props.setSearchText("");
  };

  return (
    <div className="mil-search-container">
      <div className="mil-search">
        <input
          name="search_text"
          placeholder="Search title..."
          value={props.searchText}
          onChange={(e) => props.setSearchText(e.target.value)}
        />
        <button onClick={searchItems}>Search</button>
      </div>
      {props.searchText !== '' && (
        <div className="mil-search-info">
          <span>Filtering for: "{props.searchText}"</span>
          <button onClick={resetSearch}>Reset</button>
        </div>
      )}
    </div>
  );
};

export { MagicItemSearch };
