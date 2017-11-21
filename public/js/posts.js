const commentz = document.getElementById('commentButton');
const comment = document.getElementsByClassName("comment-container");
console.log(comment)
commentz.addEventListener('click', (e) => {
  console.log('clicked');
  comment.classList.add('show');
})
