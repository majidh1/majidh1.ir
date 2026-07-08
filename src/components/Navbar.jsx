import GooeyNav from "./GooeyNav.jsx";

export default function Navbar({ data }) {
  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="رفتن به ابتدای صفحه">
        <span>{data.person.initials}</span>
        <strong>{data.person.name}</strong>
      </a>
      <GooeyNav items={data.nav} />
      <a className="nav-cta" href="#contact" aria-label="شروع گفتگو با مجید هوشیار">
        شروع گفتگو
      </a>
    </header>
  );
}
