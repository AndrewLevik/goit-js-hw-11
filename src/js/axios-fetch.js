import axios from 'axios';

const KEY = '30935665-ea4f2fb7c578d2da022664c3d';
const URL = `https://pixabay.com/api/?key=${KEY}`;

async function fetchImages(userSearch, pageNumber) {
  return await axios.get(
    `${URL}&q=${userSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`
  );
}

export { fetchImages };