// login.js
const API_BASE_URL = "https://api.noroff.dev"
const form = document.getElementById("form");
const usernameInput = document.getElementById("uname");
const passwordInput = document.getElementById("password-input");

document.addEventListener('DOMContentLoaded', () => {

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        const userLogin = {
            email: username,
            password: password,
        };

        try {
            const accessToken = await loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, userLogin);
            localStorage.setItem('accessToken', accessToken.accessToken);

            window.location.href = "../profile/index.html";

        } catch (error) {
            console.error(error);
        }
    });
});

async function loginUser(url, data) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             email: usernameInput.value,
             password: passwordInput.value,
             token: localStorage.getItem("token") || [], })

        };

        const response = await fetch(url, postData);
        const json = await response.json();
        console.log(response);
        if (response.status === 200) {
            return json; 
            
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        throw error;
    }
}
