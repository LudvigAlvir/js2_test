const API_BASE_URL = "https://api.noroff.dev";
const url = "https://api.noroff.dev/api/v1/social/profiles/";

async function fetchUserProfile() {
    const displayedName = localStorage.getItem("username")
    const accessToken = localStorage.getItem("accessToken");

    console.log(`${API_BASE_URL}/social/profiles/posts`);
    console.log(displayedName)
    console.log(accessToken);
    console.log(url+displayedName)

    try {
      const response = await fetch(url + displayedName, {
        method: "get",
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
  
      updateProfileSection(userData);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };




  function updateProfileSection(userData) {
    document.querySelector(".ms-3 h5").textContent = userData.name;
  
    const avatarImg = document.querySelector(".img-fluid.img-thumbnail");
    avatarImg.src = userData.avatar;

    document.querySelector(".mb-1.h5").textContent = userData.posts.length;
    document.querySelectorAll(".small.mb-0")[0].textContent = userData._count.followers;
    document.querySelectorAll(".small.mb-0")[1].textContent = userData._count.following;
  }

const profileDiv = document.createElement("div");
profileDiv.innerHTML += `

<section class="h-100 gradient-custom-2">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-lg-9 col-xl-7">
            <div class="card">
              <div
                class="rounded-top text-white d-flex flex-row"
                style="background-color: #000; height: 200px"
              >
                <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px">
                  <img
                    src="${this.avatarImg}"
                    alt=""
                    class="img-fluid img-thumbnail mt-4 mb-2"
                    style="width: 150px; z-index: 1"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-dark"
                    data-mdb-ripple-color="dark"
                    style="z-index: 1"
                  >
                    Edit profile
                  </button>
                </div>
                <div class="ms-3" style="margin-top: 130px">
                  <h5>${this.name}</h5>
                  <p>${this.location}</p>
                </div>
              </div>
              <div class="p-4 text-black" style="background-color: #f8f9fa">
                <div class="d-flex justify-content-end text-center py-1">
                  <div>
                    <p class="mb-1 h5">253</p>
                    <p class="small mb-0">${this.posts}</p>
                  </div>
                  <div class="px-3">
                    <p class="mb-1 h5">1026</p>
                    <p class="small mb-0">${this._followers}</p>
                  </div>
                  <div>
                    <p class="mb-1 h5">478</p>
                    <p class="small mb-0">${this._following}</p>
                  </div>
                </div>
              </div>
              <div class="card-body p-4 text-black">
                <!--  <div class="mb-5">
                  <p class="lead text-white fw-normal mb-1">About</p>
                  <div class="p-4" style="background-color: #f8f9fa">
                    <p class="font-italic mb-1">Web Developer</p>
                    <p class="font-italic mb-1">Fellow Pokemon Enjoyer</p>
                    <p class="font-italic mb-0">Lives in Bergen, Norway</p>
                  </div>
                </div> -->
                <div
                  class="d-flex justify-content-between align-items-center mb-4"
                >
                  <p class="text-white lead fw-normal mb-0">Recent posts</p>
                  <p class="mb-0">
                    <a href="#!" class="text-muted">Show all</a>
                  </p>
                </div>
                <div class="row g-2">
                  <div class="col mb-2">
                    <img
                      src=""
                      alt=""
                      class="w-100 rounded-3"
                    />
                  </div>
                  <div class="col mb-2">
                    <img
                      src=""
                      alt=""
                      class="w-100 rounded-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

fetchUserProfile();