import { Component } from 'react';

export class ImageGalleryItem extends Component {

render() {
return (this.props.images.map(({id, tags, webformatURL}) => {
    return <li key={id} className='ImageGalleryItem'>
        <img className='ImageGalleryItem-image' src={webformatURL} alt={tags} />
      </li>
    }))

}
}