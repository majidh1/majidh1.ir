import SectionHeader from "./SectionHeader.jsx";
import SpotlightCard from "./SpotlightCard.jsx";

export default function About({ about }) {
  return (
    <section className="section container about-grid" id="about">
      <div className="about-copy reveal">
        <SectionHeader eyebrow="About" title={about.title} />
        {about.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="about-cards">
        {about.cards.map((card) => (
          <SpotlightCard className={`vertical-card ${card.tone}`} key={card.title}>
            <span className="card-glyph">{card.title.slice(0, 2)}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
