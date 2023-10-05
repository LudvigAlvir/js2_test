const url = "https://api.noroff.dev/api/v1/social/posts";
const row = document.querySelector(".row");
var likeBtn = document.querySelectorAll('.like')
const API_BASE_URL = 'https://api.noroff.dev';

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
  

  for (let i = 0; i < 100; i++) {
    const oldTime = data[i].created;
    let newTime = Number(calculateMinutesAgo(oldTime));
    
    if(newTime > 60){
     newTime = Math.round(newTime / 60) + " hours ago"
    }else if(Math.round(newTime / 60) > 24) {
      newTime = Math.round((newTime / 60) / 24) + " days ago";
    } else if (newTime < 60){
      newTime = newTime + " minutes ago"
    }
    if(!data[i].media){
      continue
    } 
      const postDiv = document.createElement("div");
      postDiv.classList.add(
      "col-lg-5",
      "col-10",
      "mx-auto",
      "feedcard",
      "my-2",
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );
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
    
    var likeBtn = document.querySelectorAll('.like')
    likeBtn.forEach(function(btn) {
  
      btn.addEventListener('click', function() {
        btn.style.backgroundColor = "red";
      })
    })
    
  }
  
}
getPosts()


function calculateMinutesAgo(timestampString) {
  const postDate = new Date(timestampString);
  const currentDate = new Date();
  const timeDifferenceMillis = currentDate - postDate;
  const minutesDifference = Math.floor(timeDifferenceMillis / (1000 * 60));
  return minutesDifference;
}

const postBtn = document.querySelector("#postbtn");
const titleInput = document.querySelector("#titleinput");
const bodyInput = document.querySelector("#bodyinput");
const tagsInput = document.querySelector("#tagsinput")
const mediaInput = document.querySelector("#mediainput");
const modal = document.querySelector("#static-backdrop");



async function newPost(url,info) {
	const accessToken = localStorage.getItem("accessToken");
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`, // what we use for authentication
		}, body: JSON.stringify(info),
	});
	const data = await res.json();
	console.log(data);
  location.reload()
}
postBtn.addEventListener("click", ()=>{ 
  
 const arr = tagsInput.value.split(" ")
 console.log(arr);
  const postInfo = {
      title: `${titleInput.value}`,
      body: `${bodyInput.value}`,
      tags: arr,
      media: `${mediaInput.value}`,
  }
  console.log(postInfo);
  newPost(`${API_BASE_URL}/api/v1/social/posts`, postInfo);
  

  
  
});









