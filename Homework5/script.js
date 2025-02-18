const html = {
  loginForm: document.getElementById("login-form"),
  registerForm: document.getElementById("register-form"),
  messageDiv: document.getElementById("message"),
  logoutBtn: document.getElementById("logout-btn"),
  registerLink: document.getElementById("register-link"),
  main: document.getElementById("main"),
  backBtn: document.getElementById("backBtn"),
};

function generateID() {
  return Date.now();
}

function setLoggedInUser(user) {
  localStorage.setItem("loggedUser", JSON.stringify(user));
}

function getLoggedInUser() {
  const user = localStorage.getItem("loggedUser");
  return user ? JSON.parse(user) : null;
}

function logout() {
  localStorage.removeItem("loggedUser");
}

function setRegistreredUsers(users) {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

function getRegisteredUsers() {
  const users = localStorage.getItem("registeredUsers");
  return users ? JSON.parse(users) : {};
}

class User {
  constructor(firstname, lastname, email, password) {
    this.id = generateID();
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
}

function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getRegisteredUsers();
      const userFound = users[email];

      if (!userFound || userFound.password !== password) {
        reject({ message: "Invalid email or password" });
        return;
      }

      resolve(userFound);
    }, 1000);
  });
}

function registerUser(firstname, lastname, email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!firstname || !lastname || !email || !password) {
        reject({ message: "All fields are required" });
        return;
      }

      const users = getRegisteredUsers();

      const userExists = users[email];
      if (userExists) {
        reject({ message: `User with the email: ${email} already exists.` });
        return;
      }

      const newUser = new User(firstname, lastname, email, password);

      users[email] = newUser;

      setRegistreredUsers(users);
      resolve({ message: "Registration successful! Please log in." });
    }, 1000);
  });
}

function showLoginHideRegister() {
  html.registerForm.style.display = "none";
  html.loginForm.style.display = "block";
  html.backBtn.style.display = "none";
}

function toggleLoginAndMain() {
  html.loginForm.style.display = "none";
  html.main.style.display = "flex";
}

html.backBtn.addEventListener("click", () => {
  showLoginHideRegister();
});

function displayMessage(message, isError = false) {
  html.messageDiv.style.display = "block";
  html.messageDiv.textContent = message;
  html.messageDiv.classList.add(isError ? "error" : "success");

  setTimeout(() => {
    html.messageDiv.textContent = "";
    html.messageDiv.style.display = "none";
    html.messageDiv.classList.remove("error", "success");
  }, 2000);
}

(() => {
  const loggedInUser = getLoggedInUser();
  if (loggedInUser) {
    toggleLoginAndMain();
  }

  html.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;
    try {
      const result = await loginUser(loginEmail, loginPassword);
      toggleLoginAndMain();
      setLoggedInUser(result);
      displayMessage(`Welcome back ${result.firstname}!`);
      html.loginForm.reset();
    } catch (error) {
      displayMessage(error.message, true);
    }
  });

  html.registerLink.addEventListener("click", () => {
    html.loginForm.style.display = "none";
    html.registerForm.style.display = "block";
    html.backBtn.style.display = "block";
  });

  html.registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const firstname = document.getElementById("register-firstname").value;
    const lastname = document.getElementById("register-lastname").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    try {
      const result = await registerUser(firstname, lastname, email, password);
      displayMessage(result.message);
      showLoginHideRegister();
      html.registerForm.reset();
    } catch (error) {
      displayMessage(error.message, true);
    }
  });

  html.logoutBtn.addEventListener("click", () => {
    logout();
    html.loginForm.style.display = "block";
    html.main.style.display = "none";

    displayMessage("Logged out successfully!");
  });
})();
