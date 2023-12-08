import ApiServise from './moduls/api.js';
import { createSetMarcup } from './moduls/marcup.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const api = new ApiServise();
const lightboxGallery = new SimpleLightbox('.gallery a');
let endOfsearch = true;

const refs = {
  form: document.querySelector('#search-form'),
  loader: document.querySelector('#backdrop'),
  galery: document.querySelector('.gallery'),
};

const observer = new IntersectionObserver(
  ([entry], observe) => {
    if (entry.isIntersecting) {
      observe.unobserve(entry.target);
      if (endOfsearch) return;
      uploadOnScroll();
    }
  },
  {
    rootMargin: '0px 0px 10px 0px',
    threshold: 1,
  }
);

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  endOfsearch = false;
  refs.loader.classList.remove('visually-hidden');
  const query = event.target.elements.searchQuery;
  try {
    const { hits, totalHits } = await api.getFirstPageAxios(query.value);
    refs.galery.innerHTML = '';
    event.target.reset();

    onResolve(hits, totalHits);
    changeObservTarget();
    Notify.success(`Hooray! We found ${totalHits} images.`);
  } catch {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
  refs.loader.classList.add('visually-hidden');
}

async function uploadOnScroll() {
  refs.loader.classList.remove('visually-hidden');
  try {
    const { hits, totalHits } = await api.getNextPageAxios();
    onResolve(hits, totalHits);
    scrollDown();

    changeObservTarget();
  } catch {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
  refs.loader.classList.add('visually-hidden');
}

function onResolve(hits, totalHits) {
  refs.galery.insertAdjacentHTML('beforeend', createSetMarcup(hits));
  lightboxGallery.refresh();
  if (totalHits % 40 === hits.length && hits.length !== 0) {
    setTimeout(() => {
      endOfsearch = true;
      Notify.warning(`We're sorry, but you've reached the end of search results.`);
    }, 1000);
    return;
  }
}

function scrollDown() {
  setTimeout(() => {
    const windowInnerHeight = document.documentElement.clientHeight;
    window.scrollBy({
      top: windowInnerHeight * 0.98,
      behavior: 'smooth',
    });
  }, 400);
}

function changeObservTarget() {
  const target = refs.galery.lastElementChild;
  observer.observe(target);
}
