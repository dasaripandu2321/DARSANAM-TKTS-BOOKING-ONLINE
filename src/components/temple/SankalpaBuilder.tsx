import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { gotras, intentions } from "@/lib/panchanga";
import { ScrollText } from "lucide-react";

export interface SankalpaData {
  gotra: string;
  nakshatra: string;
  intention: string;
  customWish: string;
}

interface Props { value: SankalpaData; onChange: (v: SankalpaData) => void; }

export const SankalpaBuilder = ({ value, onChange }: Props) => {
  const update = (k: keyof SankalpaData, v: string) => onChange({ ...value, [k]: v });
  const [showPreview, setShowPreview] = useState(false);
  const nakshatras = ["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha"];

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <ScrollText className="h-5 w-5 text-saffron" />
        <h3 className="font-display text-xl font-bold text-maroon">Your Sankalpa</h3>
        <span className="ml-auto text-xs text-muted-foreground">Sacred intention (optional)</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Declare your gotra and prayer — it will be invoked by the priest during your seva.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-sm">Gotra</Label>
          <Select value={value.gotra} onValueChange={(v) => update("gotra", v)}>
            <SelectTrigger><SelectValue placeholder="Select gotra" /></SelectTrigger>
            <SelectContent>{gotras.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm">Birth Nakshatra</Label>
          <Select value={value.nakshatra} onValueChange={(v) => update("nakshatra", v)}>
            <SelectTrigger><SelectValue placeholder="Select nakshatra" /></SelectTrigger>
            <SelectContent>{nakshatras.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <Label className="text-sm">Primary Intention</Label>
        <div className="flex flex-wrap gap-2">
          {intentions.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => update("intention", i)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                value.intention === i
                  ? "border-saffron bg-saffron text-primary-foreground"
                  : "border-border bg-card hover:border-gold"
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <Label className="text-sm">Personal Prayer (optional)</Label>
        <Input value={value.customWish} onChange={(e) => update("customWish", e.target.value)} maxLength={140} placeholder="May my family be blessed with..." />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <button type="button" onClick={() => setShowPreview((v) => !v)} className="text-saffron hover:underline">
            {showPreview ? "Hide" : "Preview"} sankalpa script
          </button>
          <span>{value.customWish.length}/140</span>
        </div>
      </div>

      {showPreview && (
        <div className="mt-3 animate-fade-in rounded-lg border border-dashed border-gold bg-amber-50/50 p-4 font-display text-sm italic leading-relaxed text-maroon">
          🕉 Mama upatta-samasta-duritakshaya-dvara…
          <br />
          <strong>{value.gotra || "____"} gotrasya, {value.nakshatra || "____"} nakshatra jatasya/jatayah</strong>,
          for the purpose of <strong>{value.intention || "_____"}</strong>
          {value.customWish && <> — {value.customWish}</>}, this seva is offered with devotion.
        </div>
      )}
    </div>
  );
};
