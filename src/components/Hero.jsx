import AnimatedGrid from "./AnimatedGrid.jsx";
import DecryptedText from "./DecryptedText.jsx";
import MagnetButton from "./MagnetButton.jsx";

export default function Hero({ data }) {
  return (
    <section className="hero" id="home">
      <img className="hero-art" src="/hero-tech.png" alt="" />
      <AnimatedGrid />
      <div className="aurora" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-copy reveal">
          <p className="hero-chip">{data.person.roles.join(" · ")}</p>
          <h1>
            {data.person.headline.map((line, index) => (
              <span key={line}>
                {index === 2 ? <DecryptedText text={line} className="gradient-text" /> : line}
              </span>
            ))}
          </h1>
          <p className="lead">{data.person.subtitle}</p>
          <div className="tag-row">
            {data.heroTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="hero-actions">
            <MagnetButton href={data.links.github}>مشاهده گیت‌هاب</MagnetButton>
            <MagnetButton href={data.links.linkedin} variant="ghost">
              ارتباط در لینکدین
            </MagnetButton>
            <MagnetButton href="#projects" variant="ghost">
              مشاهده پروژه‌ها
            </MagnetButton>
          </div>
          <div className="social-dock" aria-label="لینک‌های سریع">
            <a href={data.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              GH
            </a>
            <a href={data.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              IN
            </a>
            <a href={data.links.email} aria-label="Email">
              @
            </a>
            <a className="is-disabled" href={data.links.resume} aria-label="رزومه">
              CV
            </a>
          </div>
        </div>

        <article className="profile-card reveal">
          <div className="profile-head">
            <img src="/majid-hoshyar.jpg" alt="مجید هوشیار" />
            <div>
              <h2>{data.person.name}</h2>
              <p>{data.person.profileTitle}</p>
            </div>
          </div>
          <div className="profile-stats">
            {data.profileStats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <pre className="code-card" aria-label="کد تزئینی">{`const mission = {
  code: "clean",
  architecture: "scalable",
  teams: "empowered",
  impact: "real"
};`}</pre>
          <div className="profile-foot">
            <p>{data.person.current}</p>
            <span>{data.person.location}</span>
          </div>
        </article>
      </div>
    </section>
  );
}
