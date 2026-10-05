# פתרונות – שיעור 9: קטלוג קורסים (למורה)

---

## תרגיל 1 – State או מחושב?

| אפליקציה | State | מחושב |
|---|---|---|
| **1. מחשבון טיפ** | סכום החשבון, אחוז הטיפ – המשתמש משנה אותם | הטיפ (`bill * percent / 100`), הסכום הכולל (`bill + tip`) |
| **2. רשימת משימות** | המשימות, הטקסט בתיבה | כמה נשארו (`filter(...).length`), האם להציג `Clear` (האם יש משימה שבוצעה) |
| **3. חנות** | הסל | המחיר הכולל, מספר הפריטים. רשימת המוצרים – **לא State וגם לא מחושבת**: קבוע, כמו `courses` בשיעור |
| **4. טופס הרשמה** | שם משתמש, סיסמה | "ארוכה מספיק" (`password.length >= 8`), "הכפתור פעיל" (שם לא ריק **וגם** סיסמה ארוכה מספיק) |

> 💡 נקודה לדיון: תלמידים רבים יגידו שהמחיר הכולל הוא State "כי הוא משתנה". נכון שהוא משתנה – אבל **רק כי הסל משתנה**. זה בדיוק המבחן: "אפשר לחשב אותו ממשהו אחר?"

---

## תרגיל 2 – מצאו את הבאגים

```jsx
import { useState } from "react";
import courses from "./courses.js";
import CourseCard from "./CourseCard.jsx";

function App() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  // Fix 1: the count is calculated from visible - it must not be State
  // (useState(courses.length) never changed after the first draw)

  // Fix 2: compare in small letters on both sides
  let visible = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  if (sortBy === "hours") {
    visible = [...visible].sort((a, b) => a.hours - b.hours);
  }

  return (
    <div>
      <input value={search} onChange={(event) => setSearch(event.target.value)} />
      {/* Fix 3: a controlled select needs onChange, or it cannot be changed */}
      <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
        <option value="title">Sort by name</option>
        <option value="hours">Sort by hours</option>
      </select>
      <p>Showing {visible.length} courses</p>
      {/* Fix 4: draw the filtered list, not all the courses */}
      {visible.map((course) => (
        // Fix 5: every item in a map needs a key
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export default App;
```

> 💡 טעות 1 היא החשובה ביותר בתרגיל: `count` ב-State "נתקע" על 6, כי `useState` משתמשת בערך ההתחלתי רק בציור הראשון. זה בדיוק הכלל מסעיף 1 בשיעור – מה שאפשר לחשב, לא שומרים ב-State.
> 💡 טעות 5 לא שוברת את הדף – היא מופיעה רק כאזהרה בקונסול (`Each child in a list should have a unique "key" prop`). כדאי להרגיל את התלמידים לפתוח את הקונסול גם כשהכול "נראה עובד".

---

## תרגיל 3 – עוד מסננים לקטלוג

**State חדש ב-`App`:**

```jsx
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [maxHours, setMaxHours] = useState("0");
```

**ב-`clearFilters`:**

```jsx
  const clearFilters = () => {
    setSearch("");
    setPriceFilter("all");
    setFavoritesOnly(false);
    setMaxHours("0");
  };
```

**בחישוב – אחרי סינון המחיר, לפני המיון:**

```jsx
  if (favoritesOnly) {
    visible = visible.filter((course) => favorites.includes(course.id));
  }
  if (maxHours !== "0") {
    visible = visible.filter((course) => course.hours <= Number(maxHours));
  }
```

**ב-JSX – בתוך `controls`:**

```jsx
        <button className={favoritesOnly ? "active" : ""} onClick={() => setFavoritesOnly(!favoritesOnly)}>
          ★ Favorites only
        </button>
        <select value={maxHours} onChange={(event) => setMaxHours(event.target.value)}>
          <option value="0">Any length</option>
          <option value="40">Up to 40 hours</option>
          <option value="60">Up to 60 hours</option>
        </select>
```

**CSS:**

```css
.controls button.active {
  background-color: #f97316;
}
```

**תשובה לשאלה:** **שישה** State-ים (`search`, `priceFilter`, `sortBy`, `favorites`, `favoritesOnly`, `maxHours`), ו**שני** משתנים מחושבים עיקריים (`text` ו-`visible`) – ועוד `visible.length` ו-`favorites.length` שמחושבים ישר ב-JSX.

> 💡 `<option value="40">` – הערך של `select` הוא **תמיד טקסט**, גם אם כתוב בו מספר. לכן `Number(maxHours)`. (בלי `Number`, `course.hours <= "40"` דווקא היה עובד – JavaScript ממירה – אבל עדיף לא לסמוך על זה.)

---

## תרגיל 4 – מיון בשני הכיוונים

```jsx
  const compare = {
    title: (a, b) => a.title.localeCompare(b.title),
    hours: (a, b) => a.hours - b.hours,
    longest: (a, b) => b.hours - a.hours,
    teacher: (a, b) => a.teacher.localeCompare(b.teacher),
  };

  visible = [...visible].sort(compare[sortBy]);
```

```jsx
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="title">Sort by name</option>
          <option value="hours">Sort by hours</option>
          <option value="longest">Longest first</option>
          <option value="teacher">Teacher name</option>
        </select>
```

> 💡 `b.hours - a.hours` – פשוט מחליפים את הסדר, והמיון מתהפך. כדאי לבקש מהתלמידים להסביר **למה** זה עובד, לפי טבלת "שלילי / חיובי" מהשיעור.
> 💡 `Teacher name` עם שני קורסים של `Ahmad` ושניים של `Omar` – הסדר ביניהם נשאר כמו שהיה לפני המיון. זה בסדר.

---

## תרגיל 5 – רכיב סינון לשימוש חוזר

**`src/FilterButtons.jsx`:**

```jsx
function FilterButtons({ options, value, onChange }) {
  return (
    <div className="filters">
      {options.map((option) => (
        <button
          key={option.value}
          className={value === option.value ? "active" : ""}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
```

**`src/App.jsx`:**

```jsx
import { useState } from "react";
import FilterButtons from "./FilterButtons.jsx";

const students = [
  { id: 1, name: "Dana", grade: 95, className: "A" },
  { id: 2, name: "Omar", grade: 48, className: "B" },
  { id: 3, name: "Rana", grade: 74, className: "A" },
  { id: 4, name: "Yousef", grade: 55, className: "B" },
  { id: 5, name: "Lina", grade: 88, className: "B" },
];

const resultOptions = [
  { value: "all", label: "All" },
  { value: "passed", label: "Passed" },
  { value: "failed", label: "Failed" },
];

const classOptions = [
  { value: "all", label: "All classes" },
  { value: "A", label: "Class A" },
  { value: "B", label: "Class B" },
];

function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

  let visible = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );
  if (result === "passed") {
    visible = visible.filter((student) => student.grade >= 56);
  }
  if (result === "failed") {
    visible = visible.filter((student) => student.grade < 56);
  }
  if (classFilter !== "all") {
    visible = visible.filter((student) => student.className === classFilter);
  }

  let sum = 0;
  for (const student of visible) {
    sum = sum + student.grade;
  }

  return (
    <div>
      <h1>Students</h1>
      <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a student..." />
      <FilterButtons options={resultOptions} value={result} onChange={setResult} />
      <FilterButtons options={classOptions} value={classFilter} onChange={setClassFilter} />

      <ul>
        {visible.map((student) => (
          <li key={student.id}>
            {student.name} ({student.className}) - {student.grade}
          </li>
        ))}
      </ul>

      <p>{visible.length === 0 ? "No students" : `Average: ${sum / visible.length}`}</p>
    </div>
  );
}

export default App;
```

> 💡 בדיקה: בטעינה – `Average: 72`. `Passed` – `Average: 85.66666666666667` (שווה לשאול איך מעגלים: `Math.round(...)` או `.toFixed(1)`). `Class A` – `84.5`. `Failed` + `Class A` – `No students` (ובלי הטרנרי – חלוקה ב-0 הייתה מציגה `NaN`).

---

## תרגיל 6 – חנות עם סל קניות

**`src/ProductCard.jsx`:**

```jsx
function ProductCard({ product, inCart, onToggle }) {
  const { id, name, price } = product;

  return (
    <div className="product">
      <h2>{name}</h2>
      <p>{price} ₪</p>
      <button onClick={() => onToggle(id)}>{inCart ? "Remove" : "Add to cart"}</button>
    </div>
  );
}

export default ProductCard;
```

**`src/Cart.jsx`:**

```jsx
function Cart({ items, onEmpty }) {
  let total = 0;
  for (const item of items) {
    total = total + item.price;
  }

  return (
    <aside className="cart">
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price} ₪
            </li>
          ))}
        </ul>
      )}
      <p>Total: {total} ₪</p>
      <button onClick={onEmpty}>Empty cart</button>
    </aside>
  );
}

export default Cart;
```

**`src/App.jsx`:**

```jsx
import { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import Cart from "./Cart.jsx";

const products = [
  { id: 1, name: "Laptop", price: 3500 },
  { id: 2, name: "Mouse", price: 80 },
  { id: 3, name: "Screen", price: 900 },
  { id: 4, name: "Keyboard", price: 250 },
];

function App() {
  const [cart, setCart] = useState([]);

  const toggleProduct = (id) => {
    if (cart.includes(id)) {
      setCart(cart.filter((cartId) => cartId !== id));
    } else {
      setCart([...cart, id]);
    }
  };

  // Calculated: the full product objects that are in the cart
  const cartItems = products.filter((product) => cart.includes(product.id));

  return (
    <div>
      <header>
        <h1>Mini Shop</h1>
        <p>🛒 {cart.length} items</p>
      </header>

      <div className="products">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            inCart={cart.includes(product.id)}
            onToggle={toggleProduct}
          />
        ))}
      </div>

      <Cart items={cartItems} onEmpty={() => setCart([])} />
    </div>
  );
}

export default App;
```

**תשובה לסעיף 3:** **שלושה** מקומות צריכים את הסל – הכותרת (מספר הפריטים), כל `ProductCard` (`Add` או `Remove`), ו-`Cart` (הרשימה והסכום). הרכיב המשותף לשלושתם הוא `App`.

**בדיקה:** הוספת Laptop ו-Screen → `🛒 2 items` ו-`Total: 4400 ₪`. הוספת כל הארבעה → `Total: 4730 ₪`.

**מחוון מוצע (100):** ה-State בסל ב-`App` – 25 · `ProductCard` עם כפתור שמתחלף – 20 · `Cart` עם רשימה וסכום **מחושב** – 25 · מונה בכותרת – 10 · `Empty cart` דרך Prop – 10 · אין State מיותר (סכום, מספר פריטים) – 10.
