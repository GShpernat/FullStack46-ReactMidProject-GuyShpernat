import React from 'react';

function SearchBar({ onAddClick }) {
  return (
    <div className="search-bar-container" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <input type="text" id="search-bar" placeholder="Search..." style={{ flex: 1, marginRight: '10px' }} />
      <button onClick={onAddClick} className="add-button">Add</button>
    </div>
  );
}

export default SearchBar;