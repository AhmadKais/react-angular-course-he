# פתרונות – שיעור 6: רשימת משימות (למורה)

---

## תרגיל 1 – מה יודפס?

```js
const a = [1, 2, 3];
const b = [...a, 4];
const c = [0, ...a];
console.log(a);                    // [1, 2, 3]  <- never changed
console.log(b);                    // [1, 2, 3, 4]
console.log(c);                    // [0, 1, 2, 3]
console.log([...a, ...b].length);  // 7  <- 3 + 4

const phone = { brand: "Samsung", year: 2023, color: "black" };
const newPhone = { ...phone, year: 2025 };
console.log(phone.year);           // 2023
console.log(newPhone.year);        // 2025
console.log(newPhone.color);       // black  <- copied from phone

const { brand, color } = phone;
console.log(`${brand} in ${color}`);   // Samsung in black

const [x, y] = ["first", "second", "third"];
console.log(y);                    // second  <- by position

const { model } = phone;
console.log(model);                // undefined  <- phone has no "model" key
```

---

## תרגיל 2 – מצאו את הבאגים

```js
// Fix 1: we replace the array (tasks = ...), so it must be let
let tasks = [
  { id: 1, text: "Buy milk", done: false },
  { id: 2, text: "Call grandma", done: false },
];

const deleteTask = (id) => {
  // Fix 2: keep every task whose id is DIFFERENT - === kept only the deleted one
  tasks = tasks.filter((task) => task.id !== id);
  render();
};

const toggleTask = (id) => {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      // Fix 3: ...task copies all the keys; "task" alone made a key called task
      return { ...task, done: !task.done };
    }
    // Fix 4: every other task must be returned as it is
    return task;
  });
  render();
};

// Fix 5: receive the event and stop the page from reloading
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  addTask(text);
});
```

> 💡 תלמידים חזקים ישימו לב לעוד שני שיפורים (לא נספרים כטעויות): אין בדיקה שהטקסט לא ריק, והתיבה לא מתרוקנת אחרי הוספה. כדאי לשבח מי שמצא.

---

## תרגיל 3 – סינון: הכול / פעילות / בוצעו

**HTML – מתחת לטופס:**

```html
<div class="filters">
  <button id="all-btn">All</button>
  <button id="active-btn">Active</button>
  <button id="done-btn">Done</button>
</div>
```

**CSS – תוספת:**

```css
.filters {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.filters button.active {
  background-color: #f97316;
}
```

**JavaScript – מה שהשתנה (הפעולות ו-`taskToHtml` – כמו בשיעור):**

```js
let filter = "all";

const allButton = document.getElementById("all-btn");
const activeButton = document.getElementById("active-btn");
const doneButton = document.getElementById("done-btn");

const render = () => {
  // Choose what to SHOW - tasks itself does not change
  let visible = tasks;
  if (filter === "active") {
    visible = tasks.filter((task) => !task.done);
  }
  if (filter === "done") {
    visible = tasks.filter((task) => task.done);
  }

  if (visible.length === 0) {
    taskList.innerHTML = "<p>Nothing to show</p>";
  } else {
    taskList.innerHTML = visible.map(taskToHtml).join("");
  }

  // The summary counts ALL the tasks
  const left = tasks.filter((task) => !task.done).length;
  summary.textContent = `${left} of ${tasks.length} tasks left`;

  allButton.className = filter === "all" ? "active" : "";
  activeButton.className = filter === "active" ? "active" : "";
  doneButton.className = filter === "done" ? "active" : "";
};

allButton.addEventListener("click", () => {
  filter = "all";
  render();
});

activeButton.addEventListener("click", () => {
  filter = "active";
  render();
});

doneButton.addEventListener("click", () => {
  filter = "done";
  render();
});
```

> 💡 הטעות הנפוצה: `tasks = tasks.filter(...)` בתוך `render` – ואז לחיצה על `Active` **מוחקת לתמיד** את המשימות שבוצעו. זה ההבדל החשוב בין **נתונים** (`tasks`) לבין **מה שמוצג** (`visible`).

---

## תרגיל 4 – רשימת קניות עם כמויות

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
    <form id="item-form">
      <input id="item-input" type="text" placeholder="Product name">
      <button type="submit">Add</button>
    </form>
    <ul id="item-list"></ul>
    <p id="total"></p>
    <script src="script.js"></script>
  </body>
</html>
```

**`script.js`:**

```js
let items = [
  { id: 1, name: "Milk", amount: 2 },
  { id: 2, name: "Bread", amount: 1 },
];

const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const total = document.getElementById("total");

const itemToHtml = (item) => {
  const { id, name, amount } = item;

  return `
    <li>
      ${name} × ${amount}
      <button onclick="changeAmount(${id}, 1)">+</button>
      <button onclick="changeAmount(${id}, -1)">-</button>
    </li>
  `;
};

const render = () => {
  itemList.innerHTML = items.map(itemToHtml).join("");

  let sum = 0;
  for (const item of items) {
    sum = sum + item.amount;
  }
  total.textContent = `Total items: ${sum}`;
};

// change = 1 for "+", -1 for "-"
const changeAmount = (id, change) => {
  items = items
    .map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount + change };
      }
      return item;
    })
    .filter((item) => item.amount > 0);
  render();
};

const addItem = (name) => {
  const exists = items.some((item) => item.name === name);

  if (exists) {
    // Bonus: the product is already in the list - just add 1
    items = items.map((item) => {
      if (item.name === name) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
  } else {
    items = [...items, { id: Date.now(), name: name, amount: 1 }];
  }
  render();
};

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = itemInput.value.trim();
  if (name === "") {
    return;
  }

  addItem(name);
  itemInput.value = "";
});

render();
```

> 💡 פונקציה אחת `changeAmount(id, change)` לשני הכפתורים – עם פרמטר שאומר בכמה לשנות. תלמידים שכתבו שתי פונקציות נפרדות (`increase` / `decrease`) – גם נכון.

---

## תרגיל 5 – המשימות לא נעלמות ברענון

**בתחילת `script.js` – במקום ההגדרה של `tasks`:**

```js
// 1. The data - from the drawer if something was saved, otherwise the defaults
let tasks = [
  { id: 1, text: "Learn HTML", done: true },
  { id: 2, text: "Learn CSS", done: true },
  { id: 3, text: "Learn JavaScript", done: false },
];

const saved = localStorage.getItem("tasks");
if (saved !== null) {
  tasks = JSON.parse(saved);
}
```

**בסוף `render`:**

```js
  // Every action calls render - so this saves after every change
  localStorage.setItem("tasks", JSON.stringify(tasks));
```

> 💡 כדאי להראות בכלי המפתחים (Application ← Local Storage) את הטקסט שנשמר – תלמידים מבינים את `JSON.stringify` הרבה יותר טוב כשהם **רואים** את המערך כטקסט.

---

## תרגיל 6 – מעקב הוצאות

```js
/*
  Planning:
  1. Data: an array of expenses. Each one: id, text, amount.
  2. Screen: a form (text + amount), a row for each expense with a delete button, the total.
  3. Actions: add an expense, delete an expense.
*/

let expenses = [];

const expenseForm = document.getElementById("expense-form");
const textInput = document.getElementById("text-input");
const amountInput = document.getElementById("amount-input");
const expenseList = document.getElementById("expense-list");
const totalText = document.getElementById("total");

const expenseToHtml = (expense) => {
  const { id, text, amount } = expense;

  return `
    <li class="${amount > 100 ? "expensive" : ""}">
      ${text} – ${amount} ₪
      <button onclick="deleteExpense(${id})">✕</button>
    </li>
  `;
};

const render = () => {
  expenseList.innerHTML = expenses.map(expenseToHtml).join("");

  let total = 0;
  for (const expense of expenses) {
    total = total + expense.amount;
  }
  totalText.textContent = `Total: ${total} ₪`;
};

const deleteExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
  render();
};

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = textInput.value.trim();
  const amount = Number(amountInput.value);

  if (text === "" || amount <= 0) {
    alert("Please write a description and an amount bigger than 0");
    return;
  }

  expenses = [...expenses, { id: Date.now(), text: text, amount: amount }];
  textInput.value = "";
  amountInput.value = "";
  render();
});

render();
```

**HTML:**

```html
<form id="expense-form">
  <input id="text-input" type="text" placeholder="What did you buy?">
  <input id="amount-input" type="number" placeholder="Amount">
  <button type="submit">Add</button>
</form>
<ul id="expense-list"></ul>
<p id="total"></p>
```

**CSS (בונוס):**

```css
.expensive {
  color: red;
}
```

> 💡 הטעות הנפוצה: לשכוח `Number(...)` – ואז `0 + "45" + "75"` נותן `04575`. זו המלכודת משיעור 3 (`"5" + "5"`), והזדמנות מצוינת להזכיר אותה.

**מחוון מוצע (100):** תכנון בהערה – 15 · הוספה עם טופס ו-`preventDefault` – 20 · מחיקה עם `filter` לפי `id` – 20 · סכום נכון (עם `Number`) – 20 · בדיקות קלט – 15 · בלי `push` – 10.
