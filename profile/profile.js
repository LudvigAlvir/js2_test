const API_BASE_URL = "https://api.noroff.dev";
const url = "https://api.noroff.dev/api/v1/social/profiles/";
let accessToken;
const displayedName = localStorage.getItem("username");
accessToken = localStorage.getItem("accessToken");
let newBannerImageUrl = "";

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
                <p>${userData.location}</p>
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


  editProfileButton.addEventListener("click", () => {
    const editProfileModal = document.getElementById("editProfileModal");
    editProfileModal.style.display = "block";
  
    const bannerImageInput = document.getElementById("bannerImageInput");
    const saveBannerButton = document.getElementById("saveBannerButton");
    const bannerImage = document.getElementById("bannerImage");
  
    saveBannerButton.addEventListener("click", () => {
      const newBannerImageUrl = bannerImageInput.value;
  

      bannerImage.src = newBannerImageUrl;
  
      editProfileModal.style.display = "none";
    });
  

    const closeModalButton = document.getElementById("closeModal");
    closeModalButton.addEventListener("click", () => {
      editProfileModal.style.display = "none";
    });
  });
  
  
  
  


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
}

fetchUserProfile();



/* 
Vise posts under brukeren 

kunne redigere en post 

kunne slette en post 
 */


