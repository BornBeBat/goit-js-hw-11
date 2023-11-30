/* =====================================================
=============Class for work with marcup
========================================================*/
export default class Marcup {
  constructor() {}

  createMarcupOneRow({ name, id }) {
    return `<option data-value="${id}">${name}</option>`;
  }

  createMarcupSelect(data) {
    return data.map(cur => this.createMarcupOneRow(cur)).join();
  }

  createMarcupForDiv(url, { description, temperament, name }) {
    return ` <img src="${url}" alt="cat" width="400" />
      <div class="cat-card">
        <h1 class="title">${name}</h1>
        <p class="text">${description}</p>
        <p class="text">
          <b class="bold">Temperament: </b>${temperament}</p>
      </div>`;
  }
}
