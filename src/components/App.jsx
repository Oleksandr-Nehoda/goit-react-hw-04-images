import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { LoadMore } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';
import { fatchGallery } from './API/Api';

export function App () {

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalHits, setTotalHits] = useState(null);

  // state = {
  //   searchQuery: '',
  //   page: 1,
  //   images: [],
  //   isLoading: false,
  //   showModal: false,
  //   largeImageURL: '',
  //   totalHits: null,
  // };

  componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ images: [] });
    }

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.apiGallery();
    }
  }

  async function apiGallery() {
    // const { page, searchQuery } = this.state;
    setIsLoading(true);
    // this.setState({ isLoading: true });
    try {
      await fatchGallery(searchQuery, page).then(img => {
        if (img.hits.length === 0) {
          alert(`No pictures found with name ${searchQuery}`);
        }
        setImages(state => [...state, ...img.hits]);
        setTotalHits(img.totalHits);
        // this.setState(prevState => ({
        //   images: [...prevState.images, ...img.hits],
        //   totalHits: img.totalHits,
        // }));
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      // this.setState({ isLoading: false });
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onModalOpen = largeImageURL => {
    this.toggleModal();
    this.setState({
      largeImageURL: largeImageURL,
    });
  };

   
    // const { images, isLoading, showModal, largeImageURL, totalHits, page } =
    //   this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onModalOpen={this.onModalOpen} />
        {showModal && (
          <Modal closeModal={this.toggleModal} largeImageUrl={largeImageURL} />
        )}
        {isLoading ? (
          <Loader />
        ) : (
          images.length > 11 &&
          page <= Math.floor(totalHits / 12) && (
            <LoadMore onLoadMore={this.handleLoadMore} />
          )
        )}
      </div>
    );
  }

