import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleQueryChange = event => {
    this.setState({searchQuery: event.currentTarget.value.toLowerCase()})
  }
  
  handleSubmit = event => {
    const {searchQuery} = this.state;
    event.preventDefault();
    if(searchQuery.trim() === ''){
        return alert('Input value can not be empty')
    };
    this.props.onSubmit(searchQuery);
    this.setState({searchQuery: ''});

  }

  render() {
    return (
      <header className='Searchbar'>
        <form className='SearchForm' onSubmit={this.handleSubmit}>
          <button type="submit" className='SearchForm-button'>
            <span className='button-label'>Search</span>
          </button>

          <input
            className='SearchForm-input'
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}
