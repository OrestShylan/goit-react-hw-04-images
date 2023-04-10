const API_KEY = '33819745-bbbcd9b5ae7c7e49408560113';
const BASE_URL = 'https://pixabay.com/api';
const options = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
});

export const apiService = (searchValue, page, per_page) => {
  return fetch(
    `${BASE_URL}/?q=${searchValue}&page=${page}&key=${API_KEY}&per_page=${per_page}&${options}`
  ).then(response => {
    if (!response.ok) {
      Promise.reject(`Not foud`);
    }

    return response.json();
  });
};
