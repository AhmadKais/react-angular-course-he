# פתרונות – שיעור 3: JavaScript (למורה)

---

## תרגיל 1 – קצת עליי

```js
// const - my name will not change while the program runs
const myName = "Omar";
// const - the city will not change
const city = "Yarka";
// const - the birth year never changes
const birthYear = 2009;
// const - we only read it, we never change it
const favoriteNumber = 7;

const age = 2026 - birthYear;

console.log("My name is " + myName + ", I live in " + city + " and I am " + age + " years old");
console.log(favoriteNumber * 2);
console.log(favoriteNumber * 100);
```

**פלט:**

```text
My name is Omar, I live in Yarka and I am 17 years old
14
700
```

> 💡 כל המשתנים כאן `const` – אף אחד מהם לא משתנה. תלמיד שכתב `let` לא טעה (הקוד עובד), אבל כדאי לשאול אותו: "איזה מהם באמת משתנה?"

---

## תרגיל 2 – מה יודפס?

```js
let score = 10;
console.log(score);            // 10
score = score + 5;
console.log(score);            // 15
console.log("score");          // score   <- with quotes it is just text, not the variable
console.log("7" + "3");        // 73      <- two strings are glued together
console.log(7 + 3);            // 10
console.log("Score: " + score); // Score: 15

function double(number) {
  console.log(number * 2);
}

double(4);                     // 8
double(score);                 // 30
```

> 💡 השורות שבהן תלמידים טועים הכי הרבה: `console.log("score")` (חושבים שיודפס `15`) ו-`double(score)` (חושבים ש-`score` עדיין `10`).

---

## תרגיל 3 – מצאו את הבאגים

```js
// Fix 1: getElementById - capital B, small d
const button = document.getElementById("hello-btn");
// Fix 2: the id in the HTML is "message", not "msg"
const message = document.getElementById("message");

function sayHello() {
  message.textContent = "Hello there!";
} // Fix 3: the function was never closed with }

// Fix 4: no () after sayHello - we give the button the function, we don't run it now
button.addEventListener("click", sayHello);

// Fix 5: a const cannot be changed - use let
let clicks = 0;
clicks = clicks + 1;
```

> 💡 סדר הגילוי בכיתה הוא מעניין: בהתחלה הקונסול מראה רק את טעות 3 (`Unexpected end of input`), כי עם `}` חסר הקובץ כולו לא רץ. אחרי שמתקנים אותה – מופיעה טעות 1, וכן הלאה. זו הזדמנות ללמד: **מתקנים שגיאה אחת, מרעננים, וקוראים את הבאה**.

---

## תרגיל 4 – מונה עם שלושה כפתורים

**`index.html`:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Counter</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1 id="number">0</h1>
    <div class="buttons">
      <button id="minus-btn">-1</button>
      <button id="reset-btn">Reset</button>
      <button id="plus-btn">+1</button>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

**`style.css`:**

```css
body {
  font-family: Arial, sans-serif;
  text-align: center;
}

h1 {
  font-size: 80px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  font-size: 20px;
  padding: 10px 20px;
  cursor: pointer;
}
```

**`script.js` (עם שני השדרוגים):**

```js
const numberText = document.getElementById("number");
const plusButton = document.getElementById("plus-btn");
const minusButton = document.getElementById("minus-btn");
const resetButton = document.getElementById("reset-btn");

let count = 0;

// Updates the screen - all three buttons use it
function showCount() {
  numberText.textContent = count;

  if (count >= 10) {
    numberText.style.color = "red";
  } else {
    numberText.style.color = "black";
  }
}

function addOne() {
  count = count + 1;
  showCount();
}

function removeOne() {
  if (count > 0) {
    count = count - 1;
  }
  showCount();
}

function reset() {
  count = 0;
  showCount();
}

plusButton.addEventListener("click", addOne);
minusButton.addEventListener("click", removeOne);
resetButton.addEventListener("click", reset);
```

> 💡 רוב התלמידים יכתבו את `textContent` ואת בדיקת הצבע בתוך **כל** אחת משלוש הפונקציות. זה עובד – אבל כדאי להראות את הפונקציה המשותפת `showCount` ולשאול: "מה היה קורה אם הייתם שוכחים את בדיקת הצבע באחת מהן?" (זה בדיוק הרעיון שמוביל ל-React.)

---

## תרגיל 5 – הכרטיס שלכם עושה דברים

כפתור הלייק ומצב כהה – כמו ב-[`project/script.js`](project/script.js). התוספת של הטלפון:

**HTML (בתוך הכרטיס):**

```html
<p id="phone" class="hidden">Phone: 050-1234567</p>
<button id="phone-btn">Show phone</button>
```

**CSS:**

```css
.hidden {
  display: none;
}
```

**JavaScript:**

```js
const phone = document.getElementById("phone");
const phoneButton = document.getElementById("phone-btn");

function togglePhone() {
  phone.classList.toggle("hidden");

  if (phone.classList.contains("hidden")) {
    phoneButton.textContent = "Show phone";
  } else {
    phoneButton.textContent = "Hide phone";
  }
}

phoneButton.addEventListener("click", togglePhone);
```

**מחוון מוצע (100):** קובץ JavaScript מחובר בסוף ה-`body` – 10 · כפתור לייק עובד – 25 · מצב כהה עובד בצבעים משלהם – 25 · הצגה/הסתרה של הטלפון – 30 · שמות משתנים ברורים והערות – 10.

---

## תרגיל 6 – ניחוש מספר

**`index.html`:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Guess the number</title>
  </head>
  <body>
    <h1>Guess my number (1-10)</h1>
    <button id="btn-1">1</button>
    <button id="btn-2">2</button>
    <button id="btn-3">3</button>
    <button id="btn-4">4</button>
    <button id="btn-5">5</button>
    <button id="btn-6">6</button>
    <button id="btn-7">7</button>
    <button id="btn-8">8</button>
    <button id="btn-9">9</button>
    <button id="btn-10">10</button>
    <p id="message"></p>
    <p id="attempts">Attempts: 0</p>
    <script src="script.js"></script>
  </body>
</html>
```

**`script.js`:**

```js
const secret = 7;

const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");

let attempts = 0;
let gameOver = false;

function checkGuess(guess) {
  // Bonus: after a win, the buttons do nothing
  if (gameOver) {
    return;
  }

  attempts = attempts + 1;
  attemptsText.textContent = "Attempts: " + attempts;

  if (guess < secret) {
    message.textContent = "Too low!";
  } else if (guess > secret) {
    message.textContent = "Too high!";
  } else {
    message.textContent = "You got it!";
    gameOver = true;
  }
}

document.getElementById("btn-1").addEventListener("click", function () {
  checkGuess(1);
});
document.getElementById("btn-2").addEventListener("click", function () {
  checkGuess(2);
});
document.getElementById("btn-3").addEventListener("click", function () {
  checkGuess(3);
});
document.getElementById("btn-4").addEventListener("click", function () {
  checkGuess(4);
});
document.getElementById("btn-5").addEventListener("click", function () {
  checkGuess(5);
});
document.getElementById("btn-6").addEventListener("click", function () {
  checkGuess(6);
});
document.getElementById("btn-7").addEventListener("click", function () {
  checkGuess(7);
});
document.getElementById("btn-8").addEventListener("click", function () {
  checkGuess(8);
});
document.getElementById("btn-9").addEventListener("click", function () {
  checkGuess(9);
});
document.getElementById("btn-10").addEventListener("click", function () {
  checkGuess(10);
});
```

> 💡 `return;` עוד לא נלמד בשיעור – הוא אומר "צא מהפונקציה עכשיו". תלמידים שלא מכירים אותו יכולים לעטוף את כל הקוד ב-`if (gameOver === false) { ... }` – גם זה נכון.
> 💡 עשר השורות החוזרות הן הזדמנות מצוינת לשאלה "איך אפשר לקצר את זה?" – התשובה (לולאות ומערכים) מגיעה בשיעור הבא.
