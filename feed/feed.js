const url = "https://api.noroff.dev/api/v1/social/posts";
const row = document.querySelector(".row");
var likeBtn = document.querySelectorAll('.like')
likeBtn.forEach(function(btn) {

  btn.addEventListener('click', function() {
    btn.style.backgroundColor = "red";
    console.log("hello");
    
  })
})
//example get request for ca
async function getPosts() {
	const accessToken = localStorage.getItem("accessToken");
	const res = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`, // what we use for authentication
		},
	});
	const data = await res.json();
	console.log(data);
}
getPosts()

for(let i = 0; i < 20; i++){
  const postDiv = document.createElement("div");
  postDiv.innerHTML += `<h2 class="user">Published by coolGuy79</h2>
  <p class="fw-lighter">1 min ago</p>
  <img class="card-img-top object-fit-fill" src="../images/CharizardCard.png" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Charizard</h5>
    <p class="card-text">Charizard, a majestic Fire/Flying-type Pokémon, is the final evolution of Charmander. With its flaming breath and formidable wings, Charizard can unleash devastating fire attacks from the sky. It is known for its fierce and independent nature, making it a symbol of strength and courage among trainers and fans alike.</p>
    <a href="#" class="btn btn-primary">To profile</a>
    <div class="d-flex gap-2 my-2">
      <button class="like btn btn-primary"><i class="fa-regular fa-heart"></i> Like</button>
      <button class="btn btn-primary"><i class="fa-regular fa-comment"></i> Comment</button>
      <button class="btn btn-primary"><i class="fa-solid fa-share"></i> Share</button>
    </div>`;
row.appendChild(postDiv);
}

