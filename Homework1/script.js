const fetchBtn = document.getElementById("fetchBtn");
const fetchResult = document.getElementById("fetchResult");

function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
      return response.json();
    })
    .then(function (parsedResult) {
      fetchResult.style.display = "block";
      fetchResult.innerHTML = "";

      for (const user of parsedResult) {
        fetchResult.innerHTML += `
              <p><strong>Name:</strong> ${user.name}</p>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
              <p><strong>Phone:</strong> ${user.phone}</p>
              <hr>
            `;
      }
    })
    .catch(function (error) {
      console.error("An error occurred:", error);
      fetchResult.innerHTML = `<p>Failed to load user data. Please try again later.</p>`;
    });
}

fetchBtn.addEventListener("click", function () {
  fetchUsers();
});
