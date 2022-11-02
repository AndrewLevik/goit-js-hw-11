import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30935665-ea4f2fb7c578d2da022664c3d';

async function fetchImages(inputValue, pageNumber) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&page=${pageNumber}&per_page=40`;

  return await axios.get(url);
   
}

export { fetchImages };
