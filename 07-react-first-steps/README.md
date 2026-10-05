# שיעור 7 – React: הפרויקט הראשון, JSX ורכיבים

> **מה צריך לדעת לפני?** את שיעורים 1–6 – ובמיוחד: אובייקטים ומערכים (שיעור 4), פונקציות חץ ו-`map` (שיעור 5), פירוק (שיעור 6).
> **כמה זמן?** שיעור אחד (כשעתיים), כולל תרגול בכיתה. ההתקנה בתחילת השיעור לוקחת כ-20 דקות.
> **מה בונים?** את **כרטיס הביקור** – הפעם ב-React. ובסוף השיעור: **שני** כרטיסים של שני אנשים, מאותו קוד בדיוק.

## 🎯 מה נדע בסוף השיעור

1. מה זה React, ואיזו בעיה היא פותרת.
2. להתקין **Node.js**, וליצור פרויקט React חדש עם **Vite**.
3. להריץ את הפרויקט ולראות שינויים בדפדפן בלי לרענן.
4. לכתוב **JSX** – HTML בתוך JavaScript – ולהכיר את ששת הכללים שלו.
5. להציג רשימה מתוך מערך עם `map` ו-`key`.
6. לבנות **רכיבים** (Components), ולהעביר להם מידע עם **Props**.

> 💬 **מילה לפני שמתחילים:** בשיעור הזה יש הרבה דברים חדשים בבת אחת – טרמינל, התקנות, קבצים שלא ראינו. זה מרגיש מבלבל, וזה **לגמרי נורמלי**. החדשות הטובות: את ה-JavaScript עצמה – אתם כבר מכירים. `map`, אובייקטים, פונקציות חץ, פירוק, מחרוזות תבנית – כולם כאן, בדיוק כמו שלמדנו.

---

## 1. מה זה React?

### 📖 הסבר

**React** היא **ספרייה** (Library) של JavaScript לבניית ממשקים – מה שהמשתמש רואה ולוחץ עליו. פיתחה אותה חברת Meta (פייסבוק), והיא הכלי הנפוץ בעולם לבניית אתרים: פייסבוק, אינסטגרם, נטפליקס, Airbnb ו-WhatsApp Web בנויים בה.

זוכרים את השיטה משיעורים 5 ו-6? **נתונים ← `render` ← מסך**. כתבנו את `render` בעצמנו, וקראנו לה אחרי **כל** שינוי. ב-React:

| מה שעשינו בעצמנו (שיעורים 5–6) | מה React עושה בשבילנו |
|---|---|
| `document.getElementById(...)` לכל תגית | ❌ לא צריך בכלל |
| בניית HTML במחרוזת + `innerHTML` | כותבים HTML **ישר** בתוך JavaScript (JSX) |
| לקרוא ל-`render()` אחרי כל שינוי | React מציירת מחדש **לבד** |
| קוד אחד ארוך לכל הדף | **רכיבים** – חלקים קטנים שאפשר להשתמש בהם שוב ושוב |

### 🌍 מהעולם האמיתי

**לגו.** במקום לפסל בית שלם מגוש אחד של פלסטלינה, בונים אותו מ**קוביות** קטנות: קובייה לחלון, קובייה לדלת. רוצים עוד חלון? לוקחים עוד קובייה מאותו סוג. ב-React כל "קובייה" נקראת **רכיב** (Component): כרטיס, כפתור, שורה ברשימה.

---

## 2. התקנת Node.js

### 📖 הסבר

עד עכשיו כתבנו קובץ HTML ופתחנו אותו בלחיצה כפולה. פרויקט React צריך עוד כלי: **Node.js** – תוכנה שמריצה JavaScript **מחוץ לדפדפן**. בעזרתה רצים כל כלי העבודה של React.

יחד עם Node.js מגיע **npm** – "חנות האפליקציות" של JavaScript. דרכו מורידים ספריות כמו React.

### 🔨 עושים יחד

1. היכנסו ל-`https://nodejs.org` והורידו את גרסת ה-**LTS** (Long Term Support – "הגרסה היציבה"). כרגע זו גרסה 24.
2. התקינו: **Next, Next, Next…** – אין צורך לשנות כלום.
3. **סגרו את VS Code ופתחו אותו מחדש** (כדי שיכיר את ההתקנה החדשה).
4. ב-VS Code, בתפריט העליון: **Terminal ← New Terminal**. בתחתית המסך ייפתח **טרמינל** – חלון שבו כותבים פקודות למחשב במקום ללחוץ עם העכבר.
5. הקלידו (ו-Enter אחרי כל שורה):

```bash
node --version
npm --version
```

אם מופיעים מספרים (למשל `v24.11.0` ו-`11.6.2`) – הכול מוכן! 🎉

> ⚠️ **ב-Windows מופיעה שגיאה אדומה:** `npm.ps1 cannot be loaded because running scripts is disabled on this system`?
> זו הגדרת אבטחה של Windows. התיקון – הריצו בטרמינל פעם אחת:
>
> ```bash
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```
>
> אם הוא שואל – הקלידו `Y` ו-Enter. ואז נסו שוב את `npm --version`.

> ⚠️ **`node is not recognized`?** סגרו את VS Code **לגמרי** ופתחו מחדש. אם עדיין לא עובד – הפעילו את המחשב מחדש.

---

## 3. יצירת פרויקט React ראשון

### 📖 הסבר

פרויקט React הוא לא קובץ אחד – זו **תיקייה** עם הרבה קבצים. לא בונים אותה ביד: כלי בשם **Vite** (מבטאים "וִיט" – "מהיר" בצרפתית) יוצר לנו את כל השלד בפקודה אחת.

### 🔨 עושים יחד

1. ב-VS Code: **File ← Open Folder**, ובחרו תיקייה שבה תשמרו את כל פרויקטי הקורס (למשל `Documents/react-course`).
2. בטרמינל, הקלידו:

```bash
npm create vite@latest my-card -- --template react
```

| החלק | מה הוא אומר |
|---|---|
| `npm create vite@latest` | "השתמש בכלי Vite, בגרסה האחרונה, כדי ליצור פרויקט" |
| `my-card` | שם התיקייה של הפרויקט החדש |
| `-- --template react` | "פרויקט מסוג React" |

3. הכלי ישאל כמה שאלות. ענו כך (זזים בין התשובות עם **החיצים** במקלדת, ובוחרים עם **Enter**):

| השאלה | מה עונים |
|---|---|
| `Need to install the following packages: create-vite... Ok to proceed?` (רק בפעם הראשונה) | `y` ו-Enter |
| `Which linter to use?` | **Oxlint** (פשוט Enter) |
| `Install with npm and start now?` | **No** – נעשה את זה בעצמנו, כדי ללמוד את הפקודות |

4. עכשיו שלוש פקודות – **תזכרו אותן, תשתמשו בהן כל הזמן**:

```bash
cd my-card
npm install
npm run dev
```

| הפקודה | מה היא עושה |
|---|---|
| `cd my-card` | "היכנס לתיקייה `my-card`" (Change Directory) |
| `npm install` | מוריד את React ואת כל הכלים שהפרויקט צריך. לוקח דקה-שתיים, **רק בפעם הראשונה** |
| `npm run dev` | מפעיל **שרת פיתוח** – תוכנה שמגישה את האתר שלכם לדפדפן |

5. בטרמינל יופיע משהו כזה:

```text
  VITE v8.3.2  ready in 312 ms

  ➜  Local:   http://localhost:5173/
```

6. החזיקו **Ctrl** ולחצו על הכתובת `http://localhost:5173/`. ייפתח דף עם הלוגו של React ו-Vite. 🎉 **זה אתר React שרץ אצלכם במחשב!**

> 💡 **`localhost`** = "המחשב שלי". האתר לא באינטרנט – הוא רץ רק אצלכם. `5173` הוא "מספר הדלת" (פורט) שבה השרת מחכה.

### 📖 שרת הפיתוח – מה חשוב לדעת

- **כל עוד הטרמינל פתוח והשרת רץ** – האתר עובד. אל תסגרו את הטרמינל!
- **לעצור את השרת:** לחצו בטרמינל **Ctrl + C**.
- **מחר, כשתחזרו לפרויקט:** פותחים את התיקייה `my-card` ב-VS Code, טרמינל חדש, ו-`npm run dev`. (את `npm install` לא צריך שוב.)

---

## 4. סיור בפרויקט

### 📖 הסבר

פתחו את התיקייה `my-card` בצד שמאל של VS Code. נראה הרבה קבצים – אבל רק **שלושה** חשובים לנו עכשיו:

| הקובץ / התיקייה | מה זה | נוגעים? |
|---|---|---|
| `src/App.jsx` | **הרכיב הראשי** – כאן כותבים את האתר | ✅ כל הזמן |
| `src/index.css` | העיצוב של כל האתר | ✅ כן |
| `public/` | קבצים שמוגשים כמו שהם – כאן שמים **תמונות** | ✅ כן |
| `src/main.jsx` | "מתג ההפעלה": מוצא ב-`index.html` את ה-`<div id="root">` ומצייר בתוכו את `App` | ❌ לא |
| `index.html` | הדף היחיד באתר. כמעט ריק – רק `<div id="root">` | ❌ כמעט לא |
| `node_modules/` | כל הספריות שהורדנו (React ועוד מאות). **ענקית** | ❌ אף פעם! |
| `package.json` | "תעודת הזהות" של הפרויקט: השם, הספריות והפקודות | ❌ לא |

> 💡 **סיומת `.jsx`?** זה קובץ JavaScript שיש בו גם HTML. מיד נראה איך.

> ⚠️ **התיקייה `node_modules`** כבדה מאוד (מאות מגה-בייט). **אף פעם** לא מגישים ולא מעתיקים אותה – תמיד אפשר ליצור אותה מחדש עם `npm install`.

---

## 5. מנקים, ומתחילים מאפס

### 🔨 עושים יחד

הפרויקט מגיע עם דף דוגמה. נמחק אותו ונתחיל נקי:

1. **מחקו** את הקובץ `src/App.css` ואת התיקייה `src/assets` (לחיצה ימנית ← Delete).
2. פתחו את `src/App.jsx`, **מחקו הכול**, והקלידו:

```jsx
function App() {
  return <h1>Hello React!</h1>;
}

export default App;
```

3. שמרו (Ctrl + S) והסתכלו בדפדפן. **בלי F5** – הדף כבר התעדכן! 🪄

> 💡 **זה נקרא Hot Reload:** שרת הפיתוח "שומע" כל שמירה, ומעדכן את הדפדפן לבד. מעכשיו – רק שומרים ומסתכלים.

4. פתחו את `src/index.css`, מחקו הכול, והדביקו את ה-CSS של הכרטיס – מהקובץ [`project/src/index.css`](project/src/index.css). (זה ה-CSS משיעור 2, עם תוספת קטנה: `.cards` – כדי שכמה כרטיסים יעמדו זה לצד זה.)
5. העתיקו את `avatar.svg` (מהשיעורים הקודמים, או מ-[`project/public`](project/public/)) לתוך התיקייה **`public`**.

### 📖 מה כתבנו?

```jsx
function App() {
  return <h1>Hello React!</h1>;
}

export default App;
```

- **`function App()`** – רכיב ב-React הוא בסך הכול **פונקציה**, ש**מחזירה** (`return`) את מה שצריך להופיע על המסך.
- **`<h1>Hello React!</h1>`** – HTML! ישר בתוך JavaScript, **בלי מירכאות**. זה נקרא **JSX**.
- **`export default App;`** – "תן לקבצים אחרים להשתמש ברכיב הזה". (`main.jsx` צריך אותו.)

---

## 6. JSX – HTML בתוך JavaScript

### 📖 הסבר

**JSX** נראה כמו HTML, וכמעט תמיד מתנהג כמוהו. אבל יש **שישה כללים** שחשוב להכיר:

| # | הכלל | ❌ לא כך | ✅ אלא כך |
|:---:|---|---|---|
| 1 | מחזירים **אב אחד** בלבד. כמה תגיות? עוטפים ב-`div` (או ב-`<>...</>`) | `return <h1>A</h1><p>B</p>;` | `return <div><h1>A</h1><p>B</p></div>;` |
| 2 | `className` במקום `class` (המילה `class` תפוסה ב-JavaScript) | `<div class="card">` | `<div className="card">` |
| 3 | **כל** תגית נסגרת – גם `img`, `br`, `input` – עם `/>` | `<img src="a.svg">` | `<img src="a.svg" />` |
| 4 | JavaScript בתוך JSX – בתוך **סוגריים מסולסלים** `{ }` | `<h1>name</h1>` | `<h1>{name}</h1>` |
| 5 | ערך של מאפיין מ-JavaScript – `{ }` **בלי** מירכאות | `src="{photo}"` | `src={photo}` |
| 6 | הערות – בתוך `{/* */}` | `<!-- comment -->` | `{/* comment */}` |

### 📖 הכלל החשוב ביותר – סוגריים מסולסלים

`{ }` בתוך JSX = "**כאן עוצרים את ה-HTML, ומחשבים JavaScript**". אפשר לשים בפנים כל דבר שמחזיר ערך:

```jsx
function App() {
  const name = "Dana";
  const birthYear = 2009;

  return (
    <div>
      <h1>Hello {name}!</h1>
      <p>Next year I will be {2026 - birthYear + 1}</p>
      <p>My name has {name.length} letters</p>
    </div>
  );
}
```

**על המסך:** `Hello Dana!`, `Next year I will be 18`, `My name has 4 letters`.

> 💡 **למה יש סוגריים עגולים `( )` אחרי `return`?** כשה-JSX משתרע על כמה שורות, עוטפים אותו בסוגריים – כדי ש-JavaScript תבין שכל זה **חלק מה-`return`**.

> 💡 **השוו לשיעור 4:** שם כתבנו `` `<li>${skill}</li>` `` – מחרוזת עם `${}`. ב-JSX אין מירכאות ואין דולר: `<li>{skill}</li>`.

### ✋ תורכם

כתבו ב-`App` משתנים `city` ו-`hobby`, והציגו משפט: `I live in ... and I love ...`.

---

## 7. 🔨 בונים יחד – הכרטיס ב-React

### שלב 1 – הנתונים והכרטיס

ב-`App.jsx`:

```jsx
function App() {
  const person = {
    name: "Dana Cohen",
    role: "Web Developer",
    city: "Yarka",
    email: "dana@example.com",
    skills: ["HTML", "CSS", "JavaScript"],
  };

  return (
    <div className="card">
      <img className="avatar" src="/avatar.svg" alt={`Photo of ${person.name}`} />
      <h1>{person.name}</h1>
      <h2 className="role">{person.role}</h2>
      <p>
        I live in <strong>{person.city}</strong> and I love building websites.
      </p>

      <h3>Contact me</h3>
      <p>
        Email: <a href={`mailto:${person.email}`}>{person.email}</a>
      </p>
    </div>
  );
}

export default App;
```

שמרו – והכרטיס המעוצב מופיע! שימו לב:

- `src="/avatar.svg"` – `/` בהתחלה = "מתוך התיקייה `public`".
- `alt={`Photo of ${person.name}`}` – מחרוזת תבנית **בתוך** `{ }`: קודם `{` של JSX, ובפנים מחרוזת תבנית רגילה עם `${}`.
- `href={`mailto:${person.email}`}` – אותו דבר, לקישור המייל.

> 💡 **השוו לשיעור 4:** שם היו לנו **שמונה** שורות של `getElementById` ועוד חמש של `textContent`. כאן – **אף אחת**. כותבים איפה כל נתון מופיע, ו-React מציירת.

### שלב 2 – רשימת הכישורים עם `map`

בין ה-`p` של העיר לבין `Contact me`, הוסיפו:

```jsx
      <h3>My skills ({person.skills.length})</h3>
      <ul className="skills">
        {person.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
```

**בדיוק** כמו בשיעור 5! `map` הופכת כל כישור לתגית `<li>`. רק שלושה הבדלים:

1. אין מירכאות – `<li>` הוא JSX, לא מחרוזת.
2. אין `join("")` – React יודעת להציג מערך של תגיות בעצמה.
3. יש **`key`** – הסבר מיד.

### 📖 `key` – תעודת זהות לכל פריט ברשימה

כשמציגים רשימה עם `map`, React רוצה **מזהה ייחודי** לכל פריט – כדי לדעת, כשהרשימה משתנה, **איזה** פריט נוסף, נמחק או זז. זה בדיוק ה-`id` משיעור 6!

- אם לכל פריט יש `id` – משתמשים בו: `key={task.id}`.
- כאן הכישורים הם מחרוזות שלא חוזרות על עצמן – אז הכישור עצמו הוא ה-`key`.

> ⚠️ שכחתם `key`? הדף עדיין יעבוד, אבל בקונסול (F12) תופיע אזהרה: `Each child in a list should have a unique "key" prop`. תמיד מוסיפים.

### ✋ תורכם

הוסיפו לאובייקט `person` מערך `hobbies`, והציגו אותו כרשימה נוספת עם כותרת `My hobbies`.

---

## 8. רכיבים – הקוביות של React

### 📖 הסבר

עד עכשיו היה לנו רכיב **אחד** – `App`. אבל הכוח של React הוא ב**חלוקה לרכיבים קטנים**: כל חלק בדף – רכיב משלו, בקובץ משלו.

רכיב הוא פונקציה ש:

1. **השם שלה מתחיל באות גדולה**: `Skill`, `ProfileCard`. (באות קטנה – React חושבת שזו תגית HTML רגילה.)
2. **מחזירה JSX**.

ומשתמשים בו **כמו בתגית HTML**: `<Skill />`.

### 🔨 עושים יחד – רכיב `Skill`

1. צרו בתיקייה `src` קובץ חדש בשם `Skill.jsx`:

```jsx
function Skill() {
  return <li>HTML</li>;
}

export default Skill;
```

2. ב-`App.jsx`, בשורה **הראשונה** של הקובץ:

```jsx
import Skill from "./Skill.jsx";
```

3. ובתוך ה-`ul`, במקום ה-`map`, נסו לרגע:

```jsx
      <ul className="skills">
        <Skill />
        <Skill />
        <Skill />
      </ul>
```

שמרו. מופיעות **שלוש** גלולות – אבל בכולן כתוב `HTML`. 🤔 הרכיב תמיד מציג אותו דבר. איך נגיד לכל `Skill` **מה** להציג?

### 📖 `import` / `export` – קבצים שמדברים זה עם זה

| בקובץ | הקוד | המשמעות |
|---|---|---|
| `Skill.jsx` | `export default Skill;` | "אני **משתף** את הרכיב הזה" |
| `App.jsx` | `import Skill from "./Skill.jsx";` | "אני **לוקח** את `Skill` מהקובץ `Skill.jsx` שבאותה תיקייה" |

`./` = "באותה תיקייה שבה אני נמצא".

---

## 9. Props – לתת לרכיב מידע

### 📖 הסבר

**Props** (קיצור של Properties – מאפיינים) הם הדרך **להעביר מידע לרכיב**. כותבים אותם בדיוק כמו מאפיינים של תגית HTML:

```jsx
<Skill name="HTML" />
<Skill name="CSS" />
```

והרכיב מקבל את כולם **באובייקט אחד** – כפרמטר הראשון של הפונקציה:

```jsx
function Skill(props) {
  return <li>{props.name}</li>;
}
```

`props` הוא אובייקט: `{ name: "HTML" }`. ובעזרת **פירוק** משיעור 6 – כותבים את זה קצר יותר:

```jsx
function Skill({ name }) {
  return <li>{name}</li>;
}

export default Skill;
```

`{ name }` בסוגריים של הפונקציה = "מתוך האובייקט שקיבלתי, תן לי את `name`".

### 🌍 מהעולם האמיתי

**טופס הזמנה בפיצרייה.** הטופס (הרכיב) תמיד אותו טופס – אבל כל לקוח ממלא בו פרטים אחרים: גודל, תוספות, כתובת (ה-Props). המטבח מכין כל פיצה לפי מה שכתוב **בטופס שלה**.

### 🔨 עושים יחד

עדכנו את `Skill.jsx` לגרסה עם `{ name }`, וב-`App.jsx` החזירו את ה-`map` – הפעם עם הרכיב:

```jsx
      <ul className="skills">
        {person.skills.map((skill) => (
          <Skill key={skill} name={skill} />
        ))}
      </ul>
```

- `name={skill}` – מעבירים לכל `Skill` את הכישור **שלו**. (בסוגריים מסולסלים – כי `skill` הוא משתנה.)
- `key={skill}` – ה-`key` עובר לרכיב שבתוך ה-`map`, לא ל-`<li>` שבתוכו.

### 📖 Props יכולים להיות כל דבר

מחרוזת – במירכאות. **כל דבר אחר** (מספר, משתנה, מערך, אובייקט) – בסוגריים מסולסלים:

```jsx
<Product title="Laptop" price={3500} inStock={true} />
```

> ⚠️ `price="3500"` (במירכאות) הוא **טקסט**, לא מספר – זוכרים את `"5" + "5"`? מספרים תמיד ב-`{ }`.

---

## 10. 🔨 שני כרטיסים מאותו קוד

### 📖 הרעיון

עכשיו הקסם: נהפוך את **כל הכרטיס** לרכיב `ProfileCard`, שמקבל `person` כ-Prop. ואז – נציג **כמה** כרטיסים, של כמה אנשים, מאותו רכיב.

### שלב 1 – הרכיב `ProfileCard`

צרו קובץ `src/ProfileCard.jsx`:

```jsx
import Skill from "./Skill.jsx";

function ProfileCard({ person }) {
  const { name, role, city, email, skills } = person;

  return (
    <div className="card">
      <img className="avatar" src="/avatar.svg" alt={`Photo of ${name}`} />
      <h1>{name}</h1>
      <h2 className="role">{role}</h2>
      <p>
        I live in <strong>{city}</strong> and I love building websites.
      </p>

      <h3>My skills ({skills.length})</h3>
      <ul className="skills">
        {skills.map((skill) => (
          <Skill key={skill} name={skill} />
        ))}
      </ul>

      <h3>Contact me</h3>
      <p>
        Email: <a href={`mailto:${email}`}>{email}</a>
      </p>
    </div>
  );
}

export default ProfileCard;
```

זה **אותו JSX** מסעיף 7 – רק שהנתונים מגיעים מבחוץ (`person`), ובשורה הראשונה **פירקנו** אותו – כדי לכתוב `name` במקום `person.name`.

### שלב 2 – `App` עם מערך של אנשים

החליפו את כל `App.jsx`:

```jsx
import ProfileCard from "./ProfileCard.jsx";

// The data - one object for each person
const people = [
  {
    id: 1,
    name: "Dana Cohen",
    role: "Web Developer",
    city: "Yarka",
    email: "dana@example.com",
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 2,
    name: "Omar Halabi",
    role: "Game Developer",
    city: "Daliyat al-Karmel",
    email: "omar@example.com",
    skills: ["JavaScript", "React"],
  },
];

function App() {
  return (
    <div className="cards">
      {people.map((person) => (
        <ProfileCard key={person.id} person={person} />
      ))}
    </div>
  );
}

export default App;
```

שמרו – **שני כרטיסים**, זה לצד זה! 🎉

- `people.map(...)` – לכל אדם במערך – רכיב `ProfileCard`.
- `person={person}` – מעבירים את **כל האובייקט** של האדם כ-Prop אחד.
- `key={person.id}` – הפעם יש `id`, אז משתמשים בו.

### ✋ תורכם

הוסיפו למערך `people` אדם **שלישי** – אתם! כמה שורות JSX כתבתם בשביל הכרטיס החדש?

<details><summary>תשובה</summary>

אפס! הוספתם רק **נתונים**. הרכיב `ProfileCard` כבר יודע לצייר כל אדם.

</details>

---

## 11. 💻 הקוד המלא

כל הפרויקט נמצא בתיקייה [`project`](project/) של השיעור (בלי `node_modules` – כדי להריץ: `npm install` ואז `npm run dev`).

**מבנה הקבצים:**

```text
my-card/
├── public/
│   └── avatar.svg
├── src/
│   ├── App.jsx           <- the data + a ProfileCard for each person
│   ├── ProfileCard.jsx   <- one card
│   ├── Skill.jsx         <- one skill pill
│   ├── index.css         <- the design (from lesson 2)
│   └── main.jsx          <- do not touch
└── index.html
```

**`src/Skill.jsx`:**

```jsx
function Skill({ name }) {
  return <li>{name}</li>;
}

export default Skill;
```

(`App.jsx` ו-`ProfileCard.jsx` – בדיוק כמו בסעיף 10.)

**מה יופיע על המסך:** שני כרטיסים לבנים זה לצד זה – Dana Cohen עם שלושה כישורים, ו-Omar Halabi עם שניים. אותו עיצוב בדיוק כמו בשיעור 2.

---

## 12. 🔍 לפני ואחרי – JavaScript רגילה מול React

| | שיעור 4 (JavaScript רגילה) | שיעור 7 (React) |
|---|---|---|
| איפה ה-HTML | ב-`index.html`, עם `id` ריקים | ב-JSX, בתוך הרכיב |
| איך הנתון מגיע למסך | `getElementById` + `textContent` | `{person.name}` |
| רשימה | לולאה + `innerHTML +=` | `map` שמחזירה JSX |
| כרטיס שני | להעתיק את כל ה-HTML וה-JavaScript | עוד אובייקט במערך |
| לראות שינוי | לשמור + F5 | רק לשמור |

---

## 13. ⚠️ טעויות נפוצות – ואיך מתקנים

| מה קרה | למה | התיקון |
|---|---|---|
| `npm.ps1 cannot be loaded` | הגדרת אבטחה של Windows | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` (סעיף 2) |
| `npm error enoent Could not read package.json` | הרצתם `npm install` / `npm run dev` **מחוץ** לתיקיית הפרויקט | `cd my-card` קודם |
| הדפדפן: `This site can't be reached` | השרת לא רץ (סגרתם את הטרמינל, או לחצתם Ctrl + C) | `npm run dev` שוב |
| מסך לבן לגמרי | שגיאה בקוד. היא מופיעה בקונסול (F12) – ולפעמים גם בטרמינל | קראו את השגיאה: שם הקובץ ומספר השורה |
| `Adjacent JSX elements must be wrapped in an enclosing tag` | `return` של **כמה** תגיות בלי אב משותף | עטפו ב-`<div>` או ב-`<>...</>` |
| `Expected corresponding JSX closing tag for <img>` | תגית לא סגורה | `<img ... />` |
| העיצוב לא עובד על תגית | כתבתם `class` במקום `className` | `className` |
| על המסך מופיע `person.name` כטקסט | שכחתם סוגריים מסולסלים | `{person.name}` |
| הרכיב לא מופיע, ובקונסול `<skill> is unrecognized` | שם הרכיב באות קטנה | `Skill` – תמיד אות גדולה |
| `Skill is not defined` | שכחתם `import` בראש הקובץ | `import Skill from "./Skill.jsx";` |
| `does not provide an export named 'default'` | שכחתם `export default` בסוף קובץ הרכיב | `export default Skill;` |
| אזהרה: `unique "key" prop` | חסר `key` ב-`map` | `key={...}` על התגית החיצונית שבתוך ה-`map` |

---

## 14. 📚 מילון מונחים

| מונח | הסבר |
|---|---|
| **React** | ספרייה לבניית ממשקים מרכיבים; מציירת את המסך מחדש לבד כשהנתונים משתנים |
| **Node.js** | תוכנה שמריצה JavaScript מחוץ לדפדפן – מריצה את כלי העבודה |
| **npm** | "חנות האפליקציות" של JavaScript; מתקינה ספריות ומריצה פקודות |
| **Vite** | כלי שיוצר פרויקט React ומריץ את שרת הפיתוח |
| **טרמינל** | חלון לכתיבת פקודות למחשב |
| **שרת פיתוח** | `npm run dev` – מגיש את האתר ל-`localhost` ומרענן בכל שמירה |
| **`node_modules`** | תיקיית הספריות שהותקנו. לא נוגעים, לא מגישים |
| **JSX** | HTML בתוך JavaScript; קבצים עם סיומת `.jsx` |
| **רכיב (Component)** | פונקציה ששמה באות גדולה ושמחזירה JSX; משתמשים בה כמו בתגית: `<Skill />` |
| **Props** | המידע שמעבירים לרכיב: `<Skill name="HTML" />` |
| **`key`** | מזהה ייחודי לכל פריט ברשימה שנבנית עם `map` |
| **`import` / `export`** | לשתף רכיב מקובץ אחד, ולהשתמש בו בקובץ אחר |

---

## ✅ בדקו את עצמכם

1. מה ההבדל בין `npm install` ל-`npm run dev`? איזו מהן מריצים כל פעם שחוזרים לפרויקט?
2. למה **אף פעם** לא מגישים את התיקייה `node_modules`?
3. מה הטעות: `return <h1>Hello</h1><p>World</p>;`? ואיך מתקנים?
4. מה יופיע על המסך: `<p>{3 + 4}</p>`? ומה יופיע: `<p>3 + 4</p>`?
5. מה שני הכללים לשם של רכיב ולמה שהוא עושה?
6. כתבו רכיב `Greeting` שמקבל Prop בשם `name` ומציג `<h2>Hello ...!</h2>`. איך משתמשים בו כדי לברך את Rana?
7. מה ההבדל בין `<Product price="50" />` לבין `<Product price={50} />`?
8. למה צריך `key` כשמציגים רשימה עם `map`?

<details><summary>תשובות</summary>

1. `npm install` מוריד את הספריות – פעם אחת, בהתחלה. `npm run dev` מפעיל את שרת הפיתוח – בכל פעם שחוזרים לעבוד.
2. כי היא ענקית, ואפשר תמיד ליצור אותה מחדש עם `npm install` לפי `package.json`.
3. מחזירים שתי תגיות בלי אב משותף. מתקנים: `return <div><h1>Hello</h1><p>World</p></div>;` (או עם `<>...</>`).
4. `7` – בתוך `{ }` זה חישוב. ובלי סוגריים: `3 + 4` – סתם טקסט.
5. השם מתחיל **באות גדולה**, והפונקציה **מחזירה JSX**.
6. `function Greeting({ name }) { return <h2>Hello {name}!</h2>; }` – ומשתמשים: `<Greeting name="Rana" />`.
7. במירכאות – `price` הוא **טקסט** `"50"`. בסוגריים מסולסלים – **מספר** `50`, שאפשר לחשב איתו.
8. כדי ש-React תזהה כל פריט – ותדע, כשהרשימה משתנה, איזה פריט נוסף, נמחק או זז.

</details>

---

**בשיעור הבא:** הכרטיסים שלנו עדיין **לא עושים** כלום – אין כפתורים, אין הקלדה. נלמד את המושג החשוב ביותר ב-React – **State** (`useState`) – ונבנה מחדש את **רשימת המשימות** משיעור 6. תראו כמה קוד ייעלם.

➡️ [תרגילים לשיעור 7](exercises.md)
