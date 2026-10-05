import ProfileCard from "./ProfileCard.jsx";

// The data - one object for each person
const people = [
  {
    id: 1,
    name: "Dana Cohen",
    role: "Web Developer",
    city: "Yarka",
    email: "dana@example.com",
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 2,
    name: "Omar Halabi",
    role: "Game Developer",
    city: "Daliyat al-Karmel",
    email: "omar@example.com",
    skills: ["JavaScript", "React"],
  },
];

function App() {
  return (
    <div className="cards">
      {people.map((person) => (
        <ProfileCard key={person.id} person={person} />
      ))}
    </div>
  );
}

export default App;
