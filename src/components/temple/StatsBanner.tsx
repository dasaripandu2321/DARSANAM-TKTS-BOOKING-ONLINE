const stats = [
  { value: "1,200+", label: "Years of devotion", icon: "🛕" },
  { value: "5L+", label: "Annual devotees", icon: "🙏" },
  { value: "108", label: "Daily sevas", icon: "🪔" },
  { value: "24/7", label: "Live darshan", icon: "📿" },
];

export const StatsBanner = () => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
    {stats.map((s) => (
      <div key={s.label} className="group rounded-2xl border border-gold/40 bg-card p-5 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-gold">
        <div className="text-3xl transition-transform group-hover:scale-110">{s.icon}</div>
        <div className="mt-2 font-display text-2xl font-bold text-saffron sm:text-3xl">{s.value}</div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
      </div>
    ))}
  </div>
);
