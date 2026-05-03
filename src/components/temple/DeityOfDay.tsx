import { useEffect, useState } from "react";
import { deityOfDay } from "@/lib/panchanga";
import { Volume2, VolumeX } from "lucide-react";

export const DeityOfDay = () => {
  const deity = deityOfDay();
  const [chanting, setChanting] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!chanting) return;
    const id = setInterval(() => setCount((c) => (c >= 108 ? c : c + 1)), 1500);
    return () => clearInterval(id);
  }, [chanting]);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${deity.color} p-6 text-white shadow-temple`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3),transparent_50%)]" />
      <div className="absolute -bottom-16 -right-16 h-48 w-48 animate-spin-slow rounded-full border-2 border-dashed border-white/30" />
      <div className="relative">
        <div className="text-xs uppercase tracking-[0.3em] opacity-90">Today's Aaradhya Devata</div>
        <h3 className="mt-1 font-display text-3xl font-bold drop-shadow">{deity.name}</h3>
        <p className="text-sm italic opacity-90">{deity.aspect}</p>

        <div className="mt-4 rounded-xl bg-black/20 p-4 backdrop-blur">
          <div className="text-[10px] uppercase tracking-widest opacity-80">Sacred Mantra</div>
          <div className="mt-1 font-display text-lg font-semibold">{deity.mantra}</div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => { if (chanting) { setChanting(false); } else { setCount(0); setChanting(true); } }}
              className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur transition hover:bg-white/30"
            >
              {chanting ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {chanting ? "Pause Japa" : "Begin Japa"}
            </button>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-2xl">📿</span>
              <span className="font-display text-xl font-bold tabular-nums">{count}</span>
              <span className="opacity-80">/ 108</span>
            </div>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/20">
            <div className="h-full bg-white transition-all duration-500" style={{ width: `${Math.min(100, (count / 108) * 100)}%` }} />
          </div>
          {count >= 108 && <p className="mt-2 text-center text-xs">🌸 One full mala complete. Hari Om Tat Sat 🌸</p>}
        </div>
      </div>
    </div>
  );
};
