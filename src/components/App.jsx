import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { LoadMore } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    totalHits: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;
    
    const URL = 'https://pixabay.com/api/';
    const KEY = '30183064-85bc7a0e48281dabc89ef1428';

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ images: [] });
    }

    if (prevState.searchQuery !== searchQuery ||
      prevState.page !== page) {
      this.setState({ isLoading: true });
      fetch(
        `${URL}?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error('Failed to find any images'));
        })
        .then(img => {
          if (img.hits.length === 0) {
            alert(`No pictures found with name ${searchQuery}`);
          }
          console.log(img.totalHits)
          this.setState(prevState => ({
            images: [...prevState.images, ...img.hits],
            totalHits: img.totalHits,
          }));
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({ isLoading: false });
        });
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


  render() {
    const { images, isLoading, showModal, largeImageURL, totalHits, page } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
         images={images}
         onModalOpen={this.onModalOpen}
        />
         {showModal && (
          <Modal
            closeModal={this.toggleModal}
            largeImageUrl={largeImageURL}
          />
        )}
        {isLoading ? (
          <Loader />
        ) : (
          images.length > 11 && page <= Math.floor(totalHits/12) && <LoadMore onLoadMore={this.handleLoadMore} />
        )} 
      </div>
    );
  }
}


      
