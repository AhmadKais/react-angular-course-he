# תרגילים – שיעור 5: פונקציות חץ, `map` ו-`filter`

> **איך מגישים:** תיקייה בשם `lesson5-<השם שלכם>`, ובה תת-תיקייה לכל תרגיל (`ex1`, `ex2`…) עם `index.html` ו-`script.js` (ו-`style.css` אם צריך). דחסו ל-ZIP והגישו במודל.
> **רמות קושי:** ⭐ קל · ⭐⭐ בינוני · ⭐⭐⭐ אתגר
> **כלל לכל התרגילים:** כל הפונקציות – **פונקציות חץ**.

---

## תרגיל 1 ⭐ – מפונקציה רגילה לפונקציית חץ

הפכו כל פונקציה לפונקציית חץ – בגרסה **הקצרה ביותר** שאפשר. אחרי כל אחת, הפעילו אותה והדפיסו את התוצאה כדי לוודא שהיא עובדת.

```js
function half(n) {
  return n / 2;
}

function isEven(n) {
  return n % 2 === 0;
}

function welcome(name, city) {
  return `Welcome ${name} from ${city}!`;
}

function priceWithVat(price) {
  const vat = price * 0.18;
  return price + vat;
}
```

(`%` = שארית החלוקה. `7 % 2` הוא `1`, ו-`8 % 2` הוא `0` – לכן מספר זוגי הוא מספר ש-`n % 2 === 0`.)

**שאלה:** באיזו מהן **אי אפשר** להשתמש בגרסה הקצרה בלי לשנות את הקוד שבתוכה? למה? (ובונוס: איך **כן** אפשר לקצר אותה לשורה אחת?)

---

## תרגיל 2 ⭐ – מה יודפס?

**בלי להריץ** – כתבו בהערה מה יודפס בכל שורה. אחר כך הריצו ובדקו.

```js
const numbers = [3, 8, 12, 5, 20];

console.log(numbers.map((n) => n * 10));
console.log(numbers.filter((n) => n > 6));
console.log(numbers.filter((n) => n > 100));
console.log(numbers.map((n) => n > 6));
console.log(numbers.length);

const label = numbers.length > 3 ? "long" : "short";
console.log(label);

let isOpen = true;
isOpen = !isOpen;
console.log(isOpen);

console.log(["a", "b", "c"].join(""));
console.log(["a", "b", "c"].join(" - "));
console.log("Hello World".toLowerCase().includes("world"));
```

---

## תרגיל 3 ⭐ – מצאו את הבאגים

הקוד הבא אמור להציג ב-`ul` רק את הפירות שמחירם **עד 10**, כל אחד בצורה `Apple - 5`. יש בו **ארבע** טעויות.

```js
const fruits = [
  { name: "Apple", price: 5 },
  { name: "Mango", price: 15 },
  { name: "Banana", price: 8 },
];

const fruitsList = document.getElementById("fruits-list");

const fruitToHtml = (fruit) => {
  `<li>${fruit.name} - ${fruit.price}</li>`;
};

const cheap = fruits.filter((fruit) => fruit.price < 10);
fruits.filter((fruit) => fruit.price <= 10);

fruitsList.innerHTML = cheap.map(fruitToHtml);
```

(רמזים: (1) מה פונקציה עם `{ }` צריכה כדי להחזיר ערך? (2) "עד 10" כולל את 10? (3) מה עושה השורה שלא נשמרת באף משתנה? (4) מה מופיע בין הפריטים?)

---

## תרגיל 4 ⭐⭐ – כיתה עם `map` ו-`filter`

```js
const students = [
  { name: "Dana", grade: 95 },
  { name: "Omar", grade: 48 },
  { name: "Rana", grade: 74 },
  { name: "Yousef", grade: 55 },
  { name: "Lina", grade: 88 },
];
```

**בלי אף לולאת `for`** – רק `map`, `filter` ו-`join`:

1. מערך של **שמות** התלמידים בלבד.
2. מערך של התלמידים **שעברו** (56 ומעלה).
3. מחרוזת אחת עם שמות התלמידים שעברו, מופרדים בפסיק: `Dana, Rana, Lina`.
4. הציגו בדף רשימה (`ul`) של **כל** התלמידים, בצורה `Dana - 95 ✅` או `Omar - 48 ❌`. (רמז: טרנרי בתוך מחרוזת התבנית.)

---

## תרגיל 5 ⭐⭐ – חנות קטנה

בנו דף מוצרים בשיטת **נתונים ← `render` ← מסך**:

```js
const products = [
  { id: 1, name: "Laptop", price: 3500, inStock: true },
  { id: 2, name: "Mouse", price: 80, inStock: true },
  { id: 3, name: "Screen", price: 900, inStock: false },
  { id: 4, name: "Keyboard", price: 250, inStock: true },
  { id: 5, name: "Headphones", price: 400, inStock: false },
];
```

1. כרטיס לכל מוצר: שם, מחיר (`3500 ₪`), ותווית `In stock` (ירוקה) או `Sold out` (אדומה).
2. תיבת חיפוש לפי שם המוצר – מתעדכנת בכל הקלדה.
3. כפתור `In stock only` שמדליק ומכבה סינון. הטקסט של הכפתור מתחלף.
4. שורת `Showing X of 5 products`, והודעה `No products found` כשאין תוצאות.

---

## תרגיל 6 ⭐⭐⭐ – קטלוג עם סינון לפי מחיר

שדרגו את קטלוג הקורסים מהשיעור:

1. החיפוש מוצא קורס גם לפי שם המורה.
2. במקום כפתור אחד – **שלושה** כפתורים: `All`, `Free`, `Paid`. במקום `freeOnly`, השתמשו במשתנה אחד: `let priceFilter = "all";` שהערך שלו `"all"`, `"free"` או `"paid"`.
3. הכפתור שנבחר כרגע מקבל מחלקה `active` שצובעת אותו בכתום. (רמז: ב-`render`, לכל כפתור: `button.className = priceFilter === "free" ? "active" : "";`)
4. **בונוס:** שורה בתחתית: `Total hours: 250` – סכום השעות של הקורסים **המוצגים** בלבד. (רמז: לולאת `for...of` על `visible`, או – למי שרוצה לחקור לבד – `reduce`.)
