# פתרונות – שיעור 8: React – State, אירועים וטפסים (למורה)

---

## תרגיל 1 – המונה ב-React

**`src/Counter.jsx`:**

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const removeOne = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="counter">
      <h1 className={count >= 10 ? "big" : ""}>{count}</h1>
      <p>{count % 2 === 0 ? "Even" : "Odd"}</p>
      <button onClick={removeOne}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

export default Counter;
```

**`src/App.jsx`:**

```jsx
import Counter from "./Counter.jsx";

function App() {
  return (
    <div>
      <Counter />
      <Counter />
    </div>
  );
}

export default App;
```

**`src/index.css`:**

```css
body {
  font-family: Arial, sans-serif;
  text-align: center;
}

.counter h1 {
  font-size: 80px;
  margin: 10px;
}

.big {
  color: red;
}

button {
  font-size: 20px;
  margin: 5px;
  padding: 10px 20px;
}
```

**תשובה להשוואה:** בשיעור 3 כתבנו `textContent` בכל פונקציה (או בפונקציה משותפת `showCount`), ובדיקת הצבע הייתה בתוך הקוד שמשנה. כאן **אין** `textContent` בכלל, והצבע נקבע **ב-JSX** לפי `count` – ולכן הוא תמיד נכון, לא משנה איזה כפתור שינה את המספר.

---

## תרגיל 2 – מצאו את הבאגים

```jsx
// Fix 1: useState must be imported from React
import { useState } from "react";

function Shopping() {
  const [items, setItems] = useState(["Milk", "Bread"]);
  const [text, setText] = useState("");

  const addItem = (event) => {
    event.preventDefault();
    // Fix 2: never push - give React a NEW array
    setItems([...items, text]);
    setText("");
  };

  return (
    // Fix 3: events in React are camelCase - onSubmit
    <form onSubmit={addItem}>
      {/* Fix 4: a controlled input needs onChange, or you cannot type */}
      <input value={text} onChange={(event) => setText(event.target.value)} />
      <button type="submit">Add</button>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {/* Fix 5: an arrow function - otherwise setItems([]) runs while drawing */}
      <button type="button" onClick={() => setItems([])}>
        Clear
      </button>
    </form>
  );
}

export default Shopping;
```

> 💡 **נקודה למתקדמים:** `type="button"` על כפתור ה-`Clear`. כפתור בתוך `<form>` הוא כפתור **שליחה** כברירת מחדל – בלי `type="button"`, לחיצה על `Clear` הייתה גם שולחת את הטופס ומוסיפה פריט (ריק). זו לא אחת מחמש הטעויות, אבל כדאי להראות אותה.
> 💡 **סדר הגילוי בכיתה:** קודם מסך לבן עם `useState is not defined` (טעות 1). אחרי שמתקנים אותה – שוב מסך לבן, הפעם `Too many re-renders` (טעות 5). רק אחרי שתיהן הדף מופיע, ואז מגלים את טעויות 2–4 כשמנסים להקליד ולהוסיף. שוב: **מתקנים שגיאה אחת, ושומרים, וקוראים את הבאה**.

---

## תרגיל 3 – תיבת ציוץ

```jsx
import { useState } from "react";

function TweetBox() {
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);

  const left = 100 - text.length;

  const post = () => {
    if (text.trim() === "" || left < 0) {
      return;
    }
    // The new tweet goes FIRST
    setTweets([{ id: Date.now(), text: text }, ...tweets]);
    setText("");
  };

  return (
    <div className="tweet-box">
      <textarea value={text} onChange={(event) => setText(event.target.value)} rows={4} />
      <p className={left < 10 ? "warning" : ""}>{left} characters left</p>
      <button onClick={post} disabled={left < 0}>
        Post
      </button>

      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>{tweet.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default TweetBox;
```

```css
.warning {
  color: red;
}
```

> 💡 `[newTweet, ...tweets]` – החדש **לפני** הישנים. זו הזדמנות לחזור על תרגיל הפיזור משיעור 6 (`[0, ...numbers]`).

---

## תרגיל 4 – הקטלוג עם חיפוש וסינון

```jsx
import { useState } from "react";
import CourseCard from "./CourseCard.jsx";

const courses = [
  { id: 1, title: "Python for Beginners", teacher: "Ahmad", hours: 40, free: true },
  { id: 2, title: "Web Development", teacher: "Rana", hours: 60, free: false },
  { id: 3, title: "Cyber Security", teacher: "Omar", hours: 50, free: false },
  { id: 4, title: "Databases and SQL", teacher: "Dana", hours: 30, free: true },
  { id: 5, title: "React and Angular", teacher: "Ahmad", hours: 70, free: false },
];

function App() {
  const [search, setSearch] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);

  // Calculated on every draw - not State
  let visible = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );
  if (freeOnly) {
    visible = visible.filter((course) => course.free);
  }

  return (
    <div>
      <h1>Atid Courses</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search a course..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button onClick={() => setFreeOnly(!freeOnly)}>
          {freeOnly ? "Show all" : "Free only"}
        </button>
      </div>

      <p>
        Showing {visible.length} of {courses.length} courses
      </p>

      {visible.length === 0 ? (
        <p>No courses found</p>
      ) : (
        <div className="courses">
          {visible.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
```

(`CourseCard` – מתרגיל 6 בשיעור 7.)

**תשובה לשאלה למחשבה:** `visible` נגזר **לגמרי** מ-`courses`, `search` ו-`freeOnly`. כל פעם שאחד מהם משתנה, React מציירת מחדש ו-`visible` מחושב מחדש – תמיד נכון. אם היינו שומרים אותו ב-State, היינו צריכים לזכור לעדכן **גם** אותו בכל שינוי – בדיוק סוג הבאג ש-React באה למנוע. **כלל:** מה שאפשר לחשב – לא שומרים ב-State.

> 💡 השוו לשיעור 5: שם `render()` עשתה את אותו חישוב. כאן גוף הרכיב **הוא** ה-`render`.

---

## תרגיל 5 – שדרוג לרשימת המשימות

**ב-`App.jsx` – State חדש, ו-`visible` מחושב:**

```jsx
  const [filter, setFilter] = useState("all");

  // ... the actions stay the same ...

  const left = tasks.filter((task) => !task.done).length;
  const doneCount = tasks.length - left;

  let visible = tasks;
  if (filter === "active") {
    visible = tasks.filter((task) => !task.done);
  }
  if (filter === "done") {
    visible = tasks.filter((task) => task.done);
  }

  // Bonus
  const editTask = (id, oldText) => {
    const newText = prompt("Edit task:", oldText);
    if (newText === null || newText.trim() === "") {
      return;
    }
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, text: newText.trim() };
        }
        return task;
      })
    );
  };
```

**ב-JSX:**

```jsx
      <div className="filters">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>
          Active
        </button>
        <button className={filter === "done" ? "active" : ""} onClick={() => setFilter("done")}>
          Done
        </button>
      </div>

      <p>
        {tasks.length > 0 && left === 0 ? "All done! 🎉" : `${left} of ${tasks.length} tasks left`}
      </p>

      <ul className="task-list">
        {visible.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ))}
      </ul>

      {doneCount > 0 ? (
        <button className="secondary" onClick={clearDone}>
          Clear done tasks
        </button>
      ) : null}
```

**ב-`TaskItem.jsx` (בונוס):**

```jsx
function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const { id, text, done } = task;

  return (
    <li className={done ? "done" : ""}>
      <input type="checkbox" checked={done} onChange={() => onToggle(id)} />
      <span onDoubleClick={() => onEdit(id, text)}>{text}</span>
      <button onClick={() => onDelete(id)}>✕</button>
    </li>
  );
}

export default TaskItem;
```

**CSS:**

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

> 💡 `&&` בתנאי (`tasks.length > 0 && left === 0`) = "וגם". ו-`: null` בטרנרי של הכפתור = "אל תציג כלום" – React מתעלמת מ-`null`.

---

## תרגיל 6 – רשימת קניות עם כמויות

**`src/ItemRow.jsx`:**

```jsx
function ItemRow({ item, onIncrease, onDecrease }) {
  const { id, name, amount } = item;

  return (
    <li>
      {name} × {amount}
      <button onClick={() => onIncrease(id)}>+</button>
      <button onClick={() => onDecrease(id)}>-</button>
    </li>
  );
}

export default ItemRow;
```

**`src/App.jsx`:**

```jsx
import { useState } from "react";
import ItemRow from "./ItemRow.jsx";

function App() {
  const [items, setItems] = useState([
    { id: 1, name: "Milk", amount: 2 },
    { id: 2, name: "Bread", amount: 1 },
  ]);
  const [name, setName] = useState("");

  // change = 1 or -1; items that reach 0 are removed
  const changeAmount = (id, change) => {
    setItems(
      items
        .map((item) => {
          if (item.id === id) {
            return { ...item, amount: item.amount + change };
          }
          return item;
        })
        .filter((item) => item.amount > 0)
    );
  };

  const addItem = (event) => {
    event.preventDefault();
    const newName = name.trim();
    if (newName === "") {
      return;
    }

    const exists = items.some((item) => item.name === newName);
    if (exists) {
      setItems(
        items.map((item) => {
          if (item.name === newName) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        })
      );
    } else {
      setItems([...items, { id: Date.now(), name: newName, amount: 1 }]);
    }
    setName("");
  };

  // Bonus: sort a COPY - sort() changes the array it is called on
  const sortByName = () => {
    setItems([...items].sort((a, b) => a.name.localeCompare(b.name)));
  };

  let total = 0;
  for (const item of items) {
    total = total + item.amount;
  }

  return (
    <div>
      <h1>Shopping list</h1>
      <form onSubmit={addItem}>
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Product name" />
        <button type="submit">Add</button>
      </form>

      <button onClick={sortByName}>Sort A-Z</button>

      <ul>
        {items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            onIncrease={(id) => changeAmount(id, 1)}
            onDecrease={(id) => changeAmount(id, -1)}
          />
        ))}
      </ul>

      <p>Total items: {total}</p>
    </div>
  );
}

export default App;
```

**תשובה לבונוס:** `sort` (בניגוד ל-`map` ו-`filter`) **משנה את המערך עצמו**. `items.sort(...)` היה משנה את ה-State הקיים, ו-React הייתה מקבלת את אותו מערך – בדיוק כמו `push`. `[...items]` יוצר עותק, ממיינים אותו, ונותנים ל-React מערך חדש.

**מחוון מוצע (100):** `ItemRow` עם שלושה Props – 20 · `+`/`-` עם `map` ופיזור – 20 · מחיקה ב-0 – 15 · הוספה עם טופס מבוקר – 15 · מוצר קיים מגדיל כמות – 15 · סכום נכון – 10 · בלי `push` ובלי שינוי ישיר של State – 5.
