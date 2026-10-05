# פתרונות – שיעור 2: CSS (למורה)

---

## תרגיל 1 – החיבור הראשון

**`index.html`:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Exercise 1</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>My first CSS</h1>
    <p>This is the first paragraph.</p>
    <p>This is the second paragraph.</p>
    <p>This is the third paragraph.</p>
  </body>
</html>
```

**`style.css`:**

```css
body {
  background-color: lightyellow;
}

h1 {
  color: darkgreen;
  font-size: 40px;
  text-align: center;
}

p {
  font-family: Arial, sans-serif;
  font-size: 18px;
}
```

---

## תרגיל 2 – מצאו את הבאגים

```css
body {
  background-color: #f1f5f9; /* Fix 1: missing ; - so font-family was ignored too */
  font-family: Arial, sans-serif;
}

.card { /* Fix 2: a class selector needs a dot */
  background-color: white;
  padding: 20px; /* Fix 3: no space between the number and px */
}

h1 {
  color: navy; /* Fix 4: the property is "color", not "colour" */
  font-size: 32px; /* Fix 5: a size needs a unit */
}
```

> 💡 כדאי להראות בכיתה את טעות 1 בכלי המפתחים: בגלל ה-`;` החסר, הדפדפן קורא את שתי השורות כהוראה אחת לא חוקית – ולכן **גם** הרקע **וגם** הגופן לא עובדים. טעות קטנה אחת "מפילה" גם את השורה שאחריה.

---

## תרגיל 3 – שלוש הודעות

**HTML (עם הפתרון לשאלה למחשבה – שתי מחלקות):**

```html
<p class="message success">Your file was saved.</p>
<p class="message warning">Your battery is low.</p>
<p class="message error">Wrong password!</p>
```

**`style.css`:**

```css
/* What all the messages share */
.message {
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
}

.success {
  background-color: #dcfce7;
  color: #166534;
}

.warning {
  background-color: #fef9c3;
  color: #c2410c;
}

.error {
  background-color: #fee2e2;
  color: #991b1b;
  border: 2px solid #dc2626;
}
```

**תשובה לשאלה למחשבה:** אפשר לתת לתגית כמה מחלקות, מופרדות ברווח. כך כותבים את מה שמשותף פעם אחת בלבד – ואם רוצים לשנות את הריפוד, משנים במקום אחד.

---

## תרגיל 4 – מודל הקופסה

```html
<div class="box">Box</div>
```

```css
/*
  1. Total width = 200 (content) + 20 + 20 (padding) + 5 + 5 (border) = 250px.
     The margin (30px on each side) is outside the box - it is space around it.
  2. The background color fills the content AND the padding.
     The margin is always transparent - it is not colored.
*/
.box {
  width: 200px;
  background-color: lightblue;
  padding: 20px;
  border: 5px solid navy;
  margin: 30px;
}
```

> 💡 בכלי המפתחים, כשעומדים על התגית, רואים בציור של מודל הקופסה `200` במרכז, `20` בשכבה הירוקה ו-`5` בשכבה הצהובה, ובריחוף על התגית בדף מופיע `div.box 250 × ...`. (לתלמידים המתקדמים אפשר להזכיר ש-`box-sizing: border-box` משנה את החישוב – נלמד בהמשך.)

---

## תרגיל 5 – הכרטיס שלכם

הפתרון המלא לדוגמה נמצא ב-[`project/style.css`](project/style.css). דברים לבדוק בהגשה:

| דרישה | איך בודקים |
|---|---|
| כרטיס ממורכז | `max-width` (או `width`) **וגם** `margin: ... auto` |
| תמונה עגולה | `width` = `height`, ו-`border-radius: 50%` |
| כישורים בשורה | `display: flex` על ה-`ul` – **לא** על ה-`li` |
| `:hover` | עובד בפועל בדפדפן |
| CSS בקובץ נפרד | אין `style="..."` ואין `<style>` ב-HTML |

**מחוון מוצע (100):** חיבור תקין של קובץ CSS – 15 · כרטיס ממורכז עם ריפוד, פינות וצל – 25 · תמונה עגולה – 15 · גופן וצבעים – 15 · Flexbox – 20 · `:hover` – 10.

---

## תרגיל 6 – תפריט ניווט

```css
.navbar {
  background-color: #1e293b;
  padding: 15px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  /* Bonus: padding on the link itself, so it has room for a background */
  padding: 5px 10px;
  border-radius: 6px;
}

.navbar a:hover {
  color: orange;
  /* Bonus */
  background-color: #334155;
}
```

> 💡 תלמידים רבים כותבים `.navbar:hover` במקום `.navbar a:hover` – ואז **כל** הקישורים משנים צבע כשהעכבר נמצא בכל מקום על הפס. זה הזדמנות טובה להסביר שוב את הבורר עם רווח.
