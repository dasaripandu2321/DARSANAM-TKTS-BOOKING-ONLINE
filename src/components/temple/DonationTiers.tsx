import { donationTiers } from "@/lib/panchanga";
import { toast } from "sonner";

export const DonationTiers = () => (
  <div>
    <div className="mb-6 text-center">
      <h2 className="font-display text-3xl font-bold text-maroon sm:text-4xl">Seva & Daana</h2>
      <p className="text-muted-foreground">Sponsor a sacred offering — your generosity sustains tradition.</p>
      <div className="ornate-divider mx-auto mt-3 w-32" />
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {donationTiers.map((t) => (
        <button
          key={t.id}
          onClick={() => toast.success(`🙏 Thank you for choosing ${t.name}`, { description: t.perk })}
          className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-border bg-card p-5 text-left shadow-soft transition-all hover:-translate-y-2 hover:border-gold hover:shadow-temple"
        >
          <div className="absolute -right-6 -top-6 text-7xl opacity-10 transition-transform group-hover:scale-110 group-hover:opacity-20">{t.icon}</div>
          <span className="text-3xl">{t.icon}</span>
          <h4 className="mt-2 font-display text-lg font-bold text-maroon">{t.name}</h4>
          <p className="mt-1 text-xs text-muted-foreground">{t.perk}</p>
          <div className="mt-3 font-display text-2xl font-bold text-saffron">₹{t.amount.toLocaleString("en-IN")}</div>
          <span className="mt-2 inline-block rounded-full bg-temple-gradient px-3 py-1 text-xs font-medium text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">Sponsor →</span>
        </button>
      ))}
    </div>
  </div>
);
