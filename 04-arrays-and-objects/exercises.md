# תרגילים – שיעור 4: מערכים, לולאות ואובייקטים

> **איך מגישים:** תיקייה בשם `lesson4-<השם שלכם>`, ובה תת-תיקייה לכל תרגיל (`ex1`, `ex2`…) עם `index.html` ו-`script.js` (ו-`style.css` אם צריך). דחסו ל-ZIP והגישו במודל.
> **רמות קושי:** ⭐ קל · ⭐⭐ בינוני · ⭐⭐⭐ אתגר

---

## תרגיל 1 ⭐ – רשימת קניות (בקונסול)

1. צרו מערך `shoppingList` עם ארבעה מוצרים.
2. הדפיסו את המוצר **הראשון**, את המוצר **השלישי**, ואת **מספר** המוצרים.
3. הוסיפו שני מוצרים עם `push`.
4. בעזרת לולאת `for...of`, הדפיסו כל מוצר בשורה משלו, בצורה: `- Milk`.
5. **בונוס:** הדפיסו את המוצר **האחרון** בלי לכתוב את המספר שלו ביד. (רמז: אם יש `length` פריטים ומתחילים מ-0, מה המיקום של האחרון?)

---

## תרגיל 2 ⭐ – מה יודפס?

**בלי להריץ** – כתבו בהערה מה יודפס בכל שורה. אחר כך הריצו ובדקו.

```js
const numbers = [4, 8, 15, 16];
console.log(numbers[0]);
console.log(numbers[4]);
console.log(numbers.length);
numbers.push(23);
console.log(numbers.length);

const pet = { name: "Luna", type: "cat", age: 3 };
console.log(pet.name);
console.log(`${pet.name} is a ${pet.type}`);
pet.age = pet.age + 1;
console.log(pet.age);
console.log(pet.color);

let total = 0;
for (const number of numbers) {
  total = total + number;
}
console.log(total);
```

---

## תרגיל 3 ⭐ – מצאו את הבאגים

בקוד הבא יש **חמש** טעויות. מצאו ותקנו את כולן, והוסיפו הערה מעל כל תיקון.

**HTML:**

```html
<h1 id="title"></h1>
<ul id="movies-list"></ul>
<script src="script.js"></script>
```

**`script.js`:**

```js
const user = {
  name: "Omar"
  movies: ["Toy Story", "Frozen", "Cars"],
};

const title = document.getElementById("title");
const moviesList = document.getElementById("movies-list");

title.textContent = "${user.name}'s favorite movies";

for (const movie of movies) {
  moviesList.innerHTML = `<li>${movie}</li>`;
}

console.log(user.movies[3]);
```

(רמז: אחת הטעויות לא גורמת לשגיאה אדומה – היא רק מדפיסה `undefined`, כי מישהו שכח שסופרים מ-0. תקנו אותה כך שיודפס הסרט **האחרון**.)

---

## תרגיל 4 ⭐⭐ – כיתה בקונסול

```js
const students = [
  { name: "Dana", grade: 95 },
  { name: "Omar", grade: 48 },
  { name: "Rana", grade: 74 },
  { name: "Yousef", grade: 55 },
  { name: "Lina", grade: 88 },
];
```

בעזרת **לולאה אחת**:

1. הדפיסו לכל תלמיד: `Dana: 95 - Passed` או `Omar: 48 - Failed` (עוברים מ-56 ומעלה).
2. חשבו את **הממוצע** של הכיתה. (רמז: סכום כל הציונים, חלקי `students.length`.)
3. **בונוס:** מצאו את הציון **הגבוה ביותר** ואת שם התלמיד שקיבל אותו. (רמז: `let best = students[0];`, ובכל סיבוב – אם הציון של התלמיד הנוכחי גבוה יותר מהציון של `best`, החליפו.)

---

## תרגיל 5 ⭐⭐ – רשימת קניות בדף

בנו דף עם:

- כותרת `Shopping list`, ותחתיה `Items: 0`.
- תיבת טקסט וכפתור `Add`.
- רשימה (`ul`) ריקה.

התנהגות:

1. כל הנתונים במערך `items` (מתחיל ריק: `[]`).
2. לחיצה על `Add` מוסיפה את מה שהוקלד **למערך**, מרוקנת את התיבה, ומציירת מחדש את הרשימה ואת המונה – בעזרת פונקציה `showItems()`.
3. אי אפשר להוסיף פריט ריק.
4. כפתור `Clear all` שמרוקן את הרשימה. (רמז: `items.length = 0;` מרוקן מערך שהוגדר עם `const`.)

---

## תרגיל 6 ⭐⭐⭐ – הכרטיס החכם שלכם

קחו את הכרטיס שלכם, והעבירו אותו לשיטה של השיעור:

1. כל הפרטים באובייקט אחד – כולל מערך `skills` **ומערך** `hobbies`.
2. ה-HTML הוא שלד ריק; JavaScript ממלאת הכול.
3. שתי רשימות – כישורים ותחביבים – כל אחת עם מונה, תיבה וכפתור הוספה משלה.
4. **שאלה למחשבה:** כתבתם שתי פונקציות כמעט זהות (`showSkills` ו-`showHobbies`)? נסו לכתוב פונקציה **אחת**, `showList(array, listElement, countElement)`, שמקבלת **איזה** מערך לצייר ו**לאן** – והשתמשו בה לשתי הרשימות.
