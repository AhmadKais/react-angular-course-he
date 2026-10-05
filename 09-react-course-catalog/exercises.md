# תרגילים – שיעור 9: קטלוג קורסים – חיפוש, סינון, מיון ומועדפים

> **איך מגישים:** לכל תרגיל – פרויקט Vite משלו (או ענף נפרד של פרויקט הקטלוג), **בלי** `node_modules`. דחסו ל-ZIP אחד והגישו במודל.
> **רמות קושי:** ⭐ קל · ⭐⭐ בינוני · ⭐⭐⭐ אתגר
> **נקודת התחלה לתרגילים 3–4:** הפרויקט של השיעור ([`project`](project/)).

---

## תרגיל 1 ⭐ – State או מחושב?

לכל אחת מהאפליקציות, כתבו (בקובץ `ex1.md` או בהערה) אילו נתונים יהיו **State**, ואילו יהיו **מחושבים**. הסבירו במשפט כל החלטה.

1. **מחשבון טיפ במסעדה:** המשתמש מקליד את סכום החשבון, ובוחר אחוז טיפ (10% / 15% / 20%). על המסך: סכום הטיפ, והסכום הכולל.
2. **רשימת משימות** (שיעור 8): המשימות, הטקסט בתיבה, כמה משימות נשארו, האם להציג את הכפתור `Clear done tasks`.
3. **חנות:** רשימת המוצרים (קבועה), הסל (המוצרים שנבחרו), המחיר הכולל של הסל, מספר הפריטים בסל.
4. **טופס הרשמה:** שם משתמש, סיסמה, האם הסיסמה ארוכה מספיק (8 תווים ומעלה), האם הכפתור `Sign up` פעיל.

---

## תרגיל 2 ⭐ – מצאו את הבאגים

בקוד הבא יש **חמש** טעויות. מצאו ותקנו את כולן, והוסיפו הערה מעל כל תיקון.

```jsx
import { useState } from "react";
import courses from "./courses.js";
import CourseCard from "./CourseCard.jsx";

function App() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [count, setCount] = useState(courses.length);

  let visible = courses.filter((course) => course.title.includes(search));

  if (sortBy === "hours") {
    visible = [...visible].sort((a, b) => a.hours - b.hours);
  }

  return (
    <div>
      <input value={search} onChange={(event) => setSearch(event.target.value)} />
      <select value={sortBy}>
        <option value="title">Sort by name</option>
        <option value="hours">Sort by hours</option>
      </select>
      <p>Showing {count} courses</p>
      {courses.map((course) => (
        <CourseCard course={course} />
      ))}
    </div>
  );
}

export default App;
```

(רמזים: מה קורה כשמחפשים `python` באותיות קטנות? אפשר לבחור מיון? מה מציג המונה אחרי חיפוש? איזה מערך מצויר? ומה React כותבת בקונסול על הרשימה?)

---

## תרגיל 3 ⭐⭐ – עוד מסננים לקטלוג

הוסיפו לקטלוג של השיעור:

1. כפתור `★ Favorites only` שמדליק ומכבה הצגה **רק** של המועדפים. כשהוא דלוק – הוא כתום. (רמז: State בוליאני `favoritesOnly`, ועוד `filter` עם `favorites.includes(...)`.)
2. תיבת בחירה `Length` עם שלוש אפשרויות: `Any length`, `Up to 40 hours`, `Up to 60 hours`. (רמז: אפשר לשמור את המספר עצמו כ-`value`: `"0"`, `"40"`, `"60"` – ולהפוך למספר עם `Number(...)`.)
3. הכפתור `Clear filters` מאפס גם את שני המסננים החדשים.
4. **שאלה:** כמה State-ים יש עכשיו ב-`App`? וכמה משתנים **מחושבים**?

---

## תרגיל 4 ⭐⭐ – מיון בשני הכיוונים

1. הוסיפו לתיבת המיון שתי אפשרויות: `Longest first` (הכי הרבה שעות קודם) ו-`Teacher name` (לפי שם המורה, א-ב).
2. במקום שרשרת של `if`-ים, נסו לכתוב **אובייקט** של פונקציות השוואה, ולבחור ממנו לפי `sortBy`:

```jsx
const compare = {
  title: (a, b) => a.title.localeCompare(b.title),
  hours: (a, b) => a.hours - b.hours,
  // ...
};

visible = [...visible].sort(compare[sortBy]);
```

(`compare[sortBy]` – גישה למפתח של אובייקט **לפי משתנה**. אם `sortBy` הוא `"hours"`, זה כמו `compare.hours`.)

---

## תרגיל 5 ⭐⭐ – רכיב סינון לשימוש חוזר

`FilterButtons` מהשיעור יודע להציג רק `All / Free / Paid`, כי המערך `options` כתוב **בתוכו**.

1. שנו אותו כך שיקבל את `options` **כ-Prop**.
2. בנו אפליקציה חדשה – **רשימת תלמידים**:

```js
const students = [
  { id: 1, name: "Dana", grade: 95, className: "A" },
  { id: 2, name: "Omar", grade: 48, className: "B" },
  { id: 3, name: "Rana", grade: 74, className: "A" },
  { id: 4, name: "Yousef", grade: 55, className: "B" },
  { id: 5, name: "Lina", grade: 88, className: "B" },
];
```

3. השתמשו ב-`FilterButtons` **פעמיים**, עם אפשרויות שונות:
   - `All / Passed / Failed` (עובר: 56 ומעלה).
   - `All classes / Class A / Class B`.
4. חיפוש לפי שם, ושורה `Average: 72` – הממוצע של התלמידים **המוצגים** בלבד.

---

## תרגיל 6 ⭐⭐⭐ – חנות עם סל קניות

```js
const products = [
  { id: 1, name: "Laptop", price: 3500 },
  { id: 2, name: "Mouse", price: 80 },
  { id: 3, name: "Screen", price: 900 },
  { id: 4, name: "Keyboard", price: 250 },
];
```

1. רכיב `ProductCard` – שם, מחיר, וכפתור `Add to cart` / `Remove` (לפי אם המוצר כבר בסל).
2. רכיב `Cart` – בצד הדף: רשימת המוצרים שבסל, ו-`Total: 4400 ₪`.
3. ה-State של הסל – מערך `id`-ים – נמצא ב-**`App`**. למה דווקא שם?
4. בכותרת: `🛒 2 items`.
5. **בונוס:** כפתור `Empty cart` בתוך `Cart` שמרוקן את הסל. (רמז: `Cart` מקבל `onEmpty`.)
