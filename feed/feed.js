
var likeBtn = document.querySelectorAll('.like')
likeBtn.forEach(function(btn) {

  btn.addEventListener('click', function() {
    btn.style.backgroundColor = "red";
    console.log("hello");
    
  })
})


