import SectionHeader from "./SectionHeader.jsx";
import SpotlightCard from "./SpotlightCard.jsx";

export default function HowIWork({ items }) {
  return (
    <section className="section container">
      <SectionHeader eyebrow="How I Work" title="سبک کاری من" />
      <div className="work-grid">
        {items.map(([title, text]) => (
          <SpotlightCard className="work-card" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
