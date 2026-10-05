# שיעור 4 – מערכים, לולאות ואובייקטים: הנתונים עוברים ל-JavaScript

> **מה צריך לדעת לפני?** את שיעור 3 – משתנים, `if`, פונקציות, `getElementById`, `textContent` ו-`addEventListener`.
> **כמה זמן?** שיעור אחד (כשעתיים), כולל תרגול בכיתה.
> **מה בונים?** כרטיס ביקור **חכם**: כל הפרטים שלו שמורים ב-JavaScript, רשימת הכישורים נבנית מתוך **מערך**, ואפשר להוסיף כישור חדש מתיבת טקסט.

## 🎯 מה נדע בסוף השיעור

1. לשמור **רשימה** של ערכים במשתנה אחד – **מערך**.
2. לעבור על כל הפריטים במערך בעזרת **לולאה**.
3. לבנות טקסט עם משתנים בתוכו – **מחרוזת תבנית** (`` ` `` ו-`${}`).
4. לשמור כמה פרטים על דבר אחד – **אובייקט**.
5. לבנות HTML מתוך JavaScript עם `innerHTML`.
6. לקרוא את מה שהמשתמש הקליד בתיבת טקסט (`input`).

---

## 1. הבעיה – למה צריך מערכים?

### 📖 הסבר

בשיעור 3 שמרנו בכל משתנה **ערך אחד**: `let likes = 0;`. אבל מה אם יש לנו **רשימה**? למשל, הכישורים בכרטיס:

```js
const skill1 = "HTML";
const skill2 = "CSS";
const skill3 = "JavaScript";
```

זה עובד עם שלושה. אבל עם 30? ומה אם המשתמש רוצה **להוסיף** כישור – ניצור תוך כדי ריצה משתנה `skill31`? אי אפשר.

### 🌍 מהעולם האמיתי

תחשבו על **רשימת קניות**. לא כותבים כל מוצר על פתק נפרד – כותבים את כולם על **דף אחד**, אחד מתחת לשני. ואם נזכרים במוצר חדש – מוסיפים שורה בסוף הדף.

הדף הזה הוא **מערך**.

---

## 2. מערכים

### 📖 הסבר

**מערך** (Array) הוא משתנה אחד שמחזיק **רשימה** של ערכים. כותבים אותו עם **סוגריים מרובעים** `[ ]`, והפריטים מופרדים ב**פסיקים**:

```js
const skills = ["HTML", "CSS", "JavaScript"];
```

### 📖 כל פריט מקבל מספר – ומתחילים מ-0!

לכל פריט במערך יש **מיקום** (Index). המחשב סופר מ-**0**, לא מ-1:

| המיקום (Index) | 0 | 1 | 2 |
|---|---|---|---|
| **הערך** | `"HTML"` | `"CSS"` | `"JavaScript"` |

כדי לקבל פריט, כותבים את שם המערך ואת המיקום בסוגריים מרובעים:

```js
console.log(skills[0]);   // HTML
console.log(skills[2]);   // JavaScript
console.log(skills[5]);   // undefined  (there is nothing in place 5)
```

> 💡 `undefined` = "אין כאן כלום". זו לא שגיאה אדומה – רק רמז שביקשתם מקום שלא קיים.

### 🌍 מהעולם האמיתי

**קומות בבניין** בישראל: הכניסה היא קומת **קרקע** (0), ומעליה קומה 1. גם במערך – הפריט הראשון נמצא ב"קומת קרקע", מקום 0.

### 📖 שני דברים שעושים עם מערך כל הזמן

```js
const skills = ["HTML", "CSS", "JavaScript"];

console.log(skills.length);   // 3  - how many items

skills.push("React");         // add an item at the end
console.log(skills);          // ["HTML", "CSS", "JavaScript", "React"]
console.log(skills.length);   // 4
```

| הקוד | מה הוא עושה |
|---|---|
| `skills.length` | **כמה** פריטים יש במערך (אורך) |
| `skills.push("React")` | **מוסיף** פריט לסוף המערך |

> 💡 **רגע – `const` ובכל זאת שינינו?** `const` אומר שאי אפשר לשים בקופסה **מערך אחר**. אבל מותר להוסיף פריטים **לתוך** המערך שכבר בקופסה. כמו דף קניות שמודבק למקרר: אי אפשר להחליף את הדף, אבל אפשר לכתוב עליו עוד שורה.

### ✋ תורכם

ב-`script.js` (בדף ריק, עם הקונסול פתוח):

1. צרו מערך `friends` עם שמות של שלושה חברים.
2. הדפיסו את החבר **הראשון** ואת החבר **האחרון**.
3. הוסיפו חבר רביעי עם `push`, והדפיסו כמה חברים יש עכשיו.

---

## 3. לולאה – "לכל פריט ברשימה, תעשה…"

### 📖 הסבר

נניח שרוצים להדפיס את כל הכישורים. אפשר לכתוב `console.log` ארבע פעמים… אבל מה אם יש 100? בשביל זה יש **לולאה** (Loop) – קוד שחוזר על עצמו **פעם אחת לכל פריט**:

```js
const skills = ["HTML", "CSS", "JavaScript"];

for (const skill of skills) {
  console.log("I know " + skill);
}
```

**הפלט:**

```text
I know HTML
I know CSS
I know JavaScript
```

| החלק | מה זה |
|---|---|
| `for (... of skills)` | "**לכל** פריט **מתוך** המערך `skills`…" |
| `const skill` | בכל סיבוב, הפריט הנוכחי נכנס לקופסה בשם `skill` |
| `{ ... }` | מה עושים **בכל סיבוב** |

### 📖 מה בדיוק קורה? נעקוב

| סיבוב | מה יש ב-`skill` | מה מודפס |
|:---:|---|---|
| 1 | `"HTML"` | `I know HTML` |
| 2 | `"CSS"` | `I know CSS` |
| 3 | `"JavaScript"` | `I know JavaScript` |
| – | אין עוד פריטים | הלולאה נגמרת |

> 💡 **השם `skill` הוא בחירה שלכם.** מקובל לתת לפריט את שם המערך ביחיד: `skills` ← `skill`, `friends` ← `friend`, `numbers` ← `number`.

### 🌍 מהעולם האמיתי

**מורה שבודק נוכחות:** "לכל תלמיד ברשימה – קרא בשמו, וסמן אם הוא נמצא." ההוראה כתובה פעם אחת, אבל מתבצעת שוב ושוב – פעם לכל תלמיד.

### ✋ תורכם

1. עברו בלולאה על המערך `friends` שלכם, והדפיסו לכל חבר: `Hello` ואחריו השם שלו.
2. **אתגר:** צרו מערך של מספרים `[5, 10, 15, 20]`. בעזרת לולאה ומשתנה `let total = 0;`, חשבו את **הסכום** של כולם. (רמז: בכל סיבוב, `total = total + number;`)

---

## 4. מחרוזת תבנית – טקסט עם "חורים" למשתנים

### 📖 הסבר

עד עכשיו חיברנו טקסט עם `+`:

```js
const name = "Dana";
const age = 17;
console.log("My name is " + name + " and I am " + age + " years old");
```

הרבה מירכאות, הרבה פלוסים, וקל לשכוח רווח. יש דרך נוחה יותר – **מחרוזת תבנית** (Template Literal):

```js
console.log(`My name is ${name} and I am ${age} years old`);
```

| מה | איך |
|---|---|
| במקום מירכאות `" "` | **גרש הפוך** – `` ` `` (Backtick) |
| כדי לשים משתנה בתוך הטקסט | `${` + שם המשתנה + `}` |

שתי השורות מדפיסות **בדיוק** את אותו הדבר: `My name is Dana and I am 17 years old`.

> 💡 **איפה הגרש ההפוך במקלדת?** במקש שמשמאל ל-**1** (מעל Tab). אם המקלדת בעברית – יופיע `;`. **עברו לאנגלית** (Alt + Shift) ואז לחצו.

> 💡 בתוך `${ }` אפשר לכתוב גם חישוב: `` `Next year I will be ${age + 1}` ``.

### ✋ תורכם

כתבו מחדש את המשפט מתרגיל "קצת עליי" (שיעור 3) – הפעם עם מחרוזת תבנית.

---

## 5. אובייקטים – כל הפרטים על דבר אחד

### 📖 הסבר

מערך מתאים לרשימה של דברים **מאותו סוג** (כמה כישורים). אבל מה אם רוצים לשמור **פרטים שונים על דבר אחד** – שם, תפקיד, עיר ומייל של אדם?

בשביל זה יש **אובייקט** (Object). כותבים אותו עם **סוגריים מסולסלים** `{ }`, ובפנים זוגות של **מפתח: ערך**:

```js
const person = {
  name: "Dana Cohen",
  role: "Web Developer",
  city: "Yarka",
  age: 17,
};
```

| החלק | שם | דוגמה |
|---|---|---|
| לפני הנקודתיים | **מפתח** (Key) – שם הפרט | `name` |
| אחרי הנקודתיים | **ערך** (Value) | `"Dana Cohen"` |
| בסוף כל שורה | פסיק | `,` |

### 📖 איך משתמשים בפרטים – עם נקודה

```js
console.log(person.name);   // Dana Cohen
console.log(person.age);    // 17

person.city = "Haifa";      // change a value
console.log(person.city);   // Haifa
```

קוראים את זה כמו בעברית: `person.name` = "**השם של** person".

### 🌍 מהעולם האמיתי

**תעודת זהות:** כרטיס אחד, ועליו כמה שדות – שם, תאריך לידה, כתובת. כל שדה יש לו **כותרת** (המפתח) ו**תוכן** (הערך). אובייקט הוא תעודת זהות של דבר כלשהו: אדם, מוצר, קורס.

### 📖 מערך בתוך אובייקט

ערך באובייקט יכול להיות **כל דבר** – גם מערך:

```js
const person = {
  name: "Dana Cohen",
  skills: ["HTML", "CSS", "JavaScript"],
};

console.log(person.skills);          // ["HTML", "CSS", "JavaScript"]
console.log(person.skills[0]);       // HTML
console.log(person.skills.length);   // 3
```

### 📖 ומערך של אובייקטים

וגם להפך – מערך שכל פריט בו הוא אובייקט. כך שומרים, למשל, **רשימה של תלמידים**, וזה המבנה הנפוץ ביותר בעולם הפיתוח:

```js
const students = [
  { name: "Dana", grade: 95 },
  { name: "Omar", grade: 82 },
  { name: "Rana", grade: 74 },
];

for (const student of students) {
  console.log(`${student.name} got ${student.grade}`);
}
```

**הפלט:**

```text
Dana got 95
Omar got 82
Rana got 74
```

> 💡 **מתי מערך ומתי אובייקט?**
> - **מערך** `[ ]` – **הרבה** דברים מאותו סוג (תלמידים, כישורים, מוצרים).
> - **אובייקט** `{ }` – **הרבה פרטים** על דבר **אחד** (השם, הגיל והעיר של תלמיד אחד).

### ✋ תורכם

1. צרו אובייקט `myPhone` עם המפתחות `brand`, `model`, `year` ו-`apps` (מערך של שלוש אפליקציות).
2. הדפיסו: `` `My phone is a ${...} from ${...}` ``.
3. הוסיפו אפליקציה ל-`myPhone.apps` עם `push`, והדפיסו כמה אפליקציות יש עכשיו.

---

## 6. `innerHTML` – לבנות HTML מתוך JavaScript

### 📖 הסבר

בשיעור 3 שינינו **טקסט** עם `textContent`. אבל מה אם רוצים להכניס לדף **תגיות חדשות** – למשל `<li>` לכל כישור?

| | מה הוא עושה | דוגמה |
|---|---|---|
| `textContent` | מכניס **טקסט בלבד**. תגיות יוצגו כמו שהן, כטקסט | `<b>Hi</b>` יוצג כ-`<b>Hi</b>` |
| `innerHTML` | מכניס **HTML** – הדפדפן הופך את התגיות לתגיות אמיתיות | `<b>Hi</b>` יוצג כ-**Hi** מודגש |

```js
const list = document.getElementById("skills-list");

list.innerHTML = "";                // empty the list
list.innerHTML += "<li>HTML</li>";  // add an item
list.innerHTML += "<li>CSS</li>";   // add another item
```

`+=` = "**הוסף** לסוף מה שכבר יש". (`=` לבד היה **מחליף** את כל התוכן.)

> ⚠️ **זהירות עם `innerHTML`:** אם מכניסים דרכו טקסט שמשתמש **זר** הקליד (למשל באתר תגובות), הוא יכול להכניס קוד זדוני. בכרטיס האישי שלנו זה בסדר – אבל באתרים אמיתיים נזהרים מזה. React, אגב, מגינה מפני זה אוטומטית.

---

## 7. `input` – לקרוא מה המשתמש הקליד

### 📖 הסבר

תיבת טקסט ב-HTML:

```html
<input id="skill-input" type="text" placeholder="New skill...">
```

- `type="text"` – תיבה לטקסט רגיל.
- `placeholder` – טקסט אפור שמופיע בתיבה **כשהיא ריקה**, כרמז למשתמש.
- ל-`<input>` **אין תגית סגירה**.

וב-JavaScript, מה שהמשתמש הקליד נמצא ב-`.value`:

```js
const skillInput = document.getElementById("skill-input");

console.log(skillInput.value);   // what the user typed
skillInput.value = "";           // empty the box
```

---

## 8. 🔨 בונים יחד – הכרטיס החכם

### 📖 הרעיון

עד עכשיו כל הפרטים של הכרטיס היו **כתובים בתוך ה-HTML**. מעכשיו:

1. **הנתונים** – שמורים במקום אחד: אובייקט `person` ב-JavaScript.
2. **ה-HTML** – רק "שלד" ריק עם `id`-ים.
3. **JavaScript** – לוקחת את הנתונים ומכניסה אותם לשלד.

למה זה טוב? כי אם רוצים לשנות את העיר – משנים **שורה אחת** בנתונים. ואם מחר נקבל את הנתונים מהשרת (למשל פרופיל בפייסבוק) – הכרטיס יעבוד לכל אדם בעולם.

### שלב 1 – ה-HTML: שלד ריק

צרו תיקייה חדשה `smart-card`, העתיקו אליה את `style.css` ואת התמונה מהכרטיס הקודם, וצרו `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Business Card</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <!-- The card is empty: JavaScript fills it from the data -->
    <div class="card">
      <img class="avatar" src="avatar.svg" alt="Profile photo">
      <h1 id="name"></h1>
      <h2 class="role" id="role"></h2>
      <p id="about"></p>

      <h3>My skills (<span id="skills-count">0</span>)</h3>
      <ul class="skills" id="skills-list"></ul>

      <div class="add-skill">
        <input id="skill-input" type="text" placeholder="New skill...">
        <button id="add-btn">Add</button>
      </div>

      <h3>Contact me</h3>
      <p>Email: <a id="email-link"></a></p>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

שימו לב: ה-`h1`, ה-`p` וה-`ul` **ריקים**. אם תפתחו את הדף עכשיו – תראו כרטיס כמעט ריק. זה בסדר!

### שלב 2 – הנתונים

ב-`script.js`:

```js
// 1. The data - everything about the person, in one object
const person = {
  name: "Dana Cohen",
  role: "Web Developer",
  city: "Yarka",
  email: "dana@example.com",
  skills: ["HTML", "CSS", "JavaScript"],
};
```

### שלב 3 – למצוא את התגיות ולמלא אותן

```js
// 2. Find the elements on the page
const nameTitle = document.getElementById("name");
const roleTitle = document.getElementById("role");
const aboutText = document.getElementById("about");
const emailLink = document.getElementById("email-link");
const skillsList = document.getElementById("skills-list");
const skillsCount = document.getElementById("skills-count");
const skillInput = document.getElementById("skill-input");
const addButton = document.getElementById("add-btn");

// 3. Fill the card with the person's details
nameTitle.textContent = person.name;
roleTitle.textContent = person.role;
aboutText.textContent = `I live in ${person.city} and I love building websites.`;
emailLink.textContent = person.email;
emailLink.href = `mailto:${person.email}`;
```

שמרו ורעננו – השם, התפקיד, המשפט והמייל מופיעים!

השורה החדשה כאן היא `emailLink.href = ...` – אפשר לשנות מ-JavaScript **גם מאפיינים** של תגית, לא רק את הטקסט שלה. כאן קבענו לאן הקישור מוביל.

### שלב 4 – רשימת הכישורים מתוך המערך

```js
// 4. Draw the skills list from the array
function showSkills() {
  skillsList.innerHTML = "";

  for (const skill of person.skills) {
    skillsList.innerHTML += `<li>${skill}</li>`;
  }

  skillsCount.textContent = person.skills.length;
}
```

ובסוף הקובץ – **הפעילו** את הפונקציה:

```js
showSkills();
```

מה הפונקציה עושה, שורה אחר שורה:

1. **מרוקנת** את הרשימה – כדי להתחיל מדף נקי.
2. **לכל** כישור במערך – מוסיפה לרשימה `<li>` עם שם הכישור.
3. מעדכנת את **המונה** בכותרת לפי אורך המערך.

### ✋ תורכם

ב**נתונים** (לא ב-HTML!) הוסיפו למערך `skills` עוד שני כישורים. שמרו ורעננו. כמה שורות HTML הייתם צריכים לשנות?

<details><summary>תשובה</summary>

אפס! שיניתם רק את הנתונים – הלולאה בנתה את ה-`<li>`-ים לבד, והמונה התעדכן לבד.

</details>

### שלב 5 – להוסיף כישור מהתיבה

```js
// 5. Add a new skill from the input
function addSkill() {
  const newSkill = skillInput.value;

  if (newSkill === "") {
    alert("Please write a skill first");
    return;
  }

  person.skills.push(newSkill);
  skillInput.value = "";
  showSkills();
}
```

ולפני `showSkills();` שבסוף הקובץ – חברו את הכפתור:

```js
// 6. Connect the button, and draw the list for the first time
addButton.addEventListener("click", addSkill);
showSkills();
```

מה קורה בלחיצה על `Add`:

1. קוראים מה המשתמש הקליד.
2. אם התיבה **ריקה** – מציגים הודעה, ו-`return` = "**צא מהפונקציה עכשיו**". שאר השורות לא ירוצו.
3. מוסיפים את הכישור **למערך** (לנתונים!).
4. מרוקנים את התיבה, כדי שיהיה נוח להקליד את הבא.
5. **מציירים מחדש** את הרשימה מתוך המערך המעודכן.

> 💡 **שימו לב לסדר הפעולות – הוא הכי חשוב בשיעור:** לא הוספנו `<li>` ישירות לדף. **שינינו את הנתונים** (`push`), ואז **ציירנו מחדש** את המסך מהנתונים (`showSkills()`). זה בדיוק איך ש-React עובדת – רק שם הציור מחדש קורה **לבד**.

---

## 9. 💻 הקוד המלא

הקוד נמצא גם בתיקייה [`project`](project/) של השיעור (כולל `style.css` – זה של שיעור 2, עם תוספת קטנה לתיבת הטקסט ולכפתור).

**`script.js`:**

```js
// 1. The data - everything about the person, in one object
const person = {
  name: "Dana Cohen",
  role: "Web Developer",
  city: "Yarka",
  email: "dana@example.com",
  skills: ["HTML", "CSS", "JavaScript"],
};

// 2. Find the elements on the page
const nameTitle = document.getElementById("name");
const roleTitle = document.getElementById("role");
const aboutText = document.getElementById("about");
const emailLink = document.getElementById("email-link");
const skillsList = document.getElementById("skills-list");
const skillsCount = document.getElementById("skills-count");
const skillInput = document.getElementById("skill-input");
const addButton = document.getElementById("add-btn");

// 3. Fill the card with the person's details
nameTitle.textContent = person.name;
roleTitle.textContent = person.role;
aboutText.textContent = `I live in ${person.city} and I love building websites.`;
emailLink.textContent = person.email;
emailLink.href = `mailto:${person.email}`;

// 4. Draw the skills list from the array
function showSkills() {
  skillsList.innerHTML = "";

  for (const skill of person.skills) {
    skillsList.innerHTML += `<li>${skill}</li>`;
  }

  skillsCount.textContent = person.skills.length;
}

// 5. Add a new skill from the input
function addSkill() {
  const newSkill = skillInput.value;

  if (newSkill === "") {
    alert("Please write a skill first");
    return;
  }

  person.skills.push(newSkill);
  skillInput.value = "";
  showSkills();
}

// 6. Connect the button, and draw the list for the first time
addButton.addEventListener("click", addSkill);
showSkills();
```

**התוספת ל-`style.css`:**

```css
/* The input and the button in one row */
.add-skill {
  display: flex;
  justify-content: center;
  gap: 10px;
}

input {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #cbd5e1;
  border-radius: 8px;
}
```

(עיצוב הכפתור – מה-`style.css` של שיעור 3.) ועוד שינוי קטן אחד: ל-`.skills` הוספנו `flex-wrap: wrap;` – כשיש הרבה כישורים והשורה מתמלאת, הם **יורדים לשורה חדשה** במקום להידחס.

**מה יופיע על המסך:** אותו כרטיס מעוצב משיעור 2, הכותרת `My skills (3)`, ומתחת לכישורים תיבת טקסט וכפתור `Add`. כותבים `React`, לוחצים – וגלולה חדשה מופיעה, והמונה הופך ל-`4`.

---

## 10. ⚠️ טעויות נפוצות – ואיך מתקנים

| מה קרה | למה | התיקון |
|---|---|---|
| קיבלתי `undefined` | ביקשתם מקום שלא קיים במערך (למשל `[3]` במערך של 3), או מפתח שלא קיים / עם שגיאת כתיב באובייקט | זכרו שסופרים מ-0; בדקו את שם המפתח |
| `Unexpected identifier` באובייקט | שכחתם **פסיק** בין שני זוגות | בסוף כל שורה באובייקט – `,` |
| במסך מופיע `${person.name}` כמו שהוא | השתמשתם במירכאות `" "` במקום בגרש הפוך | `` ` `` – המקש שמשמאל ל-1, במקלדת אנגלית |
| כל כישור מופיע **פעמיים** אחרי הוספה | שכחתם לרוקן את הרשימה בתחילת `showSkills` | `skillsList.innerHTML = "";` בהתחלה |
| ברשימה נשאר רק הכישור האחרון | כתבתם `=` במקום `+=` בתוך הלולאה | `+=` מוסיף, `=` מחליף |
| הוספתי כישור והוא לא מופיע | שכחתם להפעיל `showSkills()` אחרי ה-`push` | משנים נתונים ← מציירים מחדש |
| `person.skills.push is not a function` | `skills` הוא לא מערך – למשל כתבתם `"HTML, CSS"` במחרוזת אחת | `["HTML", "CSS"]` – כל פריט במירכאות משלו |

---

## 11. 📚 מילון מונחים

| מונח | הסבר |
|---|---|
| **מערך (Array)** | רשימה של ערכים במשתנה אחד: `["a", "b", "c"]` |
| **מיקום (Index)** | מספר הפריט במערך – **מתחילים מ-0** |
| **`length`** | כמה פריטים יש במערך |
| **`push`** | מוסיף פריט לסוף המערך |
| **לולאה (Loop)** | קוד שחוזר על עצמו; `for...of` – פעם לכל פריט |
| **מחרוזת תבנית** | טקסט בגרש הפוך, עם משתנים ב-`${ }` |
| **אובייקט (Object)** | כמה פרטים על דבר אחד: `{ key: value }` |
| **מפתח (Key)** | שם של פרט באובייקט, למשל `name` |
| **`innerHTML`** | ה-HTML שבתוך תגית – אפשר להכניס דרכו תגיות חדשות |
| **`value`** | מה שהמשתמש הקליד בתיבת `input` |
| **`return`** | "צא מהפונקציה עכשיו" |
| **`undefined`** | "אין כאן ערך" |

---

## ✅ בדקו את עצמכם

1. במערך `const colors = ["red", "green", "blue"];` – מה יודפס מ-`colors[1]`? ומ-`colors.length`?
2. איך מוסיפים את `"yellow"` לסוף המערך?
3. מה ההבדל בין מערך לאובייקט? תנו דוגמה מתי משתמשים בכל אחד.
4. באובייקט `const car = { brand: "Kia", year: 2022 };` – איך מדפיסים את השנה?
5. כתבו את השורה `"Hello " + name + "!"` כמחרוזת תבנית.
6. מה ההבדל בין `textContent` ל-`innerHTML`?
7. בפונקציה `showSkills` – למה מרוקנים את הרשימה **לפני** הלולאה?
8. מה עושה `return` בתוך `addSkill`, ולמה הוא נמצא בתוך ה-`if`?

<details><summary>תשובות</summary>

1. `green` (המקום השני – כי מתחילים מ-0). ו-`3`.
2. `colors.push("yellow");`
3. מערך – רשימה של הרבה דברים מאותו סוג (רשימת תלמידים). אובייקט – הרבה פרטים על דבר אחד (השם, הגיל והעיר של תלמיד אחד).
4. `console.log(car.year);`
5. `` `Hello ${name}!` ``
6. `textContent` מכניס טקסט בלבד – תגיות יוצגו כטקסט. `innerHTML` מכניס HTML – התגיות הופכות לתגיות אמיתיות בדף.
7. כי הפונקציה בונה את **כל** הרשימה מחדש מהמערך. בלי לרוקן – הכישורים הישנים יישארו, ויופיעו פעמיים.
8. הוא יוצא מהפונקציה מיד, כך שהכישור הריק **לא** נוסף. הוא בתוך ה-`if` כי רוצים לצאת **רק** כשהתיבה ריקה.

</details>

---

**בשיעור הבא:** נלמד דרך קצרה לכתוב פונקציות (**פונקציות חץ**), ושני כלים חזקים למערכים – **`map`** ו-**`filter`**. נבנה **קטלוג קורסים** עם חיפוש וסינון.

➡️ [תרגילים לשיעור 4](exercises.md)
