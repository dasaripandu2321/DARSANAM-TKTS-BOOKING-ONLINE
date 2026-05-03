import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Flame, Sparkles, Bell, MapPin } from "lucide-react";
import heroImg from "@/assets/temple-hero.jpg";
import { categoryLabels, services, ServiceCategory } from "@/lib/temple-data";
import { getInventory, updateInventory, restoreInventory, getAvailableInventory } from "@/lib/inventory";
import { ServiceCard } from "@/components/temple/ServiceCard";
import { PriceList } from "@/components/temple/PriceList";
import { BookingForm, DevoteeData } from "@/components/temple/BookingForm";
import { Receipt, BookingRecord } from "@/components/temple/Receipt";
import { SchemaViewer } from "@/components/temple/SchemaViewer";
import { Button } from "@/components/ui/button";
import { LiveStatus } from "@/components/temple/LiveStatus";
import { AartiTimeline } from "@/components/temple/AartiTimeline";
import { DeityOfDay } from "@/components/temple/DeityOfDay";
import { CrowdHeatmap } from "@/components/temple/CrowdHeatmap";
import { MuhurtaPicker } from "@/components/temple/MuhurtaPicker";
import { SankalpaBuilder, SankalpaData } from "@/components/temple/SankalpaBuilder";
import { VirtualGarland } from "@/components/temple/VirtualGarland";
import { DonationTiers } from "@/components/temple/DonationTiers";
import { FestivalCalendar } from "@/components/temple/FestivalCalendar";
import { PetalRain } from "@/components/temple/PetalRain";
import { StatsBanner } from "@/components/temple/StatsBanner";
import { UserProfile } from "@/components/auth/UserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const STORAGE_KEY = "temple-bookings-v1";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<ServiceCategory>("darshan");
  const [receipt, setReceipt] = useState<BookingRecord | null>(null);
  const [history, setHistory] = useState<BookingRecord[]>([]);
  const [muhurta, setMuhurta] = useState<string>("");
  const [sankalpa, setSankalpa] = useState<SankalpaData>({ gotra: "", nakshatra: "", intention: "", customWish: "" });
  const [visitDate, setVisitDate] = useState<string>("");
  const [inventory, setInventory] = useState(getInventory());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {}
  }, []);

  const add = (id: string) => {
    const service = services.find(s => s.id === id);
    const available = getAvailableInventory(id);
    const currentQty = cart[id] || 0;
    
    // Check inventory limit
    if (service?.inventory !== undefined && currentQty >= available) {
      toast.error("Not enough inventory available");
      return;
    }
    
    // Check max per booking limit
    if (service?.maxPerBooking !== undefined && currentQty >= service.maxPerBooking) {
      toast.error(`Maximum ${service.maxPerBooking} per booking`);
      return;
    }
    
    setCart((c) => ({ ...c, [id]: currentQty + 1 }));
  };
  
  const remove = (id: string) =>
    setCart((c) => {
      const next = { ...c, [id]: (c[id] || 0) - 1 };
      if (next[id] <= 0) delete next[id];
      return next;
    });

  const { total, itemCount, items } = useMemo(() => {
    const items = Object.entries(cart)
      .map(([id, qty]) => ({ service: services.find((s) => s.id === id)!, qty }))
      .filter((i) => i.service);
    const total = items.reduce((s, i) => s + i.service.price * i.qty, 0);
    const itemCount = items.reduce((s, i) => s + i.qty, 0);
    return { total, itemCount, items };
  }, [cart]);

  const handleSubmit = (data: DevoteeData) => {
    // Check and update inventory
    for (const { service, qty } of items) {
      if (!updateInventory(service.id, qty)) {
        toast.error(`Not enough inventory for ${service.name}`);
        return;
      }
    }
    
    const booking: BookingRecord = {
      bookingId: "TKT-" + Date.now().toString(36).toUpperCase(),
      devotee: { 
        name: data.name, 
        age: String(data.age), 
        contact: data.contact, 
        idType: data.idType, 
        idNumber: data.idNumber,
        email: user?.email || "",
        userId: user?.uid || ""
      },
      date: new Date(data.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
      items,
      total,
      createdAt: new Date().toISOString(),
    };
    const next = [booking, ...history].slice(0, 50);
    setHistory(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setReceipt(booking);
    setCart({});
    setInventory(getInventory()); // Refresh inventory display
    toast.success("Booking confirmed! 🪔", { description: muhurta ? `Slot: ${muhurta}` : "Awaiting your darshan" });
  };

  const tabs: ServiceCategory[] = ["darshan", "prasadam", "seva"];

  return (
    <div className="min-h-screen">
      {/* User Profile in top-right corner */}
      <div className="fixed right-4 top-4 z-50">
        <UserProfile />
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <img src={heroImg} alt="Temple gopuram silhouette at golden hour" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-gradient" />
        <PetalRain />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center text-primary-foreground sm:py-28">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-xs uppercase tracking-[0.3em] backdrop-blur">
            <Flame className="h-3.5 w-3.5 animate-flame" /> Sri Kshetra Devasthanam
          </div>
          <h1 className="font-display text-5xl font-bold leading-tight drop-shadow-lg sm:text-6xl md:text-7xl">
            Sacred Darshan,
            <br />
            <span className="bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">Booked with Grace</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base opacity-95 sm:text-lg">
            Reserve darshanam, prasadam &amp; sevas. Choose your auspicious muhurta, build a virtual garland, declare your sankalpa — all in one serene flow.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })} className="bg-gold-gradient text-maroon shadow-gold hover:opacity-95">
              <Bell className="mr-2 h-4 w-4" /> Book Darshan
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById("today")?.scrollIntoView({ behavior: "smooth" })} className="border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground backdrop-blur hover:bg-primary-foreground/20">
              <MapPin className="mr-2 h-4 w-4" /> Today at the Temple
            </Button>
            <Link to="/admin">
              <Button size="lg" variant="outline" className="border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground backdrop-blur hover:bg-primary-foreground/20">
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <LiveStatus />

      <main className="mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-6">
        {/* Today */}
        <section id="today" className="space-y-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-maroon sm:text-4xl">Today at the Temple</h2>
            <div className="ornate-divider mx-auto mt-3 w-32" />
          </div>
          <StatsBanner />
          <div className="grid gap-6 lg:grid-cols-2">
            <DeityOfDay />
            <AartiTimeline />
          </div>
          <CrowdHeatmap />
        </section>

        {/* Service selection */}
        <section id="book">
          <div className="mb-8 text-center">
            <Sparkles className="mx-auto mb-2 h-6 w-6 text-saffron animate-flame" />
            <h2 className="font-display text-3xl font-bold text-maroon sm:text-4xl">Choose Your Offerings</h2>
            <div className="ornate-divider mx-auto mt-3 w-32" />
          </div>

          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`rounded-full px-5 py-2 font-display text-sm font-semibold uppercase tracking-wider transition-all ${
                  activeTab === t
                    ? "bg-temple-gradient text-primary-foreground shadow-temple"
                    : "border border-border bg-card text-foreground hover:border-gold"
                }`}
              >
                {categoryLabels[t]}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.filter((s) => s.category === activeTab).map((s) => (
              <ServiceCard 
                key={s.id} 
                service={s} 
                quantity={cart[s.id] || 0} 
                onAdd={() => add(s.id)} 
                onRemove={() => remove(s.id)}
                availableInventory={getAvailableInventory(s.id)}
              />
            ))}
          </div>
        </section>

        {/* Personalisation */}
        <section className="grid gap-6 lg:grid-cols-2">
          <MuhurtaPicker selectedDate={visitDate} selectedMuhurta={muhurta} onSelectMuhurta={setMuhurta} />
          <VirtualGarland />
        </section>

        <section>
          <SankalpaBuilder value={sankalpa} onChange={setSankalpa} />
        </section>

        {/* Booking form */}
        <section className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <BookingForm total={total} itemCount={itemCount} onSubmit={handleSubmit} onDateChange={setVisitDate} />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-2xl border border-gold bg-card p-6 shadow-gold">
                <h3 className="mb-3 font-display text-xl font-bold text-maroon">Your Cart</h3>
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No services selected yet. Tap "Add to booking" above.</p>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {items.map(({ service, qty }) => (
                      <li key={service.id} className="flex items-center justify-between border-b border-border/60 pb-2">
                        <span>{service.name} <span className="text-muted-foreground">×{qty}</span></span>
                        <span className="font-medium text-saffron">₹{(service.price * qty).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {muhurta && (
                  <div className="mt-3 rounded-lg border border-saffron/40 bg-saffron/10 px-3 py-2 text-xs">
                    ✦ Muhurta: <strong className="text-maroon">{muhurta}</strong>
                  </div>
                )}
                {sankalpa.intention && (
                  <div className="mt-2 rounded-lg border border-gold/40 bg-amber-50/40 px-3 py-2 text-xs italic">
                    🕉 Sankalpa for {sankalpa.intention.toLowerCase()}
                  </div>
                )}
                <div className="mt-4 flex items-center justify-between rounded-lg bg-temple-gradient px-3 py-2 text-primary-foreground">
                  <span className="font-display font-semibold">Total</span>
                  <span className="font-display text-xl font-bold">₹{total.toFixed(2)}</span>
                </div>
              </div>
              <FestivalCalendar />
            </div>
          </aside>
        </section>

        {/* Donations */}
        <section><DonationTiers /></section>

        {/* Price list */}
        <section id="prices"><PriceList /></section>

        {/* Schema */}
        <section><SchemaViewer /></section>

        {/* History */}
        {history.length > 0 && (
          <section>
            <h3 className="mb-4 font-display text-2xl font-bold text-maroon">Recent Bookings</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {history.slice(0, 6).map((b) => (
                <button
                  key={b.bookingId}
                  onClick={() => setReceipt(b)}
                  className="rounded-xl border border-border bg-card p-4 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-temple"
                >
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{b.bookingId}</div>
                  <div className="mt-1 font-display font-semibold text-maroon">{b.devotee.name}</div>
                  <div className="text-sm text-muted-foreground">{b.date}</div>
                  <div className="mt-2 font-display text-lg font-bold text-saffron">₹{b.total.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="relative overflow-hidden border-t border-border bg-gradient-to-br from-card via-amber-50/40 to-card py-10 text-center">
        <p className="font-display text-lg text-maroon">🕉 Sarve Bhavantu Sukhinah</p>
        <p className="mt-1 text-sm italic text-muted-foreground">May all beings everywhere be happy and free</p>
        <p className="mt-4 text-xs text-muted-foreground">Sri Kshetra Devasthanam · Built with devotion · Demo bookings stored locally</p>
      </footer>

      {receipt && <Receipt booking={receipt} onClose={() => setReceipt(null)} />}
    </div>
  );
};

export default Index;
