import { useState } from "react";
import BlurText from "./components/BlurText.jsx";
import ElectricBorder from "./components/ElectricBorder.jsx";
import LetterGlitch from "./components/LetterGlitch.jsx";
import MagnetButton from "./components/MagnetButton.jsx";

const links = {
  github: "https://github.com/majidh1",
  linkedin: "https://ir.linkedin.com/in/majidh1"
};

const skills = [".NET", "Database", "JavaScript", "TypeScript", "CI/CD"];

const openSourceProjects = [
  { label: "📅 Jalali Date Picker", href: "https://majidh1.github.io/JalaliDatePicker", className: "mixed-text" },
  { label: "🆔 کد ملی ساز", href: "https://majidh1.github.io/iranianNationalCode", className: "fa-text" },
  { label: "💰 مالیات حقوق", href: "https://majidh1.github.io/tax", className: "fa-text" },
  { label: "🔎 regex-list", href: "https://github.com/majidh1/regex-list", className: "en-text" }
];

const privateProjects = [
  {
    label: "معاملات آنلاین",
    screenshots: [
      { src: "/screenshots/online-trading/dashboard.png", alt: "داشبورد معاملات آنلاین" },
      { src: "/screenshots/online-trading/market-indices.png", alt: "شاخص‌های بازار معاملات آنلاین" },
      { src: "/screenshots/online-trading/chart.png", alt: "نمودار معاملات آنلاین" },
      { src: "/screenshots/online-trading/mobile-list.png", alt: "لیست موبایل معاملات آنلاین" },
      { src: "/screenshots/online-trading/mobile-analysis.png", alt: "تحلیل موبایل معاملات آنلاین" },
      { src: "/screenshots/online-trading/mobile-index.png", alt: "شاخص موبایل معاملات آنلاین" }
    ]
  },
  {
    label: "صندوق سرمایه گذاری",
    screenshots: [
      { src: "/screenshots/investment-fund/home.png", alt: "صفحه نخست صندوق سرمایه گذاری" },
      { src: "/screenshots/investment-fund/reports.png", alt: "گزارش‌های صندوق سرمایه گذاری" },
      { src: "/screenshots/investment-fund/dashboard.png", alt: "داشبورد سرمایه گذار صندوق" },
      { src: "/screenshots/investment-fund/issue-modal.png", alt: "فرم صدور صندوق سرمایه گذاری" },
      { src: "/screenshots/investment-fund/mobile-home.png", alt: "خانه موبایل صندوق سرمایه گذاری" },
      { src: "/screenshots/investment-fund/mobile-orders.png", alt: "سفارش‌های موبایل صندوق سرمایه گذاری" },
      { src: "/screenshots/investment-fund/mobile-theme.png", alt: "تنظیمات قالب موبایل صندوق سرمایه گذاری" },
      { src: "/screenshots/investment-fund/mobile-activity.png", alt: "تاریخچه فعالیت موبایل صندوق سرمایه گذاری" }
    ]
  },
  {
    label: "سبدگردانی",
    screenshots: [
      { src: "/screenshots/portfolio-management/landing.png", alt: "صفحه معرفی سبدگردانی" },
      { src: "/screenshots/portfolio-management/login.png", alt: "ورود مشتریان سبدگردانی" },
      { src: "/screenshots/portfolio-management/statement.png", alt: "صورت وضعیت سبدگردانی" },
      { src: "/screenshots/portfolio-management/performance.png", alt: "نمودار بازدهی سبدگردانی" },
      { src: "/screenshots/portfolio-management/consulting.png", alt: "درخواست مشاوره سرمایه گذاری" }
    ]
  },
  {
    label: "CMS",
    screenshots: [{ src: "/screenshots/cms/editor.png", alt: "محیط مدیریت محتوای CMS" }]
  },
  {
    label: "اینفوسلامت",
    screenshots: [{ src: "/screenshots/infosalamat/logo.png", alt: "لوگوی اینفوسلامت" }]
  },
  {
    label: "بسپار",
    screenshots: [{ src: "/screenshots/bespar/home.png", alt: "صفحه اصلی بسپار" }]
  },
  {
    label: "رادوو",
    screenshots: [
      { src: "/screenshots/radoo/home.png", alt: "صفحه اصلی رادوو" },
      { src: "/screenshots/radoo/article.png", alt: "صفحه مقاله رادوو" },
      { src: "/screenshots/radoo/chatbot.png", alt: "چت‌بات رادوو" },
      { src: "/screenshots/radoo/register.png", alt: "ثبت‌نام رادوو" },
      { src: "/screenshots/radoo/group.png", alt: "گروه گرافیک و مالتی‌مدیا رادوو" }
    ]
  },
  {
    label: "ارزین",
    screenshots: [
      { src: "/screenshots/arzin/landing.png", alt: "صفحه معرفی ارزین" },
      { src: "/screenshots/arzin/marketplace.png", alt: "بازار فرصت‌های ارزین" },
      { src: "/screenshots/arzin/dashboard.png", alt: "داشبورد شبکه معاملات ارزین" },
      { src: "/screenshots/arzin/advisor-network.png", alt: "فرآیند مشاوران ادغام و تملک ارزین" }
    ]
  }
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const openProject = (project) => {
    setSelectedProject(project);
    setActiveScreenshot(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setActiveScreenshot(0);
  };

  const showPreviousScreenshot = () => {
    setActiveScreenshot((current) => {
      const total = selectedProject?.screenshots.length ?? 0;
      return total > 0 ? (current - 1 + total) % total : 0;
    });
  };

  const showNextScreenshot = () => {
    setActiveScreenshot((current) => {
      const total = selectedProject?.screenshots.length ?? 0;
      return total > 0 ? (current + 1) % total : 0;
    });
  };

  return (
    <main className="landing" lang="en" dir="ltr">
      <LetterGlitch
        glitchColors={["#12211c", "#64ffda", "#22d3ee", "#8b5cf6"]}
        glitchSpeed={48}
        centerVignette
        outerVignette
        smooth
        characters="MAJIDH1.NETREACTANGULARC#SQL{}[]01<>/=+-"
      />
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      <nav className="top-nav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Majid Houshyar home">
          <span>MAjidH1</span>
          <strong>Majid Houshyar</strong>
        </a>
        <div className="nav-links">
          <a href={links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </nav>

      <ElectricBorder color="#7df9ff" speed={1} chaos={0.12} borderRadius={28} style={{ borderRadius: 28 }}>
        <section className="hero-card" aria-label="MAjidH1 landing page">
          <div className="copy">
            <p className="eyebrow">Developer, Team Lead, Tech Lead</p>
            <h1>
              <span>MAjidH1</span>
              <BlurText
                text="Majid Houshyar | مجید هوشیار"
                delay={95}
                animateBy="words"
                direction="top"
                stepDuration={0.42}
                className="gradient-text"
              />
            </h1>

            <div className="project-showcase" aria-label="Projects">
              <section className="project-group">
                <h2>open source</h2>
                <div className="project-links">
                  {openSourceProjects.map((project) => (
                    <a key={project.href} className={project.className} href={project.href} target="_blank" rel="noreferrer">
                      {project.label}
                    </a>
                  ))}
                </div>
              </section>

              <section className="project-group">
                <h2>private source</h2>
                <div className="project-links private-projects" dir="rtl">
                  {privateProjects.map((project) => (
                    <button key={project.label} className="fa-text" type="button" lang="fa" onClick={() => openProject(project)}>
                      {project.label}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className="skills" aria-label="Tech stack">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <div className="actions">
              <MagnetButton href={links.github}>View GitHub</MagnetButton>
              <MagnetButton href={links.linkedin} variant="ghost">
                Connect on LinkedIn
              </MagnetButton>
            </div>
          </div>

          <aside className="profile-panel">
            <div className="profile-frame">
              <img src="/majid-hoshyar.jpg" alt="Majid Houshyar" />
            </div>
          </aside>
        </section>
      </ElectricBorder>

      {selectedProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
          <button className="modal-backdrop" type="button" aria-label="Close project preview" onClick={closeProject} />
          <div className="modal-card" dir="rtl">
            <button className="modal-close" type="button" aria-label="Close" onClick={closeProject}>
              ×
            </button>
            <p className="modal-kicker">private source</p>
            <h2 id="project-modal-title" className="fa-text" lang="fa">
              {selectedProject.label}
            </h2>
            {selectedProject.screenshots.length > 0 ? (
              <div className="screenshot-slider">
                <figure className="screenshot-stage">
                  <img src={selectedProject.screenshots[activeScreenshot].src} alt={selectedProject.screenshots[activeScreenshot].alt} />
                  <figcaption className="screenshot-count" dir="ltr">
                    {activeScreenshot + 1} / {selectedProject.screenshots.length}
                  </figcaption>
                </figure>
                <div className="slider-controls" dir="ltr">
                  <button type="button" onClick={showPreviousScreenshot} aria-label="Previous screenshot">
                    ‹
                  </button>
                  <div className="slider-thumbnails">
                    {selectedProject.screenshots.map((screenshot, index) => (
                      <button
                        key={screenshot.src}
                        type="button"
                        className={index === activeScreenshot ? "active" : ""}
                        aria-label={`Show screenshot ${index + 1}`}
                        onClick={() => setActiveScreenshot(index)}
                      >
                        <img src={screenshot.src} alt="" />
                      </button>
                    ))}
                  </div>
                  <button type="button" onClick={showNextScreenshot} aria-label="Next screenshot">
                    ›
                  </button>
                </div>
              </div>
            ) : (
              <div className="screenshot-placeholder">
                <span className="fa-text" lang="fa">
                  اسکرین‌شات برنامه اینجا قرار می‌گیرد
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
