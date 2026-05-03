import { useState } from "react";
import { flowers } from "@/lib/panchanga";
import { Trash2 } from "lucide-react";

export const VirtualGarland = () => {
  const [garland, setGarland] = useState<string[]>([]);
  const total = garland.reduce((s, id) => s + (flowers.find((f) => f.id === id)?.price || 0), 0);
  const add = (id: string) => garland.length < 21 && setGarland([...garland, id]);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className="font-display text-xl font-bold text-maroon">Virtual Pushpa-Mala Builder</h3>
      <p className="text-sm text-muted-foreground">String your own flower offering — placed on the deity in your name.</p>

      <div className="my-5 flex min-h-[80px] items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-rose-50 p-4">
        {garland.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">Tap flowers below to thread your mala…</p>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-1 text-2xl">
            {garland.map((id, i) => {
              const f = flowers.find((x) => x.id === id)!;
              return <span key={i} className="animate-scale-in" style={{ animationDelay: `${i * 30}ms` }}>{f.emoji}</span>;
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {flowers.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => add(f.id)}
            className="group flex flex-col items-center gap-1 rounded-lg border border-border bg-card p-2 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-soft"
          >
            <span className="text-2xl transition-transform group-hover:scale-125">{f.emoji}</span>
            <span className="text-[10px] font-medium">{f.name}</span>
            <span className="text-[10px] text-saffron">₹{f.price}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-muted px-4 py-2">
        <button type="button" onClick={() => setGarland([])} disabled={!garland.length} className="flex items-center gap-1 text-xs text-destructive hover:underline disabled:opacity-40">
          <Trash2 className="h-3 w-3" /> Clear
        </button>
        <span className="text-sm">{garland.length} / 21 flowers · <strong className="text-saffron">₹{total}</strong></span>
      </div>
    </div>
  );
};
