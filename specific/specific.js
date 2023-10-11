import {calculateHours, calculateMinutesAgo} from "../js/components/Timefunctions.js";
const container = document.querySelector(".container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://api.noroff.dev/api/v1/social/posts/" + id + "?_author=true&_comments=true&_reactions=true";
console.log(url)


async function getPosts() {
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
	renderPost(data)
}
getPosts()

function renderPost(obj){
	const author = document.querySelector(".author");
	author.innerHTML = `Posted by ${obj.author.name}`;
	const title = document.querySelector(".title");
	title.innerHTML = obj.title;
	const body = document.querySelector(".body");
	body.innerHTML = obj.body;
	const postImg = document.querySelector(".image");
	postImg.style.backgroundImage = `url("${obj.media}")`
	const commentDiv = document.createElement("div");
	const commentList = document.createElement("ul");
	const comments = document.querySelector(".comments");
	const profileImg = document.querySelector(".profileimg");
	const tagsList = document.querySelector(".tagsList");
	obj.tags.forEach((elem) => {
		const tag = document.createElement("li");
		console.log(obj.tags)
		if(obj.tags[0] === ""){
			tag.innerHTML= `<input class="w-25" type="text" disabled placeholder="No Tags">`;
			tagsList.appendChild(tag);
		} else {
			tag.innerHTML = `<input class="w-25" type="text" disabled placeholder="${elem}">`
			tagsList.appendChild(tag);
		}
	});
	
	console.log(obj._count.comments)
	if(obj.author.avatar){
		console.log("Avatar exists")
		profileImg.src = obj.author.avatar;

	} else {
		console.log("avatar does not exist")
	}
	comments.innerHTML = obj._count.comments
	const showReactions = document.querySelector(".showreactions");
	obj.reactions.forEach((react)=>{
		showReactions.innerHTML += react.symbol + react.count
	})
	
	
	obj.comments.forEach((cmt)=>{
		const comment = document.createElement("li");
		comment.classList.add("d-flex");
		comment.classList.add("my-4")
		if(cmt.author.avatar){
			comment.innerHTML = `<img src="${cmt.author.avatar}" class="profileimg d-block ui-w-40 rounded-circle" alt="">  <p class="w-50 d-inline-block text-muted mx-3 p-1">${cmt.author.name}:<p/> <input class="form-control" type="text" placeholder="${cmt.body}" disabled> <hr>`;
		} else {
			console.log("hei");
			comment.innerHTML = `<img src="./image/Anon.png" class="profileimg d-block ui-w-40 rounded-circle" alt="">  <p class="w-50 d-inline-block text-muted mx-3 p-1">${cmt.author.name}:<p/> <input class="form-control" type="text" placeholder="${cmt.body}" disabled> <hr>`;
		}
		
		commentList.appendChild(comment);
	})
	commentDiv.appendChild(commentList)
	const cardFooter = document.querySelector(".card-footer");
	cardFooter.appendChild(commentDiv);
}
const btn1 = document.querySelector(".react1");
const btn2 = document.querySelector(".react2");
const btn3 = document.querySelector(".react3");
console.log(btn1.innerHTML, btn2.innerHTML, btn3.innerHTML)

const reacturl = "https://api.noroff.dev/api/v1/social/posts/" + id + "/react/";
async function sendReact(emoji) {
	const accessToken = localStorage.getItem("accessToken");
	const res = await fetch(reacturl + emoji, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`, 
		},body: JSON.stringify(emoji),
		
	});
	console.log(reacturl+emoji);
	const data = await res.json();
	console.log(data);
}
btn1.addEventListener("click", () => {
	sendReact("🔥");
})
btn2.addEventListener("click", () => {
	sendReact("❤️");
})
btn3.addEventListener("click", () => {
	sendReact("👍");
})
const commentUrl = "https://api.noroff.dev/api/v1/social/posts/" + id + "/comment"
async function sendComment (commentInfo){
	const accessToken = localStorage.getItem("accessToken");
	const res = await fetch (commentUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(commentInfo),
	})
	const data = await res.json();
	console.log(data)
	location.reload()
}
const commentInput = document.querySelector("#commentinput");
const commentBtn = document.querySelector(".commentbtn");

commentBtn.addEventListener("click", () => {
	const commentInfo = {body: commentInput.value, replyTold:0}
	sendComment(commentInfo)
});
