import { useEffect, useState } from "react";
import CourseCard from "./CourseCard.jsx";
import SearchBar from "./SearchBar.jsx";
import FilterButtons from "./FilterButtons.jsx";

// Read the saved favorites from the browser (or start with an empty list)
const loadFavorites = () => {
  const saved = localStorage.getItem("favorites");
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
};

function App() {
  // 1. State - the data from the server, and what the USER chose
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [favorites, setFavorites] = useState(loadFavorites);

  // 2. Effects - things that happen AFTER React draws the screen

  // Load the courses from the server - once, when the page opens
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetch("/courses.json");
        const data = await response.json();
        setCourses(data);
      } catch {
        setError("Could not load the courses. Please try again later.");
      }
      setLoading(false);
    };

    loadCourses();
  }, []);

  // Save the favorites in the browser - every time they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 3. Actions
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

  // 4. Calculated on every draw - NOT State
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

  // 5. While loading, or if something went wrong - show only a message
  if (loading) {
    return <p className="message">Loading courses...</p>;
  }

  if (error !== "") {
    return <p className="message error">{error}</p>;
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
