import { useEffect, useRef } from "react";

export default function AnimatedGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let raf = 0;
    const dots = Array.from({ length: 84 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.8 + 0.8
    }));

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width * window.devicePixelRatio;
      height = rect.height * window.devicePixelRatio;
      canvas.width = width;
      canvas.height = height;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255,255,255,0.82)";
      dots.forEach((dot) => {
        dot.x += dot.vx / width;
        dot.y += dot.vy / height;

        if (dot.x < 0 || dot.x > 1) dot.vx *= -1;
        if (dot.y < 0 || dot.y > 1) dot.vy *= -1;

        const x = dot.x * width;
        const y = dot.y * height;
        ctx.beginPath();
        ctx.arc(x, y, dot.r * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < dots.length; i += 1) {
        for (let j = i + 1; j < dots.length; j += 1) {
          const ax = dots[i].x * width;
          const ay = dots[i].y * height;
          const bx = dots[j].x * width;
          const by = dots[j].y * height;
          const distance = Math.hypot(ax - bx, ay - by);
          if (distance < 145) {
            const alpha = 1 - distance / 145;
            ctx.strokeStyle = `rgba(73, 211, 197, ${alpha * 0.22})`;
            ctx.lineWidth = window.devicePixelRatio;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-grid" aria-hidden="true" />;
}
