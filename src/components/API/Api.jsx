export const fatchGallery = (searchQuery, page) => {

    const URL = 'https://pixabay.com/api/';
    const KEY = '30183064-85bc7a0e48281dabc89ef1428';

  return  fetch(
        `${URL}?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error('Failed to find any images'));
        })
}                                   