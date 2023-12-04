const key = '41071182-18ccbddfe29083241d2882ae4';
const baseUrl = 'https://pixabay.com/api/';

/* =====================================================
=============Class for work with API Servises
========================================================*/
export default class ApiServise {
  constructor() {
    page: 1;
  }

  async getFirstPage(value) {
    const resolve = await fetch(
      `${baseUrl}?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    return await resolve.json();
  }

  async fetchCatByBreed(breedId) {
    const resolve = await fetch(`${baseUrl}/images/search?breed_ids=${breedId}`, options);
    return await resolve.json();
  }
}
