// import { filter } from "lodash";
import {
  toGetData, toGetLikes, addLike, addComment,
} from './tasks.js';
import countMovie from './countMovies.js';
import commentUpdates from './coments.js';

const displayItems = async () => {
  const container = document.querySelector('.container2');

  // fetch likes
  const allTheLikes = await toGetLikes();

  // fetch movies
  const moviesFetch = await toGetData();

  // loop
  moviesFetch.forEach((data, index) => {
    // filter likes
    const likes = allTheLikes.filter((like) => like.item_id === data.id);
    // put the movie in a div
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-container');
    movieCard.innerHTML = `
          <img src="${data.image.medium}" alt="${data.name}">
          <div class="movie-details">
            <h3 class="title">${data.name}<h3/>
            <div class="movie-likes">
              <i class="fa-regular fa-heart"></i>
              <div class="like">${likes.length > 0 ? likes[0].likes : 0} Likes</div>
            </div>
            <div class="movie-coments">
              <button class="comment-btn" id="film${index}">Comments</button>
            </div>
          </div>
        `;
    container.appendChild(movieCard);

    // like btn
    const likeButton = movieCard.querySelector('.fa-heart');
    likeButton.onclick = () => {
      likeButton.style.color = 'blue';
      likeButton.classList.remove('fa-regular');
      likeButton.classList.add('fa-solid');
      addLike(data.id);
      const like = movieCard.querySelector('.like');
      if (likes.length > 0) {
        like.innerHTML = `${likes[0].likes + 1} Likes`;
      } else {
        like.innerHTML = '1 Like';
      }
    };

    // count movies
    document.querySelector('.movies').innerHTML = `Movies (${countMovie()})`;

    // popup-window
    // selectors
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.overlay');
    const commentBtn = document.querySelectorAll(`#film${index}`);
    const popupImage = document.querySelector('.popupImage');
    const cardTitle = document.querySelector('.title-img');
    const movieLanguage = document.querySelector('.language');
    const movieType = document.querySelector('.type');

    commentBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        modal.classList.add('active');
        overlay.classList.add('active');
        popupImage.src = data.image.medium;
        cardTitle.innerHTML = `${data.name}`;
        movieLanguage.innerHTML = `${data.language}`;
        movieType.innerHTML = `${data.type}`;
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
      modal.classList.remove('active');
      overlay.classList.remove('active');
    });

    commentUpdates(data.id);

    const form = document.querySelector('.add-comment-form');
    const nameInput = document.querySelector('.name');
    const commentInput = document.querySelector('.comment');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // add comment
      if (nameInput.value !== '' && commentInput.value !== '') {
        await addComment(data.id, nameInput.value, commentInput.value);

        nameInput.value = '';
        commentInput.value = '';
      }

      commentUpdates(data.id);
    });
  });
};

export default displayItems;