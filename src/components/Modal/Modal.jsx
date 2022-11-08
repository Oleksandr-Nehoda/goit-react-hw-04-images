import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    closeByEscape = e => {
        if(e.code !== 'Escape') return
        this.props.closeModal()
            }
    
     componentDidMount() {
       window.addEventListener('keydown', this.closeByEscape)
    }
    
     componentWillUnmount() {
       window.removeEventListener('keydown', this.closeByEscape)
     }

     handleOverlayClick = (event) => {
if(event.target === event.currentTarget) {
    this.props.closeModal()
}
     }

  render() {
    return createPortal(
    <div className="Overlay" onClick={this.handleOverlayClick}>
    <div className="Modal">{this.props.children}</div>
  </div>, modalRoot)
  }
}
