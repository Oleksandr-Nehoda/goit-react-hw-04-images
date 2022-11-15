import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { LoadMore } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';
import { fatchGallery } from './API/Api';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const GetImg = async () => {
      setIsLoading(true);
      try {
        await fatchGallery(searchQuery, page).then(img => {
          if (img.hits.length === 0) {
            alert(`No pictures found with name ${searchQuery}`);
          }
          setImages(prevState => [...prevState, ...img.hits]);
          setTotalHits(img.totalHits);
        });
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };
    GetImg();
  }, [searchQuery, page]);

  const handleFormSubmit = searchQuery => {
    setImages([]);
    setSearchQuery(searchQuery);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(prevState => (prevState = !prevState));
  };

  const onModalOpen = largeImageURL => {
    toggleModal();
    setLargeImageURL(largeImageURL);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onModalOpen={onModalOpen} />
      {showModal && (
        <Modal closeModal={toggleModal} largeImageUrl={largeImageURL} />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        images.length > 11 &&
        page <= Math.floor(totalHits / 12) && (
          <LoadMore onLoadMore={handleLoadMore} />
        )
      )}
    </div>
  );
}
