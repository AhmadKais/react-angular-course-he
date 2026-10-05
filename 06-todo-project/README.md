# שיעור 6 – פרויקט מסכם: רשימת משימות (To-Do List)

> **מה צריך לדעת לפני?** את שיעורים 1–5, ובעיקר את שיעור 5: פונקציות חץ, `map`, `filter`, טרנרי, ושיטת **נתונים ← `render` ← מסך**.
> **כמה זמן?** שיעור אחד (כשעתיים), כולל תרגול בכיתה.
> **מה בונים?** אפליקציית **רשימת משימות** אמיתית: מוסיפים משימה (גם עם Enter), מסמנים שבוצעה, מוחקים, ומנקים את כל מה שבוצע.

## 🎯 מה נדע בסוף השיעור

1. לתכנן אפליקציה לפני שכותבים קוד: **נתונים**, **מסך**, **פעולות**.
2. ליצור מערך **חדש** במקום לשנות את הישן – עם **פיזור** (`...`).
3. ליצור עותק של אובייקט עם שינוי קטן – `{ ...task, done: true }`.
4. לשלוף ערכים מאובייקט בשורה אחת – **פירוק** (Destructuring).
5. לעבוד עם **טופס** (`form`) – ולמנוע ממנו לרענן את הדף.
6. לתת לכל פריט **מזהה ייחודי** (`id`), ולמחוק או לשנות פריט לפיו.

> 💬 **זה השיעור האחרון לפני React.** אם תבינו את הפרויקט הזה – תבינו את הרעיון שעליו בנויה React. ובשיעור הראשון של React נבנה **את אותה רשימת משימות בדיוק**, ותראו כמה קוד נעלם.

---

## 1. מתכננים לפני שכותבים

### 📖 הסבר

מתכנתים טובים לא מתחילים מהקוד. הם עונים קודם על שלוש שאלות:

| השאלה | ברשימת המשימות |
|---|---|
| **1. אילו נתונים יש?** | מערך של משימות. לכל משימה: מספר מזהה (`id`), טקסט (`text`), והאם בוצעה (`done`) |
| **2. מה רואים על המסך?** | תיבה וכפתור להוספה; שורה לכל משימה עם תיבת סימון וכפתור מחיקה; "כמה נשארו"; כפתור ניקוי |
| **3. אילו פעולות אפשר לעשות?** | **להוסיף** משימה · **לסמן/לבטל** סימון · **למחוק** משימה · **לנקות** את כל מה שבוצע |

והנתונים, בקוד:

```js
let tasks = [
  { id: 1, text: "Learn HTML", done: true },
  { id: 2, text: "Learn CSS", done: true },
  { id: 3, text: "Learn JavaScript", done: false },
];
```

### 🌍 מהעולם האמיתי

**אדריכל** לא מתחיל לבנות בית עם לבנים – הוא קודם משרטט: כמה חדרים, איפה הדלתות, איפה הצנרת. השרטוט לוקח רבע שעה, וחוסך שבועות של תיקונים.

### ✋ תורכם

לפני שממשיכים – ענו על שלוש השאלות עבור אפליקציה של **רשימת קניות**. אילו נתונים יש לכל מוצר? (רמז: אולי גם כמות?)

---

## 2. מזהה ייחודי – `id`

### 📖 הסבר

כשהמשתמש לוחץ "מחק" על משימה – איך נדע **איזו** משימה למחוק? לפי הטקסט? אבל אולי יש שתי משימות עם אותו טקסט ("לקנות חלב" פעמיים). לכן לכל משימה יש **`id`** – מספר שאף משימה אחרת לא תקבל לעולם.

איך מייצרים מספר ייחודי למשימה חדשה? טריק פשוט:

```js
console.log(Date.now());   // for example: 1791234567890
```

`Date.now()` מחזירה את מספר **אלפיות השנייה** שעברו מאז 1 בינואר 1970. המספר גדל כל אלפית שנייה – כך ששתי משימות שנוספו בזמנים שונים לא יקבלו אותו מספר.

### 🌍 מהעולם האמיתי

**מספר תעודת זהות.** יכולים להיות במדינה מאות אנשים בשם "מוחמד חלבי" – אבל לכל אחד מספר זהות אחר. כשהמשרד צריך לטפל באדם מסוים, הוא מחפש לפי המספר, לא לפי השם.

---

## 3. פיזור (`...`) – מערך חדש במקום לשנות את הישן

### 📖 הסבר

בשיעור 4 הוספנו פריט עם `push` – **שינינו** את המערך הקיים. מהיום נעבוד אחרת: ניצור **מערך חדש**, שיש בו את כל הישנים **ועוד** החדש. בשביל זה יש את **אופרטור הפיזור** – שלוש נקודות `...`:

```js
const fruits = ["Apple", "Banana"];
const moreFruits = [...fruits, "Mango"];

console.log(moreFruits);   // ["Apple", "Banana", "Mango"]
console.log(fruits);       // ["Apple", "Banana"]  - the original did not change
```

`...fruits` = "**שפוך** לכאן את כל הפריטים של `fruits`". כאילו כתבנו `["Apple", "Banana", "Mango"]` ביד.

### 🌍 מהעולם האמיתי

**צילום של דף.** במקום לכתוב על המחברת המקורית – מצלמים אותה, ומוסיפים שורה בצילום. המקור נשאר כמו שהיה.

### 📖 ולמה בכלל? `push` עבד מצוין!

נכון, ב-JavaScript רגילה `push` עובד. אבל **ב-React זה לא יעבוד**. React מחליטה אם לצייר את המסך מחדש לפי השאלה: "**האם קיבלתי מערך חדש?**". אם שיניתם את המערך הישן בתוך אותה קופסה – React לא תשים לב, והמסך לא יתעדכן.

לכן מהשיעור הזה – נתרגל את ההרגל של React כבר עכשיו:

| הפעולה | ❌ משנה את הישן | ✅ יוצר מערך חדש |
|---|---|---|
| הוספה | `tasks.push(newTask)` | `tasks = [...tasks, newTask]` |
| מחיקה | (מסובך – צריך למצוא מיקום ולחתוך) | `tasks = tasks.filter(...)` |
| שינוי פריט | `tasks[2].done = true` | `tasks = tasks.map(...)` |

ושימו לב: `filter` ו-`map` – שלמדנו בשיעור 5 – **כבר** מחזירות מערך חדש. לכן הן הכלים המושלמים לזה.

> 💡 בגלל שאנחנו **מחליפים** את המערך (`tasks = ...`), הוא מוגדר עם **`let`**, לא `const`.

### ✋ תורכם

```js
let numbers = [1, 2, 3];
```

1. בעזרת פיזור, הוסיפו `4` לסוף המערך.
2. בעזרת פיזור, הוסיפו `0` ל**התחלה** של המערך. (רמז: איפה שמים את ה-`...numbers`?)
3. בעזרת `filter`, "מחקו" את המספר `2`.

---

## 4. פיזור של אובייקט – עותק עם שינוי קטן

### 📖 הסבר

אותן שלוש נקודות עובדות גם על **אובייקט**:

```js
const task = { id: 3, text: "Learn JavaScript", done: false };
const doneTask = { ...task, done: true };

console.log(doneTask);   // { id: 3, text: "Learn JavaScript", done: true }
console.log(task);       // { id: 3, text: "Learn JavaScript", done: false }
```

`{ ...task, done: true }` = "**העתק** את כל הפרטים של `task`, ואז **דרוס** את `done` בערך חדש". מה שנכתב **אחרי** הפיזור – מנצח.

### 📖 משנים משימה אחת במערך – עם `map`

עכשיו נחבר הכול. רוצים להפוך את `done` של המשימה שה-`id` שלה `3`:

```js
tasks = tasks.map((task) => {
  if (task.id === 3) {
    return { ...task, done: !task.done };
  }
  return task;
});
```

`map` עוברת על **כל** המשימות:

- המשימה עם `id` 3? → מחזירים **עותק** שבו `done` הפוך.
- כל משימה אחרת? → מחזירים אותה **כמו שהיא**.

התוצאה: מערך חדש, באותו אורך, שבו רק משימה אחת השתנתה.

---

## 5. פירוק (Destructuring) – לשלוף ערכים בשורה אחת

### 📖 הסבר

הרבה פעמים כותבים שוב ושוב `task.id`, `task.text`, `task.done`. **פירוק** מאפשר לשלוף כמה ערכים מאובייקט **לתוך משתנים** – בשורה אחת:

```js
const task = { id: 3, text: "Learn JavaScript", done: false };

// The long way
const id = task.id;
const text = task.text;
const done = task.done;
```

ועם פירוק – אותו דבר בדיוק, בשורה אחת:

```js
const { id, text, done } = task;
```

> ⚠️ כתבו **רק אחת** משתי הדרכים. אם תכתבו את שתיהן באותו קובץ, תקבלו את השגיאה `Identifier 'id' has already been declared` – אי אפשר ליצור פעמיים משתנה באותו שם.

הסוגריים המסולסלים **בצד שמאל** של ה-`=` אומרים: "צור משתנים בשמות האלה, וקח לכל אחד את הערך של המפתח **באותו שם** מתוך `task`".

> ⚠️ השמות חייבים להיות **בדיוק** כמו המפתחות באובייקט. `const { title } = task;` ייתן `undefined` – כי ל-`task` אין מפתח בשם `title`.

### 📖 וגם ממערך – לפי הסדר

אפשר לפרק גם מערך. שם הסוגריים **מרובעים**, והשמות נקבעים לפי **המיקום**:

```js
const colors = ["red", "green", "blue"];
const [first, second] = colors;

console.log(first);    // red
console.log(second);   // green
```

> 💡 **למה זה חשוב?** כי השורה הראשונה שתכתבו ב-React תיראה כך: `const [count, setCount] = useState(0);` – פירוק של מערך! עכשיו כבר תדעו לקרוא אותה.

### ✋ תורכם

```js
const student = { name: "Rana", grade: 92, city: "Yarka" };
```

1. בשורה אחת, צרו משתנים `name` ו-`city` מתוך `student`.
2. הדפיסו: `` `${name} lives in ${city}` ``.

---

## 6. טופס (`form`) – ולמה הדף "קופץ"

### 📖 הסבר

בשיעור 4 היה כפתור `Add` עם `click`. אבל משתמשים רגילים להקליד וללחוץ **Enter**. בשביל זה עוטפים את התיבה והכפתור ב**טופס**:

```html
<form id="task-form">
  <input id="task-input" type="text" placeholder="What do you need to do?">
  <button type="submit">Add</button>
</form>
```

- `<form>` – טופס. מקיף את כל השדות.
- `type="submit"` – הכפתור הזה **שולח** את הטופס.
- בטופס, לחיצה על **Enter** בתוך התיבה = לחיצה על כפתור ה-`submit`. מתנה מהדפדפן!

ב-JavaScript מקשיבים לאירוע **`submit`** של הטופס (לא ל-`click` של הכפתור):

```js
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Add:", taskInput.value);
});
```

### ⚠️ `event.preventDefault()` – חובה!

מאז ומעולם, כששולחים טופס – הדפדפן **שולח את הנתונים לשרת וטוען את הדף מחדש**. אצלנו אין שרת, אז הדף פשוט "קופץ" ו**כל המשימות נעלמות**.

- `event` – הפונקציה מקבלת אובייקט עם פרטים על האירוע שקרה.
- `event.preventDefault()` – "**אל תעשה את מה שאתה רגיל לעשות**" (Prevent Default). הטופס לא יטען את הדף מחדש, ואנחנו מטפלים בו בעצמנו.

נסו למחוק את השורה, להוסיף משימה, ולראות מה קורה. (ואז החזירו אותה!)

### 📖 `trim()` – לנקות רווחים

```js
console.log("   Learn React  ".trim());   // "Learn React"
```

`trim()` מוחקת רווחים **בהתחלה ובסוף** הטקסט. בלעדיה, משתמש שהקליד רק רווחים היה מוסיף משימה "ריקה".

---

## 7. כפתור בתוך HTML שנבנה מ-JavaScript

### 📖 הבעיה

את השורות של המשימות אנחנו בונים עם `map` ב-`innerHTML` (כמו הכרטיסים בשיעור 5). אבל לכל שורה יש כפתור מחיקה – ואיך נחבר אליו `addEventListener`, אם הוא נוצר מחדש בכל `render`?

### 📖 הפתרון לשיעור הזה – `onclick` בתוך ה-HTML

אפשר לכתוב את האירוע **ישר בתגית**:

```html
<button onclick="deleteTask(3)">✕</button>
```

`onclick="..."` = "כשלוחצים על הכפתור – הרץ את הקוד שבמירכאות". ובגלל שאנחנו בונים את ה-HTML במחרוזת תבנית, אפשר לשים בו את ה-`id` של המשימה:

```js
`<button onclick="deleteTask(${task.id})">✕</button>`
```

כך כל כפתור "יודע" איזו משימה הוא מוחק. ובתיבת הסימון – אותו רעיון עם `onchange` (האירוע שקורה כשמסמנים או מבטלים סימון):

```js
`<input type="checkbox" onchange="toggleTask(${task.id})">`
```

> 💡 **שימו לב לצורה:** `onclick` ב-HTML, עם **סוגריים** – כי כאן כותבים **קוד להרצה**, לא מוסרים מתכון. באתרים גדולים נמנעים מ-`onclick` בתוך HTML – אבל ב-React תכתבו משהו שנראה כמעט זהה: `<button onClick={() => deleteTask(task.id)}>`. אז זה תרגול טוב.

---

## 8. 🔨 בונים יחד – רשימת המשימות

### שלב 1 – ה-HTML

צרו תיקייה חדשה `todo-app`, ובה `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My Tasks</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="app">
      <h1>My Tasks</h1>

      <!-- A form: pressing Enter in the input also submits it -->
      <form id="task-form">
        <input id="task-input" type="text" placeholder="What do you need to do?">
        <button type="submit">Add</button>
      </form>

      <p id="summary"></p>

      <!-- JavaScript draws the tasks here -->
      <ul id="task-list" class="task-list"></ul>

      <button id="clear-btn" class="secondary">Clear done tasks</button>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

את `style.css` העתיקו מהתיקייה [`project`](project/style.css). יש בו שלושה דברים חדשים קטנים:

| ה-CSS | מה הוא עושה |
|---|---|
| `flex: 1;` | "קח את **כל המקום הפנוי** בשורה". התיבה מתמתחת עד הכפתור; הטקסט של משימה דוחף את כפתור המחיקה לקצה |
| `align-items: center;` | מיישר את תיבת הסימון, הטקסט והכפתור **לאותו גובה** |
| `text-decoration: line-through;` | קו **חוצה** על הטקסט – למשימות שבוצעו |

### שלב 2 – הנתונים והתגיות

```js
// 1. The data - an array of task objects
let tasks = [
  { id: 1, text: "Learn HTML", done: true },
  { id: 2, text: "Learn CSS", done: true },
  { id: 3, text: "Learn JavaScript", done: false },
];

// 2. Find the elements on the page
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const summary = document.getElementById("summary");
const clearButton = document.getElementById("clear-btn");
```

### שלב 3 – שורה אחת ממשימה אחת

```js
// 3. Turn ONE task object into the HTML of one row
const taskToHtml = (task) => {
  const { id, text, done } = task;

  return `
    <li class="${done ? "done" : ""}">
      <input type="checkbox" ${done ? "checked" : ""} onchange="toggleTask(${id})">
      <span>${text}</span>
      <button onclick="deleteTask(${id})">✕</button>
    </li>
  `;
};
```

- **פירוק** בשורה הראשונה – ומשם כותבים `id`, `text`, `done` במקום `task.id` וכו'.
- `class="${done ? "done" : ""}"` – משימה שבוצעה מקבלת את המחלקה `done` (קו חוצה).
- `${done ? "checked" : ""}` – המאפיין `checked` גורם לתיבת הסימון להופיע **מסומנת**.
- כאן יש **שתי** הוראות (פירוק + `return`), לכן צריך `{ }` ו-`return`.

### שלב 4 – `render`

```js
// 4. Draw the page from the data
const render = () => {
  if (tasks.length === 0) {
    taskList.innerHTML = "<p>No tasks yet - add one above!</p>";
  } else {
    taskList.innerHTML = tasks.map(taskToHtml).join("");
  }

  const left = tasks.filter((task) => !task.done).length;
  summary.textContent = `${left} of ${tasks.length} tasks left`;
};
```

`tasks.filter((task) => !task.done).length` – "**כמה** משימות **לא** בוצעו?": מסננים, ואז סופרים את מה שנשאר.

הוסיפו `render();` בסוף הקובץ, שמרו ורעננו – שלוש משימות, שתיים מהן מחוקות בקו. (הכפתורים עוד לא עובדים – אם תלחצו, תראו שגיאה בקונסול. זה הצעד הבא.)

### שלב 5 – ארבע הפעולות

כל פעולה בנויה באותה צורה בדיוק: **יוצרים מערך חדש** ← **`render()`**.

```js
// 5. The actions - each one makes a NEW array, then draws again
const addTask = (text) => {
  const newTask = { id: Date.now(), text: text, done: false };
  tasks = [...tasks, newTask];
  render();
};

const toggleTask = (id) => {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, done: !task.done };
    }
    return task;
  });
  render();
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  render();
};

const clearDone = () => {
  tasks = tasks.filter((task) => !task.done);
  render();
};
```

| הפעולה | הכלי | במילים |
|---|---|---|
| `addTask` | פיזור `...` | "כל המשימות הישנות, ועוד אחת חדשה בסוף" |
| `toggleTask` | `map` + פיזור אובייקט | "כל המשימות כמו שהן – חוץ מאחת, שבה `done` הפוך" |
| `deleteTask` | `filter` | "השאר את כל המשימות **שה-`id` שלהן שונה** מזה שמחקו" |
| `clearDone` | `filter` | "השאר רק את המשימות **שלא** בוצעו" |

> 💡 **שימו לב ל-`deleteTask`:** אין שם שום "מחיקה"! פשוט משאירים את כל השאר. `!==` = "**לא** שווה".

### שלב 6 – האירועים

לפני `render();` שבסוף:

```js
// 6. Events
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (text === "") {
    return;
  }

  addTask(text);
  taskInput.value = "";
});

clearButton.addEventListener("click", clearDone);
```

(האירועים של סימון ומחיקה כבר כתובים **בתוך ה-HTML** – `onchange` ו-`onclick` מסעיף 7.)

שמרו, רעננו, ונסו הכול: הוספה עם Enter, הוספה עם הכפתור, סימון, ביטול סימון, מחיקה, ניקוי. 🎉

### ✋ תורכם

1. הוסיפו משימה רק עם רווחים. מה קורה, ולמה?
2. סמנו את כל המשימות, ולחצו `Clear done tasks`. מה מופיע?
3. **אתגר:** שהשורה תגיד `All done! 🎉` כשאין אף משימה שנשארה (אבל יש משימות). (רמז: `if` לפני `summary.textContent`.)

---

## 9. 💻 הקוד המלא

הקוד נמצא גם בתיקייה [`project`](project/) של השיעור.

**`script.js`:**

```js
// 1. The data - an array of task objects
let tasks = [
  { id: 1, text: "Learn HTML", done: true },
  { id: 2, text: "Learn CSS", done: true },
  { id: 3, text: "Learn JavaScript", done: false },
];

// 2. Find the elements on the page
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const summary = document.getElementById("summary");
const clearButton = document.getElementById("clear-btn");

// 3. Turn ONE task object into the HTML of one row
const taskToHtml = (task) => {
  const { id, text, done } = task;

  return `
    <li class="${done ? "done" : ""}">
      <input type="checkbox" ${done ? "checked" : ""} onchange="toggleTask(${id})">
      <span>${text}</span>
      <button onclick="deleteTask(${id})">✕</button>
    </li>
  `;
};

// 4. Draw the page from the data
const render = () => {
  if (tasks.length === 0) {
    taskList.innerHTML = "<p>No tasks yet - add one above!</p>";
  } else {
    taskList.innerHTML = tasks.map(taskToHtml).join("");
  }

  const left = tasks.filter((task) => !task.done).length;
  summary.textContent = `${left} of ${tasks.length} tasks left`;
};

// 5. The actions - each one makes a NEW array, then draws again
const addTask = (text) => {
  const newTask = { id: Date.now(), text: text, done: false };
  tasks = [...tasks, newTask];
  render();
};

const toggleTask = (id) => {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, done: !task.done };
    }
    return task;
  });
  render();
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  render();
};

const clearDone = () => {
  tasks = tasks.filter((task) => !task.done);
  render();
};

// 6. Events
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (text === "") {
    return;
  }

  addTask(text);
  taskInput.value = "";
});

clearButton.addEventListener("click", clearDone);

// 7. Draw for the first time
render();
```

**מה יופיע על המסך:** קופסה לבנה עם הכותרת `My Tasks`, תיבה וכפתור `Add`, השורה `1 of 3 tasks left`, ושלוש משימות – `Learn HTML` ו-`Learn CSS` מסומנות, אפורות ומחוקות בקו; `Learn JavaScript` רגילה. לכל משימה ✕ אדום בצד.

---

## 10. ⚠️ טעויות נפוצות – ואיך מתקנים

| מה קרה | למה | התיקון |
|---|---|---|
| מוסיפים משימה – והדף "קופץ" וכל המשימות נעלמות | חסר `event.preventDefault()` | השורה הראשונה באירוע `submit` |
| `event is not defined` | שכחתם לכתוב `event` בסוגריים של פונקציית החץ | `(event) => { ... }` |
| `Assignment to constant variable` | `tasks` הוגדר עם `const`, ואנחנו מחליפים אותו | `let tasks = ...` |
| לחיצה על ✕ – `deleteTask is not defined` | שגיאת כתיב בשם, או שהפונקציה בתוך פונקציה אחרת | שם זהה בדיוק, והפונקציה ברמה העליונה של הקובץ |
| לחיצה על ✕ מוחקת את **כל** המשימות | `===` במקום `!==` ב-`filter` – השארתם רק את זו שמחקו | `task.id !== id` |
| אחרי סימון – הרשימה נעלמת, ובקונסול `Cannot destructure property 'id' of 'task' as it is undefined` | שכחתם `return task;` בסוף ה-`map` – כל שאר המשימות הפכו ל-`undefined` | לכל מסלול ב-`map` צריך `return` |
| `const { title } = task` נותן `undefined` | אין במשימה מפתח בשם `title` | השתמשו בשם המדויק: `text` |
| `tasks.push` עובד, אבל המורה אומר שזו טעות | בשיעור הזה מתרגלים את הדרך של React | `tasks = [...tasks, newTask]` |

---

## 11. 📚 מילון מונחים

| מונח | הסבר |
|---|---|
| **`id`** | מזהה ייחודי לכל פריט – כמו מספר תעודת זהות |
| **`Date.now()`** | מספר שגדל כל אלפית שנייה – שימושי כ-`id` |
| **פיזור (`...`)** | "שפוך לכאן את כל הפריטים": `[...arr, x]`, `{ ...obj, key: value }` |
| **פירוק (Destructuring)** | שליפת ערכים למשתנים: `const { a, b } = obj;` · `const [x, y] = arr;` |
| **`!==`** | "לא שווה ל-" |
| **`<form>`** | טופס; Enter בתיבה שולח אותו |
| **אירוע `submit`** | קורה כששולחים טופס |
| **`event.preventDefault()`** | מונע מהדפדפן את התגובה הרגילה (כאן – טעינה מחדש של הדף) |
| **`trim()`** | מוחקת רווחים בתחילת הטקסט ובסופו |
| **`onclick` / `onchange`** | אירוע שנכתב ישר בתוך תגית HTML |
| **`checked`** | מאפיין שגורם לתיבת סימון להופיע מסומנת |

---

## ✅ בדקו את עצמכם

1. מה שלוש השאלות ששואלים לפני שמתחילים לבנות אפליקציה?
2. מה יודפס? `const a = [1, 2]; const b = [...a, 3]; console.log(a, b);`
3. מה ההבדל בין `tasks.push(newTask)` לבין `tasks = [...tasks, newTask]`? ולמה ב-React משתמשים בשני?
4. מה יהיה ב-`copy`? `const user = { name: "Omar", age: 16 }; const copy = { ...user, age: 17 };`
5. כתבו בשורה אחת: משתנים `title` ו-`price` מתוך האובייקט `product`.
6. למה צריך `event.preventDefault()` באירוע `submit`?
7. איך `deleteTask` "מוחקת" משימה, אם אין בה שום פקודת מחיקה?
8. למה לכל משימה יש `id`? למה לא למחוק לפי הטקסט?

<details><summary>תשובות</summary>

1. אילו **נתונים** יש? מה רואים על ה**מסך**? אילו **פעולות** אפשר לעשות?
2. `[1, 2] [1, 2, 3]` – המערך המקורי לא השתנה.
3. `push` משנה את המערך **הקיים**. `[...tasks, newTask]` יוצר מערך **חדש** ומחליף את הישן. React מזהה שינוי לפי השאלה "האם זה מערך חדש?" – אם משנים את הישן, היא לא תשים לב והמסך לא יתעדכן.
4. `{ name: "Omar", age: 17 }` – הכול מועתק, ואז `age` נדרס בערך החדש.
5. `const { title, price } = product;`
6. כי שליחת טופס גורמת לדפדפן לטעון את הדף מחדש – וכל הנתונים שבזיכרון (המשימות) נעלמים.
7. היא משתמשת ב-`filter` כדי ליצור מערך חדש עם **כל המשימות חוץ מזו** שה-`id` שלה הוא זה שלחצו עליו – ומחליפה בו את הישן.
8. כי ייתכנו שתי משימות עם אותו טקסט. `id` הוא ייחודי, ולכן תמיד מזהה משימה **אחת** בדיוק.

</details>

---

## 🎓 סיכום חלק א׳ – מה למדנו בשישה שיעורים

| שיעור | מה למדנו |
|:---:|---|
| 1 | **HTML** – מבנה ותוכן: תגיות, כותרות, רשימות, קישורים, תמונות |
| 2 | **CSS** – עיצוב: צבעים, מחלקות, מודל הקופסה, Flexbox |
| 3 | **JavaScript** – משתנים, `if`, פונקציות, `getElementById`, אירועים |
| 4 | מערכים, לולאות, אובייקטים, מחרוזות תבנית, `innerHTML` |
| 5 | פונקציות חץ, טרנרי, `map`, `filter`, ושיטת `render` |
| 6 | פיזור, פירוק, טפסים ו-`id` – ופרויקט שלם |

**בשיעור הבא מתחילים את React.** נתקין את הכלים (Node.js ו-Vite), ונבנה מחדש את אותה רשימת משימות – הפעם בלי `getElementById`, בלי `innerHTML`, ובלי לקרוא ל-`render()` בעצמנו.

➡️ [תרגילים לשיעור 6](exercises.md)
