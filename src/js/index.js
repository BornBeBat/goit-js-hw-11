import ApiServise from './moduls/api.js';
import createSetMarcup from './moduls/marcup.js';
const refs = {
  form: document.querySelector('#search-form'),
  galery: document.querySelector('.gallery'),
};
const api = new ApiServise();
const marc = new createSetMarcup();

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  try {
    const page = await api.getFirstPage(event.target.elements.searchQuery.value);
    console.log(marc.createSetMarcup(page.hits));
    refs.galery.innerHTML = marc.createSetMarcup(page.hits);
  } catch (error) {}
}
