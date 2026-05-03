import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  age: z.coerce.number().int().min(1, "Enter a valid age").max(119),
  contact: z.string().trim().regex(/^[0-9+\-\s]{7,15}$/, "Enter a valid phone number"),
  idType: z.string().min(1, "Select an ID proof type"),
  idNumber: z.string().trim().min(4, "ID proof number is required").max(50),
  date: z.string().min(1, "Select a visit date").refine((d) => new Date(d) >= new Date(new Date().toDateString()), "Date cannot be in the past"),
});

export type DevoteeData = z.infer<typeof schema>;

interface Props {
  total: number;
  itemCount: number;
  onSubmit: (data: DevoteeData) => void;
  onDateChange?: (d: string) => void;
}

export const BookingForm = ({ total, itemCount, onSubmit, onDateChange }: Props) => {
  const [form, setForm] = useState({ name: "", age: "", contact: "", idType: "", idNumber: "", date: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (k: string, v: string) => {
    setForm({ ...form, [k]: v });
    if (k === "date") onDateChange?.(v);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemCount === 0) {
      toast.error("Please select at least one service");
      return;
    }
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      toast.error("Please correct the highlighted fields");
      return;
    }
    setErrors({});
    onSubmit(result.data);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div>
        <h3 className="font-display text-2xl font-bold text-maroon">Devotee Details</h3>
        <p className="text-sm text-muted-foreground">All fields are required for darshan registration</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name}>
          <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="As per ID proof" maxLength={100} />
        </Field>
        <Field label="Age" error={errors.age}>
          <Input type="number" min={1} max={119} value={form.age} onChange={(e) => update("age", e.target.value)} placeholder="e.g. 35" />
        </Field>
        <Field label="Contact Number" error={errors.contact}>
          <Input value={form.contact} onChange={(e) => update("contact", e.target.value)} placeholder="+91 98765 43210" maxLength={15} />
        </Field>
        <Field label="Visit Date" error={errors.date}>
          <Input type="date" min={today} value={form.date} onChange={(e) => update("date", e.target.value)} />
        </Field>
        <Field label="ID Proof Type" error={errors.idType}>
          <Select value={form.idType} onValueChange={(v) => update("idType", v)}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Aadhaar">Aadhaar Card</SelectItem>
              <SelectItem value="PAN">PAN Card</SelectItem>
              <SelectItem value="Passport">Passport</SelectItem>
              <SelectItem value="Voter">Voter ID</SelectItem>
              <SelectItem value="Driving">Driving License</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="ID Proof Number" error={errors.idNumber}>
          <Input value={form.idNumber} onChange={(e) => update("idNumber", e.target.value)} placeholder="Document number" maxLength={50} />
        </Field>
      </div>

      <div className="ornate-divider my-2" />

      <div className="flex items-center justify-between rounded-xl bg-muted px-4 py-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Total ({itemCount} item{itemCount !== 1 ? "s" : ""})</div>
          <div className="font-display text-3xl font-bold text-saffron">₹{total.toFixed(2)}</div>
        </div>
        <Button type="submit" size="lg" className="bg-temple-gradient text-primary-foreground shadow-temple hover:opacity-90">
          Confirm Booking 🪔
        </Button>
      </div>
    </form>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium text-foreground">{label}</Label>
    {children}
    {error && <p className="text-xs font-medium text-destructive">{error}</p>}
  </div>
);
