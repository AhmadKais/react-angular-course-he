# פתרונות – שיעור 10: נתונים מהשרת (למורה)

---

## תרגיל 1 – JSON ומערך תלויות

**א.** הטעויות: (1) פסיק אחרי `95` – אחרי הערך האחרון באובייקט; (2) `name` בלי מירכאות; (3) חסר פסיק בין האובייקט השני לשלישי; (4) `'Rana'` – מירכאות בודדות.

```json
[
  { "name": "Dana", "grade": 95 },
  { "name": "Omar", "grade": 82 },
  { "name": "Rana", "grade": 74 }
]
```

**ב.**

| ה-effect | מתי רץ |
|---|---|
| `[count]` – משנה את כותרת הלשונית | אחרי הציור הראשון, ושוב בכל פעם ש-`count` משתנה |
| `[]` – מדפיס `Hello!` | פעם אחת בלבד, אחרי הציור הראשון (בפיתוח – פעמיים, בגלל בדיקת React) |
| בלי מערך – מדפיס `Drawn!` | אחרי **כל** ציור |
| `[name]` – שומר את השם | אחרי הציור הראשון, ושוב בכל שינוי של `name` |

---

## תרגיל 2 – מצאו את הבאגים

```jsx
// Fix 1: useEffect must be imported too
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  // Fix 2: we start loading right away - so loading starts as true
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fix 3: a function with await must be async
    const loadUsers = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      // Fix 4: json() also takes time - await it
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    };
    loadUsers();
    // Fix 5: [] - load once, not after every draw (that was an endless loop of requests)
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default Users;
```

> 💡 טעות 2 לא שוברת כלום – היא רק גורמת לכך ש-`Loading...` **לא מופיע אף פעם** (בהתחלה רואים רשימה ריקה). כדאי לשאול את התלמידים: "מה רואה משתמש עם אינטרנט איטי?"
> 💡 לתלמידים מתקדמים: הפתרון עדיין חסר `try`/`catch` – בלי אינטרנט, `Loading...` יישאר לנצח.

---

## תרגיל 3 – ספר טלפונים מהשרת

```jsx
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data);
      } catch {
        setError("Could not load the users.");
      }
      setLoading(false);
    };

    loadUsers();
  }, []);

  // Bonus: the list of cities is calculated from the data
  const cities = users.map((user) => user.address.city);

  let visible = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));
  if (city !== "all") {
    visible = visible.filter((user) => user.address.city === city);
  }

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error !== "") {
    return <p className="error">{error}</p>;
  }

  return (
    <div>
      <h1>Phone book</h1>
      <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a name..." />
      <select value={city} onChange={(event) => setCity(event.target.value)}>
        <option value="all">All cities</option>
        {cities.map((cityName) => (
          <option key={cityName} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>

      <div className="users">
        {visible.map((user) => (
          <div key={user.id} className="user">
            <h2>{user.name}</h2>
            <p>📧 {user.email}</p>
            <p>📞 {user.phone}</p>
            <p>🏙️ {user.address.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
```

> 💡 בנתונים של jsonplaceholder כל עשרת המשתמשים גרים בערים **שונות**, לכן `key={cityName}` בטוח. אם היו ערים כפולות, היה צריך להסיר כפילויות קודם – למשל `[...new Set(cities)]` (לא נלמד; מתאים כאתגר).
> 💡 בדיקה: חיפוש `le` → **חמישה** משתמשים: `Leanne Graham`, `Clementine Bauch`, `Patricia Lebsack`, `Glenna Reichert`, `Clementina DuBuque` (החיפוש מוצא `le` גם באמצע השם). העיר של `Leanne Graham` היא `Gwenborough`.

---

## תרגיל 4 – כפתור "נסה שוב"

**ב-`App.jsx` – במקום ה-`useEffect` של הטעינה:**

```jsx
  const loadCourses = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/courses.json");
      const data = await response.json();
      setCourses(data);
    } catch {
      setError("Could not load the courses. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCourses();
  }, []);
```

**ובמקום ה-`return` של השגיאה:**

```jsx
  if (error !== "") {
    return (
      <div className="message">
        <p className="error">{error}</p>
        <button onClick={loadCourses}>Try again</button>
      </div>
    );
  }
```

> 💡 למה `setError("")` בתחילת הטעינה? בלי זה, גם אחרי הצלחה בניסיון השני השגיאה הישנה נשארת ב-State – והדף ממשיך להציג אותה.

---

## תרגיל 5 – רשימת המשימות זוכרת

**מעל `function App()`:**

```jsx
const defaultTasks = [
  { id: 1, text: "Learn HTML", done: true },
  { id: 2, text: "Learn CSS", done: true },
  { id: 3, text: "Learn JavaScript", done: false },
];

const loadTasks = () => {
  const saved = localStorage.getItem("tasks");
  if (saved === null) {
    return defaultTasks;
  }
  return JSON.parse(saved);
};
```

**בתוך `App`:**

```jsx
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
```

(ו-`useEffect` נוסף ל-`import`.) שאר הקוד – בלי שום שינוי.

**תשובה לשאלה:** בשיעור 6 שמרנו בתוך `render()` – וזה עבד רק כי **כל** פעולה קראה ל-`render()`. כאן ה-effect תלוי ב-`[tasks]`: **כל** שינוי של `tasks` – מכל פעולה, גם כזו שנוסיף בעתיד – יפעיל את השמירה. אי אפשר לשכוח.

---

## תרגיל 6 – פוסטים לפי משתמש

```jsx
import { useEffect, useState } from "react";

const API = "https://jsonplaceholder.typicode.com";

function App() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("1");
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Load the users - once
  useEffect(() => {
    const loadUsers = async () => {
      const response = await fetch(`${API}/users`);
      setUsers(await response.json());
    };
    loadUsers();
  }, []);

  // Load the posts - every time the chosen user changes
  useEffect(() => {
    const loadPosts = async () => {
      setLoadingPosts(true);
      const response = await fetch(`${API}/posts?userId=${userId}`);
      setPosts(await response.json());
      setLoadingPosts(false);
    };
    loadPosts();
  }, [userId]);

  return (
    <div>
      <h1>Posts</h1>
      <select value={userId} onChange={(event) => setUserId(event.target.value)}>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      {loadingPosts ? (
        <p>Loading posts...</p>
      ) : (
        <div>
          <p>{posts.length} posts</p>
          {posts.map((post) => (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
```

> 💡 הנקודה המרכזית: `[userId]`. בכל בחירה, `setUserId` ← ציור ← React רואה ש-`userId` השתנה ← ה-effect רץ שוב ← פוסטים חדשים. זה ההבדל בין `[]` ל-`[x]`, בפעולה.
> 💡 `userId` נשמר כטקסט (`"1"`), כי זה מה ש-`select` מחזיר – וזה בסדר, הוא נכנס לכתובת כטקסט בכל מקרה.
> 💡 לכל משתמש ב-jsonplaceholder יש בדיוק 10 פוסטים – לכן הבונוס תמיד יציג `10 posts`. אפשר לבקש מהתלמידים להסביר איך **בודקים** שהקוד באמת סופר ולא כותב 10 ביד.

**מחוון מוצע (100):** טעינת משתמשים ל-`select` – 20 · `useEffect` עם `[userId]` שטוען פוסטים – 30 · מצב טעינה רק לאזור הפוסטים – 20 · הצגת כותרת וגוף עם `key` – 20 · מונה פוסטים – 10.
