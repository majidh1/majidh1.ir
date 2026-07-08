import { useRef } from "react";

export default function MagnetButton({ children, href, onClick, variant = "primary" }) {
  const ref = useRef(null);
  const Component = href ? "a" : "button";

  function handleMove(event) {
    const node = ref.current;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  }

  function reset() {
    ref.current.style.transform = "translate(0, 0)";
  }

  return (
    <Component
      ref={ref}
      className={`magnet-button ${variant}`}
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </Component>
  );
}
