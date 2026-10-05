# שיעור 8 – React: State, אירועים וטפסים – רשימת המשימות

> **מה צריך לדעת לפני?** את שיעור 7 – פרויקט Vite, JSX, רכיבים ו-Props. ומשיעור 6 – פיזור (`...`), פירוק, `map`/`filter` ליצירת מערך חדש, וטפסים.
> **כמה זמן?** שיעור אחד (כשעתיים), כולל תרגול בכיתה.
> **מה בונים?** קודם – כפתור **לייק** לכרטיס משיעור 7. ואחר כך – את **רשימת המשימות** משיעור 6, מחדש, ב-React.

## 🎯 מה נדע בסוף השיעור

1. למה משתנה רגיל (`let`) **לא** מעדכן את המסך ב-React.
2. לשמור נתונים שמשתנים עם **`useState`**.
3. להגיב ללחיצות עם **`onClick`**.
4. להציג דברים **בתנאי** – עם טרנרי.
5. לחבר תיבת טקסט ל-State (**שדה מבוקר**: `value` + `onChange`).
6. לעבוד עם טופס – `onSubmit` ו-`preventDefault`.
7. לעדכן **מערך** ב-State – בלי `push`.
8. להעביר **פונקציה** כ-Prop, כדי שרכיב-ילד יוכל לבקש מהאב לשנות נתונים.

---

## 1. הבעיה – משתנה רגיל לא מספיק

### 🔨 נסו בעצמכם

פתחו את פרויקט `my-card` משיעור 7, והריצו אותו (`npm run dev`). צרו קובץ חדש `src/LikeButton.jsx`:

```jsx
function LikeButton() {
  let likes = 0;

  const addLike = () => {
    likes = likes + 1;
    console.log(likes);
  };

  return (
    <p>
      <button onClick={addLike}>Like</button> {likes} likes
    </p>
  );
}

export default LikeButton;
```

וב-`ProfileCard.jsx` – `import LikeButton from "./LikeButton.jsx";` למעלה, ו-`<LikeButton />` לפני ה-`</div>` האחרון.

(`onClick={addLike}` – "כשלוחצים, הפעל את `addLike`". נסביר אותו בסעיף 3.)

לחצו על `Like` כמה פעמים, ופתחו את הקונסול (F12). **מה קורה?**

<details><summary>מה קרה</summary>

בקונסול: `1`, `2`, `3`… – **המשתנה** גדל. אבל על **המסך** – כל הזמן `0 likes`.

</details>

### 📖 למה?

React מציירת רכיב על ידי **הפעלת הפונקציה שלו** – והתוצאה (ה-JSX) מופיעה על המסך. אבל:

1. **React לא יודעת** שהמשתנה `likes` השתנה – אף אחד לא אמר לה לצייר מחדש. (זוכרים את שיעור 3, כששכחנו את `textContent`? אותה בעיה.)
2. וגם אם היא הייתה מציירת מחדש – היא **מפעילה את הפונקציה מההתחלה**, והשורה `let likes = 0;` הייתה מאפסת אותו!

צריך משתנה ש-React **זוכרת** בין ציור לציור, ושכשמשנים אותו – היא **מציירת מחדש לבד**. לזה קוראים **State**.

---

## 2. `useState` – משתנה ש-React זוכרת

### 📖 הסבר

```jsx
import { useState } from "react";

function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <p>
      <button onClick={() => setLikes(likes + 1)}>Like</button> {likes} likes
    </p>
  );
}

export default LikeButton;
```

שמרו ולחצו – **עובד!** 🎉 בואו נפרק את השורה החשובה:

```jsx
const [likes, setLikes] = useState(0);
```

| החלק | מה זה |
|---|---|
| `useState(0)` | "React, תזכרי בשבילי ערך. הערך **ההתחלתי** הוא `0`" |
| `likes` | **הערך הנוכחי**. קוראים אותו כמו כל משתנה: `{likes}` |
| `setLikes` | **הפונקציה לשינוי** הערך. `setLikes(5)` = "שימי 5, **וציירי מחדש**" |
| `const [ , ] =` | **פירוק של מערך** – משיעור 6! `useState` מחזירה מערך של שני דברים, ואנחנו נותנים להם שמות |

ו-`import { useState } from "react";` בראש הקובץ – "קח את `useState` מתוך הספרייה של React".

### 📖 מה קורה בלחיצה – צעד אחר צעד

1. **ציור ראשון:** `useState(0)` → `likes` הוא `0`. על המסך: `0 likes`.
2. **לחיצה:** `setLikes(likes + 1)` → `setLikes(1)`. React שומרת `1` ו**מפעילה את הפונקציה שוב**.
3. **ציור שני:** הפעם `useState` **לא** מתחילה מ-`0` – היא זוכרת: `likes` הוא `1`. על המסך: `1 likes`.

### 🌍 מהעולם האמיתי

**לוח תוצאות במשחק כדורסל** (שוב!). המספר על הלוח הוא `likes`. אסור לגשת ללוח ולשנות מספר ביד – צריך להגיד **למפעיל** (`setLikes`): "שים 21". הוא משנה את המספר **ומעדכן את הלוח**.

> 💡 **שם הפונקציה:** מקובל לקרוא לה `set` + שם הערך באות גדולה: `count` ← `setCount`, `name` ← `setName`, `tasks` ← `setTasks`.

> ⚠️ **אסור** לכתוב `likes = likes + 1;` – גם כי הוא `const`, וגם כי React לא תדע שהוא השתנה. **רק** דרך `setLikes`.

### 📖 כל רכיב – State משלו

שימו לב לשני הכרטיסים: לחצו על `Like` בכרטיס של Dana – המונה של Omar **לא זז**. כל `<LikeButton />` הוא עותק נפרד, עם `likes` משלו. כמו שני לוחות תוצאות בשני מגרשים.

### ✋ תורכם

הוסיפו ל-`LikeButton` כפתור שני, `Reset`, שמחזיר את המונה ל-`0`.

---

## 3. אירועים ב-React – `onClick`

### 📖 הסבר

ב-React לא כותבים `addEventListener`. מוסיפים לתגית מאפיין:

```jsx
<button onClick={addLike}>Like</button>
```

| שיעור 3 | שיעור 6 | React |
|---|---|---|
| `button.addEventListener("click", addLike)` | `onclick="addLike()"` (מחרוזת) | `onClick={addLike}` |

שני כללים:

1. **`onClick`** – עם **C גדולה** (camelCase). וכך גם `onChange`, `onSubmit`.
2. מעבירים **פונקציה** – **בלי** להפעיל אותה. בדיוק כמו ב-`addEventListener` של שיעור 3:

| הקוד | מה קורה |
|---|---|
| `onClick={addLike}` | ✅ "הנה הפונקציה – הפעילי אותה כשלוחצים" |
| `onClick={() => setLikes(likes + 1)}` | ✅ פונקציית חץ שנכתבת במקום – מופעלת כשלוחצים |
| `onClick={addLike()}` | ❌ מפעיל **עכשיו**, בזמן הציור – לא בלחיצה |
| `onClick={setLikes(likes + 1)}` | ❌ גרוע במיוחד: משנה State **בזמן הציור** ← ציור חדש ← שוב משנה ← … React עוצרת עם השגיאה `Too many re-renders` |

> 💡 **מתי פונקציית חץ?** כשצריך להעביר **ערך**: `onClick={() => deleteTask(5)}`. בלי החץ – `deleteTask(5)` היה רץ מיד.

---

## 4. הצגה בתנאי

### 📖 הסבר

ב-JSX אי אפשר לכתוב `if` בתוך `{ }` – רק דברים שמחזירים **ערך**. לכן משתמשים ב**טרנרי** משיעור 5:

```jsx
<p>{likes === 0 ? "Be the first to like!" : `${likes} likes`}</p>
```

והטרנרי יכול לבחור גם בין **תגיות שלמות**:

```jsx
{tasks.length === 0 ? (
  <p>No tasks yet - add one above!</p>
) : (
  <ul className="task-list">...</ul>
)}
```

וגם `className` משתנה – כמו בשיעור 5:

```jsx
<li className={done ? "done" : ""}>
```

### ✋ תורכם

ב-`LikeButton`: כשיש 10 לייקים ומעלה – הציגו מתחת לכפתור `🔥 Popular!`. (רמז: טרנרי שמחזיר את הטקסט או `""`.)

---

## 5. תיבת טקסט מחוברת ל-State – "שדה מבוקר"

### 📖 הסבר

בשיעור 4 קראנו את מה שהוקלד עם `input.value` – רק כשלחצו על כפתור. ב-React מחברים את התיבה ל-State **כל הזמן**:

```jsx
import { useState } from "react";

function NameBox() {
  const [name, setName] = useState("");

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <p>Hello {name}!</p>
    </div>
  );
}

export default NameBox;
```

הקלידו – והברכה מתעדכנת **בכל אות**. מה קורה בכל הקשה:

1. המשתמש מקליד אות → האירוע **`onChange`** (כמו אירוע `input` משיעור 5).
2. `event.target` = התגית שבה קרה האירוע – התיבה. `event.target.value` = מה שכתוב בה עכשיו.
3. `setName(...)` שומרת את הטקסט ב-State → React מציירת מחדש.
4. `value={name}` – התיבה מציגה **תמיד** את מה שב-State.

התיבה וה-State **תמיד** מסונכרנים. לכן אם נכתוב `setName("")` – התיבה **תתרוקן** לבד. זה נקרא **שדה מבוקר** (Controlled Input).

> ⚠️ **"אני מקליד ושום דבר לא נכתב!"** – כתבתם `value={name}` בלי `onChange`. התיבה מציגה את ה-State, ואף אחד לא משנה אותו. (בקונסול תופיע אזהרה: `You provided a value prop to a form field without an onChange handler`.)

---

## 6. 🔨 בונים יחד – רשימת המשימות ב-React

### שלב 0 – פרויקט חדש

בטרמינל – עצרו את השרת של `my-card` (Ctrl + C), חזרו לתיקיית הקורס (`cd ..`), וצרו פרויקט חדש:

```bash
npm create vite@latest todo-react -- --template react
cd todo-react
npm install
npm run dev
```

(ענו לשאלות כמו בשיעור 7: Oxlint, ו-**No**.)

ניקוי, כמו בשיעור 7: מחקו את `src/App.css` ואת `src/assets`, והחליפו את התוכן של `src/index.css` ב-`style.css` **משיעור 6** – בדיוק אותו עיצוב.

### שלב 1 – הנתונים: שני State-ים

ב-`App.jsx`:

```jsx
import { useState } from "react";

function App() {
  // 1. The data - React remembers it between draws
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn HTML", done: true },
    { id: 2, text: "Learn CSS", done: true },
    { id: 3, text: "Learn JavaScript", done: false },
  ]);
  const [text, setText] = useState("");
```

- `tasks` – מערך המשימות. בדיוק המערך משיעור 6 – רק שעכשיו הוא ב-`useState`.
- `text` – מה שכתוב כרגע בתיבה.

### שלב 2 – מה רואים

```jsx
  // 3. What we show - calculated from the data on every draw
  const left = tasks.filter((task) => !task.done).length;

  return (
    <div className="app">
      <h1>My Tasks</h1>

      <p>
        {left} of {tasks.length} tasks left
      </p>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? "done" : ""}>
            <input type="checkbox" checked={task.done} />
            <span>{task.text}</span>
            <button>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

שמרו – שלוש משימות, שתיים מחוקות בקו. 🎉

- **אין `render()`!** את `left` מחשבים בגוף הפונקציה – ובכל פעם ש-React מציירת מחדש, הוא **מחושב מחדש** לבד.
- `checked={task.done}` – תיבת הסימון מסומנת לפי הנתונים.

(הכפתורים עוד לא עובדים, ובקונסול תופיע אזהרה על `checked` בלי `onChange` – נתקן מיד.)

### שלב 3 – הוספת משימה: טופס

**מעל** ה-`<p>` של הספירה:

```jsx
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="What do you need to do?"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
```

ו**לפני** ה-`return` (אחרי שני ה-`useState`):

```jsx
  // 2. The actions - each one gives React a NEW array
  const addTask = (event) => {
    event.preventDefault();

    if (text.trim() === "") {
      return;
    }

    const newTask = { id: Date.now(), text: text.trim(), done: false };
    setTasks([...tasks, newTask]);
    setText("");
  };
```

השוו לשיעור 6 – כמעט **זהה**:

| שיעור 6 | שיעור 8 |
|---|---|
| `taskForm.addEventListener("submit", ...)` | `<form onSubmit={addTask}>` |
| `taskInput.value.trim()` | `text.trim()` – הטקסט כבר ב-State |
| `tasks = [...tasks, newTask]; render();` | `setTasks([...tasks, newTask]);` |
| `taskInput.value = "";` | `setText("");` – והתיבה מתרוקנת לבד |

> 💡 **עכשיו מבינים למה התעקשנו בשיעור 6 על `[...tasks, newTask]` ולא על `push`:** `setTasks` צריכה לקבל מערך **חדש**. אם נעשה `tasks.push(newTask); setTasks(tasks);` – React תראה **את אותו מערך** ותחליט ששום דבר לא השתנה. המסך לא יתעדכן.

### שלב 4 – סימון, מחיקה וניקוי

אחרי `addTask`:

```jsx
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearDone = () => {
    setTasks(tasks.filter((task) => !task.done));
  };
```

**אותו קוד בדיוק כמו בשיעור 6** – רק שבמקום `tasks = ...; render();` כותבים `setTasks(...)`.

ועכשיו מחברים לתגיות. ב-`map`:

```jsx
            <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>✕</button>
```

ובסוף ה-`div` הראשי, אחרי ה-`ul`:

```jsx
      <button className="secondary" onClick={clearDone}>
        Clear done tasks
      </button>
```

- `onChange={() => toggleTask(task.id)}` – פונקציית חץ, כי צריך להעביר את ה-`id` **של המשימה הזאת**. (בשיעור 6: `onchange="toggleTask(${id})"` – מחרוזת. כאן – פונקציה אמיתית.)
- `onClick={clearDone}` – בלי חץ, כי אין מה להעביר.

שמרו ונסו הכול: הוספה (גם עם Enter), סימון, מחיקה, ניקוי. 🎉

### שלב 5 – הודעה כשאין משימות

עטפו את ה-`ul` בטרנרי:

```jsx
      {tasks.length === 0 ? (
        <p>No tasks yet - add one above!</p>
      ) : (
        <ul className="task-list">
          ...
        </ul>
      )}
```

---

## 7. פונקציה כ-Prop – הילד מבקש, האב מחליט

### 📖 הבעיה

ה-`map` שלנו מתארך. נרצה להוציא שורת משימה לרכיב משלה – `TaskItem`. אבל רגע: ה-State (`tasks`) נמצא ב-`App`. איך כפתור ה-✕ **בתוך** `TaskItem` ימחק משימה מ-`tasks`?

### 📖 הפתרון

`App` **מעביר לילד פונקציה** כ-Prop. הילד לא משנה כלום בעצמו – הוא רק **קורא לפונקציה** שקיבל, ו-`App` עושה את השינוי.

```jsx
<TaskItem
  key={task.id}
  task={task}
  onToggle={toggleTask}
  onDelete={deleteTask}
/>
```

צרו קובץ `src/TaskItem.jsx`:

```jsx
function TaskItem({ task, onToggle, onDelete }) {
  const { id, text, done } = task;

  return (
    <li className={done ? "done" : ""}>
      <input type="checkbox" checked={done} onChange={() => onToggle(id)} />
      <span>{text}</span>
      <button onClick={() => onDelete(id)}>✕</button>
    </li>
  );
}

export default TaskItem;
```

וב-`App.jsx`: `import TaskItem from "./TaskItem.jsx";` למעלה, וה-`map` הופך לקצר:

```jsx
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
```

### 🌍 מהעולם האמיתי

**ילד ואבא בסופר.** הכסף (ה-State) אצל אבא. הילד לא לוקח כסף מהארנק – הוא **מבקש**: "אבא, תקנה את זה" (`onDelete(id)`). אבא מחליט ומשלם (`setTasks`). ה-Prop `onDelete` הוא "הטלפון לאבא" שהילד קיבל.

> 💡 **שמות:** מקובל לקרוא ל-Props של פונקציות בשם שמתחיל ב-`on`: `onToggle`, `onDelete` – כמו `onClick` של React.

---

## 8. 💻 הקוד המלא

כל הפרויקט נמצא בתיקייה [`project`](project/) של השיעור (כדי להריץ: `npm install` ואז `npm run dev`).

**`src/App.jsx`:**

```jsx
import { useState } from "react";
import TaskItem from "./TaskItem.jsx";

function App() {
  // 1. The data - React remembers it between draws
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn HTML", done: true },
    { id: 2, text: "Learn CSS", done: true },
    { id: 3, text: "Learn JavaScript", done: false },
  ]);
  const [text, setText] = useState("");

  // 2. The actions - each one gives React a NEW array
  const addTask = (event) => {
    event.preventDefault();

    if (text.trim() === "") {
      return;
    }

    const newTask = { id: Date.now(), text: text.trim(), done: false };
    setTasks([...tasks, newTask]);
    setText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearDone = () => {
    setTasks(tasks.filter((task) => !task.done));
  };

  // 3. What we show - calculated from the data on every draw
  const left = tasks.filter((task) => !task.done).length;

  return (
    <div className="app">
      <h1>My Tasks</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="What do you need to do?"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <p>
        {left} of {tasks.length} tasks left
      </p>

      {tasks.length === 0 ? (
        <p>No tasks yet - add one above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}

      <button className="secondary" onClick={clearDone}>
        Clear done tasks
      </button>
    </div>
  );
}

export default App;
```

(`TaskItem.jsx` – כמו בסעיף 7.)

**מה יופיע על המסך:** **בדיוק** אותה אפליקציה כמו בשיעור 6 – אותו עיצוב, אותה התנהגות.

---

## 9. 🔍 לפני ואחרי – שיעור 6 מול שיעור 8

הקוד לא בהכרח **קצר** יותר – אבל תסתכלו **מה נעלם**:

| | שיעור 6 (JavaScript רגילה) | שיעור 8 (React) |
|---|---|---|
| `getElementById` | 5 פעמים | **0** |
| פונקציית `render` | כתבנו בעצמנו | **אין** – React מציירת |
| לקרוא ל-`render()` אחרי שינוי | בכל פעולה – וקל לשכוח | **אף פעם** – `setTasks` עושה את זה |
| HTML במחרוזות + `innerHTML` + `join` | כן | **לא** – JSX |
| `onclick="..."` במחרוזת | כן | `onClick={...}` – פונקציה אמיתית |
| ה-HTML וה-JavaScript | בשני קבצים, מחוברים ב-`id` | **ביחד**, ברכיב אחד |
| ניקוי התיבה | `taskInput.value = ""` | `setText("")` |

והחשוב מכול: ב-React **אי אפשר לשכוח לעדכן את המסך**. המסך הוא תמיד תוצאה של הנתונים.

---

## 10. ⚠️ טעויות נפוצות – ואיך מתקנים

| מה קרה | למה | התיקון |
|---|---|---|
| `useState is not defined` | שכחתם את ה-`import` | `import { useState } from "react";` |
| המשתנה משתנה (בקונסול) אבל המסך לא | השתמשתם ב-`let` רגיל, לא ב-State | `useState` ו-`setX(...)` |
| `Too many re-renders` | `onClick={setLikes(likes + 1)}` – מופעל בזמן הציור | `onClick={() => setLikes(likes + 1)}` |
| הפונקציה רצה כשהדף נטען, ולא בלחיצה | `onClick={deleteTask(id)}` | `onClick={() => deleteTask(id)}` |
| `push` + `setTasks(tasks)` – המסך לא מתעדכן | React קיבלה את **אותו** מערך | `setTasks([...tasks, newTask])` |
| מקלידים בתיבה ושום דבר לא נכתב | `value` בלי `onChange` | הוסיפו `onChange={(event) => setText(event.target.value)}` |
| הוספת משימה – והדף "קופץ" | חסר `event.preventDefault()` | השורה הראשונה ב-`addTask` |
| `onclick` לא עובד | ב-React זה `onClick` עם C גדולה | `onClick`, `onChange`, `onSubmit` |
| `onDelete is not a function` | שכחתם להעביר את ה-Prop, או ששם ה-Prop שונה בין `App` ל-`TaskItem` | אותו שם בדיוק בשני המקומות |

---

## 11. 📚 מילון מונחים

| מונח | הסבר |
|---|---|
| **State** | נתונים ש-React זוכרת בין ציור לציור; כשמשנים אותם – המסך מתעדכן |
| **`useState(initial)`** | יוצרת State. מחזירה `[value, setValue]` |
| **פונקציית `set`** | הדרך **היחידה** לשנות State: `setLikes(5)` |
| **ציור מחדש (Re-render)** | React מפעילה שוב את פונקציית הרכיב, ומעדכנת את המסך לפי התוצאה |
| **`onClick` / `onChange` / `onSubmit`** | אירועים ב-React – מקבלים **פונקציה** |
| **`event.target.value`** | הטקסט שכתוב כרגע בתיבה שבה קרה האירוע |
| **שדה מבוקר (Controlled Input)** | תיבה עם `value` מ-State ו-`onChange` שמעדכן אותו |
| **הצגה בתנאי** | טרנרי בתוך JSX: `{cond ? <A /> : <B />}` |
| **פונקציה כ-Prop** | `onDelete={deleteTask}` – כך ילד מבקש מהאב לשנות State |

---

## ✅ בדקו את עצמכם

1. למה `let likes = 0;` בתוך רכיב לא עובד כמונה? תנו **שתי** סיבות.
2. מה מחזירה `useState(0)`? ומה זה `[count, setCount]`?
3. מה ההבדל בין `onClick={addLike}` לבין `onClick={addLike()}`?
4. למה `tasks.push(newTask); setTasks(tasks);` לא מעדכן את המסך?
5. מה קורה בכל הקשה בתיבה עם `value={text}` ו-`onChange={(event) => setText(event.target.value)}`?
6. איך מרוקנים את התיבה אחרי הוספת משימה – ולמה זה עובד?
7. ה-State נמצא ב-`App`, והכפתור ✕ ב-`TaskItem`. איך הכפתור מוחק משימה?
8. בשני כרטיסים יש `<LikeButton />`. לוחצים על אחד – למה השני לא משתנה?

<details><summary>תשובות</summary>

1. (א) React לא יודעת שהמשתנה השתנה, ולכן לא מציירת מחדש. (ב) גם אם תצייר – הפונקציה רצה מההתחלה, ו-`let likes = 0` מאפס אותו.
2. מערך של שני דברים: הערך הנוכחי (מתחיל ב-`0`) ופונקציה לשינוי שלו. `[count, setCount]` – **פירוק** של המערך לשני משתנים.
3. `onClick={addLike}` – מוסרים את הפונקציה, והיא תרוץ **בלחיצה**. `onClick={addLike()}` – הפונקציה רצה **מיד**, בזמן הציור.
4. כי `push` משנה את המערך הקיים – ו-React מקבלת **את אותו מערך** ומחליטה ששום דבר לא השתנה.
5. `onChange` מופעל → `setText` שומרת את הטקסט החדש ב-State → React מציירת מחדש → התיבה מציגה את `text` החדש.
6. `setText("")`. זה עובד כי התיבה היא שדה מבוקר – היא תמיד מציגה את מה שב-State.
7. `App` מעביר ל-`TaskItem` את `deleteTask` כ-Prop (`onDelete`). הכפתור קורא ל-`onDelete(id)`, ו-`App` הוא שמשנה את `tasks`.
8. כי לכל עותק של הרכיב יש State **משלו**.

</details>

---

## 🎓 סיכום – מה למדנו עד עכשיו ב-React

| שיעור | מה למדנו |
|:---:|---|
| 7 | Node.js ו-Vite · JSX ושישת הכללים · רכיבים · Props · רשימות עם `map` ו-`key` |
| 8 | `useState` · `onClick` · הצגה בתנאי · שדה מבוקר · טפסים · מערכים ב-State · פונקציות כ-Props |

**בשיעור הבא:** נבנה מחדש את **קטלוג הקורסים** משיעור 5 – עם חיפוש וסינון – ונלמד לחשב את מה שמוצג מתוך כמה State-ים. ואחר כך: `useEffect` וטעינת נתונים אמיתיים מהשרת.

➡️ [תרגילים לשיעור 8](exercises.md)
