import { baseUrl, involvementUrl } from './api.js';

const toGetData = async () => {
  const response = await fetch(baseUrl);
  const data = await response.json();
  return data;
};

const toGetMovies = async (id) => {
  const urlForMoovie = `${baseUrl}/${id}`;
  const response = await fetch(urlForMoovie);
  const data = await response.json();
  return data;
};

const addLike = async (id) => {
  await fetch(`${involvementUrl}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
    }),
  });
};

const toGetLikes = async () => {
  const response = await fetch(`${involvementUrl}likes`);
  const data = await response.json();
  return data;
};

const addComment = async (id, username, comment) => {
  await fetch(`${involvementUrl}comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
      username,
      comment,
    }),
  });
};

const toGetComments = async (id) => {
  const response = await fetch(`${involvementUrl}comments?item_id=${id}`);
  const data = await response.json();
  return data;
};

export {
  toGetData, toGetMovies, addLike, toGetLikes, addComment, toGetComments,
};