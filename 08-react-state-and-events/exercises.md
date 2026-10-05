# תרגילים – שיעור 8: React – State, אירועים וטפסים

> **איך מגישים:** לכל תרגיל – פרויקט Vite משלו (או רכיב נפרד באותו פרויקט), **בלי** התיקייה `node_modules`. דחסו ל-ZIP אחד והגישו במודל.
> **רמות קושי:** ⭐ קל · ⭐⭐ בינוני · ⭐⭐⭐ אתגר
> **כלל לכל התרגילים:** אין `getElementById`, אין `innerHTML`, ואין `push` – רק State.

---

## תרגיל 1 ⭐ – המונה משיעור 3, ב-React

בנו רכיב `Counter`: מספר גדול באמצע, ושלושה כפתורים – `-1`, `Reset`, `+1`.

1. המספר לא יורד מתחת ל-`0`.
2. כשהמספר `10` ומעלה – הוא נצבע באדום. (רמז: `className={count >= 10 ? "big" : ""}`, ו-`.big { color: red; }` ב-CSS.)
3. מתחת למספר – `Even` או `Odd` (זוגי / אי-זוגי). (רמז: `count % 2 === 0`.)
4. ב-`App` – הציגו **שני** מונים. בדקו שהם לא משפיעים זה על זה.

**השוו לשיעור 3:** כמה פעמים כתבתם `textContent`, ואיפה נמצא היום הקוד ש"צובע באדום"?

---

## תרגיל 2 ⭐ – מצאו את הבאגים

בקוד הבא יש **חמש** טעויות. מצאו ותקנו את כולן, והוסיפו הערה מעל כל תיקון.

```jsx
function Shopping() {
  const [items, setItems] = useState(["Milk", "Bread"]);
  const [text, setText] = useState("");

  const addItem = (event) => {
    event.preventDefault();
    items.push(text);
    setItems(items);
    setText("");
  };

  return (
    <form onsubmit={addItem}>
      <input value={text} />
      <button type="submit">Add</button>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={setItems([])}>Clear</button>
    </form>
  );
}

export default Shopping;
```

(רמזים: מה חסר בראש הקובץ? איך כותבים אירועים ב-React? מה צריך התיבה כדי שאפשר יהיה להקליד בה? איך מעדכנים מערך ב-State? ומה קורה לכפתור `Clear` כשהרכיב **מצויר**?)

---

## תרגיל 3 ⭐⭐ – תיבת ציוץ

בנו רכיב `TweetBox`:

1. תיבת טקסט גדולה – `<textarea>` (עובדת בדיוק כמו `input`: `value` + `onChange`).
2. מתחת לתיבה: `87 characters left` – מתוך 100. (רמז: `100 - text.length`.)
3. כשנשארו פחות מ-10 תווים – המספר באדום. כשעברתם את ה-100 – המספר שלילי, והכפתור `Post` **מושבת**. (רמז: `<button disabled={...}>`.)
4. לחיצה על `Post` מוסיפה את הציוץ לרשימה **מעל** הציוצים הקודמים (החדש ראשון!), ומרוקנת את התיבה. (רמז: איפה שמים את `...tweets`?)
5. אי אפשר לפרסם ציוץ ריק.

---

## תרגיל 4 ⭐⭐ – הקטלוג עם חיפוש וסינון

קחו את קטלוג הקורסים מתרגיל 6 בשיעור 7, והוסיפו את מה שהיה בשיעור 5:

1. State בשם `search` – מחובר לתיבת חיפוש.
2. State בשם `freeOnly` – כפתור שמדליק ומכבה. הטקסט של הכפתור מתחלף: `Free only` / `Show all`.
3. משתנה `visible` – **מחושב** (לא State!) מתוך `courses`, `search` ו-`freeOnly`, בגוף הרכיב.
4. השורה `Showing 2 of 5 courses`, והודעה `No courses found` כשאין תוצאות.

**שאלה למחשבה:** למה `visible` **לא** צריך להיות State? מה היה קורה אם הייתם שומרים אותו ב-`useState`?

---

## תרגיל 5 ⭐⭐ – שדרוג לרשימת המשימות

שדרגו את רשימת המשימות מהשיעור:

1. שלושה כפתורי סינון: `All`, `Active`, `Done` – עם State בשם `filter`. הכפתור הנבחר מקבל מחלקה `active`.
2. כשאין משימות פעילות (אבל יש משימות) – במקום `0 of 3 tasks left` יופיע `All done! 🎉`.
3. הכפתור `Clear done tasks` מופיע **רק** כשיש לפחות משימה אחת שבוצעה.
4. **בונוס:** לחיצה כפולה על טקסט של משימה (`onDoubleClick`) מאפשרת לערוך אותו. (רמז: `prompt("Edit task:", text)` מחזירה את הטקסט החדש, או `null` אם לחצו Cancel.)

---

## תרגיל 6 ⭐⭐⭐ – רשימת קניות עם כמויות

בנו מחדש ב-React את תרגיל 4 משיעור 6:

```jsx
const [items, setItems] = useState([
  { id: 1, name: "Milk", amount: 2 },
  { id: 2, name: "Bread", amount: 1 },
]);
```

1. רכיב `ItemRow` שמקבל `item`, `onIncrease` ו-`onDecrease`, ומציג `Milk × 2` עם כפתורי `+` ו-`-`.
2. כשהכמות יורדת ל-0 – המוצר נמחק.
3. טופס להוספת מוצר. אם המוצר כבר קיים – רק מגדילים את הכמות שלו.
4. בתחתית: `Total items: 3`.
5. **בונוס:** כפתור `Sort A-Z` שממיין את הרשימה לפי השם. (רמז: `[...items].sort((a, b) => a.name.localeCompare(b.name))` – למה צריך `[...items]` ולא `items.sort` ישר?)
