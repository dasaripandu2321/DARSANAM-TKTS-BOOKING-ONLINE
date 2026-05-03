export const PetalRain = () => {
  const petals = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((_, i) => (
        <span
          key={i}
          className="absolute -top-6 animate-petal text-2xl"
          style={{
            left: `${(i * 7.3) % 100}%`,
            animationDelay: `${(i * 0.9) % 12}s`,
            animationDuration: `${10 + (i % 6)}s`,
          }}
        >
          {["🌸", "🌺", "🌼", "🪷"][i % 4]}
        </span>
      ))}
    </div>
  );
};
