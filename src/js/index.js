import ApiServise from './moduls/api.js';
import createSetMarcup from './moduls/marcup.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const api = new ApiServise();
const marc = new createSetMarcup();

const refs = {
  form: document.querySelector('#search-form'),
  galery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  const query = event.target.elements.searchQuery;
  event.preventDefault();
  try {
    const page = await api.getFirstPage(query.value);
    refs.galery.innerHTML = marc.createSetMarcup(page.hits);
    if (page.total === 0) throw new Error();
    Notify.success(`Hooray! We found ${page.total} images.`);
  } catch {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
}
