# פתרונות – שיעור 4: מערכים, לולאות ואובייקטים (למורה)

---

## תרגיל 1 – רשימת קניות

```js
const shoppingList = ["Milk", "Bread", "Eggs", "Apples"];

console.log(shoppingList[0]);        // Milk
console.log(shoppingList[2]);        // Eggs
console.log(shoppingList.length);    // 4

shoppingList.push("Cheese");
shoppingList.push("Rice");

for (const item of shoppingList) {
  console.log(`- ${item}`);
}

// Bonus: the last item is always in place length - 1
console.log(shoppingList[shoppingList.length - 1]);   // Rice
```

---

## תרגיל 2 – מה יודפס?

```js
const numbers = [4, 8, 15, 16];
console.log(numbers[0]);        // 4
console.log(numbers[4]);        // undefined  <- only places 0-3 exist
console.log(numbers.length);    // 4
numbers.push(23);
console.log(numbers.length);    // 5

const pet = { name: "Luna", type: "cat", age: 3 };
console.log(pet.name);                        // Luna
console.log(`${pet.name} is a ${pet.type}`);  // Luna is a cat
pet.age = pet.age + 1;
console.log(pet.age);                         // 4
console.log(pet.color);                       // undefined  <- no such key

let total = 0;
for (const number of numbers) {
  total = total + number;
}
console.log(total);             // 66  <- 4 + 8 + 15 + 16 + 23
```

> 💡 הטעות הנפוצה: `total` יוצא `43` – תלמידים שוכחים שה-`23` נוסף למערך **לפני** הלולאה.

---

## תרגיל 3 – מצאו את הבאגים

```js
const user = {
  name: "Omar", // Fix 1: missing comma between the two keys
  movies: ["Toy Story", "Frozen", "Cars"],
};

const title = document.getElementById("title");
const moviesList = document.getElementById("movies-list");

// Fix 2: ${} works only inside backticks, not inside "quotes"
title.textContent = `${user.name}'s favorite movies`;

// Fix 3: there is no variable called movies - the array is inside the object
for (const movie of user.movies) {
  // Fix 4: += adds to the list; = replaced it, so only the last movie stayed
  moviesList.innerHTML += `<li>${movie}</li>`;
}

// Fix 5: 3 movies are in places 0, 1, 2 - the last one is length - 1
console.log(user.movies[user.movies.length - 1]);
```

> 💡 גם `user.movies[2]` מתקבל כתשובה נכונה לטעות 5.

---

## תרגיל 4 – כיתה בקונסול

```js
const students = [
  { name: "Dana", grade: 95 },
  { name: "Omar", grade: 48 },
  { name: "Rana", grade: 74 },
  { name: "Yousef", grade: 55 },
  { name: "Lina", grade: 88 },
];

let sum = 0;
let best = students[0];

for (const student of students) {
  if (student.grade >= 56) {
    console.log(`${student.name}: ${student.grade} - Passed`);
  } else {
    console.log(`${student.name}: ${student.grade} - Failed`);
  }

  sum = sum + student.grade;

  // Bonus
  if (student.grade > best.grade) {
    best = student;
  }
}

console.log(`Average: ${sum / students.length}`);
console.log(`Best: ${best.name} with ${best.grade}`);
```

**פלט:**

```text
Dana: 95 - Passed
Omar: 48 - Failed
Rana: 74 - Passed
Yousef: 55 - Failed
Lina: 88 - Passed
Average: 72
Best: Dana with 95
```

---

## תרגיל 5 – רשימת קניות בדף

**`index.html`:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Shopping list</title>
  </head>
  <body>
    <h1>Shopping list</h1>
    <p>Items: <span id="count">0</span></p>
    <input id="item-input" type="text" placeholder="What to buy?">
    <button id="add-btn">Add</button>
    <button id="clear-btn">Clear all</button>
    <ul id="list"></ul>
    <script src="script.js"></script>
  </body>
</html>
```

**`script.js`:**

```js
const items = [];

const list = document.getElementById("list");
const count = document.getElementById("count");
const itemInput = document.getElementById("item-input");
const addButton = document.getElementById("add-btn");
const clearButton = document.getElementById("clear-btn");

function showItems() {
  list.innerHTML = "";

  for (const item of items) {
    list.innerHTML += `<li>${item}</li>`;
  }

  count.textContent = items.length;
}

function addItem() {
  const newItem = itemInput.value;

  if (newItem === "") {
    return;
  }

  items.push(newItem);
  itemInput.value = "";
  showItems();
}

function clearAll() {
  items.length = 0;
  showItems();
}

addButton.addEventListener("click", addItem);
clearButton.addEventListener("click", clearAll);
showItems();
```

> 💡 תלמידים רבים ינסו `items = [];` ב-`clearAll` ויקבלו `Assignment to constant variable`. שתי תשובות נכונות: `items.length = 0;` (כמו ברמז), או להגדיר את המערך עם `let`.

---

## תרגיל 6 – הכרטיס החכם שלכם

הבסיס – כמו ב-[`project/script.js`](project/script.js). הפתרון לשאלה למחשבה – פונקציה אחת לשתי הרשימות:

**HTML (החלק של הרשימות):**

```html
<h3>My skills (<span id="skills-count">0</span>)</h3>
<ul class="skills" id="skills-list"></ul>
<div class="add-skill">
  <input id="skill-input" type="text" placeholder="New skill...">
  <button id="add-skill-btn">Add</button>
</div>

<h3>My hobbies (<span id="hobbies-count">0</span>)</h3>
<ul class="skills" id="hobbies-list"></ul>
<div class="add-skill">
  <input id="hobby-input" type="text" placeholder="New hobby...">
  <button id="add-hobby-btn">Add</button>
</div>
```

**`script.js` (החלק של הרשימות):**

```js
const person = {
  name: "Omar Halabi",
  skills: ["HTML", "CSS"],
  hobbies: ["Football", "Drawing"],
};

const skillsList = document.getElementById("skills-list");
const skillsCount = document.getElementById("skills-count");
const skillInput = document.getElementById("skill-input");
const hobbiesList = document.getElementById("hobbies-list");
const hobbiesCount = document.getElementById("hobbies-count");
const hobbyInput = document.getElementById("hobby-input");

// One function draws ANY list: which array, and where to draw it
function showList(array, listElement, countElement) {
  listElement.innerHTML = "";

  for (const item of array) {
    listElement.innerHTML += `<li>${item}</li>`;
  }

  countElement.textContent = array.length;
}

function addSkill() {
  if (skillInput.value === "") {
    return;
  }
  person.skills.push(skillInput.value);
  skillInput.value = "";
  showList(person.skills, skillsList, skillsCount);
}

function addHobby() {
  if (hobbyInput.value === "") {
    return;
  }
  person.hobbies.push(hobbyInput.value);
  hobbyInput.value = "";
  showList(person.hobbies, hobbiesList, hobbiesCount);
}

document.getElementById("add-skill-btn").addEventListener("click", addSkill);
document.getElementById("add-hobby-btn").addEventListener("click", addHobby);

showList(person.skills, skillsList, skillsCount);
showList(person.hobbies, hobbiesList, hobbiesCount);
```

> 💡 שימו לב שה-`ul` של התחביבים מקבל את אותה מחלקה `skills` – כך הוא מקבל את עיצוב ה"גלולות" בלי CSS חדש. כדאי להזכיר את זה בכיתה: מחלקה היא "עיצוב לשימוש חוזר".

**מחוון מוצע (100):** כל הנתונים באובייקט אחד – 20 · HTML שלד ריק שמתמלא מ-JavaScript – 20 · שתי רשימות שעובדות עם הוספה ומונה – 30 · אין הוספה של פריט ריק – 10 · פונקציה משותפת (`showList`) – 20.
