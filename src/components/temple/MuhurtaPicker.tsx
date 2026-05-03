import { getPanchanga } from "@/lib/panchanga";
import { Sparkles } from "lucide-react";

interface Props {
  selectedDate?: string;
  selectedMuhurta?: string;
  onSelectMuhurta: (m: string) => void;
}

export const MuhurtaPicker = ({ selectedDate, selectedMuhurta, onSelectMuhurta }: Props) => {
  const date = selectedDate ? new Date(selectedDate) : new Date();
  const p = getPanchanga(date);

  return (
    <div className="rounded-2xl border border-gold bg-gradient-to-br from-card via-card to-amber-50/40 p-6 shadow-gold">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-saffron animate-flame" />
        <h3 className="font-display text-xl font-bold text-maroon">Auspicious Muhurta</h3>
        <span className="ml-auto text-xs text-muted-foreground">
          {date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}
        </span>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2 text-center">
        <Pill label="Tithi" value={p.tithi} />
        <Pill label="Nakshatra" value={p.nakshatra} />
        <Pill label="Yoga" value={p.yoga} />
      </div>

      <div className="space-y-2">
        {p.muhurta.map((m) => {
          const active = selectedMuhurta === m.name;
          return (
            <button
              key={m.name}
              type="button"
              disabled={!m.auspicious}
              onClick={() => onSelectMuhurta(m.name)}
              className={`flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-left transition-all ${
                !m.auspicious
                  ? "border-destructive/30 bg-destructive/5 text-muted-foreground"
                  : active
                    ? "border-saffron bg-temple-gradient text-primary-foreground shadow-temple"
                    : "border-border bg-card hover:border-gold hover:bg-accent/30"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{m.auspicious ? "✦" : "⚠"}</span>
                <span className="font-medium">{m.name}</span>
              </span>
              <span className="font-display text-sm font-bold tabular-nums">{m.time}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs italic text-muted-foreground">
        Brahma & Abhijit muhurtas are most auspicious for darshan. Avoid Rahu Kalam.
      </p>
    </div>
  );
};

const Pill = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg bg-muted px-2 py-2">
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="truncate font-display text-sm font-semibold text-maroon">{value}</div>
  </div>
);
