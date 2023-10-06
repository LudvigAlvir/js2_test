const url = "https://api.noroff.dev/api/v1/social/posts";
const row = document.querySelector(".row2");
var likeBtn = document.querySelectorAll('.like')
const API_BASE_URL = 'https://api.noroff.dev';

function createDiv(obj, newTime){
  const postDiv = document.createElement("div");
  postDiv.classList.add(
  "col-lg-5",
  "col-10",
  "mx-auto",
  "feedcard",
  "my-2",
  "d-flex",
  "justify-content-center",
  "align-items-center",
  "shadow",
  "p-3",
  "rounded"
);
postDiv.innerHTML += `
  <p class="fw-lighter">${newTime}</p>
  <img class="card-img-top object-fit-fill rounded" src="${obj.media}">
  <div class="card-body w-100">
    <h5 class="card-title">${obj.title}</h5>
    <p class="card-text">${obj.body}</p>
    <hr>
    <div class="d-flex gap-2 my-2">
      <p>Comments<p/>
      <p>Reactions<p/> 
    <hr>
      <button class="like btn btn-primary"><i class="fa-regular fa-heart"></i> Like</button>
      <button class="btn btn-primary"><i class="fa-regular fa-comment"></i> Comment</button>
      <button class="btn btn-primary"><i class="fa-solid fa-share"></i> Share</button>
    </div>`;

row.appendChild(postDiv);
}

async function getPosts(obj) {
	const accessToken = localStorage.getItem("accessToken");
	const res = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`, 
		},
	});
	const data = await res.json();
	console.log(data);
  


  for (let i = 0; i < data.length; i++) {
    
    const newTime = calculateHours(data[i])
    if(!data[i].media){
      continue
    } 
      createDiv(data[i],newTime)
  
    
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
function calculateHours(obj){
  const oldTime = obj.created;
  let newTime = Number(calculateMinutesAgo(oldTime));
  
  if(newTime > 60){
   newTime = Math.round(newTime / 60) + " hours ago"
  }else if(Math.round(newTime / 60) > 24) {
    newTime = Math.round((newTime / 60) / 24) + " days ago";
  } else if (newTime < 60){
    newTime = newTime + " minutes ago"
  }
  return newTime
}

const postBtn = document.querySelector("#postbtn");
const titleInput = document.querySelector("#titleinput");
const bodyInput = document.querySelector("#bodyinput");
const tagsInput = document.querySelector("#tagsinput")
const mediaInput = document.querySelector("#mediainput");




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
const searchBtn = document.querySelector("#searchbtn");
const searchInput = document.querySelector("#search");
searchBtn.addEventListener("click", ()=> {
  const searchparams = searchInput.value.toLowerCase().trim();
  arr = searchparams.split(" ")
  console.log(arr)
    
  getTitles(searchparams)
});

async function getTitles(searchparams) {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, 
    },
  });
  const data = await res.json();
  row.innerHTML = ""
  data.forEach((obj)=> {
    render(obj,searchparams)
})
function render(obj){
  

  const titlesArr = obj.title.toLowerCase().split(" ");
    
  if (titlesArr.includes(searchparams) === true){
    console.log(obj);
    const newTime = calculateHours(obj)
    createDiv(obj,newTime)

    

  }else {
    console.log("didnt hit");
  }

};
}







