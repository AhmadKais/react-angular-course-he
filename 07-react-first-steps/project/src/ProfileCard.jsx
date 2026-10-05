import Skill from "./Skill.jsx";

function ProfileCard({ person }) {
  const { name, role, city, email, skills } = person;

  return (
    <div className="card">
      <img className="avatar" src="/avatar.svg" alt={`Photo of ${name}`} />
      <h1>{name}</h1>
      <h2 className="role">{role}</h2>
      <p>
        I live in <strong>{city}</strong> and I love building websites.
      </p>

      <h3>My skills ({skills.length})</h3>
      <ul className="skills">
        {skills.map((skill) => (
          <Skill key={skill} name={skill} />
        ))}
      </ul>

      <h3>Contact me</h3>
      <p>
        Email: <a href={`mailto:${email}`}>{email}</a>
      </p>
    </div>
  );
}

export default ProfileCard;
