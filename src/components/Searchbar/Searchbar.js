import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { CiSearch } from 'react-icons/ci';

const Searchbar = ({ onSubmit }) => {
const [search, setSearch] = useState('');

const handleSubmit = event => {
event.preventDefault();
onSubmit(search);
setSearch('');
};

const handleSearch = event => {
setSearch(event.currentTarget.value);
};

return (
<header className={css.Searchbar}>
<form className={css.SearchForm} onSubmit={handleSubmit}>
<button type="submit" className={css.SearchForm__button}>
<CiSearch className={css.icon} />
<span className={css.SearchForm__button_label}></span>
</button>
<input
      className={css.SearchForm__input}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={handleSearch}
      value={search}
    />
  </form>
</header>
);
};

Searchbar.propTypes = {
onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;