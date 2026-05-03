export interface PanchangaEntry {
  date: Date;
  tithi: string;
  nakshatra: string;
  yoga: string;
  muhurta: { name: string; time: string; auspicious: boolean }[];
  rahuKalam: string;
}

export function getPanchanga(d: Date = new Date()): PanchangaEntry {
  const tithis = ["Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Purnima"];
  const nakshatras = ["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"];
  const yogas = ["Vishkambha","Priti","Ayushman","Saubhagya","Shobhana","Atiganda","Sukarma","Dhriti","Shula","Ganda","Vriddhi","Dhruva","Vyaghata","Harshana","Vajra","Siddhi","Vyatipata","Variyan","Parigha","Shiva","Siddha","Sadhya","Shubha","Shukla","Brahma","Indra","Vaidhriti"];
  const day = Math.floor(d.getTime() / 86400000);
  return {
    date: d,
    tithi: tithis[day % tithis.length],
    nakshatra: nakshatras[day % nakshatras.length],
    yoga: yogas[day % yogas.length],
    muhurta: [
      { name: "Brahma Muhurta", time: "04:24 – 05:12", auspicious: true },
      { name: "Abhijit Muhurta", time: "11:48 – 12:36", auspicious: true },
      { name: "Godhuli Muhurta", time: "18:12 – 18:36", auspicious: true },
      { name: "Rahu Kalam", time: "10:30 – 12:00", auspicious: false },
      { name: "Yamaganda", time: "13:30 – 15:00", auspicious: false },
    ],
    rahuKalam: "10:30 – 12:00",
  };
}

export const deities = [
  { name: "Sri Venkateswara", aspect: "The Lord of Seven Hills", mantra: "Om Namo Venkatesaya", color: "from-amber-500 to-orange-700" },
  { name: "Sri Lakshmi", aspect: "Goddess of Prosperity", mantra: "Om Sri Mahalakshmyai Namaha", color: "from-rose-400 to-pink-700" },
  { name: "Sri Ganesha", aspect: "Remover of Obstacles", mantra: "Om Gam Ganapataye Namaha", color: "from-red-400 to-amber-600" },
  { name: "Sri Shiva", aspect: "The Auspicious One", mantra: "Om Namah Shivaya", color: "from-blue-400 to-indigo-700" },
  { name: "Sri Saraswati", aspect: "Goddess of Wisdom", mantra: "Om Aim Saraswatyai Namaha", color: "from-sky-300 to-cyan-600" },
  { name: "Sri Hanuman", aspect: "The Devoted Servant", mantra: "Om Hanumate Namaha", color: "from-orange-500 to-red-700" },
  { name: "Sri Durga", aspect: "The Invincible Mother", mantra: "Om Dum Durgayai Namaha", color: "from-fuchsia-500 to-rose-700" },
];

export const deityOfDay = (d: Date = new Date()) => deities[d.getDay() % deities.length];

export const festivals = [
  { name: "Brahmotsavam", date: "2026-05-12", icon: "🪔" },
  { name: "Vaikunta Ekadashi", date: "2026-05-22", icon: "🌸" },
  { name: "Guru Purnima", date: "2026-06-09", icon: "🌕" },
  { name: "Krishna Janmashtami", date: "2026-08-15", icon: "🦚" },
  { name: "Navratri Begins", date: "2026-09-22", icon: "🌺" },
  { name: "Deepavali", date: "2026-11-08", icon: "✨" },
];

export const flowers = [
  { id: "rose", name: "Rose", emoji: "🌹", price: 50 },
  { id: "marigold", name: "Marigold", emoji: "🌼", price: 30 },
  { id: "jasmine", name: "Jasmine", emoji: "🌸", price: 80 },
  { id: "lotus", name: "Lotus", emoji: "🪷", price: 150 },
  { id: "tulasi", name: "Tulasi", emoji: "🌿", price: 25 },
  { id: "hibiscus", name: "Hibiscus", emoji: "🌺", price: 40 },
];

export const donationTiers = [
  { id: "lamp", name: "Light a Lamp", amount: 101, perk: "Your name on the lamp register for 1 day", icon: "🪔" },
  { id: "annadanam", name: "Annadanam", amount: 501, perk: "Sponsor a meal for 10 devotees", icon: "🍛" },
  { id: "brick", name: "Sacred Brick", amount: 1101, perk: "Engraved name on the temple wall", icon: "🧱" },
  { id: "kalyana", name: "Kalyana Sponsor", amount: 5001, perk: "Sponsor a Kalyanotsavam ritual in your name", icon: "💎" },
  { id: "gosamrakshana", name: "Go-Samrakshana", amount: 10001, perk: "Sponsor cow protection for one month", icon: "🐄" },
];

export const gotras = ["Bharadwaja","Kashyapa","Vasishta","Atri","Vishwamitra","Jamadagni","Gautama","Agastya","Kaundinya","Garga","Other"];

export const intentions = ["Health & longevity","Education & wisdom","Marriage & harmony","Career & prosperity","Childbirth blessings","Travel safety","Ancestral peace","Spiritual growth"];
