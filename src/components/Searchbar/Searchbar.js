import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { CiSearch } from 'react-icons/ci';

class Searchbar extends Component {
  state = {
    search: '',
  };
  searchResult = event => {
    this.setState({
      search: event.currentTarget.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { search } = this.state;

    this.props.onSubmit(search);
    this.setState({
      search: '',
    });
  };

  render() {
    const { search } = this.state;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm__button}>
          <CiSearch className={css.icon}/>
            <span className={css.SearchForm__button_label}></span>
          </button>

          <input
            className={css.SearchForm__input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.searchResult}
            value={search}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

