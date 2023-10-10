const userName = document.querySelector("#uname");
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password-input");
const submit = document.querySelector("#sumbit")
const form = document.querySelector("#form");


const API_BASE_URL = 'https://api.noroff.dev';

async function registerUser(url, data) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
  window.location.href = "../index.html";
}

form.addEventListener("submit", (e)=>{
    e.preventDefault(); 
    console.log(userPassword.value)
    const user = {
        name: `${userName.value}`,
        email: `${userEmail.value}`,
        password: `${userPassword.value}` 
    }
    registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user);
<<<<<<< HEAD
=======
    
});
>>>>>>> de0b86f212c0f84c1e4f82e92503357b20812d4d
    
});







