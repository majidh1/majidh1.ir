import SectionHeader from "./SectionHeader.jsx";
import SpotlightCard from "./SpotlightCard.jsx";

export default function WhatIDo({ items }) {
  return (
    <section className="section container" id="work">
      <SectionHeader eyebrow="What I Actually Do" title="کاری که واقعاً انجام می‌دهم" />
      <div className="timeline-grid">
        {items.map(([number, title, text]) => (
          <SpotlightCard className="timeline-card" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
