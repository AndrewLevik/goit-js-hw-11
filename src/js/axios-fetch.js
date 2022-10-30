import axios  from "axios";

import axios from 'axios';

const API_KEY = '30935665-ea4f2fb7c578d2da022664c3d';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;

async function fetchImages(userSearch, page, perPage) {
  return await axios.get(
    `${BASE_URL}&q=${userSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
  );
}

export { fetchImages };