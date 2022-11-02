import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './fetch-images.js';

const input = document.querySelector('.search-form-input');
const btnSearch = document.querySelector('.search-form-button');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const gallerySimpleLightbox = new SimpleLightbox('.gallery a');

let pageNumber = 1;

btnLoadMore.style.display = 'none';

input.addEventListener('submit', onFormSubmit);
btnLoadMore.addEventListener('click', onLoadMore);

async function onFormSubmit(e) {
  
  e.preventDefault();
  pageNumber = 1;
  gallery.innerHTML = '';
  const trimmedValue = btnSearch.value.trim();

  if (trimmedValue === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else {
    const data = await fetchImages(trimmedValue, pageNumber);

    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderGallery(data.hits);
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      btnLoadMore.classList.remove('is-hidden');
    }
  }
}

async function onLoadMore() {
  pageNumber += 1;
  const trimmedValue = btnSearch.value.trim();
  
  const data = await fetchImages(trimmedValue, pageNumber);

  if (data.hits.length === 0) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    btnLoadMore.classList.add('is-hidden');
  } else {
    renderGallery(data.hits);
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

    const totalPages = Math.ceil(data.totalHits / 40);

    btnLoadMore.style.display = 'block';
    gallerySimpleLightbox.refresh();

    if (pageNumber >= totalPages) {
      btnLoadMore.classList.add('is-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }
}

function renderGallery(images) {
  console.log(images, 'images');
  const markup = images
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
        console.log('img', image);
        return `<div class="gallery">
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
  gallery.innerHTML += markup;
  gallerySimpleLightbox.refresh();
}
