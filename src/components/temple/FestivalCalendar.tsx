import { festivals } from "@/lib/panchanga";

export const FestivalCalendar = () => {
  const today = new Date();
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className="font-display text-xl font-bold text-maroon">Upcoming Festivals & Utsavams</h3>
      <p className="text-sm text-muted-foreground">Mark your calendar — special darshanams open early</p>
      <div className="mt-4 space-y-2">
        {festivals.map((f) => {
          const fd = new Date(f.date);
          const days = Math.ceil((fd.getTime() - today.getTime()) / 86400000);
          return (
            <div key={f.name} className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3 transition hover:border-gold hover:bg-accent/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-temple-gradient text-2xl shadow-temple">{f.icon}</div>
              <div className="min-w-0 flex-1">
                <div className="font-display font-semibold text-maroon">{f.name}</div>
                <div className="text-xs text-muted-foreground">
                  {fd.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>
              <div className="rounded-full bg-saffron/10 px-3 py-1 text-xs font-semibold text-saffron">
                {days <= 0 ? "Today" : `in ${days}d`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
