
var title = document.getElementById('#post-title');
var url = document.getElementById('#post-url');
$('#post-title').on('click', ()=>{
	alert("hello");
})
$('#post-title').on('input', ()=>{
	console.log($(this).val())
});
