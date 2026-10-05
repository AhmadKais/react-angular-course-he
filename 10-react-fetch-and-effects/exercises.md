# תרגילים – שיעור 10: נתונים מהשרת – `fetch`, `async`/`await` ו-`useEffect`

> **איך מגישים:** לכל תרגיל – פרויקט Vite משלו (או רכיב נפרד), **בלי** `node_modules`. דחסו ל-ZIP אחד והגישו במודל.
> **רמות קושי:** ⭐ קל · ⭐⭐ בינוני · ⭐⭐⭐ אתגר
> **שרת התרגול:** בתרגילים 3 ו-6 נשתמש ב-`https://jsonplaceholder.typicode.com` – שרת חינמי עם נתונים מומצאים. פתחו את הכתובות בדפדפן לפני שמתחילים, כדי לראות איך ה-JSON נראה.

---

## תרגיל 1 ⭐ – JSON ומערך תלויות

**א.** ב-JSON הבא יש **ארבע** טעויות. כתבו גרסה מתוקנת (ובדקו אותה: הדביקו בקונסול `JSON.parse(\`...\`)` עם הטקסט בין הגרשיים ההפוכים).

```text
[
  { "name": "Dana", "grade": 95, },
  { name: "Omar", "grade": 82 }
  { "name": 'Rana', "grade": 74 }
]
```

**ב.** לכל אחד מה-effects הבאים – **מתי** הוא רץ?

```jsx
useEffect(() => { document.title = `${count} clicks`; }, [count]);
useEffect(() => { console.log("Hello!"); }, []);
useEffect(() => { console.log("Drawn!"); });
useEffect(() => { localStorage.setItem("name", name); }, [name]);
```

---

## תרגיל 2 ⭐ – מצאו את הבאגים

הרכיב הבא אמור לטעון רשימת משתמשים ולהציג את השמות שלהם. יש בו **חמש** טעויות.

```jsx
import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = response.json();
      setUsers(data);
      setLoading(false);
    };
    loadUsers();
  });

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

(רמזים: מה חסר ב-`import`? מה צריכה פונקציה עם `await`? מה `json()` מחזירה בלי `await`? מתי ה-effect רץ? ומה רואים לפני שהנתונים מגיעים?)

---

## תרגיל 3 ⭐⭐ – ספר טלפונים מהשרת

בנו אפליקציה שטוענת את `https://jsonplaceholder.typicode.com/users` ומציגה **כרטיס** לכל משתמש: שם, מייל, טלפון, ו**עיר**.

1. שלושה מצבים: `Loading users...`, הודעת שגיאה, והכרטיסים.
2. שימו לב: העיר נמצאת **בתוך אובייקט פנימי** – `user.address.city`. (פתחו את הכתובת בדפדפן וחפשו אותה.)
3. תיבת חיפוש לפי שם.
4. **בונוס:** בחירה (`select`) של עיר – `All cities` ועוד כל הערים שקיימות בנתונים. את רשימת הערים **אל** תכתבו ביד – חשבו אותה מהמשתמשים. (רמז: `users.map((user) => user.address.city)`.)

**בדיקה:** נסו לשנות את הכתובת לכתובת שגויה – האם מופיעה הודעת השגיאה?

---

## תרגיל 4 ⭐⭐ – כפתור "נסה שוב"

שדרגו את הקטלוג מהשיעור: כשהטעינה נכשלת, מתחת להודעת השגיאה יופיע כפתור `Try again` שמנסה לטעון שוב.

רמזים:

1. הוציאו את `loadCourses` **מתוך** ה-`useEffect` – הגדירו אותה ישר בגוף הרכיב, וב-`useEffect` רק קראו לה: `useEffect(() => { loadCourses(); }, []);`.
2. בתחילת `loadCourses`: `setLoading(true)` ו-`setError("")` – כדי לנקות את השגיאה הקודמת.
3. הכפתור: `onClick={loadCourses}`.

**איך בודקים?** שנו את שם הקובץ ב-`public` ל-`courses2.json`, רעננו (תופיע שגיאה), החזירו את השם, ולחצו `Try again`.

---

## תרגיל 5 ⭐⭐ – רשימת המשימות זוכרת

קחו את רשימת המשימות משיעור 8, ושמרו את המשימות ב-`localStorage`:

1. פונקציה `loadTasks` מחוץ לרכיב – מחזירה את המשימות השמורות, או את שלוש משימות ברירת המחדל אם אין כלום שמור.
2. `useState(loadTasks)`.
3. `useEffect` ששומר את `tasks` בכל שינוי.
4. בדקו: הוסיפו, סמנו ומחקו משימות – ורעננו.

**שאלה:** בשיעור 6 (תרגיל 5) עשינו את אותו הדבר ב-JavaScript רגילה – שמרנו בתוך `render()`. מה ההבדל, ולמה כאן לא צריך לזכור לשמור בכל פעולה?

---

## תרגיל 6 ⭐⭐⭐ – פוסטים לפי משתמש

`https://jsonplaceholder.typicode.com/posts?userId=1` מחזירה את הפוסטים של משתמש 1 בלבד.

1. בראש הדף – `select` עם המשתמשים (טענו אותם מ-`/users` – השם מוצג, ה-`id` הוא ה-`value`).
2. מתחת – הפוסטים של המשתמש שנבחר: כותרת (`title`) וגוף (`body`).
3. בכל פעם שבוחרים משתמש אחר – הפוסטים נטענים מחדש. (רמז: State בשם `userId`, ו-`useEffect` עם **`[userId]`** במערך התלויות.)
4. בזמן טעינת הפוסטים – `Loading posts...` **רק** במקום הפוסטים, והבחירה למעלה נשארת.
5. **בונוס:** כמה פוסטים יש לכל משתמש? הציגו `10 posts` מעל הרשימה.
