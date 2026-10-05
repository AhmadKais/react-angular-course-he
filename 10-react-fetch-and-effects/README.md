# שיעור 10 – React: נתונים מהשרת – `fetch`, `async`/`await` ו-`useEffect`

> **מה צריך לדעת לפני?** את שיעור 9 – הקטלוג עם חיפוש, סינון, מיון ומועדפים. ומשיעור 6 (תרגיל 5) – `localStorage` ו-`JSON`, אם עשיתם אותו (נחזור עליהם כאן).
> **כמה זמן?** שיעור אחד (כשעתיים), כולל תרגול בכיתה.
> **מה בונים?** את אותו קטלוג – אבל הקורסים כבר **לא כתובים בקוד**: הם נטענים **מהשרת**. בזמן הטעינה מופיע `Loading...`, אם יש תקלה – הודעת שגיאה, והמועדפים **נשמרים** ולא נעלמים ברענון.

## 🎯 מה נדע בסוף השיעור

1. מה זה **שרת**, **API** ו-**JSON**.
2. לבקש נתונים משרת עם **`fetch`**.
3. לחכות לתשובה עם **`async` / `await`**, ולטפל בתקלות עם **`try` / `catch`**.
4. להשתמש ב-**`useEffect`** – כדי להריץ קוד **אחרי** שהמסך צויר.
5. להבין את **מערך התלויות** (`[]`, `[favorites]`) – מתי ה-effect רץ.
6. להציג **שלושה מצבים**: טוען, שגיאה, ונתונים.
7. לשמור נתונים בדפדפן עם `localStorage`, כך שלא ייעלמו ברענון.

---

## 1. מאיפה מגיעים הנתונים באתר אמיתי?

### 📖 הסבר

עד עכשיו הנתונים היו **כתובים בקוד**: `const courses = [...]`. אבל באתר אמיתי – הקורסים, ההודעות בוואטסאפ, המוצרים באמזון – נשמרים **בשרת**, ומשתנים כל הזמן. הקוד שלנו לא יכול לדעת אותם מראש. הוא צריך **לבקש** אותם.

| מונח | מה זה |
|---|---|
| **שרת** (Server) | מחשב שמחזיק את הנתונים ועונה לבקשות (זוכרים מהשיעור הראשון?) |
| **API** | "הדלפק" של השרת – רשימת כתובות שאפשר לבקש מהן נתונים. למשל: `/courses.json` |
| **JSON** | **הפורמט** שבו השרת שולח את הנתונים – טקסט שנראה **בדיוק** כמו מערכים ואובייקטים של JavaScript |

### 🌍 מהעולם האמיתי

**מסעדה עם מלצר.** אתם (האתר) לא נכנסים למטבח (מסד הנתונים). אתם אומרים למלצר (ה-API) מה אתם רוצים, הוא הולך, ו**אחרי זמן מה** חוזר עם המנה (ה-JSON). בזמן הזה – אתם מחכים.

### 📖 JSON – איך הוא נראה

```json
[
  { "id": 1, "title": "Python for Beginners", "teacher": "Ahmad", "hours": 40, "free": true },
  { "id": 2, "title": "Web Development", "teacher": "Rana", "hours": 60, "free": false }
]
```

כמעט כמו מערך של JavaScript – עם **שלושה** כללים קפדניים:

| כלל | ✅ JSON תקין | ❌ לא תקין |
|---|---|---|
| שמות המפתחות – **במירכאות כפולות** | `"title": "Python"` | `title: "Python"` |
| טקסט – רק מירכאות **כפולות** | `"Python"` | `'Python'` |
| **אין פסיק** אחרי הפריט האחרון | `[1, 2, 3]` | `[1, 2, 3,]` |

> ⚠️ טעות אחת קטנה ב-JSON – פסיק מיותר, מירכאה בודדת – והקובץ **כולו** לא נקרא. נראה את זה בהמשך.

---

## 2. `fetch` – לבקש נתונים

### 📖 הסבר

**`fetch`** ("להביא") היא פונקציה של הדפדפן ששולחת בקשה לכתובת, ומקבלת תשובה. **אבל** – התשובה לא מגיעה מיד. השרת יכול להיות בצד השני של העולם; זה יכול לקחת עשירית שנייה, או שלוש שניות.

לכן משתמשים במילה **`await`** – "**חכה** עד שהתשובה תגיע, ורק אז המשך לשורה הבאה":

```js
const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
const user = await response.json();
console.log(user.name);
```

| השורה | מה היא עושה |
|---|---|
| `await fetch(...)` | שולחת בקשה, ו**מחכה** לתשובה מהשרת |
| `response` | התשובה – "מעטפה" עם פרטים (האם הצליח, מה הסוג…) והתוכן בפנים |
| `await response.json()` | **פותחת** את המעטפה: קוראת את התוכן והופכת את ה-JSON לאובייקט/מערך של JavaScript. גם זה לוקח זמן – לכן שוב `await` |

### ✋ נסו בקונסול – עכשיו!

פתחו כל אתר בדפדפן, F12 ← **Console**, והקלידו את שלוש השורות למעלה (Enter אחרי כל אחת). אחרי רגע יודפס: `Leanne Graham` – שם של משתמש שהגיע **משרת אמיתי באינטרנט**. 🎉

(`jsonplaceholder.typicode.com` הוא שרת חינמי לתרגול, עם נתונים מומצאים.)

> 💡 **נסו גם:** `user` לבד – ותראו את כל האובייקט. או `/users` בלי `/1` – ותקבלו מערך של עשרה משתמשים.

### 🌍 מהעולם האמיתי

**הזמנה בפלאפל עם זמזם.** מזמינים (`fetch`), מקבלים **זמזם** – הבטחה שהאוכל יגיע. מחכים (`await`). הזמזם מצפצף – מקבלים את המגש (`response`). ופותחים את העטיפה (`response.json()`).

---

## 3. `async` – פונקציה שמותר לה לחכות

### 📖 הסבר

בקונסול מותר לכתוב `await` "סתם". **בקוד** – רק בתוך פונקציה שמסומנת **`async`**:

```js
const loadUser = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await response.json();
  console.log(user.name);
};

loadUser();
```

`async` לפני הסוגריים = "בפונקציה הזאת יהיו המתנות".

> ⚠️ `await` בפונקציה **בלי** `async` – שגיאה: `` `await` is only allowed within async functions ``.

### 📖 `try` / `catch` – מה אם משהו נכשל?

אין אינטרנט, השרת נפל, הכתובת שגויה, ה-JSON שבור… כש-`fetch` או `json()` נכשלים – הם **זורקים שגיאה**, והקוד נעצר. כדי לטפל בזה בעצמנו – עוטפים ב-`try` / `catch`:

```js
const loadUser = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await response.json();
    console.log(user.name);
  } catch {
    console.log("Something went wrong");
  }
};
```

| החלק | המשמעות |
|---|---|
| `try { ... }` | "**נסה** להריץ את זה" |
| `catch { ... }` | "**אם** משהו בתוך ה-`try` נכשל – אל תקרוס, תריץ את זה במקום" |

### 🌍 מהעולם האמיתי

**רשת ביטחון של לוליין.** הוא **מנסה** ללכת על החבל (`try`). אם הוא נופל – הרשת **תופסת** אותו (`catch`), וההופעה ממשיכה.

---

## 4. איפה ב-React? הבעיה של "בגוף הרכיב"

### 📖 הבעיה

הניסיון הראשון של כולם – לשים את הטעינה ישר בגוף הרכיב:

```jsx
function App() {
  const [courses, setCourses] = useState([]);

  loadCourses();   // ❌ fetch -> setCourses -> draw again -> loadCourses() -> ...
```

זוכרים ש-React **מפעילה את פונקציית הרכיב בכל ציור**? אז:

1. ציור → `loadCourses()` → `setCourses(...)`.
2. `setCourses` → **ציור חדש** → שוב `loadCourses()` → שוב `setCourses`…
3. … לנצח. מאות בקשות לשרת בשנייה.

צריך דרך להגיד ל-React: "**את זה – תריצי רק פעם אחת, אחרי שציירת**".

---

## 5. `useEffect` – "אחרי שציירת, תעשי…"

### 📖 הסבר

```jsx
import { useEffect, useState } from "react";

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    console.log("The screen is ready!");
  }, []);
```

| החלק | המשמעות |
|---|---|
| `useEffect(...)` | "React, הנה קוד להרצה **אחרי** שתסיימי לצייר" |
| `() => { ... }` | הקוד עצמו – פונקציית חץ |
| `[]` | **מערך התלויות**: "מתי להריץ שוב?" – מערך **ריק** = **אף פעם**. רק פעם אחת, אחרי הציור הראשון |

**Effect** ("תופעת לוואי") = כל מה שהרכיב עושה **מעבר** לציור: לפנות לשרת, לשמור בדפדפן, להפעיל טיימר. הציור עצמו צריך להיות "נקי" – ואת תופעות הלוואי שמים ב-`useEffect`.

### 📖 מערך התלויות – הכי חשוב בשיעור

| מה כותבים | מתי ה-effect רץ | דוגמה |
|---|---|---|
| `[]` | **פעם אחת**, אחרי הציור הראשון | טעינת נתונים מהשרת כשהדף נפתח |
| `[favorites]` | אחרי הציור הראשון, **ושוב בכל פעם ש-`favorites` משתנה** | שמירת המועדפים בכל שינוי |
| *(בלי מערך בכלל)* | אחרי **כל** ציור | כמעט אף פעם לא רוצים את זה |

### 🌍 מהעולם האמיתי

**שעון מעורר עם הגדרות.** `[]` = "צלצל פעם אחת, מחר בבוקר". `[favorites]` = "צלצל **בכל פעם** שמשהו משתנה ברשימה". בלי מערך = "צלצל כל דקה, תמיד" – מעצבן, ובדרך כלל טעות.

> ⚠️ **שכחתם את ה-`[]`?** בניסוי שלנו, `useEffect` עם `fetch` **בלי** מערך תלויות שלח **393 בקשות לשרת תוך שתי שניות וחצי**. בדף עצמו הכול "נראה בסדר" – רואים את זה רק בלשונית **Network**. תמיד בודקים את מערך התלויות.

---

## 6. 🔨 בונים יחד – הקטלוג נטען מהשרת

### שלב 0 – הכנה

1. **העתיקו** את תיקיית הפרויקט `catalog` משיעור 9 לתיקייה חדשה בשם `catalog-online` (בלי `node_modules` – מהר יותר להתקין מחדש), ובה: `npm install` ואז `npm run dev`.
2. צרו בתיקייה **`public`** קובץ בשם `courses.json`, והעתיקו אליו את התוכן מ-[`project/public/courses.json`](project/public/courses.json) – שמונה קורסים, בפורמט JSON.
3. **מחקו** את `src/courses.js` – הנתונים כבר לא בקוד!

> 💡 **למה `public`?** כל קובץ ב-`public` מוגש כמו שהוא, בכתובת `/שם-הקובץ`. כך `courses.json` זמין ב-`http://localhost:5173/courses.json` – נסו לפתוח את הכתובת בדפדפן! זה "שרת" קטן שמחזיר JSON – בדיוק כמו API אמיתי. כשתעבדו מול שרת אמיתי, תשנו רק את הכתובת ב-`fetch`.

### שלב 1 – שלושה State-ים חדשים

ב-`App.jsx` – מחקו את `import courses from "./courses.js";`, עדכנו את ה-`import` של React:

```jsx
import { useEffect, useState } from "react";
```

ובתחילת `App`, לפני ה-State-ים הקיימים:

```jsx
  // 1. State - the data from the server, and what the USER chose
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
```

| State | מתחיל ב- | למה |
|---|---|---|
| `courses` | `[]` | בהתחלה – עוד אין קורסים. מערך ריק, כדי ש-`filter` ו-`map` יעבדו כבר בציור הראשון |
| `loading` | `true` | ברגע שהדף נפתח – אנחנו **כבר** טוענים |
| `error` | `""` | אין שגיאה (עדיין) |

### שלב 2 – הטעינה, ב-`useEffect`

מתחת ל-State-ים:

```jsx
  // 2. Effects - things that happen AFTER React draws the screen

  // Load the courses from the server - once, when the page opens
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetch("/courses.json");
        const data = await response.json();
        setCourses(data);
      } catch {
        setError("Could not load the courses. Please try again later.");
      }
      setLoading(false);
    };

    loadCourses();
  }, []);
```

שורה אחר שורה:

1. `useEffect(..., [])` – רץ **פעם אחת**, אחרי הציור הראשון.
2. בתוכו – פונקציית `async` בשם `loadCourses`, ו**הפעלה** שלה בסוף: `loadCourses();`. (פונקציית ה-effect עצמה לא יכולה להיות `async` – לכן כותבים פונקציה פנימית.)
3. `try`: מבקשים, פותחים את ה-JSON, ושמים ב-State עם `setCourses` – React מציירת מחדש עם הקורסים.
4. `catch`: אם משהו נכשל – שמים הודעה ב-`error`.
5. **בכל מקרה** – הטעינה נגמרה: `setLoading(false)`.

### שלב 3 – מה מציגים בזמן הטעינה, ובשגיאה

ממש **לפני** ה-`return` הגדול:

```jsx
  // 5. While loading, or if something went wrong - show only a message
  if (loading) {
    return <p className="message">Loading courses...</p>;
  }

  if (error !== "") {
    return <p className="message error">{error}</p>;
  }
```

רכיב יכול להחזיר **דברים שונים** במצבים שונים. `return` מוקדם = "במצב הזה – הצג רק את זה, ואל תמשיך".

והוסיפו ל-`index.css`:

```css
/* "Loading..." and error messages */
.message {
  text-align: center;
  font-size: 20px;
  margin-top: 60px;
}

.error {
  color: #dc2626;
}
```

שמרו – ו**שמונה** קורסים מופיעים (שישה מהשיעור הקודם, ועוד שניים שנוספו ב-JSON). 🎉

> ⚠️ **כלל של React: כל ה-`useState` וה-`useEffect` – בראש הרכיב, לפני כל `return`.** React מזהה אותם **לפי הסדר** שבו הם נקראים. אם `useState` נמצא **אחרי** `return` מוקדם – בציור אחד הוא נקרא ובאחר לא, ו-React מתבלבלת: `Rendered more hooks than during the previous render`.

### 📖 מה בדיוק קורה כשהדף נפתח

| שלב | `loading` | `courses` | על המסך |
|---|:---:|:---:|---|
| ציור ראשון | `true` | `[]` | `Loading courses...` |
| `useEffect` רץ ← `fetch` יוצא לשרת | `true` | `[]` | `Loading courses...` |
| התשובה הגיעה ← `setCourses(data)` | `true` | 8 קורסים | `Loading courses...` |
| `setLoading(false)` ← ציור חדש | `false` | 8 קורסים | **הקטלוג!** |

---

## 7. 🔍 לראות את הבקשה – לשונית Network

### 🔨 עושים יחד

1. F12 ← לשונית **Network**. רעננו את הדף.
2. ברשימה – חפשו `courses.json`. לחצו עליו, ובלשונית **Response** – תראו את ה-JSON שהגיע.
3. **הטעינה מהירה מדי, ולא רואים את `Loading...`?** בראש לשונית Network יש תפריט שכתוב בו `No throttling`. בחרו **`Slow 4G`** ורעננו – עכשיו רואים את ההודעה לרגע. (אל תשכחו להחזיר ל-`No throttling`!)

> 💡 **"למה `courses.json` מופיע פעמיים?"** בזמן פיתוח (`npm run dev`), React מריצה כל `useEffect` **פעמיים** בכוונה – כדי לעזור לגלות באגים. זה קורה **רק** בפיתוח; באתר האמיתי – פעם אחת. אפשר להתעלם.

### ✋ תורכם – לשבור בכוונה

1. שנו את שם הקובץ ב-`fetch` ל-`/course.json` (בלי s). מה מופיע?
2. החזירו את השם. עכשיו פתחו את `public/courses.json` והוסיפו **פסיק** אחרי הסוגר `}` של הקורס האחרון. מה מופיע? (ואל תשכחו למחוק אותו!)

<details><summary>מה קרה</summary>

בשני המקרים: `Could not load the courses. Please try again later.` – ה-`catch` תפס את התקלה, והדף לא קרס. במקרה השני הקובץ **קיים** – אבל ה-JSON שבור, ו-`response.json()` נכשלת.

</details>

---

## 8. מועדפים שלא נעלמים – `localStorage`

### 📖 הבעיה

סמנו שני קורסים בכוכב ורעננו. **המועדפים נעלמו.** State חי רק כל עוד הדף פתוח – ברענון, הכול מתחיל מחדש.

### 📖 `localStorage` – "מגירה" בדפדפן

לדפדפן יש **מגירה** קטנה לכל אתר – `localStorage` – שנשארת גם אחרי רענון, ואפילו אחרי כיבוי המחשב. היא שומרת רק **טקסט**, לכן הופכים את המערך ל-JSON ובחזרה:

| הפעולה | הקוד |
|---|---|
| **לשמור** – מערך → טקסט → מגירה | `localStorage.setItem("favorites", JSON.stringify(favorites))` |
| **לקרוא** – מגירה → טקסט | `localStorage.getItem("favorites")` – מחזירה `null` אם אין כלום |
| טקסט → מערך | `JSON.parse(text)` |

### 🔨 עושים יחד – שמירה בכל שינוי

מתחת ל-`useEffect` של הטעינה:

```jsx
  // Save the favorites in the browser - every time they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
```

`[favorites]` – "**בכל פעם** ש-`favorites` משתנה – שמרי". לא צריך לזכור לשמור בתוך `toggleFavorite` – ה-effect דואג לזה תמיד.

### 🔨 עושים יחד – קריאה כשהדף נפתח

**מעל** `function App()` (מחוץ לרכיב):

```jsx
// Read the saved favorites from the browser (or start with an empty list)
const loadFavorites = () => {
  const saved = localStorage.getItem("favorites");
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
};
```

ובתוך `App` – החליפו את השורה של `favorites`:

```jsx
  const [favorites, setFavorites] = useState(loadFavorites);
```

שימו לב: **`loadFavorites` בלי סוגריים**. מעבירים ל-`useState` את **הפונקציה** – ו-React מפעילה אותה **רק בציור הראשון**, כדי לקבל את הערך ההתחלתי. (עם סוגריים היא הייתה רצה בכל ציור – וקוראת מהמגירה סתם.)

סמנו כוכבים, רעננו – **הם נשארו!** 🎉

> 💡 **לראות את המגירה:** F12 ← לשונית **Application** ← **Local Storage** ← `http://localhost:5173`. שם תראו `favorites` עם משהו כמו `[2,5]`. אפשר גם למחוק משם.

---

## 9. 💻 הקוד המלא

כל הפרויקט נמצא בתיקייה [`project`](project/) של השיעור (כדי להריץ: `npm install` ואז `npm run dev`). `CourseCard`, `SearchBar` ו-`FilterButtons` – בלי שינוי משיעור 9.

**`src/App.jsx`:**

```jsx
import { useEffect, useState } from "react";
import CourseCard from "./CourseCard.jsx";
import SearchBar from "./SearchBar.jsx";
import FilterButtons from "./FilterButtons.jsx";

// Read the saved favorites from the browser (or start with an empty list)
const loadFavorites = () => {
  const saved = localStorage.getItem("favorites");
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
};

function App() {
  // 1. State - the data from the server, and what the USER chose
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [favorites, setFavorites] = useState(loadFavorites);

  // 2. Effects - things that happen AFTER React draws the screen

  // Load the courses from the server - once, when the page opens
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetch("/courses.json");
        const data = await response.json();
        setCourses(data);
      } catch {
        setError("Could not load the courses. Please try again later.");
      }
      setLoading(false);
    };

    loadCourses();
  }, []);

  // Save the favorites in the browser - every time they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 3. Actions
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favoriteId) => favoriteId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setPriceFilter("all");
  };

  // 4. Calculated on every draw - NOT State
  const text = search.toLowerCase();

  let visible = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(text) ||
      course.teacher.toLowerCase().includes(text)
  );

  if (priceFilter === "free") {
    visible = visible.filter((course) => course.free);
  }
  if (priceFilter === "paid") {
    visible = visible.filter((course) => !course.free);
  }

  if (sortBy === "title") {
    visible = [...visible].sort((a, b) => a.title.localeCompare(b.title));
  } else {
    visible = [...visible].sort((a, b) => a.hours - b.hours);
  }

  // 5. While loading, or if something went wrong - show only a message
  if (loading) {
    return <p className="message">Loading courses...</p>;
  }

  if (error !== "") {
    return <p className="message error">{error}</p>;
  }

  return (
    <div className="page">
      {/* ... exactly the same JSX as in lesson 9 ... */}
    </div>
  );
}

export default App;
```

(ה-JSX שבתוך ה-`return` האחרון – **זהה** לשיעור 9. הקובץ המלא – ב-[`project/src/App.jsx`](project/src/App.jsx).)

**מה יופיע על המסך:** לרגע `Loading courses...`, ואז הקטלוג עם **שמונה** קורסים. כוכבים שמסמנים – נשארים גם אחרי רענון.

---

## 10. ⚠️ טעויות נפוצות – ואיך מתקנים

| מה קרה | למה | התיקון |
|---|---|---|
| ``"`await` is only allowed within async functions"`` | `await` בפונקציה בלי `async` | `const load = async () => { ... }` |
| `courses.filter is not a function` | שכחתם `await` לפני `response.json()` – נשמרה "הבטחה" במקום מערך | `const data = await response.json();` |
| `Could not load the courses...` אף שהקובץ קיים | ה-JSON שבור: פסיק מיותר, מירכאות בודדות, מפתח בלי מירכאות | פתחו את הכתובת בדפדפן ובדקו את הקובץ |
| `Could not load...` – והקובץ באמת לא נמצא | שם שגוי ב-`fetch`, או שהקובץ לא בתיקייה `public` | `public/courses.json` ו-`fetch("/courses.json")` |
| הדף עובד, אבל ב-Network מאות בקשות | שכחתם את ה-`[]` ב-`useEffect` | `useEffect(() => { ... }, [])` |
| `Rendered more hooks than during the previous render` | `useState` / `useEffect` **אחרי** `return` מוקדם | כל ה-Hooks בראש הרכיב, לפני כל `return` |
| `Loading...` לא נעלם לעולם | שכחתם `setLoading(false)` | בסוף `loadCourses`, **מחוץ** ל-`try`/`catch` |
| `useEffect is not defined` | חסר ב-`import` | `import { useEffect, useState } from "react";` |
| המועדפים נשמרים אבל נעלמים ברענון | שמירה בלי קריאה – `useState([])` במקום `useState(loadFavorites)` | קוראים מ-`localStorage` בערך ההתחלתי |
| בפתיחת הדף: `Unexpected non-whitespace character after JSON` (או `"[object Object]" is not valid JSON`) | שמרתם ב-`localStorage` בלי `JSON.stringify` – והמערך `[2, 5]` נשמר כטקסט `2,5`, שהוא לא JSON | `localStorage.setItem("favorites", JSON.stringify(favorites))`, ומחקו את הערך השבור ב-Application ← Local Storage |

---

## 11. 📚 מילון מונחים

| מונח | הסבר |
|---|---|
| **API** | כתובות בשרת שאפשר לבקש מהן נתונים |
| **JSON** | פורמט טקסט לנתונים – כמו מערכים ואובייקטים, עם מירכאות כפולות בלבד |
| **`fetch(url)`** | שולחת בקשה לשרת, ומחזירה (אחרי המתנה) את התשובה |
| **`response.json()`** | קוראת את תוכן התשובה והופכת JSON לנתוני JavaScript |
| **`async`** | מסמנת פונקציה שמותר לחכות בתוכה |
| **`await`** | "חכה כאן עד שהפעולה תסתיים" |
| **`try` / `catch`** | נסה; ואם נכשל – אל תקרוס, עשה את זה במקום |
| **`useEffect(fn, deps)`** | מריץ קוד **אחרי** הציור; `deps` קובע מתי להריץ שוב |
| **מערך תלויות** | `[]` – פעם אחת · `[x]` – בכל שינוי של `x` · בלי – בכל ציור |
| **Effect (תופעת לוואי)** | כל מה שהרכיב עושה מעבר לציור: שרת, שמירה, טיימר |
| **`localStorage`** | "מגירה" בדפדפן שנשארת אחרי רענון; שומרת רק טקסט |
| **`JSON.stringify` / `JSON.parse`** | נתונים → טקסט / טקסט → נתונים |
| **Hooks** | הפונקציות של React שמתחילות ב-`use` – תמיד בראש הרכיב |

---

## ✅ בדקו את עצמכם

1. מה הטעות ב-JSON הזה: `[{ title: 'Python', hours: 40, }]`? (יש **שלוש**.)
2. למה צריך **שני** `await` – אחד ל-`fetch` ואחד ל-`response.json()`?
3. מה קורה אם כותבים `fetch` + `setCourses` ישר בגוף הרכיב, בלי `useEffect`?
4. מה ההבדל בין `useEffect(fn, [])` לבין `useEffect(fn, [favorites])`?
5. למה `loading` מתחיל ב-`true` ולא ב-`false`?
6. למה `setLoading(false)` נמצא **מחוץ** ל-`try` ול-`catch`?
7. למה כל ה-`useState` וה-`useEffect` חייבים להיות **לפני** ה-`return` של `Loading...`?
8. למה כותבים `useState(loadFavorites)` ולא `useState(loadFavorites())`?

<details><summary>תשובות</summary>

1. (א) `title` בלי מירכאות – מפתחות ב-JSON חייבים מירכאות כפולות. (ב) `'Python'` – רק מירכאות כפולות. (ג) פסיק אחרי `40` – אסור פסיק אחרי הפריט האחרון. התקין: `[{ "title": "Python", "hours": 40 }]`.
2. `fetch` מחכה לתשובה מהשרת (שמגיעה כ"מעטפה"). `response.json()` מחכה לקריאת **התוכן** והפיכתו לנתונים – גם זה לוקח זמן.
3. לולאה אינסופית: כל ציור קורא ל-`fetch`, כל תשובה קוראת ל-`setCourses`, וכל `setCourses` גורמת לציור נוסף – מאות בקשות לשרת.
4. `[]` – פעם אחת בלבד, אחרי הציור הראשון. `[favorites]` – אחרי הציור הראשון, **ושוב** בכל פעם ש-`favorites` משתנה.
5. כי ברגע שהדף נפתח, הטעינה **כבר** מתחילה – והציור הראשון צריך להציג `Loading...`, לא קטלוג ריק.
6. כי הטעינה נגמרת **בשני** המקרים – גם בהצלחה וגם בכישלון. אם הוא היה רק בתוך ה-`try`, בכישלון `Loading...` היה נשאר לנצח.
7. כי React מזהה את ה-Hooks **לפי הסדר**. אם חלק מהם נמצאים אחרי `return` מוקדם, בציורים שונים ייקרא מספר שונה של Hooks – ו-React קורסת.
8. בלי סוגריים – React מקבלת את **הפונקציה** ומפעילה אותה רק בציור הראשון. עם סוגריים – היא רצה בכל ציור (והתוצאה נזרקת), סתם קריאה מהדפדפן שוב ושוב.

</details>

---

## 🎓 סיכום – React עד כה

| שיעור | מה למדנו |
|:---:|---|
| 7 | Node.js ו-Vite · JSX · רכיבים · Props · `map` ו-`key` |
| 8 | `useState` · אירועים · שדה מבוקר · טפסים · מערכים ב-State · פונקציה כ-Prop |
| 9 | State מול ערך מחושב · כמה State-ים יחד · `select` · `sort` · להרים State למעלה |
| 10 | שרת, API ו-JSON · `fetch` · `async`/`await` · `try`/`catch` · `useEffect` · `localStorage` |

**בשיעור הבא:** אתר עם **כמה דפים** – דף בית, דף קטלוג ודף לכל קורס – עם **React Router**.

➡️ [תרגילים לשיעור 10](exercises.md)
