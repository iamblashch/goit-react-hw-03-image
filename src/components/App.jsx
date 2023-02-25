import React, { Component } from 'react';
import { fetchImg } from './Api/Api';

import Searchbar from './Searchbar/Searchbar';
import { GalleryList } from './ImageGallery/ImageGallery';
import LoadMoreBtn from './shared/Button/Button';
import { Modal } from './shared/Modal/Modal';
import { Loader } from "./Loader/Loader";
import css from './App.module.css';



export class App extends Component {
  state = {
    pictures: [],
    status: 'idle',
    page: 1,
    query: '',
    loadMore: null,
    largeImageUrl: '',
    showModal: false,
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  largeImage = (imgUrl) => {
    this.setState({largeImageUrl:imgUrl})
    this.toggleModal();
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  searchResult = value => {
    if(value === this.state.query){
      return
    }
    this.setState({
      query: value,
      page: 1,
      pictures: [],
      loadMore: null,
    });
  };

  async componentDidUpdate( _ , prevState) {
    const { page, query } = this.state;

    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ status: 'loading' });

      await fetchImg(query, page)
        .then(e =>
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...e.hits],
            status: 'idle',
            loadMore: 12 - e.hits.length,
          }))
        )
        .catch(error => console.log(error));
    }
  }

  render() {
    const { pictures, loadMore, largeImageUrl, showModal, status } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.searchResult} />
        {showModal && (
          <Modal imgUrl={largeImageUrl} onClose={this.toggleModal} />
        )}
        <GalleryList pictures={pictures}  onClickImg={this.largeImage}/>
        {loadMore === 0 && <LoadMoreBtn onClick={this.handleLoadMore} />}
        {status === "loading" && <Loader/>}
      </div>
    );
  }
}
