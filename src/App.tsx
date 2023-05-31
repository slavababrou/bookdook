import React, { useState } from "react";
import Search from "./components/Search";
import "./App";
import Results from "./components/Results";
import AboutBook from "./components/AboutBook";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [key, setKey] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setKey(query + category + sort);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
    setKey(searchQuery + category + sort);
  };

  const handleSortChange = (sort: string) => {
    setSort(sort);
    setKey(searchQuery + category + sort);
  };

  return (
    <Router>
      <div className='App'>
        <Search
          setSearchQuery={handleSearch}
          setCategory={handleCategoryChange}
          setSort={handleSortChange}
        />

        <Routes>
          <Route
            path='/'
            element={
              <Results
                searchQuery={searchQuery}
                category={category}
                sort={sort}
                key={key}
              />
            }
          />

          <Route path='/book/:id' element={<AboutBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
