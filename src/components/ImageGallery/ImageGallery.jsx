import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from '../LoadMore/LoadMore';
import { Loader } from '../Loader/Loader';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
  };

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;
    const URL = 'https://pixabay.com/api/';
    const KEY = '30183064-85bc7a0e48281dabc89ef1428';

    if (prevQuery !== nextQuery) {
      this.setState({ images: [] });
    }

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ isLoading: true });
      fetch(
        `${URL}?q=${nextQuery}&page=${nextPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error('Failed to find any images'));
        })
        .then(img => {
          if (img.hits.length === 0) {
            alert(`No pictures found with name ${nextQuery}`);
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...img.hits],
          }));
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    const { images, isLoading } = this.state;
    return (
      <>
        <ul className="ImageGallery">
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              alt={image.tags}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
            />
          ))}
        </ul>
        {isLoading ? (
          <Loader />
        ) : (
          images.length > 11 && <LoadMore onLoadMore={this.props.onLoadMore} />
        )}
      </>
    );
  }
}

ImageGallery.protoType = {
  onLoadMore: PropTypes.func,
  searchQuery: PropTypes.string,
  page: PropTypes.number,
};
