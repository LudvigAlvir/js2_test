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
  console.log(minutesAgo("23-10-04T12:53:52.748Z"));

  for(let i = 0; i < 20; i++){
    const oldTime = data[i].created;
    const newTime = minutesAgo(oldTime[i])
    
    
    
    
    
    const postDiv = document.createElement("div");
    postDiv.classList.add("col-lg-5", "col-10", "mx-auto", "feedcard", "my-2", "d-flex", "justify-content-center", "align-items-center")
    postDiv.innerHTML += `
    <p class="fw-lighter">${newTime}</p>
    <img class="card-img-top object-fit-fill" src="${data[i].media}">
    <div class="card-body">
      <h5 class="card-title">${data[i].title}</h5>
      <p class="card-text">${data[i].body}</p>
      <div class="d-flex gap-2 my-2">
        <button class="like btn btn-primary"><i class="fa-regular fa-heart"></i> Like</button>
        <button class="btn btn-primary"><i class="fa-regular fa-comment"></i> Comment</button>
        <button class="btn btn-primary"><i class="fa-solid fa-share"></i> Share</button>
      </div>`;
  row.appendChild(postDiv);
  
  }
}
getPosts()
console.log(new Date("23-10-04T12:53:52.748"));

function minutesAgo(timestampString) {
  // Parse the timestamp string into a Date object
  const postDate = new Date(timestampString);

  // Get the current date and time
  const currentDate = new Date();
  console.log()

  // Calculate the time difference in milliseconds
  const timeDifferenceMillis = currentDate - postDate;
  

  // Calculate the time difference in minutes
  const minutesDifference = Math.floor(timeDifferenceMillis / (1000 * 60));
  

  return minutesDifference;
}



