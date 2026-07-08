export default function Footer({ data }) {
  return (
    <footer className="footer container">
      <div>
        <strong>{data.person.name}</strong>
        <p>Full-Stack Developer · Tech Lead · Open Source Builder</p>
      </div>
      <p>ساخته‌شده با React، الهام‌گرفته از React Bits و علاقه به مهندسی تمیز.</p>
    </footer>
  );
}
