# פתרונות – שיעור 5: פונקציות חץ, `map` ו-`filter` (למורה)

---

## תרגיל 1 – מפונקציה רגילה לפונקציית חץ

```js
const half = (n) => n / 2;
const isEven = (n) => n % 2 === 0;
const welcome = (name, city) => `Welcome ${name} from ${city}!`;

// Two lines inside - so we need { } and return
const priceWithVat = (price) => {
  const vat = price * 0.18;
  return price + vat;
};

console.log(half(10));                  // 5
console.log(isEven(7));                 // false
console.log(welcome("Dana", "Yarka"));  // Welcome Dana from Yarka!
console.log(priceWithVat(100));         // 118
```

**תשובה:** את `priceWithVat` – יש בה **שתי** הוראות (יצירת המשתנה `vat` ואז `return`), והגרסה הקצרה מתאימה רק לביטוי אחד שמוחזר.
**בונוס:** מוותרים על המשתנה: `const priceWithVat = (price) => price + price * 0.18;` (או `price * 1.18`).

---

## תרגיל 2 – מה יודפס?

```js
const numbers = [3, 8, 12, 5, 20];

console.log(numbers.map((n) => n * 10));      // [30, 80, 120, 50, 200]
console.log(numbers.filter((n) => n > 6));    // [8, 12, 20]
console.log(numbers.filter((n) => n > 100));  // []  <- nobody passed: an empty array
console.log(numbers.map((n) => n > 6));       // [false, true, true, false, true]
console.log(numbers.length);                  // 5   <- map and filter did not change it

const label = numbers.length > 3 ? "long" : "short";
console.log(label);                           // long

let isOpen = true;
isOpen = !isOpen;
console.log(isOpen);                          // false

console.log(["a", "b", "c"].join(""));        // abc
console.log(["a", "b", "c"].join(" - "));     // a - b - c
console.log("Hello World".toLowerCase().includes("world"));   // true
```

> 💡 השורה הכי מלמדת היא `numbers.map((n) => n > 6)`: תלמידים מצפים ל-`[8, 12, 20]`. זו הזדמנות להדגיש – `map` **תמיד** מחזירה מערך באותו אורך, עם **מה שהפונקציה החזירה**, וכאן היא החזירה `true`/`false`.

---

## תרגיל 3 – מצאו את הבאגים

```js
const fruits = [
  { name: "Apple", price: 5 },
  { name: "Mango", price: 15 },
  { name: "Banana", price: 8 },
];

const fruitsList = document.getElementById("fruits-list");

// Fix 1: with { } we must write return (or remove the { })
const fruitToHtml = (fruit) => {
  return `<li>${fruit.name} - ${fruit.price}</li>`;
};

// Fix 2: "up to 10" includes 10 - so <= and not <
const cheap = fruits.filter((fruit) => fruit.price <= 10);

// Fix 3: deleted the line "fruits.filter(...)" - filter returns a NEW array,
// and nobody saved it, so the line did nothing

// Fix 4: map returns an array - join("") glues it without commas
fruitsList.innerHTML = cheap.map(fruitToHtml).join("");
```

**התוצאה בדף:** `Apple - 5` ו-`Banana - 8`.

> 💡 לגבי טעות 3: תלמיד שכתב את השורה הזאת כנראה חשב ש-`filter` משנה את `fruits`. כדאי לשאול אותו בכיתה: "מה **בדיוק** השורה הזאת עשתה?" – ולהריץ `console.log(fruits)` אחריה.

---

## תרגיל 4 – כיתה עם `map` ו-`filter`

```js
const students = [
  { name: "Dana", grade: 95 },
  { name: "Omar", grade: 48 },
  { name: "Rana", grade: 74 },
  { name: "Yousef", grade: 55 },
  { name: "Lina", grade: 88 },
];

// 1
const names = students.map((student) => student.name);
console.log(names);   // ["Dana", "Omar", "Rana", "Yousef", "Lina"]

// 2
const passed = students.filter((student) => student.grade >= 56);
console.log(passed.length);   // 3

// 3
const passedNames = passed.map((student) => student.name).join(", ");
console.log(passedNames);   // Dana, Rana, Lina

// 4
const studentsList = document.getElementById("students-list");
studentsList.innerHTML = students
  .map((student) => `<li>${student.name} - ${student.grade} ${student.grade >= 56 ? "✅" : "❌"}</li>`)
  .join("");
```

(ב-HTML: `<ul id="students-list"></ul>`.)

> 💡 בסעיף 4 כתבנו `.map(...)` ו-`.join("")` בשורות נפרדות – זה עדיין ביטוי אחד, רק מסודר לקריאה. כדאי להראות לתלמידים שזה מותר.

---

## תרגיל 5 – חנות קטנה

**`index.html`:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Mini Shop</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Mini Shop</h1>
    <input id="search-input" type="text" placeholder="Search a product...">
    <button id="stock-btn">In stock only</button>
    <p id="count-text"></p>
    <div id="products" class="products"></div>
    <script src="script.js"></script>
  </body>
</html>
```

**`style.css`:**

```css
body {
  font-family: Arial, sans-serif;
  text-align: center;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.product {
  width: 180px;
  padding: 15px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
}

.in-stock {
  color: green;
}

.sold-out {
  color: red;
}
```

**`script.js`:**

```js
const products = [
  { id: 1, name: "Laptop", price: 3500, inStock: true },
  { id: 2, name: "Mouse", price: 80, inStock: true },
  { id: 3, name: "Screen", price: 900, inStock: false },
  { id: 4, name: "Keyboard", price: 250, inStock: true },
  { id: 5, name: "Headphones", price: 400, inStock: false },
];

let searchText = "";
let stockOnly = false;

const productsBox = document.getElementById("products");
const countText = document.getElementById("count-text");
const searchInput = document.getElementById("search-input");
const stockButton = document.getElementById("stock-btn");

const productToHtml = (product) => `
  <div class="product">
    <h2>${product.name}</h2>
    <p>${product.price} ₪</p>
    <p class="${product.inStock ? "in-stock" : "sold-out"}">
      ${product.inStock ? "In stock" : "Sold out"}
    </p>
  </div>
`;

const render = () => {
  let visible = products.filter((product) => product.name.toLowerCase().includes(searchText));

  if (stockOnly) {
    visible = visible.filter((product) => product.inStock);
  }

  if (visible.length === 0) {
    productsBox.innerHTML = "<p>No products found</p>";
  } else {
    productsBox.innerHTML = visible.map(productToHtml).join("");
  }

  countText.textContent = `Showing ${visible.length} of ${products.length} products`;
  stockButton.textContent = stockOnly ? "Show all" : "In stock only";
};

searchInput.addEventListener("input", () => {
  searchText = searchInput.value.toLowerCase();
  render();
});

stockButton.addEventListener("click", () => {
  stockOnly = !stockOnly;
  render();
});

render();
```

**מחוון מוצע (100):** הנתונים במערך, הכרטיסים נבנים עם `map` + `join` – 30 · תווית בצבע לפי טרנרי – 15 · חיפוש שעובד בכל הקלדה ולא תלוי באותיות גדולות/קטנות – 20 · כפתור סינון שמתחלף – 20 · שורת ספירה והודעת "אין תוצאות" – 15.

---

## תרגיל 6 – קטלוג עם סינון לפי מחיר

**HTML – במקום הכפתור האחד:**

```html
<div class="controls">
  <input id="search-input" type="text" placeholder="Search a course or teacher...">
  <button id="all-btn">All</button>
  <button id="free-btn">Free</button>
  <button id="paid-btn">Paid</button>
</div>
<p id="count-text"></p>
<div id="courses" class="courses"></div>
<p id="hours-text"></p>
```

**CSS – תוספת:**

```css
button.active {
  background-color: #f97316;
}
```

**`script.js` – החלקים שהשתנו (הנתונים ו-`courseToHtml` – כמו בשיעור):**

```js
let searchText = "";
let priceFilter = "all";

const coursesBox = document.getElementById("courses");
const countText = document.getElementById("count-text");
const hoursText = document.getElementById("hours-text");
const searchInput = document.getElementById("search-input");
const allButton = document.getElementById("all-btn");
const freeButton = document.getElementById("free-btn");
const paidButton = document.getElementById("paid-btn");

const render = () => {
  // 1. Search in the title OR the teacher's name
  let visible = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchText) ||
      course.teacher.toLowerCase().includes(searchText)
  );

  // 2. Filter by price
  if (priceFilter === "free") {
    visible = visible.filter((course) => course.free);
  }
  if (priceFilter === "paid") {
    visible = visible.filter((course) => !course.free);
  }

  if (visible.length === 0) {
    coursesBox.innerHTML = "<p>No courses found</p>";
  } else {
    coursesBox.innerHTML = visible.map(courseToHtml).join("");
  }

  countText.textContent = `Showing ${visible.length} of ${courses.length} courses`;

  // 3. Mark the chosen button
  allButton.className = priceFilter === "all" ? "active" : "";
  freeButton.className = priceFilter === "free" ? "active" : "";
  paidButton.className = priceFilter === "paid" ? "active" : "";

  // 4. Bonus - total hours of the visible courses
  let totalHours = 0;
  for (const course of visible) {
    totalHours = totalHours + course.hours;
  }
  hoursText.textContent = `Total hours: ${totalHours}`;
};

searchInput.addEventListener("input", () => {
  searchText = searchInput.value.toLowerCase();
  render();
});

allButton.addEventListener("click", () => {
  priceFilter = "all";
  render();
});

freeButton.addEventListener("click", () => {
  priceFilter = "free";
  render();
});

paidButton.addEventListener("click", () => {
  priceFilter = "paid";
  render();
});

render();
```

**בדיקה:** בטעינה – `Total hours: 250`. `Free` – שני קורסים ו-`70`. `Paid` – שלושה קורסים ו-`180`. חיפוש `ahmad` – שני קורסים (Python ו-React and Angular).

> 💡 למי שחקר את `reduce`: `const totalHours = visible.reduce((sum, course) => sum + course.hours, 0);` – לא חובה בשלב הזה.
