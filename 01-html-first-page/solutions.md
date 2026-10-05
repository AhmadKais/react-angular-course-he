# פתרונות – שיעור 1: HTML (למורה)

---

## תרגיל 1 – השלד בעל-פה

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Exercise 1</title>
  </head>
  <body>
    <h1>Omar Halabi</h1>
    <p>My hobby is playing football with my friends every weekend.</p>
  </body>
</html>
```

**לבדיקה:** ששת חלקי החובה – `DOCTYPE`, `html`, `head`, `meta charset`, `title`, `body` – וכל תגית שנפתחה נסגרה.

---

## תרגיל 2 – מצאו את הבאגים

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My Pet</title>
  </head>
  <body>
    <!-- Fix 1: the closing tag needs a slash: </h1> -->
    <h1>My dog Rex</h1>
    <!-- Fix 2: what opens last closes first - </strong> before </p> -->
    <p>Rex is <strong>3 years old</strong></p>
    <!-- Fix 3: every image needs an alt description -->
    <img src="rex.jpg" alt="My dog Rex playing in the yard">
    <ul>
      <!-- Fix 4: the first li was not closed -->
      <li>He loves balls</li>
      <li>He hates cats</li>
    </ul>
    <!-- Fix 5: a link to another website needs https:// -->
    <a href="https://www.google.com">Search for dogs</a>
  </body>
</html>
```

> 💡 לגבי טעות 3: הדפדפן יציג את התמונה גם בלי `alt`, אבל זו טעות – הדף לא נגיש לעיוורים. כדאי להדגיש בכיתה שגם "קוד שעובד" יכול להיות לא נכון.

---

## תרגיל 3 – מתכון

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Shakshuka</title>
  </head>
  <body>
    <!-- Ingredients: ul, because the order does not matter -->
    <!-- Steps: ol, because the order is important -->
    <h1>Shakshuka</h1>
    <img src="shakshuka.jpg" alt="Shakshuka in a black pan" width="300">
    <p>A <strong>spicy</strong> and simple dish of eggs in tomato sauce. Perfect for breakfast.</p>

    <h2>Ingredients</h2>
    <ul>
      <li>4 eggs</li>
      <li>5 tomatoes</li>
      <li>1 onion</li>
      <li>Salt and pepper</li>
    </ul>

    <h2>Steps</h2>
    <ol>
      <li>Fry the onion in a pan.</li>
      <li>Add the chopped tomatoes and cook for 10 minutes.</li>
      <li>Break the eggs into the sauce.</li>
      <li>Cover and cook until the eggs are ready.</li>
    </ol>

    <p><a href="https://www.youtube.com/results?search_query=shakshuka" target="_blank">Watch the video</a></p>
  </body>
</html>
```

---

## תרגיל 4 – מהתמונה לקוד

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Atid College</title>
  </head>
  <body>
    <h1>Atid College</h1>

    <h2>Our courses</h2>
    <ol>
      <li>Python</li>
      <li>Web Development</li>
      <li>Cyber Security</li>
    </ol>

    <h2>Contact</h2>
    <p>Phone: 04-1234567</p>
    <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
    <p><a href="https://example.com">Visit our website</a></p>
  </body>
</html>
```

**לבדיקה:** "כותרת משנה" = `h2` (לא `h3`, כי זו הרמה שמתחת ל-`h1`); הרשימה **ממוספרת** = `ol`.

---

## תרגיל 5 – כרטיס ביקור משלכם

פתרון לדוגמה – זהה במבנה לכרטיס בחומר הלימוד ([`project/index.html`](project/index.html)), עם `em` ופריט רביעי:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Omar Halabi - Business Card</title>
  </head>
  <body>
    <div>
      <img src="avatar.svg" alt="Photo of Omar Halabi" width="150">
      <h1>Omar Halabi</h1>
      <h2>Future Game Developer</h2>
      <p>I am a student at <strong>Atid College</strong> in Yarka. I <em>really</em> love computer games.</p>

      <h3>My hobbies</h3>
      <ul>
        <li>Football</li>
        <li>Video games</li>
        <li>Drawing</li>
        <li>Cooking with my mom</li>
      </ul>

      <h3>Contact me</h3>
      <p>Email: <a href="mailto:omar@example.com">omar@example.com</a></p>
      <p>Website: <a href="https://www.minecraft.net" target="_blank">My favorite game</a></p>
    </div>
  </body>
</html>
```

**מחוון מוצע (100):** שלד תקין – 20 · תמונה עם `alt` – 15 · כותרות `h1`/`h2`/`h3` בסדר נכון – 15 · פסקה עם `strong` ו-`em` – 10 · רשימה של 4+ פריטים – 15 · שני קישורים תקינים – 15 · `div` והזחה מסודרת – 10.

---

## תרגיל 6 – אתר של שני דפים

**`index.html`** – מוסיפים בתוך ה-`div` של הכרטיס:

```html
<p><a href="hobbies.html">My hobbies</a></p>
```

**`hobbies.html`:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My hobbies</title>
  </head>
  <body>
    <h1>My hobbies</h1>

    <h2>Football</h2>
    <p>I play every Friday with my friends.</p>
    <img src="football.jpg" alt="A football on the grass" width="200">

    <h2>Video games</h2>
    <p>My favorite game is Minecraft.</p>
    <img src="games.jpg" alt="A game controller" width="200">

    <h2>Drawing</h2>
    <p>I like to draw cartoon characters.</p>
    <img src="drawing.jpg" alt="A pencil drawing of a cat" width="200">

    <p><a href="index.html">Back to my card</a></p>
  </body>
</html>
```

**תשובה לשאלה למחשבה:** `https://` אומר "לך לשרת אחר באינטרנט". כשכותבים רק `hobbies.html`, הדפדפן מחפש את הקובץ **באותה תיקייה** שבה נמצא הדף הנוכחי. זה נקרא **נתיב יחסי** (Relative Path).
