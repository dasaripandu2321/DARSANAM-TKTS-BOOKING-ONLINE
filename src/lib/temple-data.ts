export type ServiceCategory = "darshan" | "prasadam" | "seva";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  description: string;
  duration?: string;
  inventory?: number; // Available slots/items
  maxPerBooking?: number; // Maximum quantity per booking
}

export const services: Service[] = [
  // Darshan
  { id: "d-gen", name: "General Darshanam", category: "darshan", price: 0, description: "Sarva Darshan — open to all devotees", duration: "2–3 hrs", inventory: 1000, maxPerBooking: 10 },
  { id: "d-spl", name: "Special Darshanam", category: "darshan", price: 300, description: "Shorter queue, priority entry", duration: "45–60 min", inventory: 200, maxPerBooking: 6 },
  { id: "d-vip", name: "VIP Darshanam", category: "darshan", price: 500, description: "Express darshan with garland blessing", duration: "20–30 min", inventory: 50, maxPerBooking: 4 },
  { id: "d-suprabhata", name: "Suprabhata Seva Darshan", category: "darshan", price: 750, description: "Pre-dawn awakening of the deity", duration: "60 min", inventory: 30, maxPerBooking: 2 },
  // Prasadam
  { id: "p-laddu", name: "Laddu Prasadam", category: "prasadam", price: 50, description: "Sacred sweet offering (per piece)", inventory: 500, maxPerBooking: 20 },
  { id: "p-vada", name: "Vada Prasadam", category: "prasadam", price: 25, description: "Savoury blessed offering", inventory: 300, maxPerBooking: 15 },
  { id: "p-anna", name: "Anna Prasadam", category: "prasadam", price: 100, description: "Full meal with rice, sambar, curry", inventory: 200, maxPerBooking: 10 },
  { id: "p-tamarind", name: "Tamarind Rice", category: "prasadam", price: 80, description: "Pulihora — tangy temple specialty", inventory: 150, maxPerBooking: 10 },
  // Seva
  { id: "s-archana", name: "Archana", category: "seva", price: 200, description: "Personal naming ritual at sanctum", inventory: 100, maxPerBooking: 5 },
  { id: "s-abhishekam", name: "Abhishekam", category: "seva", price: 1500, description: "Sacred bathing ceremony of the deity", inventory: 20, maxPerBooking: 2 },
  { id: "s-kalyana", name: "Kalyanotsavam", category: "seva", price: 2500, description: "Celestial wedding ritual", inventory: 10, maxPerBooking: 1 },
];

export const categoryLabels: Record<ServiceCategory, string> = {
  darshan: "Darshanam",
  prasadam: "Prasadam",
  seva: "Seva & Rituals",
};

export const sqlSchema = `-- Temple Booking System — DDL
CREATE TABLE Devotees (
  devotee_id     INTEGER PRIMARY KEY AUTOINCREMENT,
  name           VARCHAR(100) NOT NULL,
  age            INTEGER NOT NULL CHECK (age > 0 AND age < 120),
  contact        VARCHAR(15) NOT NULL,
  id_proof_type  VARCHAR(20) NOT NULL,
  id_proof_number VARCHAR(50) NOT NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Services (
  service_id   INTEGER PRIMARY KEY AUTOINCREMENT,
  service_name VARCHAR(100) NOT NULL,
  category     VARCHAR(20) NOT NULL CHECK (category IN ('darshan','prasadam','seva')),
  price        DECIMAL(10,2) NOT NULL DEFAULT 0,
  description  TEXT,
  active       BOOLEAN DEFAULT 1
);

CREATE TABLE Bookings (
  booking_id    INTEGER PRIMARY KEY AUTOINCREMENT,
  devotee_id    INTEGER NOT NULL REFERENCES Devotees(devotee_id),
  booking_date  DATE NOT NULL,
  total_amount  DECIMAL(10,2) NOT NULL,
  status        VARCHAR(20) DEFAULT 'CONFIRMED',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE BookingItems (
  item_id    INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER NOT NULL REFERENCES Bookings(booking_id) ON DELETE CASCADE,
  service_id INTEGER NOT NULL REFERENCES Services(service_id),
  quantity   INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL
);

CREATE INDEX idx_bookings_date ON Bookings(booking_date);
CREATE INDEX idx_devotee_proof ON Devotees(id_proof_number);`;
