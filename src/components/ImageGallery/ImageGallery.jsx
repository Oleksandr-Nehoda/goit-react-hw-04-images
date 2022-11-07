import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from '../LoadMore/LoadMore';

export class ImageGallery extends Component {
  state = {
    images: [],
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
          console.log(img);
          this.setState(prevState => ({
            images: [...prevState.images, ...img.hits],
          }));
        });
    }
  }

  render() {
    const {images} = this.state
    return (
      <>
        <ul className="ImageGallery">
          <ImageGalleryItem images={images} />
        </ul>
        {images.length > 11 && (
          <LoadMore onLoadMore={this.props.onLoadMore} />
        )}
      </>
    );
  }
}
