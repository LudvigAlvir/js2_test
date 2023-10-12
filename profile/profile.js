import {calculateHours, calculateMinutesAgo} from "../js/components/Timefunctions.js";
const API_BASE_URL = "https://api.noroff.dev";
const url = "https://api.noroff.dev/api/v1/social/profiles/";
let accessToken;
const displayedName = localStorage.getItem("username");
accessToken = localStorage.getItem("accessToken");
let newBannerImageUrl = "";
const url2 = url + `${displayedName + "/posts"}`;


async function fetchUserProfile() {

  try {
    const response = await fetch(url + displayedName, {
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

  <div id="editProfileModal" class="modal">
  <div class="modal-content">
    <span id="closeModal" class="close">&times;</span>
    <h2>Edit Profile</h2>
    <label for="bannerImageInput">New Banner Image URL:</label>
    <input type="text" id="bannerImageInput" name="bannerImageInput" placeholder="Enter new banner image URL">
    <button id="saveBannerButton">Save Banner Image</button>
    <img id="bannerImage" src="${newBannerImageUrl}" alt="Banner Image">
  </div>
</div>


`;

  document.body.appendChild(profileDiv);


/*   Edit Profile code  */

  const editProfileButton = document.getElementById("editProfileButton");
  const editProfileModal = document.getElementById("editProfileModal");
  const bannerImageInput = document.getElementById("bannerImageInput");
  const saveBannerButton = document.getElementById("saveBannerButton");
  const bannerImage = document.getElementById("bannerImage");
  const closeModalButton = document.getElementById("closeModal");
  
  saveBannerButton.addEventListener("click", async () => {
    const newBannerImageUrl = bannerImageInput.value;
  
    try {
      const response = await fetch(`${API_BASE_URL}/social/profiles/${displayedName}/media`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ avatar: newBannerImageUrl }),
      });
  
      if (response.ok) {
        bannerImage.src = newBannerImageUrl;
        editProfileModal.style.display = "none";
      } else {
        console.error("Failed to update banner image");
      }
    } catch (error) {
      console.error("Error updating banner image:", error);
    }
  });
  
  editProfileButton.addEventListener("click", () => {
    editProfileModal.style.display = "block";
  });
  
  closeModalButton.addEventListener("click", () => {
    editProfileModal.style.display = "none";
  });
  


    /* Follow button code  */

    const followButton = document.getElementById("followButton");

    followButton.addEventListener("click", async () => {
    try {
      const isFollowing = Array.isArray(userData.following) && userData.following.some(profile => profile.name === displayedName);
  
      const endpoint = isFollowing
        ? `${API_BASE_URL}/social/profiles/${userData.name}/unfollow`
        : `${API_BASE_URL}/social/profiles/${userData.name}/follow`;
  
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to follow/unfollow profile");
      }
  
      if (isFollowing) {
        followButton.textContent = "Follow";
      } else {
        followButton.textContent = "Unfollow";
      }
    } catch (error) {
      console.error("Error following/unfollowing profile:", error);
    }
  });
   fetchProfilePosts(displayedName); 
}

/* Profile page posts code */
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
      if (!post.media) {
        return;
      }
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
    <div>
      <button id="editpost" class="btn btn-info">Edit post</button>
      <button id="deletepost" class="btn btn-danger">Delete post</button>
    </div>
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

