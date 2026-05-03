export const CrowdHeatmap = () => {
  const hours = Array.from({ length: 24 }, (_, h) => {
    const morning = Math.exp(-Math.pow(h - 8, 2) / 6) * 9;
    const evening = Math.exp(-Math.pow(h - 18, 2) / 5) * 10;
    return Math.min(10, Math.max(0.5, morning + evening));
  });

  const colorFor = (v: number) =>
    v < 2 ? "bg-emerald-400" : v < 4 ? "bg-lime-400" : v < 6 ? "bg-amber-400" : v < 8 ? "bg-orange-500" : "bg-destructive";

  const minHour = hours.reduce((m, v, i) => (v < hours[m] ? i : m), 0);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold text-maroon">Today's Crowd Forecast</h3>
          <p className="text-sm text-muted-foreground">Plan when the queue is shortest</p>
        </div>
        <div className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs">
          <span className="text-emerald-700">Best time: </span>
          <strong className="font-display text-emerald-800">{String(minHour).padStart(2, "0")}:00</strong>
        </div>
      </div>

      <div className="mt-5 flex items-end gap-1">
        {hours.map((v, i) => (
          <div key={i} className="group relative flex-1">
            <div className={`${colorFor(v)} rounded-sm transition-all hover:opacity-80`} style={{ height: `${10 + v * 10}px` }} />
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 text-[10px] text-background opacity-0 transition-opacity group-hover:opacity-100">
              {String(i).padStart(2, "0")}:00
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
        <span>00</span><span>06</span><span>12</span><span>18</span><span>23</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
        <span className="text-muted-foreground">Density:</span>
        {[
          { l: "Quiet", c: "bg-emerald-400" },
          { l: "Light", c: "bg-lime-400" },
          { l: "Moderate", c: "bg-amber-400" },
          { l: "Busy", c: "bg-orange-500" },
          { l: "Peak", c: "bg-destructive" },
        ].map((x) => (
          <span key={x.l} className="flex items-center gap-1">
            <span className={`h-2.5 w-2.5 rounded-sm ${x.c}`} />{x.l}
          </span>
        ))}
      </div>
    </div>
  );
};
