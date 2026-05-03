import { services, categoryLabels, ServiceCategory } from "@/lib/temple-data";

export const PriceList = () => {
  const categories: ServiceCategory[] = ["darshan", "prasadam", "seva"];
  return (
    <div className="overflow-hidden rounded-2xl border border-gold bg-card shadow-gold">
      <div className="bg-temple-gradient px-6 py-5 text-primary-foreground">
        <h3 className="font-display text-2xl font-bold">Official Price List</h3>
        <p className="text-sm opacity-90">All services & offerings — updated 2026</p>
      </div>
      <div className="divide-y divide-border">
        {categories.map((cat) => (
          <div key={cat}>
            <div className="bg-muted/60 px-6 py-2 font-display text-sm font-semibold uppercase tracking-widest text-maroon">
              {categoryLabels[cat]}
            </div>
            <table className="w-full">
              <tbody>
                {services.filter((s) => s.category === cat).map((s) => (
                  <tr key={s.id} className="border-t border-border/60 transition-colors hover:bg-accent/20">
                    <td className="px-6 py-3 font-medium">{s.name}</td>
                    <td className="hidden px-6 py-3 text-sm text-muted-foreground sm:table-cell">{s.description}</td>
                    <td className="px-6 py-3 text-right font-display font-bold text-saffron">
                      {s.price === 0 ? "FREE" : `₹${s.price}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};
