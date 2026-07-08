import { useRef } from "react";

export default function SpotlightCard({ children, className = "" }) {
  const ref = useRef(null);

  function handleMove(event) {
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <article ref={ref} className={`spotlight-card ${className}`} onMouseMove={handleMove}>
      {children}
    </article>
  );
}
