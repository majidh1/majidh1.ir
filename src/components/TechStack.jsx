import SectionHeader from "./SectionHeader.jsx";
import SpotlightCard from "./SpotlightCard.jsx";

export default function TechStack({ groups }) {
  return (
    <section className="section container" id="stack">
      <SectionHeader
        eyebrow="Tech Stack"
        title="تکنولوژی‌هایی که با آن‌ها محصول می‌سازم"
        subtitle="استک من فقط یک لیست از ابزارها نیست؛ مجموعه‌ای از انتخاب‌هاست برای رساندن ایده از نیازمندی تا انتشار."
      />
      <div className="bento-grid">
        {groups.map((group) => (
          <SpotlightCard className="stack-card" key={group.title}>
            <div className="card-title">
              <span className="icon-box">{group.icon}</span>
              <h3>{group.title}</h3>
            </div>
            <div className="pill-grid">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
