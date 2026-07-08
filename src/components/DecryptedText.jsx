import { useEffect, useState } from "react";

const glyphs = "01{}[]<>#@$%&+=?*";

export default function DecryptedText({ text, className = "" }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 34;
    const interval = window.setInterval(() => {
      frame += 1;
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < (frame / totalFrames) * text.length) return char;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join("")
      );

      if (frame >= totalFrames) {
        window.clearInterval(interval);
        setDisplay(text);
      }
    }, 32);

    return () => window.clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
}
