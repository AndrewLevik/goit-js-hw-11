import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './fetch-images';

let pageNumber = 1;

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-form-input');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', onFormSubmit);
btnLoadMore.addEventListener('click', onLoadMore);

async function onFormSubmit(e) {
  e.preventDefault();
  pageNumber = 1;
  gallery.innerHTML = '';
  const searchQuery = input.value.trim();

  if (searchQuery === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else {
    const data = await fetchImages(searchQuery, pageNumber);

    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderGallary(data.hits);
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      btnLoadMore.classList.remove('is-hidden');
    }
  }
}

async function onLoadMore() {
  pageNumber += 1;
  const searchQuery = input.value.trim();

  const data = await fetchImages(searchQuery, pageNumber);

  if (data.hits.length === 0) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    btnLoadMore.classList.add('is-hidden');
  } else {
    renderGallary(data.hits);

    const totalPages = Math.ceil(data.totalHits / 40);
    btnLoadMore.classList.remove('is-hidden');

    if (pageNumber >= totalPages) {
      btnLoadMore.classList.add('is-hidden');
      setTimeout(() => {
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }, 1000);
    }
  }
}

function renderGallary(data) {
  const markup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a href="${largeImageURL}"><img class="photo" src="${webformatURL}" alt="${tags}" title="${tags}" loading="lazy"/></a>
         <div class="info">
            <p class="info-item">
                 <b>Likes</b> <span class="info-item-api">${likes}</span>
             </p>
             <p class="info-item">
                 <b>Views</b> <span class="info-item-api">${views}</span>  
             </p>
             <p class="info-item">
                 <b>Comments</b> <span class="info-item-api">${comments}</span>  
             </p>
             <p class="info-item">
                 <b>Downloads</b> <span class="info-item-api">${downloads}</span> 
             </p>
        </div>
        </div>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
