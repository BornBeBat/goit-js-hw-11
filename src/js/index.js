import ApiServise from './moduls/api.js';
import createSetMarcup from './moduls/marcup.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const api = new ApiServise();
const marc = new createSetMarcup();
const lightboxGallery = new SimpleLightbox('.gallery a');

const refs = {
  form: document.querySelector('#search-form'),
  galery: document.querySelector('.gallery'),
  more: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();

  refs.more.classList.add('visually-hidden');

  const query = event.target.elements.searchQuery;
  try {
    const page = await api.getFirstPage(query.value);
    if (page.total === 0) throw new Error();
    refs.galery.innerHTML = '';
    onResolve(page);
    addListener();

    Notify.success(`Hooray! We found ${page.totalHits} images.`);
  } catch {
    onReject();
  }
}

async function onMoreClick(event) {
  refs.more.classList.add('visually-hidden');
  if (refs.galery.children.length % 40 !== 0) {
    onCardsOut();
    return;
  }
  try {
    const page = await api.getNextPage();
    onResolve(page);
    scrollDown();
  } catch {
    onReject();
  }
}

function onCardsOut() {
  Notify.warning(`We're sorry, but you've reached the end of search results.`);
}

function onImageClick(event) {
  event.preventDefault();
  const elt = event.target.closest('.photo-card');
  if (!elt) return;
  lightboxGallery.openPosition([...elt.parentNode.children].indexOf(elt));
}

function onResolve(page) {
  refs.galery.insertAdjacentHTML('beforeend', marc.createSetMarcup(page.hits));
  lightboxGallery.refresh();
  refs.more.classList.remove('visually-hidden');
}

function onReject() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function addListener() {
  refs.more.addEventListener('click', onMoreClick);
  refs.galery.addEventListener('click', onImageClick);
}

function scrollDown() {
  const windowInnerHeight = document.documentElement.clientHeight;
  window.scrollBy({
    top: windowInnerHeight * 0.9,
    behavior: 'smooth',
  });
}
