import { useEffect, useState } from "react";
import { Users, Activity } from "lucide-react";

export const LiveStatus = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick((t) => t + 1), 4000); return () => clearInterval(id); }, []);
  const hour = new Date().getHours();
  const seed = (hour * 7 + tick) % 100;
  const queueMin = Math.max(15, 20 + ((seed * 3) % 70));
  const live = 1240 + ((seed * 17) % 600);
  const status = queueMin < 30 ? "Smooth" : queueMin < 60 ? "Moderate" : "Busy";
  const dot = queueMin < 30 ? "bg-emerald-500" : queueMin < 60 ? "bg-amber-500" : "bg-destructive";

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-y border-gold/40 bg-card/80 px-4 py-2 text-sm backdrop-blur">
      <span className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dot} opacity-75`} />
          <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dot}`} />
        </span>
        <span className="font-display font-semibold text-maroon">Sanctum Live</span>
      </span>
      <span className="flex items-center gap-1.5"><Activity className="h-4 w-4 text-saffron" /> Queue ~ <strong className="text-maroon">{queueMin} min</strong> ({status})</span>
      <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-saffron" /> <strong className="text-maroon tabular-nums">{live.toLocaleString("en-IN")}</strong> devotees today</span>
      <span className="hidden text-muted-foreground md:inline">🌡 Sanctum 24°C · 🌬 Breeze gentle</span>
    </div>
  );
};
