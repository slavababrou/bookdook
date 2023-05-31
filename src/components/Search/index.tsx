import React from "react";
import styles from ".//styles.module.css";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setSort: (sort: string) => void;
}

const Search: React.FC<SearchBarProps> = ({
  setSearchQuery,
  setCategory,
  setSort,
}) => {
  const [searchInput, setSearchInput] = React.useState("");
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(searchInput);
    }
  };
  const handleSearchClick = (e: any) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <div className={styles.Search}>
      <div className={styles.content}>
        <h3>Search for books</h3>
        <form>
          <input
            className={styles.search_input}
            type='text'
            placeholder='Search for books'
            onKeyDown={handleSearch}
            onChange={handleInputChange}
            value={searchInput}
          ></input>
          <button className={styles.search_button} onClick={handleSearchClick}>
            <span className='material-symbols-outlined'>search</span>
          </button>
        </form>

        <div className={styles.sort}>
          <div className={styles.wrapper}>
            <label htmlFor='categories'> Categories </label>
            <select id='categories' onChange={handleCategoryChange}>
              <option value='all'>All</option>
              <option value='art'>Art</option>
              <option value='biography'>Biography</option>
              <option value='computers'>Computers</option>
              <option value='history'>History</option>
              <option value='medical'>Medical</option>
              <option value='poetry'>Poetry</option>
            </select>
          </div>

          <div className={styles.wrapper}>
            <label htmlFor='sorting'> Sorting by </label>
            <select id='sorting' onChange={handleSortChange}>
              <option value='relevance'>Relevance</option>
              <option value='newest'>Newest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
