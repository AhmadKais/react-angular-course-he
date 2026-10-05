# שיעור 9 – React: קטלוג קורסים – חיפוש, סינון, מיון ומועדפים

> **מה צריך לדעת לפני?** את שיעורים 7–8: רכיבים, Props, `useState`, `onClick`, שדה מבוקר, פונקציה כ-Prop. ומשיעור 5 – את קטלוג הקורסים ב-JavaScript רגילה.
> **כמה זמן?** שיעור אחד (כשעתיים), כולל תרגול בכיתה.
> **מה בונים?** את **קטלוג הקורסים** משיעור 5 – הפעם ב-React, ועם יותר יכולות: חיפוש לפי שם קורס **או** מורה, שלושה כפתורי סינון, מיון, וכוכב ⭐ לסימון קורסים מועדפים.

## 🎯 מה נדע בסוף השיעור

1. להחליט **מה** צריך להיות State – ומה אפשר פשוט **לחשב**.
2. לשמור נתונים בקובץ נפרד, ולייבא אותם.
3. לחבר כמה State-ים יחד: חיפוש + סינון + מיון.
4. לעבוד עם תיבת בחירה – `<select>`.
5. למיין מערך – בלי לשנות את המקורי.
6. לפרק דף לרכיבים קטנים שמקבלים `value` ו-`onChange`.
7. להבין **איפה** לשים State שכמה רכיבים צריכים ("להרים State למעלה").

---

## 1. מתכננים: מה State, ומה מחשבים?

### 📖 הסבר

בשיעור 6 שאלנו שלוש שאלות לפני שבנינו: נתונים, מסך, פעולות. ב-React מוסיפים עוד שאלה חשובה מאוד:

> **מה צריך להיות State?**

הכלל: **State = רק מה שמשתנה, ושאי אפשר לחשב ממשהו אחר.** בקטלוג שלנו:

| הנתון | State? | למה |
|---|:---:|---|
| רשימת כל הקורסים | ❌ | היא לא משתנה בזמן שמשתמשים בדף (בשיעור הבא היא תגיע מהשרת) |
| מה הוקלד בחיפוש (`search`) | ✅ | המשתמש משנה אותו |
| איזה כפתור סינון נבחר (`priceFilter`) | ✅ | המשתמש משנה אותו |
| לפי מה ממיינים (`sortBy`) | ✅ | המשתמש משנה אותו |
| אילו קורסים במועדפים (`favorites`) | ✅ | המשתמש משנה אותו |
| הקורסים **שמוצגים** (`visible`) | ❌ | **מחשבים** אותם מהקורסים + חיפוש + סינון + מיון |
| כמה קורסים מוצגים | ❌ | `visible.length` |
| כמה מועדפים יש | ❌ | `favorites.length` |

### 🌍 מהעולם האמיתי

**מחשבון בחנות.** הקופאית לא כותבת על פתק "הסכום הכולל" ומעדכנת אותו ביד בכל פעם שמוסיפים מוצר – היא **מחשבת** אותו מהמוצרים בסל. כך הסכום **תמיד** נכון. אם היא הייתה שומרת אותו בנפרד – מספיק שהיא שוכחת לעדכן פעם אחת, והסכום שגוי.

> 💡 **למה זה כל כך חשוב?** כל State נוסף הוא עוד דבר שצריך **לזכור לעדכן**. מה שמחושב – תמיד נכון לבד, כי React מחשבת אותו מחדש בכל ציור. (זו בדיוק התשובה לשאלה למחשבה בתרגיל 4 של שיעור 8.)

---

## 2. הכנה – פרויקט חדש והנתונים בקובץ משלהם

### 🔨 עושים יחד

1. צרו פרויקט חדש בשם `catalog` (כמו בשיעורים 7–8: `npm create vite@latest`, Oxlint, **No**, ואז `cd`, `npm install`, `npm run dev`).
2. נקו: מחקו את `src/App.css` ואת `src/assets`, והחליפו את `src/index.css` בקובץ [`project/src/index.css`](project/src/index.css) – זה ה-CSS של שיעור 5, עם כמה תוספות לכפתורים ולכוכב.
3. צרו קובץ חדש, `src/courses.js` (**`.js`** – אין בו JSX, רק נתונים):

```js
// The data - all the courses of the college
const courses = [
  { id: 1, title: "Python for Beginners", teacher: "Ahmad", hours: 40, free: true },
  { id: 2, title: "Web Development", teacher: "Rana", hours: 60, free: false },
  { id: 3, title: "Cyber Security", teacher: "Omar", hours: 50, free: false },
  { id: 4, title: "Databases and SQL", teacher: "Dana", hours: 30, free: true },
  { id: 5, title: "React and Angular", teacher: "Ahmad", hours: 70, free: false },
  { id: 6, title: "Computer Networks", teacher: "Yousef", hours: 45, free: true },
];

export default courses;
```

> 💡 `export default` עובד לא רק על רכיבים – על **כל דבר**: מערך, אובייקט, פונקציה. כשהנתונים בקובץ נפרד, `App.jsx` נשאר קצר וקריא.

4. צרו את `src/CourseCard.jsx` – בדיוק כמו בתרגיל 6 של שיעור 7:

```jsx
function CourseCard({ course }) {
  const { title, teacher, hours, free } = course;

  return (
    <div className="course">
      <h2>{title}</h2>
      <p>Teacher: {teacher}</p>
      <p>{hours} hours</p>
      <span className={free ? "badge free" : "badge paid"}>{free ? "Free" : "Paid"}</span>
    </div>
  );
}

export default CourseCard;
```

5. ו-`src/App.jsx` – נקודת ההתחלה:

```jsx
import courses from "./courses.js";
import CourseCard from "./CourseCard.jsx";

function App() {
  return (
    <div className="page">
      <h1>Atid Courses</h1>

      <div className="courses">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default App;
```

שמרו – שישה כרטיסים. עכשיו מוסיפים יכולות, אחת אחרי השנייה.

---

## 3. חיפוש – לפי שם הקורס **או** המורה

### 🔨 עושים יחד

ב-`App.jsx` – `import { useState } from "react";` בשורה הראשונה, ובתחילת `App`:

```jsx
  const [search, setSearch] = useState("");

  const text = search.toLowerCase();

  const visible = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(text) ||
      course.teacher.toLowerCase().includes(text)
  );
```

ב-JSX – מתחת ל-`h1`, תיבת חיפוש מבוקרת (שיעור 8) ושורת ספירה:

```jsx
      <div className="controls">
        <input
          type="text"
          placeholder="Search a course or teacher..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <p>
        Showing {visible.length} of {courses.length} courses
      </p>
```

ובמקום `courses.map` – **`visible.map`**. נסו להקליד `ahmad`, ואז `cyber`.

### 📖 `||` – "או"

```jsx
course.title.toLowerCase().includes(text) || course.teacher.toLowerCase().includes(text)
```

`||` = "**או**". התנאי נכון אם **לפחות אחד** מהצדדים נכון: השם מכיל את הטקסט, **או** שם המורה מכיל אותו.

| שם הקורס מתאים? | שם המורה מתאים? | `\|\|` |
|:---:|:---:|:---:|
| ✅ | ❌ | ✅ |
| ❌ | ✅ | ✅ |
| ❌ | ❌ | ❌ |

(ויש גם `&&` = "**וגם**" – נכון רק אם **שני** הצדדים נכונים.)

> 💡 **שימו לב:** `visible` הוא `const` רגיל – **לא** State. בכל הקשה, `setSearch` גורמת לציור מחדש, והשורה של `visible` רצה שוב עם החיפוש החדש.

---

## 4. כפתורי סינון – State שהוא מחרוזת

### 📖 הסבר

בשיעור 5 היה כפתור **אחד** – `freeOnly`, `true` או `false`. עכשיו נרצה **שלוש** אפשרויות: הכול / חינמיים / בתשלום. `true`/`false` לא מספיק – לכן ה-State יהיה **מחרוזת**: `"all"`, `"free"` או `"paid"`.

### 🔨 עושים יחד

State חדש, ליד `search`:

```jsx
  const [priceFilter, setPriceFilter] = useState("all");
```

`visible` צריך להשתנות – לכן נהפוך אותו ל-`let`, ונוסיף אחרי ה-`filter` של החיפוש:

```jsx
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
```

ובתוך `controls`, אחרי ה-`input`:

```jsx
        <div className="filters">
          <button className={priceFilter === "all" ? "active" : ""} onClick={() => setPriceFilter("all")}>
            All
          </button>
          <button className={priceFilter === "free" ? "active" : ""} onClick={() => setPriceFilter("free")}>
            Free
          </button>
          <button className={priceFilter === "paid" ? "active" : ""} onClick={() => setPriceFilter("paid")}>
            Paid
          </button>
        </div>
```

הכפתור שנבחר מקבל את המחלקה `active` – וה-CSS צובע אותו בכתום. שוב: **אף שורה לא "צובעת" כפתור בלחיצה**. ה-JSX פשוט מתאר: "הכפתור ש-`priceFilter` שווה לערך שלו – כתום".

### ✋ תורכם

שלושת הכפתורים כמעט זהים. מה **שונה** ביניהם? (נשתמש בתשובה בסעיף 7.)

<details><summary>תשובה</summary>

רק שני דברים: **הערך** (`"all"` / `"free"` / `"paid"`) ו**הטקסט** שעל הכפתור (`All` / `Free` / `Paid`).

</details>

---

## 5. מיון – תיבת בחירה (`select`)

### 📖 הסבר

**`<select>`** היא רשימה נפתחת. כל אפשרות – `<option>`, עם `value` (מה נשמר) וטקסט (מה רואים). ב-React היא עובדת **בדיוק** כמו `input` – שדה מבוקר עם `value` ו-`onChange`:

```jsx
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="title">Sort by name</option>
          <option value="hours">Sort by hours</option>
        </select>
```

עם State:

```jsx
  const [sortBy, setSortBy] = useState("title");
```

### 📖 איך ממיינים מערך – `sort`

```jsx
  if (sortBy === "title") {
    visible = [...visible].sort((a, b) => a.title.localeCompare(b.title));
  } else {
    visible = [...visible].sort((a, b) => a.hours - b.hours);
  }
```

`sort` מקבלת פונקציה ש**משווה שני פריטים**, `a` ו-`b`, ואומרת מי קודם:

| הפונקציה מחזירה | המשמעות |
|---|---|
| מספר **שלילי** | `a` לפני `b` |
| מספר **חיובי** | `b` לפני `a` |
| `0` | לא משנה |

- **מספרים:** `a.hours - b.hours`. אם ל-`a` יש 30 שעות ול-`b` 50 – `30 - 50 = -20`, שלילי, אז `a` (הקצר) קודם. התוצאה: **מהקצר לארוך**.
- **טקסט:** `a.title.localeCompare(b.title)` – משווה שני טקסטים לפי סדר האלף-בית, ומחזירה שלילי / חיובי / 0 בדיוק לפי הכללים למעלה.

> ⚠️ **למה `[...visible]` ולא `visible.sort(...)` ישר?** כי `sort` – בניגוד ל-`map` ו-`filter` – **משנה את המערך עצמו**. בקוד שלנו `visible` כבר מערך חדש (`filter` תמיד יוצרת מערך חדש), אז כאן העותק הוא רק ליתר ביטחון. אבל ההרגל חשוב: אם תמיינו ישר **מערך שהוא State** – למשל `items.sort(...)` ואז `setItems(items)` – React תקבל **את אותו מערך** ולא תצייר מחדש, בדיוק כמו עם `push`. (זה הבונוס של תרגיל 6 בשיעור 8.) לכן תמיד: **ממיינים עותק**.

### 🌍 מהעולם האמיתי

**מורה שמסדרת מבחנים לפי ציון.** היא לוקחת כל פעם **שני** מבחנים, משווה, ושמה את הנמוך מלמעלה. אחרי מספיק השוואות – כל הערימה מסודרת. `sort` עושה בדיוק את זה, ואנחנו רק אומרים לה **איך להשוות שניים**.

---

## 6. מה יש לנו עד עכשיו – שלושה State-ים, `visible` אחד

```text
search ─────┐
priceFilter ├──►  visible  ──►  what is on the screen
sortBy ─────┘
```

שלושה State-ים, ומשתנה **מחושב** אחד שתלוי בכולם. משנים **כל אחד** מהם – React מציירת מחדש, `visible` מחושב מחדש, והמסך נכון. לא כתבנו אף שורה שאומרת "כשמשנים את המיון – תפעיל מחדש גם את החיפוש". זה פשוט קורה.

השוו לשיעור 5: שם פונקציית `render` עשתה את כל החישוב – וכל אירוע היה צריך **לזכור** לקרוא לה. כאן **גוף הרכיב הוא ה-`render`**, ו-React קוראת לו לבד.

---

## 7. מפרקים לרכיבים: `SearchBar` ו-`FilterButtons`

### 📖 הסבר

`App` מתארך. נוציא את החיפוש ואת כפתורי הסינון לרכיבים משלהם. אבל ה-State – **נשאר ב-`App`**, כי `App` צריך אותו כדי לחשב את `visible`. אז איך `SearchBar` ישנה את `search`?

בדיוק כמו `TaskItem` בשיעור 8: `App` נותן לו את **הערך** ואת **הפונקציה לשינוי** – כ-Props. ניתן להם שמות מוכרים: **`value`** ו-**`onChange`** – כמו של `input` רגיל!

### 🔨 עושים יחד – `SearchBar`

`src/SearchBar.jsx`:

```jsx
function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search a course or teacher..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export default SearchBar;
```

וב-`App`, במקום כל ה-`input`:

```jsx
        <SearchBar value={search} onChange={setSearch} />
```

> 💡 **`onChange={setSearch}`** – מעבירים את `setSearch` **עצמה** כ-Prop. כש-`SearchBar` קוראת `onChange("cyber")`, זה בדיוק כמו `setSearch("cyber")`.

### 🔨 עושים יחד – `FilterButtons`

זוכרים את התשובה מסעיף 4 – רק הערך והטקסט שונים בין הכפתורים? אז נשמור אותם **במערך**, ונבנה את הכפתורים עם `map`:

`src/FilterButtons.jsx`:

```jsx
// value = what we save in State, label = what the user sees
const options = [
  { value: "all", label: "All" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

function FilterButtons({ value, onChange }) {
  return (
    <div className="filters">
      {options.map((option) => (
        <button
          key={option.value}
          className={value === option.value ? "active" : ""}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
```

וב-`App`, במקום כל ה-`div` של הכפתורים:

```jsx
        <FilterButtons value={priceFilter} onChange={setPriceFilter} />
```

(ואל תשכחו את שני ה-`import` בראש `App.jsx`.) רוצים כפתור רביעי? **שורה אחת** במערך `options`.

---

## 8. מועדפים – איפה שמים State ששני רכיבים צריכים?

### 📖 הבעיה

נרצה כוכב ☆ על כל כרטיס. לחיצה – הכוכב מתמלא ★. ובכותרת למעלה: `★ Favorites: 2`.

איפה נשמור את המועדפים?

- אם כל `CourseCard` ישמור State משלו (כמו `LikeButton` בשיעור 8) – **הכותרת** לא תוכל לדעת כמה מועדפים יש. היא לא רואה את ה-State של הכרטיסים.
- לכן ה-State צריך להיות **ברכיב שמעל שניהם** – ב-`App`. משם הוא יורד כ-Props: לכותרת – המספר, ולכל כרטיס – "האם אתה מועדף?" ופונקציה ללחיצה.

לזה קוראים **"להרים את ה-State למעלה"** (Lifting State Up).

### 🌍 מהעולם האמיתי

**השלט של הטלוויזיה בסלון.** אם כל אחד מהילדים מחזיק שלט משלו בחדר שלו – אף אחד לא יודע מה רואים בסלון. שמים **שלט אחד בסלון** – במקום שכולם מגיעים אליו – וכולם רואים ומשנים את אותו ערוץ.

### 🔨 עושים יחד

**ב-`App`** – State של **מערך `id`-ים** של הקורסים המועדפים, ופונקציה שמוסיפה או מוציאה:

```jsx
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favoriteId) => favoriteId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
```

- `favorites.includes(id)` – "האם ה-`id` הזה כבר במערך?" (`includes` עובדת גם על מערכים, לא רק על טקסט.)
- כבר מועדף? → `filter` – **מוציאים** אותו.
- עוד לא? → פיזור – **מוסיפים** אותו.

> 💡 **למה שומרים רק `id` ולא את כל הקורס?** כי את פרטי הקורס כבר יש לנו ב-`courses`. שומרים את **המינימום** – זוכרים את הכלל מסעיף 1?

**בכותרת** – החליפו את ה-`h1`:

```jsx
      <header>
        <h1>Atid Courses</h1>
        <p>★ Favorites: {favorites.length}</p>
      </header>
```

**ב-`map` של הכרטיסים:**

```jsx
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favorites.includes(course.id)}
              onToggleFavorite={toggleFavorite}
            />
```

**ב-`CourseCard.jsx`** – שני Props חדשים, וכפתור כוכב בראש הכרטיס:

```jsx
function CourseCard({ course, isFavorite, onToggleFavorite }) {
  const { id, title, teacher, hours, free } = course;

  return (
    <div className="course">
      <button className="star" onClick={() => onToggleFavorite(id)}>
        {isFavorite ? "★" : "☆"}
      </button>
      <h2>{title}</h2>
      <p>Teacher: {teacher}</p>
      <p>{hours} hours</p>
      <span className={free ? "badge free" : "badge paid"}>{free ? "Free" : "Paid"}</span>
    </div>
  );
}

export default CourseCard;
```

הכרטיס **לא יודע** מה זה "מועדפים". הוא רק מקבל "אתה מועדף? כן/לא", ומודיע כשלוחצים עליו. ההחלטה – אצל `App`.

> 💡 ה-CSS כבר מוכן: `.course` קיבל `position: relative`, והכוכב `position: absolute` עם `top` ו-`right` – כך הוא "נתלה" בפינה הימנית העליונה של הכרטיס.

---

## 9. אין תוצאות? כפתור "נקה"

כשהחיפוש והסינון לא משאירים אף קורס – נציג הודעה, וכפתור שמאפס **את שניהם**:

```jsx
  const clearFilters = () => {
    setSearch("");
    setPriceFilter("all");
  };
```

ובמקום ה-`div` של הכרטיסים – טרנרי (כמו בשיעור 8):

```jsx
      {visible.length === 0 ? (
        <div className="empty">
          <p>No courses found</p>
          <button onClick={clearFilters}>Clear filters</button>
        </div>
      ) : (
        <div className="courses">
          ...
        </div>
      )}
```

> 💡 **אפשר לקרוא לכמה פונקציות `set` ברצף.** React מחכה שהפונקציה תסתיים, ואז מציירת **פעם אחת** – עם כל השינויים.

---

## 10. 💻 הקוד המלא

כל הפרויקט נמצא בתיקייה [`project`](project/) של השיעור (כדי להריץ: `npm install` ואז `npm run dev`).

**מבנה הקבצים:**

```text
src/
├── App.jsx            <- all the State + the calculation of "visible"
├── courses.js         <- the data
├── CourseCard.jsx     <- one card, with a star
├── SearchBar.jsx      <- the search box (value + onChange)
├── FilterButtons.jsx  <- All / Free / Paid (value + onChange)
├── index.css
└── main.jsx
```

**`src/App.jsx`:**

```jsx
import { useState } from "react";
import courses from "./courses.js";
import CourseCard from "./CourseCard.jsx";
import SearchBar from "./SearchBar.jsx";
import FilterButtons from "./FilterButtons.jsx";

function App() {
  // 1. State - only what the USER chose
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [favorites, setFavorites] = useState([]);

  // 2. Actions
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

  // 3. Calculated on every draw - NOT State
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

  return (
    <div className="page">
      <header>
        <h1>Atid Courses</h1>
        <p>★ Favorites: {favorites.length}</p>
      </header>

      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <FilterButtons value={priceFilter} onChange={setPriceFilter} />
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="title">Sort by name</option>
          <option value="hours">Sort by hours</option>
        </select>
      </div>

      <p>
        Showing {visible.length} of {courses.length} courses
      </p>

      {visible.length === 0 ? (
        <div className="empty">
          <p>No courses found</p>
          <button onClick={clearFilters}>Clear filters</button>
        </div>
      ) : (
        <div className="courses">
          {visible.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favorites.includes(course.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
```

**מה יופיע על המסך:** הכותרת `Atid Courses` ו-`★ Favorites: 0`, שורה עם תיבת חיפוש, שלושה כפתורים (`All` בכתום) ותיבת מיון, `Showing 6 of 6 courses`, ושישה כרטיסים – ממוינים לפי שם, כל אחד עם כוכב ריק בפינה.

---

## 11. ⚠️ טעויות נפוצות – ואיך מתקנים

| מה קרה | למה | התיקון |
|---|---|---|
| `Assignment to constant variable` ב-`visible` | הגדרתם `const visible` ואז ניסיתם לשנות אותו בסינון | `let visible` |
| החיפוש עובד, אבל הכרטיסים לא משתנים | ב-JSX עדיין כתוב `courses.map` | `visible.map` |
| `Cannot read properties of undefined (reading 'toLowerCase')` | שגיאת כתיב בשם שדה – למשל `course.name` במקום `course.title` | בדקו את השמות ב-`courses.js` |
| המיון לפי שעות מסדר `100` לפני `30` | השוויתם טקסט במקום מספרים, או השתמשתם ב-`localeCompare` על מספרים | למספרים: `a.hours - b.hours` |
| מיינתם State – `items.sort(...)` ואז `setItems(items)` – והמסך לא מתעדכן | `sort` משנה את המערך עצמו, ו-React מקבלת **אותו** מערך | `setItems([...items].sort(...))` – ממיינים עותק |
| הכפתורים ב-`FilterButtons` לא משנים כלום | שכחתם להעביר `onChange={setPriceFilter}`, או קראתם לו בשם אחר ברכיב | אותו שם Prop בשני המקומות |
| לחיצה על כוכב לא משנה את המונה בכותרת | שמרתם את המועדפים ב-State **בתוך** `CourseCard` | ה-State ב-`App`, והכרטיס מקבל `isFavorite` ו-`onToggleFavorite` |
| כתבתם `const [visible, setVisible] = useState(...)` – והכרטיסים לא משתנים כשמחפשים | `useState` משתמשת בערך ההתחלתי **רק בציור הראשון**. `visible` הוא ערך **מחושב** – לא State | חשבו אותו בגוף הרכיב, כמשתנה רגיל |

---

## 12. 📚 מילון מונחים

| מונח | הסבר |
|---|---|
| **ערך מחושב** | משתנה רגיל בגוף הרכיב, שמחושב מ-State בכל ציור (למשל `visible`) |
| **`\|\|`** | "או" – נכון אם לפחות אחד מהצדדים נכון |
| **`&&`** | "וגם" – נכון רק אם שני הצדדים נכונים |
| **`<select>` / `<option>`** | רשימה נפתחת; ב-React – שדה מבוקר עם `value` ו-`onChange` |
| **`sort`** | ממיינת מערך לפי פונקציית השוואה. **משנה את המערך עצמו** – לכן ממיינים עותק |
| **`localeCompare`** | משווה שני טקסטים לפי סדר האלף-בית |
| **`includes` על מערך** | "האם הערך הזה נמצא במערך?" |
| **`value` + `onChange` כ-Props** | הדרך לבנות רכיב שמתנהג כמו `input`: הערך מגיע מהאב, ושינויים חוזרים אליו |
| **להרים State למעלה** | לשים State ברכיב **המשותף** לכל הרכיבים שצריכים אותו |

---

## ✅ בדקו את עצמכם

1. מה הכלל שעוזר להחליט אם משהו צריך להיות State?
2. למה `visible` **לא** State? ומה היה קורה אם היה?
3. מה יחזיר `[40, 25, 70].sort((a, b) => a - b)`? ומה אם נחליף ל-`b - a`?
4. למה כותבים `[...visible].sort(...)` ולא `visible.sort(...)`?
5. מה ההבדל בין `priceFilter` (מחרוזת) לבין `freeOnly` של שיעור 5 (`true`/`false`)? מתי צריך מחרוזת?
6. ב-`<SearchBar value={search} onChange={setSearch} />` – מה בדיוק קורה כשהמשתמש מקליד אות?
7. למה ה-State של המועדפים נמצא ב-`App` ולא ב-`CourseCard`?
8. ב-`toggleFavorite` – מה עושה כל אחד מהענפים של ה-`if`?

<details><summary>תשובות</summary>

1. State = רק מה ש**משתנה**, ושאי אפשר **לחשב** ממשהו אחר שכבר יש.
2. כי אפשר לחשב אותו מ-`courses`, `search`, `priceFilter` ו-`sortBy`. אם היה State, היינו צריכים לזכור לעדכן אותו בכל שינוי של כל אחד מהם – ובשכחה אחת המסך היה מציג נתונים לא נכונים.
3. `[25, 40, 70]` – מהקטן לגדול. עם `b - a` – `[70, 40, 25]`, מהגדול לקטן.
4. כי `sort` משנה את המערך **עצמו**. בקוד שלנו `visible` כבר עותק (מ-`filter`), אז זה ליתר ביטחון – אבל כשממיינים **State** בלי עותק, React מקבלת את אותו מערך ולא מציירת מחדש. לכן ההרגל: תמיד ממיינים עותק.
5. `true`/`false` מתאים לשתי אפשרויות בלבד. כשיש **שלוש ומעלה** (`all`/`free`/`paid`) – צריך מחרוזת (או מספר).
6. `input` מפעיל את ה-`onChange` של `SearchBar` ← היא קוראת ל-`onChange(event.target.value)` – שזה בעצם `setSearch(...)` ← React מציירת מחדש את `App` ← `visible` מחושב מחדש ← הכרטיסים מתעדכנים, ו-`SearchBar` מקבלת את ה-`value` החדש.
7. כי **שני** רכיבים צריכים אותו: הכותרת (כמה מועדפים) והכרטיסים (מה מסומן). שמים אותו ברכיב המשותף לשניהם.
8. אם ה-`id` כבר במערך – `filter` יוצר מערך חדש **בלעדיו** (הוצאה). אם לא – פיזור יוצר מערך חדש **איתו** בסוף (הוספה).

</details>

---

**בשיעור הבא:** הקורסים כתובים אצלנו **בקוד**. באתר אמיתי הם מגיעים **מהשרת**. נלמד לטעון נתונים עם `fetch`, להציג `Loading...` בזמן ההמתנה – ונכיר את `useEffect`, שגם ישמור את המועדפים כך שלא ייעלמו ברענון.

➡️ [תרגילים לשיעור 9](exercises.md)
