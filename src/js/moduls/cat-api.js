const options = {
  headers: {
    'x-api-key': 'live_trA76thPW01aJctCLb1CTpADYJy8yMO8sFbFSindMxRetpT7JehJ82KUtS3vJHPw',
  },
};
const baseUrl = 'https://api.thecatapi.com/v1';

/* =====================================================
=============Class for work with API Servises
========================================================*/
export default class ApiServise {
  constructor() {}

  fetchBreeds() {
    return fetch(`${baseUrl}/breeds`, options).then(resolve => {
      return resolve.json();
    });
  }

  fetchCatByBreed(breedId) {
    return fetch(`${baseUrl}/images/search?breed_ids=${breedId}`, options).then(resolve => {
      return resolve.json();
    });
  }
}
