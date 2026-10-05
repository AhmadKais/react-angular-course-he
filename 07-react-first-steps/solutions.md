# פתרונות – שיעור 7: React – הפרויקט הראשון, JSX ורכיבים (למורה)

---

## תרגיל 1 – פרויקט חדש מאפס, לבד

```bash
npm create vite@latest about-me -- --template react
cd about-me
npm install
npm run dev
```

**`src/App.jsx`:**

```jsx
// Stopping the server (Ctrl + C) turns off the website itself - refreshing the
// browser shows "This site can't be reached". Closing the tab only closes the
// window - the server keeps running and the site is still there.
function App() {
  return (
    <div>
      <h1>Omar Halabi</h1>
      <p>The best way to learn programming is to write code every day.</p>
    </div>
  );
}

export default App;
```

**תשובה לסעיף 4:** הטקסט של `<title>` מופיע **בלשונית** של הדפדפן.

> 💡 הבעיה הנפוצה ביותר בתרגיל הזה: הרצת `npm install` לפני `cd about-me`. כדאי לעבור בין התלמידים בעשר הדקות הראשונות.

---

## תרגיל 2 – מצאו את הבאגים

```jsx
// Fix 1: a component name must start with a capital letter
function Profile() {
  const name = "Omar";
  const age = 16;

  return (
    // Fix 2: JSX must return ONE parent - wrap everything in a div
    <div>
      {/* Fix 3: className, not class */}
      {/* Fix 4: a variable needs { } - otherwise "name" is just text */}
      <h1 className="title">Hello {name}</h1>
      {/* Fix 5: every tag must be closed - <img /> */}
      <img src="/avatar.svg" alt={`Photo of ${name}`} />
      <p>Next year: {age + 1}</p>
    </div>
  );
}

// Fix 6: export the new name
export default Profile;
```

> 💡 `alt` חסר הוא לא שגיאה של JSX, אבל כדאי לדרוש אותו – כמו בשיעור 1. תלמיד שתיקן רק את ה-`export` ולא את שם הפונקציה (או להפך) יקבל `Profile is not defined` או אזהרה – הזדמנות לתרגל קריאת שגיאות.

---

## תרגיל 3 – "קצת עליי" מחושב

```jsx
function App() {
  const firstName = "Rana";
  const lastName = "Kais";
  const birthYear = 2009;
  const favoriteFoods = ["Maqluba", "Pizza", "Knafeh"];

  return (
    <div>
      <h1>{`${firstName} ${lastName}`.toUpperCase()}</h1>
      <p>Age: {2026 - birthYear}</p>
      <p>
        I have {favoriteFoods.length} favorite foods. The first one is {favoriteFoods[0]}.
      </p>
      <ul>
        {favoriteFoods.map((food) => (
          <li key={food}>{food}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

**על המסך:** `RANA KAIS`, `Age: 17`, `I have 3 favorite foods. The first one is Maqluba.` ורשימה של שלושת המאכלים.

> 💡 גם `{firstName.toUpperCase()} {lastName.toUpperCase()}` נכון.

---

## תרגיל 4 – רכיב עם Props

**`src/Product.jsx`:**

```jsx
function Product({ name, price, emoji, onSale }) {
  return (
    <div className="product">
      <h2>
        {emoji} {name}
      </h2>
      <p>{price} ₪</p>
      <p>{onSale ? "On sale!" : ""}</p>
    </div>
  );
}

export default Product;
```

**`src/App.jsx`:**

```jsx
import Product from "./Product.jsx";

function App() {
  return (
    <div>
      <Product name="Pizza" price={45} emoji="🍕" onSale={true} />
      <Product name="Burger" price={52} emoji="🍔" onSale={false} />
      <Product name="Salad" price={38} emoji="🥗" onSale={false} />
    </div>
  );
}

export default App;
```

**תשובה לשאלה למחשבה:** `price={45}` הוא **מספר**, ואפשר לחשב איתו: `{price * 0.9}` נותן `40.5`. עם `price="45"` זה **טקסט** – כפל במקרה הזה דווקא היה עובד (JavaScript ממירה), אבל `{price + 5}` היה נותן `455` במקום `50`.

---

## תרגיל 5 – כרטיס ביקור ב-React

כמו [`project`](project/) של השיעור, עם שני שינויים:

**ב-`ProfileCard.jsx` – אחרי רשימת הכישורים:**

```jsx
      <h3>My hobbies ({hobbies.length})</h3>
      <ul className="skills">
        {hobbies.map((hobby) => (
          <Skill key={hobby} name={hobby} />
        ))}
      </ul>
```

(וגם `hobbies` נוסף לשורת הפירוק: `const { name, role, city, email, skills, hobbies } = person;`)

**ב-`App.jsx`** – לכל אדם במערך `people` נוסף מפתח `hobbies: ["...", "..."]`, ויש שלושה אנשים.

> 💡 הנקודה החשובה: הרכיב `Skill` לא "יודע" שהוא מציג כישור – הוא פשוט מציג `name`. לכן אפשר להשתמש בו גם לתחביבים. כדאי לשאול בכיתה: "איך הייתם קוראים לרכיב, אם הייתם מתחילים מחדש?" (למשל `Tag` או `Pill`).

**מחוון מוצע (100):** פרויקט רץ, בלי `node_modules` בהגשה – 15 · CSS ותמונה עובדים – 15 · `ProfileCard` עם Prop `person` ופירוק – 25 · `Skill` עם Prop – 15 · שלושה כרטיסים מ-`map` עם `key` – 20 · רשימת תחביבים – 10.

---

## תרגיל 6 – קטלוג הקורסים ב-React

**`src/CourseCard.jsx`:**

```jsx
function CourseCard({ course }) {
  const { title, teacher, hours, free } = course;

  return (
    <div className="course">
      <h2>{title}</h2>
      <p>Teacher: {teacher}</p>
      <p>{hours} hours</p>
      <span className={free ? "badge free" : "badge paid"}>{free ? "Free" : "Paid"}</span>
    </div>
  );
}

export default CourseCard;
```

**`src/App.jsx`:**

```jsx
import CourseCard from "./CourseCard.jsx";

const courses = [
  { id: 1, title: "Python for Beginners", teacher: "Ahmad", hours: 40, free: true },
  { id: 2, title: "Web Development", teacher: "Rana", hours: 60, free: false },
  { id: 3, title: "Cyber Security", teacher: "Omar", hours: 50, free: false },
  { id: 4, title: "Databases and SQL", teacher: "Dana", hours: 30, free: true },
  { id: 5, title: "React and Angular", teacher: "Ahmad", hours: 70, free: false },
];

function App() {
  const freeCourses = courses.filter((course) => course.free);
  const paidCourses = courses.filter((course) => !course.free);

  return (
    <div>
      <h1>Atid Courses</h1>
      <p>{courses.length} courses</p>

      <div className="courses">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Bonus */}
      <h2>Free courses</h2>
      <div className="courses">
        {freeCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <h2>Paid courses</h2>
      <div className="courses">
        {paidCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default App;
```

(ה-CSS – מ-`style.css` של שיעור 5, מועתק ל-`index.css`.)

**מה נעלם לעומת שיעור 5:** כל ה-`getElementById`, ה-`innerHTML`, ה-`join("")`, וכל הצורך לבנות HTML במחרוזת. `courseToHtml` הפכה לרכיב `CourseCard`.
