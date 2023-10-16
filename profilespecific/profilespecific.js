import {calculateHours, calculateMinutesAgo} from "../js/components/Timefunctions.js";
const API_BASE_URL = "https://api.noroff.dev";
const url = "https://api.noroff.dev/api/v1/social/profiles/";


const accessToken = localStorage.getItem("accessToken");
let newBannerImageUrl = "";
const container = document.querySelector(".container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("name");
const url2 = url + `${id + "/posts"}`;
console.log(id);


async function fetchUserProfile() {

  try {
    const response = await fetch(url + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const userData = await response.json();
	console.log(userData);

    updateProfile(userData);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

function updateProfile(userData) {
  const profileDiv = document.createElement("div");
  profileDiv.innerHTML = `
  <section class="h-100 gradient-custom-2">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-lg-9 col-xl-7">
          <div class="card">
            <div class="rounded-top text-white d-flex flex-row" style="background-color: #000; height: 220px">
              <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px">
                <img src="../media/unknown_picture.jpg" alt="unknown profile" class="img-fluid img-thumbnail mt-4 mb-2" style="width: 150px; z-index: 1" />
                <button type="button" id="editProfileButton" class="btn btn-outline-dark" data-mdb-ripple-color="dark" style="z-index: 1">
                  Edit profile
                </button>
              </div>
              <div class="ms-3" style="margin-top: 130px">
                <h5>${userData.name}</h5>
              </div>
            </div>
            <div class="p-4 text-black" style="background-color: #f8f9fa">
              <div class="follow-container">
                <button id="followButton" class="btn btn-primary">
                  Follow
                </button>
              </div>
              <div class="d-flex justify-content-end text-center py-1">
                <div>
                  <p class="mb-1 h5">${userData._count.posts}</p>
                  <p class="small mb-0">Posts</p>
                </div>
                <div class="px-3">
                  <p class="mb-1 h5">${userData._count.followers}</p>
                  <p class="small mb-0">Followers</p>
                </div>
                <div>
                  <p class="mb-1 h5">${userData._count.following}</p>
                  <p class="small mb-0">Following</p>
                </div>
              </div>
            </div>
            <div class="card-body p-4 text-black">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div id="profilePostsContainer" class="container d-flex flex-column min-vh-100">
  
  </div>

  


`;

  document.body.appendChild(profileDiv);


/*   Edit Profile code  */

  
 
  const bannerImage = document.getElementById("bannerImage");
  
  
  
  
  
  


    /* Follow button code  */

    const followButton = document.getElementById("followButton");

    followButton.addEventListener("click",  () => {
    followPut(userData)
  });
   fetchProfilePosts(id); 
}
async function followPut(userData){
	try {
		const isFollowing = Array.isArray(userData.following) && userData.following.some(profile => profile.name === displayedName);
		const unfollowUrl = `${API_BASE_URL}/v1//social/profiles/${userData.name}/unfollow`
		const followUrl = `${API_BASE_URL}/v1/social/profiles/${userData.name}/follow`;
		console.log(unfollowUrl, followUrl);
		console.log(isFollowing)
		function endpoint(){
			if(isFollowing === true){
				return unfollowUrl 

			} else {
				return followUrl
			}
		}
  
      
         console.log(endpoint())
	  
  
      const response = await fetch (endpoint(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }, body: "not empty", 
		
      });
	  const resdata = await response.json()
	  console.log(resdata);
	  
  
      if (isFollowing) {
        followButton.textContent = "Follow";
      } else {
        followButton.textContent = "Unfollow";
      }
    } catch (error) {
      console.error("Error following/unfollowing profile:", error);
    }
}

/* Profilespecific page posts code */
 async function fetchProfilePosts() {
  const profilePostsContainer = document.getElementById("profilePostsContainer");

  try {
    const response = await fetch(url2, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile posts");
    }

    const profilePostsData = await response.json();

    profilePostsData.forEach((post) => {
      const newTime = calculateHours(post);
      
      createProfilePostDiv(post, newTime, profilePostsContainer);
    });
  } catch (error) {
    console.error("Error fetching and displaying profile posts:", error);
  }
}

function createProfilePostDiv(post, newTime, profilePostsContainer) {
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
  "rounded");

  postDiv.innerHTML = `
    <p class="fw-lighter">${newTime}</p>
    <a href="../specific/index.html?id=${post.id}">
      <img class="card-img-top object-fit-fill rounded" src="${post.media}" alt="${post.title}">
    </a>
    <div class="card-body w-100">
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">${post.body}</p>
      <p class="card-text">Tags: ${post.tags.join(', ')}</p>
    </div>
  `;

  profilePostsContainer.appendChild(postDiv);
}

fetchUserProfile();

