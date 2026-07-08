import SectionHeader from "./SectionHeader.jsx";
import SpotlightCard from "./SpotlightCard.jsx";

export default function OpenSource({ data }) {
  return (
    <section className="section container" id="open-source">
      <SectionHeader eyebrow="Open Source" title={data.title} subtitle={data.subtitle} />
      <div className="open-source-grid">
        <SpotlightCard className="featured-project">
          <span className="project-icon">OS</span>
          <h3>{data.featured.title}</h3>
          <p>{data.featured.text}</p>
          <div className="tag-row compact">
            {data.featured.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
          <a href={data.featured.href} target="_blank" rel="noreferrer" className="text-link">
            مشاهده ریپو
          </a>
        </SpotlightCard>
        <div className="source-list">
          {data.items.map((item) => (
            <SpotlightCard className="source-card" key={item.title}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <strong>{item.meta}</strong>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
