// 1. Find the elements on the page
const likeButton = document.getElementById("like-btn");
const likeCount = document.getElementById("like-count");
const themeButton = document.getElementById("theme-btn");

// 2. The data
let likes = 0;

// 3. What happens when someone clicks "Like"
function addLike() {
  likes = likes + 1;
  likeCount.textContent = likes;

  if (likes === 10) {
    alert("Wow! 10 likes!");
  }
}

// 4. Dark mode on / off
function toggleTheme() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeButton.textContent = "Light mode";
  } else {
    themeButton.textContent = "Dark mode";
  }
}

// 5. Connect each button to its function
likeButton.addEventListener("click", addLike);
themeButton.addEventListener("click", toggleTheme);
