import { useState } from "react";
import courses from "./courses.js";
import CourseCard from "./CourseCard.jsx";
import SearchBar from "./SearchBar.jsx";
import FilterButtons from "./FilterButtons.jsx";

function App() {
  // 1. State - only what the USER chose
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [favorites, setFavorites] = useState([]);

  // 2. Actions
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favoriteId) => favoriteId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setPriceFilter("all");
  };

  // 3. Calculated on every draw - NOT State
  const text = search.toLowerCase();

  let visible = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(text) ||
      course.teacher.toLowerCase().includes(text)
  );

  if (priceFilter === "free") {
    visible = visible.filter((course) => course.free);
  }
  if (priceFilter === "paid") {
    visible = visible.filter((course) => !course.free);
  }

  if (sortBy === "title") {
    visible = [...visible].sort((a, b) => a.title.localeCompare(b.title));
  } else {
    visible = [...visible].sort((a, b) => a.hours - b.hours);
  }

  return (
    <div className="page">
      <header>
        <h1>Atid Courses</h1>
        <p>★ Favorites: {favorites.length}</p>
      </header>

      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <FilterButtons value={priceFilter} onChange={setPriceFilter} />
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="title">Sort by name</option>
          <option value="hours">Sort by hours</option>
        </select>
      </div>

      <p>
        Showing {visible.length} of {courses.length} courses
      </p>

      {visible.length === 0 ? (
        <div className="empty">
          <p>No courses found</p>
          <button onClick={clearFilters}>Clear filters</button>
        </div>
      ) : (
        <div className="courses">
          {visible.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favorites.includes(course.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
