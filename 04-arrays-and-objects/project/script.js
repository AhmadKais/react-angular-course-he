// 1. The data - everything about the person, in one object
const person = {
  name: "Dana Cohen",
  role: "Web Developer",
  city: "Yarka",
  email: "dana@example.com",
  skills: ["HTML", "CSS", "JavaScript"],
};

// 2. Find the elements on the page
const nameTitle = document.getElementById("name");
const roleTitle = document.getElementById("role");
const aboutText = document.getElementById("about");
const emailLink = document.getElementById("email-link");
const skillsList = document.getElementById("skills-list");
const skillsCount = document.getElementById("skills-count");
const skillInput = document.getElementById("skill-input");
const addButton = document.getElementById("add-btn");

// 3. Fill the card with the person's details
nameTitle.textContent = person.name;
roleTitle.textContent = person.role;
aboutText.textContent = `I live in ${person.city} and I love building websites.`;
emailLink.textContent = person.email;
emailLink.href = `mailto:${person.email}`;

// 4. Draw the skills list from the array
function showSkills() {
  skillsList.innerHTML = "";

  for (const skill of person.skills) {
    skillsList.innerHTML += `<li>${skill}</li>`;
  }

  skillsCount.textContent = person.skills.length;
}

// 5. Add a new skill from the input
function addSkill() {
  const newSkill = skillInput.value;

  if (newSkill === "") {
    alert("Please write a skill first");
    return;
  }

  person.skills.push(newSkill);
  skillInput.value = "";
  showSkills();
}

// 6. Connect the button, and draw the list for the first time
addButton.addEventListener("click", addSkill);
showSkills();
