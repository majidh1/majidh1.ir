export default function SkillTicker({ skills }) {
  const loop = [...skills, ...skills];

  return (
    <div className="ticker" aria-label="مهارت‌ها">
      <div className="ticker-track">
        {loop.map((skill, index) => (
          <span className="ticker-item" key={`${skill}-${index}`}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
