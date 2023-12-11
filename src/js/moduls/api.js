import axios from 'axios';
/* =====================================================
=============Class for work with API Servises
========================================================*/
export default class ApiServise {
  constructor() {
    this.page = 0;
    this.option = {
      url: 'https://pixabay.com/api/',
      // baseUrl: 'https://pixabay.com/',
      method: 'get',
      params: {
        key: '41071182-18ccbddfe29083241d2882ae4',
        q: '',
        image_type: 'photo',
        per_page: '40',
        orientation: 'horizontal',
        safesearch: 'true',
        page: '',
      },
    };
  }

  async getFirstPageAxios(value) {
    this.option.params.q = value;
    this.option.params.page = 1;
    const resolve = await axios(this.option);
    return resolve.data;
  }

  async getNextPageAxios() {
    this.option.params.page += 1;
    const resolve = await axios(this.option);
    return resolve.data;
  }
}
