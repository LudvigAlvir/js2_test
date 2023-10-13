import {calculateHours, calculateMinutesAgo} from "../js/components/Timefunctions.js";
const container = document.querySelector(".container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const name = params.get("name");
const url = "https://api.noroff.dev/api/v1/social/profiles/" + name + "/posts";

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