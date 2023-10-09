/*import {calculateHours} from "./Timefunctions.js";
export default async function getPosts(obj) {
	const url = "https://api.noroff.dev/api/v1/social/posts";
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
		}*/
		
  
