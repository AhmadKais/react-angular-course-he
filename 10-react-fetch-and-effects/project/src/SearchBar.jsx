function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search a course or teacher..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export default SearchBar;
