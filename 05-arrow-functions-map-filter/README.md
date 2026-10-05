# שיעור 5 – פונקציות חץ, `map` ו-`filter`: קטלוג קורסים

> **מה צריך לדעת לפני?** את שיעור 4 – מערכים, לולאת `for...of`, אובייקטים, מחרוזות תבנית (`${}`) ו-`innerHTML`.
> **כמה זמן?** שיעור אחד (כשעתיים), כולל תרגול בכיתה.
> **מה בונים?** **קטלוג קורסים** של המכללה: כרטיס לכל קורס, תיבת חיפוש שמסננת בזמן שמקלידים, וכפתור "רק חינמיים".

## 🎯 מה נדע בסוף השיעור

1. לכתוב פונקציה ש**מחזירה** תשובה (`return` עם ערך).
2. לכתוב פונקציה בצורה הקצרה – **פונקציית חץ** (`=>`).
3. לבחור בין שני ערכים בשורה אחת – **אופרטור טרנרי** (`? :`).
4. להפוך כל פריט במערך למשהו אחר – **`map`**.
5. להשאיר רק חלק מהפריטים במערך – **`filter`**.
6. להגיב להקלדה בזמן אמת (אירוע `input`).
7. לבנות דף לפי השיטה "**נתונים ← `render` ← מסך**" – השיטה שעליה בנויות React ו-Angular.

> 💬 **השיעור הזה הוא הגשר ל-React.** כל אחד מהכלים כאן – פונקציות חץ, `map`, `filter`, הטרנרי – מופיע **כמעט בכל קובץ** של React. אם משהו לא ברור – חזרו עליו לפני שממשיכים.

---

## 1. פונקציה שמחזירה תשובה

### 📖 הסבר

עד עכשיו הפונקציות שלנו **עשו** משהו: הדפיסו, שינו את הדף. אבל פונקציה יכולה גם **לחשב ולהחזיר תשובה** – עם `return` ואחריו ערך:

```js
function double(number) {
  return number * 2;
}

const result = double(5);
console.log(result);       // 10
console.log(double(21));   // 42
```

`return number * 2;` = "החזר את התוצאה **למי שקרא לי**". המקום שבו כתוב `double(5)` "מתחלף" בתשובה – `10`.

### 🌍 מהעולם האמיתי

**מכונת מיץ:** מכניסים תפוזים (הפרמטר), והמכונה **מחזירה** כוס מיץ (`return`). אתם מחליטים מה לעשות עם המיץ – לשתות, לשמור במקרר, לתת לחבר.

> 💡 בשיעור 4 ראינו `return;` **בלי** ערך – "צא מהפונקציה". עם ערך – "צא, **וקח איתך את התשובה**".

### ✋ תורכם

כתבו פונקציה `fullName(first, last)` שמחזירה את השם המלא עם רווח באמצע. הדפיסו `fullName("Dana", "Cohen")`.

---

## 2. פונקציות חץ – אותה פונקציה, כתיבה קצרה

### 📖 הסבר

ב-JavaScript מודרנית כותבים פונקציות בדרך קצרה יותר, עם **חץ** `=>`. בואו נהפוך את `double` לפונקציית חץ, צעד אחר צעד:

**צעד 0 – הפונקציה הרגילה:**

```js
function double(number) {
  return number * 2;
}
```

**צעד 1 – מוחקים את המילה `function`, שומרים את הפונקציה ב-`const`, ומוסיפים חץ אחרי הסוגריים:**

```js
const double = (number) => {
  return number * 2;
};
```

**צעד 2 – אם כל מה שהפונקציה עושה הוא `return` של שורה אחת – אפשר למחוק את הסוגריים המסולסלים **ואת** המילה `return`:**

```js
const double = (number) => number * 2;
```

שלוש הגרסאות עושות **בדיוק** אותו דבר: `double(5)` מחזירה `10`.

| החלק | מה זה |
|---|---|
| `const double =` | שם הפונקציה (נשמרת בקופסה, כמו כל משתנה) |
| `(number)` | הפרמטרים – בדיוק כמו קודם |
| `=>` | החץ: "**הופך ל-**" / "**מחזיר**". מקלידים `=` ואז `>` |
| `number * 2` | מה שמוחזר |

קוראים את זה בקול: "**`double` מקבלת `number` ומחזירה `number * 2`**".

> ⚠️ **הגרסה הקצרה (בלי `{ }`) מתאימה רק לשורה אחת שמחזירה ערך.** ברגע שיש בפונקציה כמה שורות – חוזרים לסוגריים מסולסלים, **וחייבים לכתוב `return`**:
>
> ```js
> const describe = (age) => {
>   const nextYear = age + 1;
>   return `Next year you will be ${nextYear}`;
> };
> ```

### 📖 עוד דוגמאות

```js
const sayHi = () => console.log("Hi!");          // no parameters: empty ()
const add = (a, b) => a + b;                     // two parameters
const isAdult = (age) => age >= 18;              // returns true or false

sayHi();                       // Hi!
console.log(add(3, 4));        // 7
console.log(isAdult(16));      // false
```

### 📖 פונקציית חץ בלי שם – ישר בתוך `addEventListener`

בשיעור 3 כתבנו פונקציה עם שם, ואז מסרנו אותה לכפתור. עם פונקציית חץ אפשר לכתוב אותה **ישר במקום**:

```js
// Before (lesson 3)
function addLike() {
  likes = likes + 1;
}
likeButton.addEventListener("click", addLike);

// Now - the same thing, written in place
likeButton.addEventListener("click", () => {
  likes = likes + 1;
});
```

> 💡 אין "נכון" או "לא נכון" כאן – שתי הדרכים עובדות. כשהקוד קצר ומשמש רק לכפתור אחד – כותבים במקום. כשהוא ארוך או משמש כמה כפתורים – פונקציה עם שם.

### ✋ תורכם

הפכו לפונקציות חץ (בגרסה הקצרה ביותר שאפשר):

1. `function triple(n) { return n * 3; }`
2. `function greet(name) { return "Hello " + name; }`
3. ה-`fullName` שכתבתם בסעיף 1.

---

## 3. האופרטור הטרנרי – `if`/`else` בשורה אחת

### 📖 הסבר

הרבה פעמים רוצים לבחור **בין שני ערכים** לפי תנאי:

```js
let label;
if (course.free) {
  label = "Free";
} else {
  label = "Paid";
}
```

חמש שורות לבחירה פשוטה. האופרטור **הטרנרי** עושה את זה בשורה אחת:

```js
const label = course.free ? "Free" : "Paid";
```

| החלק | המשמעות |
|---|---|
| `course.free` | התנאי – **שאלה** |
| `?` | "**אם כן** – …" |
| `"Free"` | הערך אם התשובה `true` |
| `:` | "**אם לא** – …" |
| `"Paid"` | הערך אם התשובה `false` |

קוראים: "**האם** הקורס חינמי? **אם כן** – Free, **אם לא** – Paid".

והוא עובד גם **בתוך** מחרוזת תבנית – וזה בדיוק המקום שבו נשתמש בו:

```js
console.log(`This course is ${course.free ? "Free" : "Paid"}`);
```

### 📖 ועוד סימן קטן – `!` ("לא")

`!` הופך `true` ל-`false` ולהפך:

```js
let freeOnly = false;
freeOnly = !freeOnly;   // now true
freeOnly = !freeOnly;   // now false again
```

`freeOnly = !freeOnly;` = "הפוך את המתג". נשתמש בזה לכפתור שמדליק ומכבה סינון.

### ✋ תורכם

כתבו `const age = 15;` ושורה **אחת** שמדפיסה `Adult` או `Child` לפי הגיל.

---

## 4. `map` – להפוך כל פריט למשהו אחר

### 📖 הסבר

`map` עוברת על **כל** פריט במערך, מפעילה עליו פונקציה, ומחזירה **מערך חדש** עם התוצאות:

```js
const prices = [10, 20, 30];
const doubled = prices.map((price) => price * 2);

console.log(doubled);   // [20, 40, 60]
console.log(prices);    // [10, 20, 30]  - the original did not change!
```

| החלק | מה זה |
|---|---|
| `prices.map(...)` | "קח את המערך, ו**לכל** פריט…" |
| `(price) => price * 2` | "…הפוך אותו ל**זה**" – פונקציית חץ שמקבלת פריט אחד ומחזירה את הגרסה החדשה שלו |
| `doubled` | מערך **חדש** – באותו אורך בדיוק |

### 🌍 מהעולם האמיתי

**פס ייצור במפעל:** תפוחים נכנסים בצד אחד, כל תפוח עובר דרך המכונה, ובצד השני יוצאות **צנצנות ריבה** – אחת לכל תפוח. כמה תפוחים נכנסו – כמה צנצנות יצאו. והתפוחים המקוריים? `map` לא נוגעת בהם.

### 📖 `map` שמייצרת HTML

ועכשיו השימוש החשוב ביותר – להפוך כל פריט ל**תגית HTML**:

```js
const skills = ["HTML", "CSS", "JavaScript"];
const items = skills.map((skill) => `<li>${skill}</li>`);

console.log(items);
// ["<li>HTML</li>", "<li>CSS</li>", "<li>JavaScript</li>"]
```

יש לנו **מערך** של מחרוזות HTML. כדי להכניס אותו לדף, צריך לחבר אותו ל**מחרוזת אחת** – עם `join("")`:

```js
console.log(items.join(""));
// <li>HTML</li><li>CSS</li><li>JavaScript</li>
```

`join("")` = "הדבק את כל הפריטים יחד, **בלי שום דבר** ביניהם". (`join(", ")` היה מדביק עם פסיק ורווח.)

ועכשיו – בשורה אחת:

```js
skillsList.innerHTML = skills.map((skill) => `<li>${skill}</li>`).join("");
```

השוו ללולאה של שיעור 4 – אותה תוצאה, בלי `innerHTML = ""` ובלי `+=`.

> 💡 **בדיוק כך מציגים רשימות ב-React:** `skills.map((skill) => <li>{skill}</li>)`. כשתגיעו לשם – זה כבר יהיה מוכר.

### ✋ תורכם

```js
const names = ["dana", "omar", "rana"];
```

1. בעזרת `map`, צרו מערך חדש שבו כל שם באותיות גדולות. (רמז: `name.toUpperCase()`)
2. בעזרת `map` ו-`join`, צרו מחרוזת HTML של `<li>` לכל שם, והציגו אותה ב-`ul` בדף.

---

## 5. `filter` – להשאיר רק חלק מהפריטים

### 📖 הסבר

`filter` עוברת על כל פריט, ושואלת עליו **שאלה** (פונקציה שמחזירה `true` או `false`). רק הפריטים שהתשובה עליהם `true` – נכנסים ל**מערך חדש**:

```js
const grades = [95, 48, 74, 55, 88];
const passed = grades.filter((grade) => grade >= 56);

console.log(passed);   // [95, 74, 88]
console.log(grades);   // [95, 48, 74, 55, 88]  - the original did not change!
```

| החלק | מה זה |
|---|---|
| `grades.filter(...)` | "קח את המערך, ו**השאר** רק…" |
| `(grade) => grade >= 56` | "…את מי שעונה **כן** על השאלה הזאת" |

### 🌍 מהעולם האמיתי

**מסננת במטבח:** שופכים פסטה ומים – הפסטה נשארת, המים יורדים. או **השומר בכניסה למסיבה** משיעור 3: לכל אחד הוא שואל "האם הגיל 18 ומעלה?" – ורק מי שעונה "כן" נכנס.

### 📖 `filter` על מערך של אובייקטים

```js
const courses = [
  { title: "Python", free: true },
  { title: "Cyber", free: false },
  { title: "SQL", free: true },
];

const freeCourses = courses.filter((course) => course.free);
console.log(freeCourses.length);   // 2
```

`course.free` הוא כבר `true` או `false` – אז הוא בעצמו "התשובה לשאלה".

### 📖 `map` מול `filter` – מה ההבדל?

| | `map` | `filter` |
|---|---|---|
| **השאלה** | "למה להפוך כל פריט?" | "את מי להשאיר?" |
| **הפונקציה מחזירה** | את הפריט החדש | `true` או `false` |
| **אורך המערך החדש** | **תמיד** זהה למקורי | **אותו אורך או קצר יותר** |
| **דוגמה** | מחירים ← מחירים כפול 2 | ציונים ← רק ציונים עוברים |

ושניהם **לא משנים** את המערך המקורי – הם תמיד מחזירים מערך **חדש**.

### ✋ תורכם

```js
const products = [
  { name: "Laptop", price: 3500 },
  { name: "Mouse", price: 80 },
  { name: "Screen", price: 900 },
  { name: "Cable", price: 25 },
];
```

1. בעזרת `filter` – רק המוצרים שעולים **פחות מ-100**.
2. בעזרת `map` – מערך של **השמות בלבד**: `["Laptop", "Mouse", ...]`.
3. **שילוב:** השמות של המוצרים שעולים **יותר מ-500**. (רמז: קודם `filter`, ואז `map` על התוצאה.)

---

## 6. חיפוש – `toLowerCase` ו-`includes`

### 📖 הסבר

לתיבת החיפוש נצטרך שני כלים של מחרוזות:

```js
const title = "Python for Beginners";

console.log(title.includes("Python"));   // true  - "Python" appears in the title
console.log(title.includes("python"));   // false - small p is a different letter!
console.log(title.toLowerCase());        // python for beginners
console.log(title.toLowerCase().includes("python"));   // true
```

| הקוד | מה הוא עושה |
|---|---|
| `text.includes("abc")` | "האם `abc` מופיע **איפשהו** בטקסט?" – `true` / `false` |
| `text.toLowerCase()` | מחזיר את הטקסט באותיות **קטנות** |

**הטריק לחיפוש:** הופכים **גם** את שם הקורס **וגם** את מה שהמשתמש הקליד לאותיות קטנות – וכך `PYTHON`, `Python` ו-`python` כולם יימצאו.

---

## 7. אירוע `input` – להגיב בזמן ההקלדה

### 📖 הסבר

בשיעור 4 קראנו את התיבה רק כשלחצו על כפתור. אבל בחיפוש רוצים שהתוצאות יתעדכנו **בכל אות** שמקלידים. בשביל זה יש אירוע בשם `input` – הוא קורה **בכל שינוי** בתיבה:

```js
searchInput.addEventListener("input", () => {
  console.log(searchInput.value);
});
```

הקלידו `react` – ובקונסול יודפס: `r`, `re`, `rea`, `reac`, `react`.

---

## 8. 📖 השיטה: נתונים ← `render` ← מסך

לפני שבונים, הרעיון הכי חשוב בשיעור. כל הדף שלנו יעבוד לפי שלושה חלקים:

| החלק | בקטלוג שלנו |
|---|---|
| **1. הנתונים** | מערך הקורסים + **מה המשתמש בחר**: מה הוא חיפש (`searchText`), והאם לחץ על "רק חינמיים" (`freeOnly`) |
| **2. פונקציית `render`** | **"צייר הכול מחדש לפי הנתונים"**. היא לא יודעת ולא אכפת לה **מה** השתנה – היא פשוט מסננת ומציירת מאפס |
| **3. האירועים** | כל אירוע עושה **רק שני דברים**: משנה את הנתונים, וקורא ל-`render()` |

### 🌍 מהעולם האמיתי

**לוח תוצאות במגרש כדורסל:** כשנקלעת סל, המפעיל לא מחפש איזו נורה להדליק. הוא מעדכן את **הניקוד** (הנתונים), והלוח מציג מחדש את **כל** המספרים לפי הניקוד החדש (`render`).

> 💡 **זו בדיוק השיטה של React!** ב-React כותבים את החלק של "איך המסך נראה לפי הנתונים", ומשנים נתונים – ו-React קוראת ל-`render` **בעצמה**. היום אנחנו עושים את זה ביד, כדי להבין מה React עושה בשבילנו.

---

## 9. 🔨 בונים יחד – קטלוג הקורסים

### שלב 1 – ה-HTML

צרו תיקייה חדשה `courses-catalog`, ובה `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Atid Courses</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Atid Courses</h1>

    <!-- The controls -->
    <div class="controls">
      <input id="search-input" type="text" placeholder="Search a course...">
      <button id="free-btn">Free only</button>
    </div>
    <p id="count-text"></p>

    <!-- JavaScript draws the course cards here -->
    <div id="courses" class="courses"></div>

    <script src="script.js"></script>
  </body>
</html>
```

את `style.css` העתיקו מהתיקייה [`project`](project/style.css) – אין בו שום דבר חדש מלבד `flex-wrap: wrap` (שהכרנו בשיעור 4), ומחלקות `free` / `paid` שצובעות את התווית בירוק או באדום.

### שלב 2 – הנתונים

ב-`script.js`:

```js
// 1. The data - an array of course objects
const courses = [
  { id: 1, title: "Python for Beginners", teacher: "Ahmad", hours: 40, free: true },
  { id: 2, title: "Web Development", teacher: "Rana", hours: 60, free: false },
  { id: 3, title: "Cyber Security", teacher: "Omar", hours: 50, free: false },
  { id: 4, title: "Databases and SQL", teacher: "Dana", hours: 30, free: true },
  { id: 5, title: "React and Angular", teacher: "Ahmad", hours: 70, free: false },
];

// 2. What the user chose (it changes while using the page)
let searchText = "";
let freeOnly = false;

// 3. Find the elements on the page
const coursesBox = document.getElementById("courses");
const countText = document.getElementById("count-text");
const searchInput = document.getElementById("search-input");
const freeButton = document.getElementById("free-btn");
```

> 💡 **למה לכל קורס יש `id`?** מספר מזהה ייחודי – כמו מספר תעודת זהות. שני קורסים יכולים להיות עם אותו שם, אבל לעולם לא עם אותו `id`. היום לא נשתמש בו, אבל בשיעור הבא (וב-React) הוא יהיה חשוב מאוד.

### שלב 3 – כרטיס אחד מקורס אחד

```js
// 4. Turn ONE course object into the HTML of one card
const courseToHtml = (course) => `
  <div class="course">
    <h2>${course.title}</h2>
    <p>Teacher: ${course.teacher}</p>
    <p>${course.hours} hours</p>
    <span class="badge ${course.free ? "free" : "paid"}">
      ${course.free ? "Free" : "Paid"}
    </span>
  </div>
`;
```

פונקציית חץ שמקבלת **קורס אחד** ומחזירה את ה-HTML של **הכרטיס שלו**. כמה דברים לשים לב אליהם:

- מחרוזת תבנית יכולה להתפרס על **כמה שורות** – כך ה-HTML נשאר קריא.
- `class="badge ${course.free ? "free" : "paid"}"` – התווית תקבל **שתי** מחלקות: `badge` תמיד, ו-`free` **או** `paid` לפי הקורס. כך הצבע משתנה.
- אין כאן `{ }` ואין `return` – זו הגרסה הקצרה של פונקציית חץ: היא **מחזירה** את המחרוזת.

**נסו בקונסול:** `courseToHtml(courses[0])` – ותראו את ה-HTML של הכרטיס הראשון.

### שלב 4 – `render`: לצייר הכול מהנתונים

```js
// 5. Draw the page from the data
const render = () => {
  // Keep only the courses that match what the user chose
  let visible = courses.filter((course) => course.title.toLowerCase().includes(searchText));

  if (freeOnly) {
    visible = visible.filter((course) => course.free);
  }

  if (visible.length === 0) {
    coursesBox.innerHTML = "<p>No courses found</p>";
  } else {
    coursesBox.innerHTML = visible.map(courseToHtml).join("");
  }

  countText.textContent = `Showing ${visible.length} of ${courses.length} courses`;
  freeButton.textContent = freeOnly ? "Show all" : "Free only";
};
```

ובסוף הקובץ:

```js
// 7. Draw for the first time
render();
```

שמרו ורעננו – חמישה כרטיסים! שורה אחר שורה:

1. **`filter` לפי החיפוש:** רק קורסים שהשם שלהם (באותיות קטנות) מכיל את מה שחיפשו. כש-`searchText` ריק (`""`) – כל שם "מכיל" טקסט ריק, אז כולם עוברים.
2. **אם `freeOnly` דלוק** – מסננים שוב, ומשאירים רק את החינמיים. (בגלל זה `visible` הוגדר עם `let` – אנחנו מחליפים אותו.)
3. **אין תוצאות?** מציגים הודעה. **יש?** `map` הופכת כל קורס לכרטיס, ו-`join` מדביקה הכול.
4. מעדכנים את שורת הספירה ואת הטקסט של הכפתור (טרנרי!).

> 💡 שימו לב ל-`visible.map(courseToHtml)` – מסרנו ל-`map` את **שם** הפונקציה, בלי סוגריים. בדיוק כמו ב-`addEventListener` בשיעור 3: "הנה המתכון – תפעילי אותו על כל קורס".

### שלב 5 – האירועים

לפני `render();` שבסוף:

```js
// 6. Events: change the data, then draw again
searchInput.addEventListener("input", () => {
  searchText = searchInput.value.toLowerCase();
  render();
});

freeButton.addEventListener("click", () => {
  freeOnly = !freeOnly;
  render();
});
```

**שני האירועים בנויים באותה צורה בדיוק:** (1) משנים נתון, (2) `render()`. הם לא נוגעים ב-HTML בכלל!

נסו: הקלידו `py`, לחצו על `Free only`, מחקו את החיפוש, הקלידו `xyz`…

### ✋ תורכם

1. הוסיפו למערך `courses` קורס שישי משלכם. **כמה שורות HTML** שיניתם?
2. הוסיפו לכל כרטיס שורה עם מספר ה**שבועות** של הקורס, בהנחה של 10 שעות בשבוע. (רמז: `${course.hours / 10}`)
3. **אתגר:** שהחיפוש ימצא קורס גם לפי שם **המורה**. (רמז: `||` פירושו "או": `a.includes(x) || b.includes(x)`.)

---

## 10. 💻 הקוד המלא

הקוד נמצא גם בתיקייה [`project`](project/) של השיעור.

**`script.js`:**

```js
// 1. The data - an array of course objects
const courses = [
  { id: 1, title: "Python for Beginners", teacher: "Ahmad", hours: 40, free: true },
  { id: 2, title: "Web Development", teacher: "Rana", hours: 60, free: false },
  { id: 3, title: "Cyber Security", teacher: "Omar", hours: 50, free: false },
  { id: 4, title: "Databases and SQL", teacher: "Dana", hours: 30, free: true },
  { id: 5, title: "React and Angular", teacher: "Ahmad", hours: 70, free: false },
];

// 2. What the user chose (it changes while using the page)
let searchText = "";
let freeOnly = false;

// 3. Find the elements on the page
const coursesBox = document.getElementById("courses");
const countText = document.getElementById("count-text");
const searchInput = document.getElementById("search-input");
const freeButton = document.getElementById("free-btn");

// 4. Turn ONE course object into the HTML of one card
const courseToHtml = (course) => `
  <div class="course">
    <h2>${course.title}</h2>
    <p>Teacher: ${course.teacher}</p>
    <p>${course.hours} hours</p>
    <span class="badge ${course.free ? "free" : "paid"}">
      ${course.free ? "Free" : "Paid"}
    </span>
  </div>
`;

// 5. Draw the page from the data
const render = () => {
  // Keep only the courses that match what the user chose
  let visible = courses.filter((course) => course.title.toLowerCase().includes(searchText));

  if (freeOnly) {
    visible = visible.filter((course) => course.free);
  }

  if (visible.length === 0) {
    coursesBox.innerHTML = "<p>No courses found</p>";
  } else {
    coursesBox.innerHTML = visible.map(courseToHtml).join("");
  }

  countText.textContent = `Showing ${visible.length} of ${courses.length} courses`;
  freeButton.textContent = freeOnly ? "Show all" : "Free only";
};

// 6. Events: change the data, then draw again
searchInput.addEventListener("input", () => {
  searchText = searchInput.value.toLowerCase();
  render();
});

freeButton.addEventListener("click", () => {
  freeOnly = !freeOnly;
  render();
});

// 7. Draw for the first time
render();
```

**מה יופיע על המסך:** הכותרת `Atid Courses`, תיבת חיפוש וכפתור, השורה `Showing 5 of 5 courses`, וחמישה כרטיסים לבנים – לכל אחד שם, מורה, שעות ותווית ירוקה (`Free`) או אדומה (`Paid`). הקלדת `sql` משאירה כרטיס אחד; `Free only` משאיר שניים.

---

## 11. ⚠️ טעויות נפוצות – ואיך מתקנים

| מה קרה | למה | התיקון |
|---|---|---|
| פונקציית החץ מחזירה `undefined` | יש `{ }` אבל אין `return` | או שמוחקים את `{ }` (גרסה קצרה), או שמוסיפים `return` |
| בין הכרטיסים מופיעים **פסיקים** | שכחתם `.join("")` – הדפדפן הדביק את המערך עם פסיקים | `.map(...).join("")` |
| החיפוש לא מוצא `Python` כשמקלידים `python` | לא הפכתם את **שני** הצדדים לאותיות קטנות | `toLowerCase()` גם לשם הקורס וגם לטקסט שהוקלד |
| `courses.filter(...)` לא שינה את `courses` | נכון! `filter` ו-`map` מחזירים מערך **חדש** | שמרו את התוצאה במשתנה: `const visible = courses.filter(...)` |
| הדף ריק בטעינה, ומתמלא רק אחרי הקלדה | שכחתם לקרוא ל-`render()` בסוף הקובץ | `render();` בשורה האחרונה |
| שיניתי משתנה והמסך לא התעדכן | שכחתם `render()` בתוך האירוע | כל אירוע: משנים נתון ← `render()` |
| `Unexpected token '>'` | כתבתם `= >` עם רווח, או `->` | `=>` – צמוד, שווה ואז גדול-מ |

---

## 12. 📚 מילון מונחים

| מונח | הסבר |
|---|---|
| **`return` עם ערך** | הפונקציה מחזירה תשובה למי שקרא לה |
| **פונקציית חץ** | `(x) => ...` – דרך קצרה לכתוב פונקציה |
| **אופרטור טרנרי** | `condition ? a : b` – בחירה בין שני ערכים בשורה אחת |
| **`!`** | "לא" – הופך `true` ל-`false` ולהפך |
| **`map`** | מחזירה מערך **חדש**, שבו כל פריט "הפך" למשהו אחר |
| **`filter`** | מחזירה מערך **חדש**, רק עם הפריטים שעברו את התנאי |
| **`join("")`** | מדביקה את כל פריטי המערך למחרוזת אחת |
| **`includes`** | "האם הטקסט הזה מופיע בתוך הטקסט ההוא?" |
| **`toLowerCase`** | מחזירה את הטקסט באותיות קטנות |
| **אירוע `input`** | קורה בכל שינוי בתיבת טקסט |
| **`render`** | פונקציה שמציירת את המסך מחדש לפי הנתונים |

---

## ✅ בדקו את עצמכם

1. מה ההבדל בין `return;` לבין `return 5;`?
2. הפכו לפונקציית חץ קצרה: `function square(n) { return n * n; }`
3. מה יודפס? `const x = 7; console.log(x > 5 ? "big" : "small");`
4. מה יחזיר `[1, 2, 3].map((n) => n + 10)`? ומה יחזיר `[1, 2, 3].filter((n) => n > 1)`?
5. אחרי `const b = a.filter(...)` – האם המערך `a` השתנה?
6. למה צריך `join("")` אחרי `map` כשמכניסים HTML לדף?
7. למה בחיפוש הופכים **גם** את מה שהמשתמש הקליד **וגם** את שם הקורס לאותיות קטנות?
8. מה שני הדברים שכל אירוע בקטלוג עושה – ולמה הוא לא נוגע ב-HTML בעצמו?

<details><summary>תשובות</summary>

1. `return;` – יוצא מהפונקציה בלי תשובה. `return 5;` – יוצא ומחזיר את `5` למי שקרא לפונקציה.
2. `const square = (n) => n * n;`
3. `big`
4. `[11, 12, 13]`. ו-`[2, 3]`.
5. לא. `filter` ו-`map` תמיד מחזירות מערך **חדש** ולא נוגעות במקורי.
6. כי `map` מחזירה **מערך** של מחרוזות. `join("")` מדביקה אותן למחרוזת אחת, בלי פסיקים ביניהן.
7. כי `includes` מבחינה בין אותיות גדולות לקטנות. כשהופכים את שני הצדדים לקטנות – `Python`, `PYTHON` ו-`python` כולם מתאימים.
8. (1) משנה נתון (`searchText` או `freeOnly`), (2) קורא ל-`render()`. הוא לא נוגע ב-HTML כי `render` אחראית לצייר הכול מחדש לפי הנתונים – כך יש רק מקום **אחד** בקוד שמעדכן את המסך, ואי אפשר "לשכוח" לעדכן משהו.

</details>

---

**בשיעור הבא:** פרויקט מסכם – **רשימת משימות** (To-Do List). נוסיף, נסמן ונמחק משימות, ונלמד עוד שני כלים שמופיעים בכל קובץ React: **פיזור** (`...`) ו**פירוק** (Destructuring).

➡️ [תרגילים לשיעור 5](exercises.md)
