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
	console.log(obj._count.comments)
	comments.innerHTML = obj._count.comments
	obj.comments.forEach((cmt)=>{
		const comment = document.createElement("li");
		comment.innerHTML = cmt.author.name + ":"+ cmt.body + "<hr>";
		commentList.appendChild(comment);
	})
	commentDiv.appendChild(commentList)
	const cardFooter = document.querySelector(".card-footer");
	cardFooter.appendChild(commentDiv);
}