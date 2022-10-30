import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-form-input');
const btnSearch = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

let gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
  captions: false,
});

let pageNumber = 1;

btnLoadMore.style.display = 'none';

const KEY = '29588079-fbc492831fdad231bf7222b96';

const fetchImages = async (inputValue, pageNum) => {
  return await fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNum}`
  )
    .then(async response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
};

btnSearch.addEventListener('click', event => {
  event.preventDefault();
  cleanGallery();
  const trimmedValue = input.value.trim();
  if (trimmedValue !== '') {
    fetchImages(trimmedValue, pageNumber).then(foundData => {
      if (foundData.hits.length === 0) {  
        console.log(foundData)
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderImageList(foundData.hits);
        console.log(foundData)
         Notiflix.Notify.success(
          `Hooray! We found ${foundData.totalHits} images.`
          );
        btnLoadMore.style.display = 'block';
        gallerySimpleLightbox.refresh();
      }
    });
  }
});

btnLoadMore.addEventListener('click', event => {
  event.preventDefault();
  pageNumber += 1;
  const trimmedValue = input.value.trim();
  // btnLoadMore.style.display = 'none';
  fetchImages(trimmedValue, pageNumber).then(foundData => {
    if (foundData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }  else {
      renderImageList(foundData.hits); 
      console.log(foundData)
      // Notiflix.Notify.success(
      //   `Hooray! We found ${foundData.totalHits} images.`
      // );
      btnLoadMore.style.display = 'block';
      gallerySimpleLightbox.refresh();
    }
  });
});

function renderImageList(images) {
  console.log(images, 'images');
  const markup = images
    .map(image => {
      console.log('img', image);
      return `<div class="photo-card">
       <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>
        <div class="info">
           <p class="info-item">
                <b>Likes</b> <span class="info-item-api">${image.likes}</span>
            </p>
            <p class="info-item">
                <b>Views</b> <span class="info-item-api">${image.views}</span>  
            </p>
            <p class="info-item">
                <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
            </p>
            <p class="info-item">
                <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
            </p>
        </div>
    </div>`;
    })
    .join('');
  gallery.innerHTML += markup;
}

function cleanGallery() {
  gallery.innerHTML = '';
  pageNumber = 1;
  btnLoadMore.style.display = 'none';
}

// gallery.addEventListener('keydown', event => {
//   if (event.key === 'Escape') {
//     instance.close();
//   }
// });
