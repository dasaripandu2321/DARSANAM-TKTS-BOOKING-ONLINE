import { useEffect, useState } from "react";

interface Aarti { name: string; time: string; description: string; }

const aartis: Aarti[] = [
  { name: "Suprabhata Seva", time: "04:30", description: "Awakening of the deity" },
  { name: "Bala Bhoga", time: "06:30", description: "Morning offering" },
  { name: "Madhyahna Aarti", time: "12:00", description: "Noon ritual & nivedyam" },
  { name: "Sandhya Aarti", time: "18:30", description: "Evening lamp ceremony" },
  { name: "Ekanta Seva", time: "20:30", description: "Final bedtime ritual" },
];

const toMin = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

export const AartiTimeline = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);

  const nowMin = now.getHours() * 60 + now.getMinutes();
  const next = aartis.find((a) => toMin(a.time) > nowMin) ?? aartis[0];
  const diff = (toMin(next.time) - nowMin + 1440) % 1440;
  const hh = Math.floor(diff / 60);
  const mm = diff % 60;
  const ss = 60 - now.getSeconds();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold bg-card p-6 shadow-gold">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-temple-gradient opacity-20 blur-2xl" />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-saffron">Next Sacred Ritual</div>
          <h3 className="mt-1 font-display text-3xl font-bold text-maroon">{next.name}</h3>
          <p className="text-sm text-muted-foreground">{next.description}</p>
        </div>
        <div className="rounded-xl bg-temple-gradient px-5 py-3 text-primary-foreground shadow-temple">
          <div className="text-[10px] uppercase tracking-widest opacity-80">Begins in</div>
          <div className="font-display text-2xl font-bold tabular-nums">
            {String(hh).padStart(2, "0")}:{String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
          </div>
        </div>
      </div>

      <div className="relative mt-6 h-2 rounded-full bg-muted">
        <div className="absolute inset-y-0 left-0 rounded-full bg-temple-gradient" style={{ width: `${(nowMin / 1440) * 100}%` }} />
        {aartis.map((a) => {
          const pct = (toMin(a.time) / 1440) * 100;
          const passed = toMin(a.time) <= nowMin;
          return (
            <div key={a.name} className="absolute -top-1 -translate-x-1/2" style={{ left: `${pct}%` }}>
              <div className={`h-4 w-4 rounded-full border-2 ${passed ? "border-saffron bg-gold" : "border-muted-foreground bg-card"}`} />
            </div>
          );
        })}
      </div>
      <div className="mt-3 grid grid-cols-5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {aartis.map((a) => (
          <div key={a.name}>
            <div className="font-display text-sm text-maroon">{a.time}</div>
            <div className="truncate">{a.name.split(" ")[0]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
