
import React, { useState, useEffect } from 'react';
import { fetchImg } from '../api/api';

import Searchbar from './Searchbar/Searchbar';
import { GalleryList } from './ImageGallery/ImageGallery';
import LoadMoreBtn from './shared/Button/Button';
import { Modal } from './shared/Modal/Modal';
import { Loader } from "./Loader/Loader";
import css from './App.module.css';

function App() {
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loadMore, setLoadMore] = useState(null);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const largeImage = (imgUrl) => {
    setLargeImageUrl(imgUrl);
    toggleModal();
  }

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const searchResult = value => {
    if (!value.trim()) {
      setStatus('error');
      alert('Please enter a valid search term');
      return;
    }
    if (!value.match(/^[a-zA-Z0-9-_ ]*$/)) {
      alert('Invalid search query');
      return;
    }
  
    if (value === query) {
      return;
    }
  
    setQuery(value);
    setPage(1);
    setPictures([]);
    setLoadMore(null);
    setStatus('idle');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!query) {
        return;
      }

      setStatus('loading');

      try {
        const data = await fetchImg(query, page);
        setPictures(prevPictures => [...prevPictures, ...data.hits]);
        setStatus('');
        setLoadMore(12 - data.hits.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [query, page]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={searchResult} />
      {showModal && (
        <Modal imgUrl={largeImageUrl} onClose={toggleModal} />
      )}
      {pictures.length > 0 && (
        <GalleryList pictures={pictures} onClickImg={largeImage} />
      )}
      {loadMore === 0 && <LoadMoreBtn onClick={handleLoadMore} />}
      {status === "loading" && <Loader/>}
    </div>
  );
}

export default App;