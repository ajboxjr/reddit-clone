alert('hello world');
var title = document.getElementById('#post-title');
var url = document.getElementById('#post-url');
$('#post-title').on('input', ()=>{
	console.log($(this).val())
});

