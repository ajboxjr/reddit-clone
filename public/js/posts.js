<<<<<<< HEAD
const commentz = document.getElementById('commentButton');
const comment = document.getElementsByClassName("comment-container");
console.log(comment)
commentz.addEventListener('click', (e) => {
  console.log('clicked');
  comment.classList.add('show');
})
=======

var title = document.getElementById('#post-title');
var url = document.getElementById('#post-url');
$('#post-title').on('click', ()=>{
	alert("hello");
})
$('#post-title').on('input', ()=>{
	console.log($(this).val())
});
>>>>>>> 783dcc85239aeab2d24e2d509d44cca88b2d365b
