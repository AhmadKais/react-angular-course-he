// 1. The data - an array of course objects
const courses = [
  { id: 1, title: "Python for Beginners", teacher: "Ahmad", hours: 40, free: true },
  { id: 2, title: "Web Development", teacher: "Rana", hours: 60, free: false },
  { id: 3, title: "Cyber Security", teacher: "Omar", hours: 50, free: false },
  { id: 4, title: "Databases and SQL", teacher: "Dana", hours: 30, free: true },
  { id: 5, title: "React and Angular", teacher: "Ahmad", hours: 70, free: false },
];

// 2. What the user chose (it changes while using the page)
let searchText = "";
let freeOnly = false;

// 3. Find the elements on the page
const coursesBox = document.getElementById("courses");
const countText = document.getElementById("count-text");
const searchInput = document.getElementById("search-input");
const freeButton = document.getElementById("free-btn");

// 4. Turn ONE course object into the HTML of one card
const courseToHtml = (course) => `
  <div class="course">
    <h2>${course.title}</h2>
    <p>Teacher: ${course.teacher}</p>
    <p>${course.hours} hours</p>
    <span class="badge ${course.free ? "free" : "paid"}">
      ${course.free ? "Free" : "Paid"}
    </span>
  </div>
`;

// 5. Draw the page from the data
const render = () => {
  // Keep only the courses that match what the user chose
  let visible = courses.filter((course) => course.title.toLowerCase().includes(searchText));

  if (freeOnly) {
    visible = visible.filter((course) => course.free);
  }

  if (visible.length === 0) {
    coursesBox.innerHTML = "<p>No courses found</p>";
  } else {
    coursesBox.innerHTML = visible.map(courseToHtml).join("");
  }

  countText.textContent = `Showing ${visible.length} of ${courses.length} courses`;
  freeButton.textContent = freeOnly ? "Show all" : "Free only";
};

// 6. Events: change the data, then draw again
searchInput.addEventListener("input", () => {
  searchText = searchInput.value.toLowerCase();
  render();
});

freeButton.addEventListener("click", () => {
  freeOnly = !freeOnly;
  render();
});

// 7. Draw for the first time
render();
