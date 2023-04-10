import React, { useState, useEffect } from 'react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Api from '../services/services-api';
import { Container } from './App.styled';
import { Searchbar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  // state = {
  //   searchValue: '',
  //   page: 1,
  //   per_page: 12,
  //   images: [],
  //   showModal: false,
  //   largeImageURL: '',
  //   isLoader: false,
  //   isLoadMore: false,
  // };

  useEffect(() => {
    if (searchValue === '') {
      return;
    }

    setIsLoader(true);

    Api.apiService(searchValue, page, per_page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          toast.error('Sorry, but nothing was found for your query. Try again');
          setIsLoader(false);
          return;
        }

        setImages(prevState => [...prevState, ...hits]);
        setIsLoadMore(page < Math.ceil(totalHits / per_page));
        setIsLoader(false);
      })
      .catch(error => console.log(error));
  }, [page, per_page, searchValue]);

  const hendleSubmitForm = searchValue => {
    // this.setState({ searchValue, page: 1, images: [] });
    setSearchValue(searchValue);
    setPage(1);
    setImages([]);
  };
  const loadMore = () => {
    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));
    setPage(prevState => prevState + 1);
  };

  const toggleModal = images => {
    // this.setState(prevState => ({
    //   showModal: !prevState.showModal,
    //   largeImageURL: images,
    // }));

    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  return (
    <Container>
      <Searchbar onSubmit={hendleSubmitForm} />
      {images.length !== 0 && (
        <ImageGallery images={images} onClick={toggleModal} />
      )}
      {isLoadMore && <Button onClick={loadMore} />}
      {isLoader && <Loader />}
      {showModal && <Modal imgLarge={largeImageURL} onClose={toggleModal} />}
      <ToastContainer autoClose={3000} />
    </Container>
  );
};
