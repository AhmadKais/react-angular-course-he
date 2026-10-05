function CourseCard({ course, isFavorite, onToggleFavorite }) {
  const { id, title, teacher, hours, free } = course;

  return (
    <div className="course">
      <button className="star" onClick={() => onToggleFavorite(id)}>
        {isFavorite ? "★" : "☆"}
      </button>
      <h2>{title}</h2>
      <p>Teacher: {teacher}</p>
      <p>{hours} hours</p>
      <span className={free ? "badge free" : "badge paid"}>{free ? "Free" : "Paid"}</span>
    </div>
  );
}

export default CourseCard;
