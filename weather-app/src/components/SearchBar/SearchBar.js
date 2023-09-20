import React from "react";
import './SearchBar.css'
import {AiOutlineSearch} from 'react-icons/ai';

function SearchBar({ search, setSearch, searchPressed }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    searchPressed();
  };

  return (
    <form className="searchbar-container" onSubmit={handleFormSubmit}>
      <div className="searchbar-wrapper">
        <input
          className="search-bar"
          type="text"
          placeholder="Enter City or Country Names"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="submit-button"type="submit"><AiOutlineSearch/></button>
      </div>
    </form>
  );
}

export default SearchBar;