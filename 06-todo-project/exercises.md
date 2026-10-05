# תרגילים – שיעור 6: רשימת משימות

> **איך מגישים:** תיקייה בשם `lesson6-<השם שלכם>`, ובה תת-תיקייה לכל תרגיל (`ex1`, `ex2`…) עם `index.html`, `script.js` (ו-`style.css` אם צריך). דחסו ל-ZIP והגישו במודל.
> **רמות קושי:** ⭐ קל · ⭐⭐ בינוני · ⭐⭐⭐ אתגר
> **כלל לכל התרגילים:** **בלי `push`**. כל שינוי במערך – מערך חדש (`...`, `map`, `filter`).

---

## תרגיל 1 ⭐ – מה יודפס?

**בלי להריץ** – כתבו בהערה מה יודפס בכל שורה. אחר כך הריצו ובדקו.

```js
const a = [1, 2, 3];
const b = [...a, 4];
const c = [0, ...a];
console.log(a);
console.log(b);
console.log(c);
console.log([...a, ...b].length);

const phone = { brand: "Samsung", year: 2023, color: "black" };
const newPhone = { ...phone, year: 2025 };
console.log(phone.year);
console.log(newPhone.year);
console.log(newPhone.color);

const { brand, color } = phone;
console.log(`${brand} in ${color}`);

const [x, y] = ["first", "second", "third"];
console.log(y);

const { model } = phone;
console.log(model);
```

---

## תרגיל 2 ⭐ – מצאו את הבאגים

הקוד הבא הוא חלק מרשימת משימות. יש בו **חמש** טעויות. מצאו ותקנו את כולן, והוסיפו הערה מעל כל תיקון.

```js
const tasks = [
  { id: 1, text: "Buy milk", done: false },
  { id: 2, text: "Call grandma", done: false },
];

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id === id);
  render();
};

const toggleTask = (id) => {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { task, done: !task.done };
    }
  });
  render();
};

taskForm.addEventListener("submit", () => {
  const text = taskInput.value.trim();
  addTask(text);
});
```

(רמזים: מה צריך כדי להחליף מערך? מי נשאר אחרי ה-`filter`? מה מועתק לאובייקט החדש? מה קורה למשימות האחרות ב-`map`? ומה קורה לדף כששולחים טופס?)

---

## תרגיל 3 ⭐⭐ – סינון: הכול / פעילות / בוצעו

שדרגו את רשימת המשימות מהשיעור:

1. מתחת לתיבה – שלושה כפתורים: `All`, `Active`, `Done`.
2. משתנה `let filter = "all";` – והכפתורים רק משנים אותו וקוראים ל-`render()`.
3. ב-`render`, **לפני** ה-`map`, סננו את המשימות לפי `filter`. (שימו לב: את `tasks` עצמו **לא** משנים – מסננים לתוך משתנה חדש, `visible`, כמו בקטלוג של שיעור 5.)
4. הכפתור שנבחר מקבל מחלקה `active`.
5. שורת הסיכום עדיין סופרת **את כל** המשימות, לא רק את המוצגות.

---

## תרגיל 4 ⭐⭐ – רשימת קניות עם כמויות

```js
let items = [
  { id: 1, name: "Milk", amount: 2 },
  { id: 2, name: "Bread", amount: 1 },
];
```

1. שורה לכל מוצר: `Milk × 2`, ולידה כפתורי `+` ו-`-`.
2. `+` מגדיל את הכמות באחד, `-` מקטין באחד. (רמז: `map` + `{ ...item, amount: item.amount + 1 }`.)
3. כשהכמות יורדת ל-`0` – המוצר **נמחק** מהרשימה. (רמז: אחרי ה-`map`, `filter` שמשאיר רק מוצרים עם כמות גדולה מ-0.)
4. טופס להוספת מוצר חדש (כמות התחלתית: 1). **בונוס:** אם המוצר כבר ברשימה – רק מגדילים את הכמות שלו, במקום להוסיף שורה כפולה. (רמז: `items.some((item) => item.name === name)` מחזיר `true` אם קיים כזה.)
5. בתחתית: `Total items: 3` – סכום כל הכמויות.

---

## תרגיל 5 ⭐⭐⭐ – המשימות לא נעלמות ברענון

היום, כשמרעננים את הדף – כל המשימות החדשות נעלמות. לדפדפן יש "מגירה" קטנה בשם **`localStorage`** שנשארת גם אחרי רענון, ואפילו אחרי כיבוי המחשב.

`localStorage` שומר רק **טקסט**, לכן צריך להפוך את המערך לטקסט ובחזרה:

```js
// Save: array -> text -> drawer
localStorage.setItem("tasks", JSON.stringify(tasks));

// Load: drawer -> text -> array
const saved = localStorage.getItem("tasks");
```

ו-`JSON.parse(saved)` הופך את הטקסט בחזרה למערך.

1. בסוף `render` – שמרו את `tasks` ב-`localStorage`. (למה דווקא שם? כי כל פעולה קוראת ל-`render`!)
2. בתחילת הקובץ – אם יש משהו שמור (`saved !== null`), טענו אותו לתוך `tasks`. אם אין – השאירו את שלוש משימות ברירת המחדל.
3. בדקו: הוסיפו משימות, סמנו, רעננו – הכול נשאר?
4. כדי להתחיל מאפס: בכלי המפתחים, לשונית **Application** ← **Local Storage** – אפשר לראות את מה שנשמר ולמחוק אותו.

---

## תרגיל 6 ⭐⭐⭐ – האפליקציה שלכם: מעקב הוצאות

**שלב א׳ – תכנון (בהערה בראש `script.js`):** ענו על שלוש השאלות – אילו נתונים, מה על המסך, אילו פעולות.

**שלב ב׳ – בנייה:**

1. טופס עם **שתי** תיבות: תיאור (`Pizza`) וסכום (`45`). (רמז: `<input type="number">`, ו-`Number(amountInput.value)` הופך את הטקסט למספר.)
2. שורה לכל הוצאה: `Pizza – 45 ₪`, וכפתור מחיקה.
3. בתחתית: `Total: 120 ₪`.
4. אי אפשר להוסיף הוצאה בלי תיאור, או עם סכום 0 ומטה.
5. **בונוס:** הוצאה מעל 100 ₪ מוצגת באדום.
