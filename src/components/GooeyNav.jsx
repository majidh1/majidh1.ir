import { useEffect, useRef, useState } from "react";

export default function GooeyNav({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0
}) {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  function getXY(distance, pointIndex, totalPoints) {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  }

  function createParticle(i, t, d, r) {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  }

  function makeParticles(element) {
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i += 1) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const particleData = createParticle(i, t, particleDistances, particleR);
      element.classList.remove("active");

      const particle = document.createElement("span");
      const point = document.createElement("span");
      particle.classList.add("particle");
      particle.style.setProperty("--start-x", `${particleData.start[0]}px`);
      particle.style.setProperty("--start-y", `${particleData.start[1]}px`);
      particle.style.setProperty("--end-x", `${particleData.end[0]}px`);
      particle.style.setProperty("--end-y", `${particleData.end[1]}px`);
      particle.style.setProperty("--time", `${particleData.time}ms`);
      particle.style.setProperty("--scale", `${particleData.scale}`);
      particle.style.setProperty("--color", `var(--gooey-color-${particleData.color}, white)`);
      particle.style.setProperty("--rotate", `${particleData.rotate}deg`);
      point.classList.add("point");
      particle.appendChild(point);
      element.appendChild(particle);

      requestAnimationFrame(() => {
        element.classList.add("active");
      });

      window.setTimeout(() => {
        particle.remove();
      }, t + 180);
    }
  }

  function updateEffectPosition(element) {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };

    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  }

  function activate(element, index) {
    if (activeIndex === index) return;
    setActiveIndex(index);
    updateEffectPosition(element);

    filterRef.current?.querySelectorAll(".particle").forEach((particle) => particle.remove());

    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth;
      textRef.current.classList.add("active");
    }

    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
  }

  function handleClick(event, index) {
    activate(event.currentTarget.parentElement, index);
  }

  function handleKeyDown(event, index) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate(event.currentTarget.parentElement, index);
      event.currentTarget.click();
    }
  }

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return undefined;

    const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add("active");
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll("li")[activeIndex];
      if (currentActiveLi) updateEffectPosition(currentActiveLi);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <div className="gooey-nav-shell" ref={containerRef}>
      <nav className="gooey-nav" aria-label="ناوبری اصلی">
        <ul ref={navRef} className="gooey-nav-list">
          {items.map((item, index) => (
            <li key={item.href} className={activeIndex === index ? "active" : ""}>
              <a href={item.href} onClick={(event) => handleClick(event, index)} onKeyDown={(event) => handleKeyDown(event, index)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="gooey-effect filter" ref={filterRef} />
      <span className="gooey-effect text" ref={textRef} />
    </div>
  );
}
