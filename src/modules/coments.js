import { toGetComments } from "./tasks";

const countComments = () => {
    const count = document.querySelectorAll('.container');
    return count.length;
}

const commentUpdates = async (id) => {
    const gotComments = await toGetComments(id);
    const comments = document.querySelector('.comments-container');
    if (!(gotComments.error)) {
        gotComments.forEach((data) => {
            innertext += `
            <li class="comment">
              <span class="date">${data.creation_date}</span>
              <span class="name">${data.username}:</span>
              <span class="comment-message">${data.comment}</span>
            </li>
            `;
        });
        comments.innerHTML = innertext;
    }
    const commentsNo = countComments();
    const commentSection = document.querySelector('.comment-title');
    commentSection.innerHTML = `
      Comments (${commentsNo})
    `;
}

export default commentUpdates;