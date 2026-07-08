import MagnetButton from "./MagnetButton.jsx";

export default function ContactCTA({ data }) {
  return (
    <section className="container final-cta" id="contact">
      <div>
        <p className="eyebrow">Let’s Build</p>
        <h2>{data.cta.title}</h2>
        <p>{data.cta.text}</p>
      </div>
      <div className="cta-actions">
        <MagnetButton href={data.links.linkedin}>ارتباط در لینکدین</MagnetButton>
        <MagnetButton href={data.links.github} variant="ghost">
          مشاهده گیت‌هاب
        </MagnetButton>
        <MagnetButton href={data.links.email} variant="ghost">
          ارسال ایمیل
        </MagnetButton>
      </div>
    </section>
  );
}
