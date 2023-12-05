const key = '41071182-18ccbddfe29083241d2882ae4';
const baseUrl = 'https://pixabay.com/api/';

/* =====================================================
=============Class for work with API Servises
========================================================*/
export default class ApiServise {
  constructor() {
    page: null;
    queryValue: null;
  }

  async getFirstPage(value) {
    this.queryValue = value;
    this.page = 1;
    const resolve = await fetch(
      `${baseUrl}?key=${key}&q=${this.queryValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    return await resolve.json();
  }

  async getNextPage() {
    this.page += 1;
    const resolve = await fetch(
      `${baseUrl}?key=${key}&q=${this.queryValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    return await resolve.json();
  }
}
