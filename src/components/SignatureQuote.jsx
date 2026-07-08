export default function SignatureQuote({ quote }) {
  return (
    <section className="quote-band">
      <div className="container">
        <h2>{quote.main}</h2>
        <p>
          {quote.parts.map((part) => (
            <span key={part}>{part} </span>
          ))}
        </p>
      </div>
    </section>
  );
}
