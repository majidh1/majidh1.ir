import SectionHeader from "./SectionHeader.jsx";
import SpotlightCard from "./SpotlightCard.jsx";

export default function ProjectShowcase({ projects }) {
  return (
    <section className="section container" id="projects">
      <SectionHeader eyebrow="Projects" title="نمونه پروژه‌ها" />
      <div className="project-grid">
        {projects.map((project) => (
          <SpotlightCard className="project-card" key={project.title}>
            <span className="project-icon">{project.title.slice(0, 2)}</span>
            <h3>{project.title}</h3>
            <p>{project.text}</p>
            <div className="tag-row compact">
              {project.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
            <a href={project.href} className="text-link" target={project.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              مشاهده
            </a>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
