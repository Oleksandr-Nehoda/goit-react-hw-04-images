import { useState } from 'react';
import PropTypes from 'prop-types';

export const Searchbar = ({onSubmit}) => {

  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase())
  };

  const handleSubmit = event => {
    
    event.preventDefault();
    if (searchQuery.trim() === '') {
      return alert('Input value can not be empty');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleQueryChange}
          />
        </form>
      </header>
    );
}

Searchbar.protoType = {
  onSubmit: PropTypes.func,
};
