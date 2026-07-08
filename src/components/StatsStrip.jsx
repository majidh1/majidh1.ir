import SpotlightCard from "./SpotlightCard.jsx";

export default function StatsStrip({ stats }) {
  return (
    <section className="container stats-strip" aria-label="آمار کوتاه">
      {stats.map((stat) => (
        <SpotlightCard className="mini-stat" key={stat.value}>
          <span className="icon-box">{stat.icon}</span>
          <div>
            <strong>{stat.value}</strong>
            <p>{stat.label}</p>
          </div>
        </SpotlightCard>
      ))}
    </section>
  );
}
