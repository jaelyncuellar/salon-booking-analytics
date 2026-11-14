import { useState } from "react";
import {
  Sun,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Check,
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  BarChart2,
  LogOut,
  Settings,
  Bell,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Plus,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Page = "home" | "services" | "booking" | "about" | "news" | "contact" | "admin";

// ─── Data ───────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 1,
    name: "Bronze Glow",
    tagline: "Entry level radiance",
    duration: "10 min",
    price: 18,
    description:
      "Our gentlest UV bed — perfect for building a base tan or maintaining your glow between sessions.",
    features: ["Level 1 UV bed", "Moisturising lotion included", "Cool mist fan"],
    image: "https://images.unsplash.com/photo-1532347922424-c652d9b7208e?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Golden Hour",
    tagline: "Our most popular",
    duration: "15 min",
    price: 32,
    description:
      "High-pressure UV with red-light therapy for a deeper, longer-lasting tan that develops beautifully.",
    features: ["Level 3 high-pressure", "Red-light collagen boost", "Premium tanning lotion", "Aromatherapy"],
    image: "https://images.unsplash.com/photo-1665803174244-3c2d8c6f6108?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Solar Luxe",
    tagline: "The full experience",
    duration: "20 min",
    price: 55,
    description:
      "Our flagship stand-up booth with 360° UV exposure, bronzing accelerator and audio system.",
    features: ["360° stand-up booth", "Level 5 intensity", "Luxury bronzer lotion", "Personal audio", "Cooling system"],
    image: "https://images.unsplash.com/photo-1770944661381-86054cf30749?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Spray Tan",
    tagline: "UV-free perfection",
    duration: "30 min",
    price: 45,
    description:
      "Custom spray tan blended to your skin tone by our trained therapists — streak-free and long-lasting.",
    features: ["Custom skin-tone blend", "Therapist-applied", "Organic solution", "Barrier cream & wipes", "Aftercare guide"],
    image: "https://images.unsplash.com/photo-1685979979782-759cbdd528ee?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 5,
    name: "Glow Package (aka Savings Program)",
    tagline: "Monthly membership",
    duration: "Unlimited",
    price: 89,
    description:
      "Unlimited sessions all month. Receive 40% off your first lotion — our best value offer!",
    features: ["Unlimited UV sessions L1-3", "1× spray tan/month", "10% retail discount", "Priority booking"],
    image: "https://images.unsplash.com/photo-1579060849281-b27004433868?w=600&h=400&fit=crop&auto=format",
  },
];

const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];

const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1532347922424-c652d9b7208e?w=400&h=400&fit=crop&auto=format",
    likes: 312,
    caption: "Sun-kissed and glowing ☀️ Book your Golden Hour session this weekend — slots filling fast!",
    date: "2 hours ago",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1579060849281-b27004433868?w=400&h=400&fit=crop&auto=format",
    likes: 218,
    caption: "Poolside perfection starts at Electric Sun Tanning. Our Glow Package gives you all-month access.",
    date: "1 day ago",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1665803174244-3c2d8c6f6108?w=400&h=400&fit=crop&auto=format",
    likes: 478,
    caption: "Golden hour isn't just a time of day — it's a state of being ✨ #ElectricSunTanning #GoldenGlow",
    date: "2 days ago",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1685979979782-759cbdd528ee?w=400&h=400&fit=crop&auto=format",
    likes: 156,
    caption: "Weekend vibes. Summer skin. Endless warmth 🌊 Open 7 days, 8am–8pm.",
    date: "4 days ago",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1770944661381-86054cf30749?w=400&h=400&fit=crop&auto=format",
    likes: 389,
    caption: "New: Couples Glow — two sessions, one unforgettable afternoon. Book via link in bio 💛",
    date: "5 days ago",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1770944661027-0c1d6d5bb096?w=400&h=400&fit=crop&auto=format",
    likes: 244,
    caption: "Soft light. Warm skin. That post-session feeling. Come visit us. 📍 2713 Blaine Street Suite #100 Caldwell, ID",
    date: "1 week ago",
  },
];

const TEAM = [
  {
    name: "Owner Name",
    role: "Role",
    bio: "eg - Former dermatological aesthetician with 14 years of tanning expertise. <Name> built Electric Sun Tanning around the belief that radiance should feel effortless.",
    image: "https://images.unsplash.com/photo-1532347922424-c652d9b7208e?w=300&h=360&fit=crop&auto=format",
  },
  {
    name: "Staff 1",
    role: "Senior Therapist",
    bio: "Certified spray tan artist and skin-tone specialist. Marco's custom blend technique has a 5-star rating across every platform we're on.",
    image: "https://images.unsplash.com/photo-1618591277008-1406ec3a7d52?w=300&h=360&fit=crop&auto=format",
  },
  {
    name: "Staff 2",
    role: "Client Experience Lead",
    bio: "Isla ensures every visit feels like your first — warm, personal, and completely unhurried from arrival to aftercare.",
    image: "https://images.unsplash.com/photo-1579060849281-b27004433868?w=300&h=360&fit=crop&auto=format",
  },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 8400, bookings: 142 },
  { month: "Feb", revenue: 9200, bookings: 158 },
  { month: "Mar", revenue: 12800, bookings: 210 },
  { month: "Apr", revenue: 15600, bookings: 268 },
  { month: "May", revenue: 18200, bookings: 312 },
  { month: "Jun", revenue: 22400, bookings: 378 },
];

const SERVICE_MIX = [
  { name: "Golden Hour", value: 38, color: "#9BE81E" },
  { name: "Spray Tan", value: 22, color: "#3E9C14" },
  { name: "Solar Luxe", value: 18, color: "#BFF747" },
  { name: "Glow Package", value: 14, color: "#16A34A" },
  { name: "Other", value: 8, color: "#8FAE94" },
];

const ADMIN_BOOKINGS = [
  { id: "BK-2041", client: "Sophie Laurent", service: "Golden Hour", date: "Today, 10:00 AM", status: "confirmed", amount: 32 },
  { id: "BK-2040", client: "James Whitmore", service: "Spray Tan", date: "Today, 11:30 AM", status: "confirmed", amount: 45 },
  { id: "BK-2039", client: "Nadia Osei", service: "Solar Luxe", date: "Today, 1:00 PM", status: "pending", amount: 55 },
  { id: "BK-2038", client: "Remy Castellan", service: "Bronze Glow", date: "Today, 2:00 PM", status: "confirmed", amount: 18 },
  { id: "BK-2037", client: "Elise Morrow", service: "Glow Package", date: "Yesterday, 4:00 PM", status: "completed", amount: 89 },
  { id: "BK-2036", client: "Tom Nakagawa", service: "Couples Glow", date: "Yesterday, 5:00 PM", status: "completed", amount: 78 },
  { id: "BK-2035", client: "Chloe Dubois", service: "Golden Hour", date: "Jun 17, 3:00 PM", status: "cancelled", amount: 32 },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function NavBar({ current, setPage }: { current: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const links: { label: string; page: Page }[] = [
    { label: "Services", page: "services" },
    { label: "About", page: "about" },
    { label: "News", page: "news" },
    { label: "Contact", page: "contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-3.5 shadow-lg shadow-black/25 border-b border-white/5"
      style={{ background: "rgba(6, 35, 27, 0.85)", backdropFilter: "blur(12px)" }}
    >
      <button
        onClick={() => { setPage("home"); setOpen(false); }}
        className="flex items-center gap-2.5 text-[#BFF747] font-['Shrikhand'] neon-text text-xl tracking-wide"
      >
        <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#A3E635] to-[#3E9C14] flex items-center justify-center text-[#06231B] shadow-md shadow-black/30">
          <Sun size={18} strokeWidth={2} />
        </span>
        Electric Sun Tanning
      </button>

      <nav className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <button
            key={l.page}
            onClick={() => setPage(l.page)}
            className={`text-sm tracking-widest uppercase font-['DM_Sans'] transition-colors ${
              current === l.page ? "text-[#BFF747]" : "text-[#8FAE94] hover:text-[#F2F7E6]"
            }`}
          >
            {l.label}
          </button>
        ))}
        <button
          onClick={() => setPage("booking")}
          className="px-6 py-2.5 rounded-full bg-[#3E9C14] text-[#F2F7E6] text-sm tracking-widest uppercase font-['DM_Sans'] hover:bg-[#9BE81E] shadow-md shadow-black/30 transition-all hover:-translate-y-px"
        >
          Book Now
        </button>
        <button
          onClick={() => setPage("admin")}
          className="text-sm tracking-widest uppercase font-['DM_Sans'] text-[#55705A] hover:text-[#8FAE94] transition-colors"
        >
          Admin
        </button>
      </nav>

      <button
        className="md:hidden text-[#BFF747]"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 flex flex-col gap-0 font-['DM_Sans']"
          style={{ background: "rgba(6, 35, 27, 0.97)" }}
        >
          {[...links, { label: "Admin", page: "admin" as Page }].map((l) => (
            <button
              key={l.page}
              onClick={() => { setPage(l.page); setOpen(false); }}
              className="px-6 py-4 text-left text-sm tracking-widest uppercase text-[#8FAE94] border-b border-[rgba(163,230,53,0.15)] hover:text-[#BFF747]"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { setPage("booking"); setOpen(false); }}
            className="mx-6 my-4 py-3 rounded-full bg-[#3E9C14] text-[#F2F7E6] text-sm tracking-widest uppercase hover:bg-[#9BE81E] transition-colors"
          >
            Book Now
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Pages ──────────────────────────────────────────────────────────────────

function MarqueeStrip() {
  const phrases = [
    "Walk-ins welcome",
    "Caldwell, Idaho",
    "UV · Spray · Red Light",
    "Open 7 days",
    "Good vibes only",
    "Treasure Valley glow",
  ];
  return (
    <section className="bg-[#06231B] py-8 overflow-hidden" aria-hidden="true">
      <div className="-rotate-1 w-[110%] -ml-[5%] bg-[#BFF747] shadow-[0_0_36px_rgba(163,230,53,0.35)]">
        <div className="flex whitespace-nowrap animate-marquee py-2.5 w-max">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center">
              {[...phrases, ...phrases].map((ph, i) => (
                <span
                  key={`${half}-${i}`}
                  className="flex items-center gap-6 pr-6 text-[#06231B] font-['DM_Sans'] text-sm font-semibold tracking-[0.25em] uppercase"
                >
                  {ph} <Sun size={14} strokeWidth={2.5} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-end pb-24 overflow-hidden bg-[#06231B]">
        <img
          src="https://images.unsplash.com/photo-1532347922424-c652d9b7208e?w=1600&h=1000&fit=crop&auto=format"
          alt="Woman by poolside, sun-kissed and glowing"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-55"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(6,35,27,0.95) 0%, rgba(6,35,27,0.2) 60%, transparent 100%)" }}
        />
        <div className="hidden md:block absolute right-10 top-28 z-10 rotate-6 rounded-full bg-[#BFF747] text-[#06231B] font-['Caveat'] font-bold text-2xl px-6 py-2 shadow-[0_0_32px_rgba(163,230,53,0.45)] -rotate-3">
          walk-ins welcome!
        </div>
        <div className="relative z-10 px-6 md:px-20 max-w-5xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(163,230,53,0.4)] bg-white/5 backdrop-blur px-4 py-1.5 text-[#BFF747] text-[11px] tracking-[0.3em] uppercase font-['DM_Sans'] mb-7">
            <Sun size={12} /> Award Winning Tanning Studio · Est. 2004
          </p>
          <h1 className="font-['Shrikhand'] text-[#F2F7E6] text-5xl md:text-8xl font-bold italic leading-none mb-6">
            Glow like<br />
            <span className="text-[#BFF747] neon-text">golden hour.</span>
          </h1>
          <p className="text-[#8FAE94] font-['DM_Sans'] text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            UV beds + spray tans, right here in Caldwell. Come as you are, leave glowing — no beach, no filter, no fuss.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setPage("booking")}
              className="px-8 py-4 rounded-full bg-[#3E9C14] text-[#F2F7E6] text-sm tracking-widest uppercase font-['DM_Sans'] hover:bg-[#9BE81E] shadow-xl shadow-black/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Book a Session <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setPage("services")}
              className="px-8 py-4 rounded-full border border-[rgba(163,230,53,0.5)] text-[#BFF747] text-sm tracking-widest uppercase font-['DM_Sans'] hover:border-[#BFF747] hover:bg-white/5 backdrop-blur transition-all flex items-center justify-center"
            >
              View Services
            </button>
          </div>
          <p className="font-['Caveat'] font-semibold text-3xl text-[#BFF747] -rotate-2 mt-9 origin-left">
            good vibes, great color — that's the whole business plan ☀
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[#06231B] border-t border-[rgba(163,230,53,0.2)]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[rgba(163,230,53,0.15)]">
          {[
            { num: "22+", label: "Years open" },
            // EDIT 
            { num: "12K+", label: "Sessions delivered" }, 
            { num: "4.8★", label: "Average rating" },
            // EDIT 
            { num: "6", label: "Unique services" },
          ].map((s) => (
            <div key={s.label} className="py-8 px-6 text-center">
              <div className="font-['Shrikhand'] text-3xl text-[#BFF747] mb-1">{s.num}</div>
              <div className="font-['DM_Sans'] text-xs tracking-widest uppercase text-[#55705A]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <MarqueeStrip />

      {/* Services teaser */}
      {/* EDIT -- this if advertising/selling single beds */} 
      <section className="bg-[#F2F7E6] py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <p className="text-[#3E9C14] text-xs tracking-[0.35em] uppercase font-['DM_Sans'] mb-3">What we offer</p>
              <h2 className="font-['Shrikhand'] text-4xl md:text-5xl text-[#06231B] italic">
                Pick your glow.
              </h2>
            </div>
            <p className="font-['Caveat'] font-semibold text-3xl text-[#3E9C14] -rotate-2 self-start md:self-auto origin-left">
              yes, the spray tan really is streak-free →
            </p>
            <button
              onClick={() => setPage("services")}
              className="self-start md:self-auto flex items-center gap-2 text-[#3E9C14] text-sm tracking-widest uppercase font-['DM_Sans'] hover:gap-4 transition-all"
            >
              All services <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((s, i) => (
              <div key={s.id} className={`bg-[#FBFDF4] rounded-3xl p-6 shadow-sm ring-1 ring-[#3E9C14]/10 hover:shadow-xl hover:-translate-y-1 hover:rotate-0 transition-all duration-300 group overflow-hidden ${i % 2 === 0 ? "md:-rotate-[0.6deg]" : "md:rotate-[0.6deg]"}`}>
                <div className="h-44 mb-6 overflow-hidden rounded-2xl bg-[#D9EDBE]">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-[#3E9C14] text-xs tracking-widest uppercase font-['DM_Sans'] mb-2">{s.tagline}</p>
                <h3 className="font-['Shrikhand'] text-2xl text-[#06231B] italic mb-3">{s.name}</h3>
                <p className="text-[#55705A] font-['DM_Sans'] text-sm leading-relaxed mb-4">{s.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-['Shrikhand'] text-2xl text-[#3E9C14]">${s.price}</span>
                  <span className="text-[#8FAE94] font-['DM_Sans'] text-xs">{s.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#06231B] py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#9BE81E] text-xs tracking-[0.35em] uppercase font-['DM_Sans'] mb-3 text-center">What our clients say</p>
          <h2 className="font-['Shrikhand'] text-4xl text-[#F2F7E6] italic text-center mb-16">
            Glowing reviews.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sophie L.", rating: 5, text: "The Golden Hour session is absolutely transformative. I walk out looking like I've just returned from two weeks in Ibiza. Won't go anywhere else." },
              { name: "James W.", rating: 5, text: "Spray tan is flawless — no streaks, no orange, just the most natural colour I've ever had. Marco is an artist." },
              { name: "Elise M.", rating: 5, text: "The Glow Package pays for itself after two visits. Plus the studio is stunning. Feels like a luxury spa, not a tanning salon." },
            ].map((t) => (
              <div key={t.name} className="border border-[rgba(163,230,53,0.2)] bg-white/[0.03] rounded-3xl p-8 hover:border-[rgba(163,230,53,0.45)] hover:bg-white/[0.05] transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#BFF747" stroke="none" />
                  ))}
                </div>
                <p className="text-[#8FAE94] font-['DM_Sans'] text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <p className="text-[#BFF747] font-['Shrikhand'] text-lg">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="relative py-32 px-6 md:px-20 overflow-hidden bg-[#3E9C14]"
        style={{ background: "linear-gradient(135deg, #16A34A 0%, #4ADE80 50%, #A3E635 100%)" }}
      >
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="font-['Shrikhand'] text-4xl md:text-6xl text-[#06231B] italic font-bold mb-6">
            Ready to radiate?
          </h2>
          <p className="text-[#07301F] font-['DM_Sans'] mb-4 text-lg">
            Your perfect tan is one booking away. Sessions available 7 days a week.
          </p>
          <p className="font-['Caveat'] font-bold text-3xl text-[#07301F] rotate-2 mb-8">
            you know you want to ☀
          </p>
          <button
            onClick={() => setPage("booking")}
            className="px-10 py-4 rounded-full bg-[#06231B] text-[#BFF747] text-sm tracking-widest uppercase font-['DM_Sans'] hover:bg-[#0D4430] shadow-xl shadow-black/25 transition-all hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
          >
            Book Now <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#031A12] py-16 px-6 md:px-20 border-t border-[rgba(163,230,53,0.15)]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 text-[#BFF747] font-['Shrikhand'] italic text-xl mb-4">
              <Sun size={18} strokeWidth={1.5} /> Electric Sun Tanning
            </div>
            <p className="text-[#55705A] font-['DM_Sans'] text-sm leading-relaxed">
              Your neighborhood glow spot in Caldwell, Idaho. Good vibes, great color, zero fuss.
            </p>
          </div>
          <div>
            <p className="text-[#BFF747] font-['DM_Sans'] text-xs tracking-widest uppercase mb-4">Studio</p>
            <div className="flex flex-col gap-2">
              {["Services", "About Us", "News", "Contact"].map((l) => (
                <span key={l} className="text-[#55705A] font-['DM_Sans'] text-sm hover:text-[#8FAE94] cursor-pointer transition-colors">{l}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#BFF747] font-['DM_Sans'] text-xs tracking-widest uppercase mb-4">Hours</p>
            <div className="text-[#55705A] font-['DM_Sans'] text-sm space-y-1">
              <p>Mon–Fri: 9:00 AM – 8:00 PM</p>
              <p>Saturday: 10:00 AM – 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          <div>
            <p className="text-[#BFF747] font-['DM_Sans'] text-xs tracking-widest uppercase mb-4">Find Us</p>
            <div className="text-[#55705A] font-['DM_Sans'] text-sm space-y-2">
              <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" />2713 Blaine Street Suite #100, Caldwell, Idaho 83605</p>
              <p className="flex items-center gap-2"><Phone size={14} /> +1 (208) 459-6565</p>
              <p className="flex items-center gap-2"><Mail size={14} /> hello@electricsuntanning.com</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[rgba(163,230,53,0.1)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6FA287] font-['DM_Sans'] text-xs">© 2026 Electric Sun tanning. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-[#6FA287] hover:text-[#BFF747] transition-colors"><Instagram size={16} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServicesPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-[#F2F7E6]">
      {/* Header */}
      <div className="bg-[#06231B] pt-32 pb-20 px-6 md:px-20">
        <div className="max-w-3xl">
          <p className="text-[#9BE81E] text-xs tracking-[0.35em] uppercase font-['DM_Sans'] mb-4">What we offer</p>
          <h1 className="font-['Shrikhand'] text-5xl md:text-7xl text-[#F2F7E6] italic font-bold leading-tight">
            Every shade<br />of glow.
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-20 py-20">
        <p className="font-['Caveat'] font-semibold text-3xl text-[#3E9C14] -rotate-1 mb-10 origin-left">
          the good stuff's all below ↓ no upsell, promise
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((s, i) => (
            <div key={s.id} className={`bg-[#FBFDF4] rounded-3xl overflow-hidden shadow-sm ring-1 ring-[#3E9C14]/10 hover:shadow-xl hover:rotate-0 transition-all duration-300 group ${i % 2 === 0 ? "md:-rotate-[0.5deg]" : "md:rotate-[0.5deg]"}`}>
              <div className="h-56 overflow-hidden bg-[#D9EDBE]">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[#3E9C14] text-xs tracking-widest uppercase font-['DM_Sans'] mb-1">{s.tagline}</p>
                    <h3 className="font-['Shrikhand'] text-3xl text-[#06231B] italic">{s.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="font-['Shrikhand'] text-3xl text-[#3E9C14]">${s.price}</div>
                    <div className="text-[#8FAE94] font-['DM_Sans'] text-xs">{s.duration}</div>
                  </div>
                </div>
                <p className="text-[#55705A] font-['DM_Sans'] text-sm leading-relaxed mb-6">{s.description}</p>
                <ul className="space-y-2 mb-8">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[#06231B] font-['DM_Sans'] text-sm">
                      <Check size={14} className="text-[#3E9C14] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setPage("booking")}
                  className="w-full py-3.5 rounded-full bg-[#06231B] text-[#BFF747] text-xs tracking-widest uppercase font-['DM_Sans'] hover:bg-[#3E9C14] hover:text-[#F2F7E6] transition-all"
                >
                  Book {s.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookingPage() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<typeof SERVICES[0] | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleConfirm = () => {
    if (!form.name || !form.email) return;
    setConfirmed(true);
    setStep(4);
  };

  if (confirmed && step === 4) {
    return (
      <div className="min-h-screen bg-[#06231B] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#3E9C14] flex items-center justify-center mx-auto mb-8">
            <Check size={32} className="text-[#F2F7E6]" />
          </div>
          <p className="text-[#9BE81E] text-xs tracking-[0.35em] uppercase font-['DM_Sans'] mb-4">Booking confirmed</p>
          <h2 className="font-['Shrikhand'] text-5xl text-[#F2F7E6] italic mb-6">
            See you soon, {form.name.split(" ")[0]}.
          </h2>
          <div className="border border-[rgba(163,230,53,0.25)] rounded-3xl bg-white/[0.03] p-6 mb-8 text-left space-y-3">
            <p className="text-[#8FAE94] font-['DM_Sans'] text-sm flex justify-between">
              <span className="text-[#55705A]">Service</span> {selected?.name}
            </p>
            <p className="text-[#8FAE94] font-['DM_Sans'] text-sm flex justify-between">
              <span className="text-[#55705A]">Date</span> {date}
            </p>
            <p className="text-[#8FAE94] font-['DM_Sans'] text-sm flex justify-between">
              <span className="text-[#55705A]">Time</span> {time}
            </p>
            <p className="text-[#8FAE94] font-['DM_Sans'] text-sm flex justify-between border-t border-[rgba(163,230,53,0.2)] pt-3">
              <span className="text-[#55705A]">Total</span>
              <span className="text-[#BFF747] font-['Shrikhand'] text-lg">${selected?.price}</span>
            </p>
          </div>
          <p className="text-[#55705A] font-['DM_Sans'] text-sm mb-8">
            {/* EDIT - CHANGE THE FORMAT FOR THE DATE */}
            A confirmation has been sent to {form.email}. We look forward to seeing you at {time} on {date}.
          </p>
          <button
            onClick={() => { setStep(1); setSelected(null); setDate(""); setTime(""); setForm({ name: "", email: "", phone: "", notes: "" }); setConfirmed(false); }}
            className="px-8 py-3 rounded-full border border-[rgba(163,230,53,0.4)] text-[#BFF747] text-xs tracking-widest uppercase font-['DM_Sans'] hover:border-[#BFF747] hover:bg-white/5 transition-all"
          >
            Book another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F7E6]">
      <div className="bg-[#06231B] pt-32 pb-16 px-6 md:px-20">
        <p className="text-[#9BE81E] text-xs tracking-[0.35em] uppercase font-['DM_Sans'] mb-4">Reserve your session</p>
        <h1 className="font-['Shrikhand'] text-5xl text-[#F2F7E6] italic">Book your glow.</h1>
      </div>

      {/* Step indicator */}
      <div className="bg-[#06231B] border-t border-[rgba(163,230,53,0.15)] px-6 md:px-20 pb-8">
        <div className="flex gap-8 max-w-xl">
          {["Choose Service", "Date & Time", "Your Details"].map((label, i) => (
            <button
              key={label}
              onClick={() => i + 1 < step && setStep(i + 1)}
              className={`flex items-center gap-2 font-['DM_Sans'] text-xs tracking-widest uppercase transition-colors ${
                step === i + 1 ? "text-[#BFF747]" : step > i + 1 ? "text-[#55705A] cursor-pointer hover:text-[#8FAE94]" : "text-[#6FA287]"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] border ${
                  step > i + 1
                    ? "border-[#3E9C14] bg-[#3E9C14] text-[#F2F7E6]"
                    : step === i + 1
                    ? "border-[#BFF747] text-[#BFF747]"
                    : "border-[#6FA287] text-[#6FA287]"
                }`}
              >
                {step > i + 1 ? <Check size={10} /> : i + 1}
              </span>
              <span className="hidden sm:block">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-20 py-12">
        {/* Step 1: Choose service */}
        {step === 1 && (
          <div>
            <h2 className="font-['Shrikhand'] text-3xl text-[#06231B] italic mb-8">Select a service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSelected(s); setStep(2); }}
                  className={`text-left p-6 rounded-3xl border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                    selected?.id === s.id
                      ? "border-[#3E9C14] bg-[#FBFDF4] ring-2 ring-[#3E9C14]/30"
                      : "border-[rgba(62,156,20,0.2)] bg-[#FBFDF4] hover:border-[#3E9C14]"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-[#3E9C14] text-xs tracking-widest uppercase font-['DM_Sans'] mb-1">{s.tagline}</p>
                      <h3 className="font-['Shrikhand'] text-xl text-[#06231B] italic">{s.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="font-['Shrikhand'] text-2xl text-[#3E9C14]">${s.price}</div>
                      <div className="text-[#8FAE94] font-['DM_Sans'] text-xs">{s.duration}</div>
                    </div>
                  </div>
                  <p className="text-[#55705A] font-['DM_Sans'] text-sm leading-relaxed">{s.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div>
            <h2 className="font-['Shrikhand'] text-3xl text-[#06231B] italic mb-2">Choose a date & time</h2>
            <p className="text-[#55705A] font-['DM_Sans'] text-sm mb-8">
              Booking: <span className="text-[#3E9C14]">{selected?.name}</span> — ${selected?.price}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[#06231B] font-['DM_Sans'] text-xs tracking-widest uppercase mb-3">Date</label>
                <input
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#FBFDF4] border border-[rgba(62,156,20,0.3)] rounded-xl px-4 py-3 font-['DM_Sans'] text-[#06231B] focus:outline-none focus:border-[#3E9C14] focus:ring-2 focus:ring-[#3E9C14]/25 transition-shadow"
                />
              </div>
              <div>
                <label className="block text-[#06231B] font-['DM_Sans'] text-xs tracking-widest uppercase mb-3">Available Times</label>
                <div className="grid grid-cols-2 gap-2">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`py-2.5 px-4 rounded-full border text-sm font-['DM_Sans'] transition-all ${
                        time === t
                          ? "border-[#3E9C14] bg-[#3E9C14] text-[#F2F7E6]"
                          : "border-[rgba(62,156,20,0.3)] text-[#06231B] hover:border-[#3E9C14]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-10">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(62,156,20,0.3)] text-[#55705A] text-xs tracking-widest uppercase font-['DM_Sans'] hover:border-[#3E9C14] transition-colors">
                <ChevronLeft size={14} /> Back
              </button>
              <button
                onClick={() => date && time && setStep(3)}
                disabled={!date || !time}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#3E9C14] text-[#F2F7E6] text-xs tracking-widest uppercase font-['DM_Sans'] hover:bg-[#9BE81E] shadow-md shadow-[#3E9C14]/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div>
            <h2 className="font-['Shrikhand'] text-3xl text-[#06231B] italic mb-2">Your details</h2>
            <p className="text-[#55705A] font-['DM_Sans'] text-sm mb-8">
              {selected?.name} · {date} · {time}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {[
                { key: "name", label: "Full Name", type: "text", placeholder: "Aurelie Fontaine" },
                { key: "email", label: "Email Address", type: "email", placeholder: "hello@example.com" },
                { key: "phone", label: "Phone (optional)", type: "tel", placeholder: "+1 (555) 000-0000" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-[#06231B] font-['DM_Sans'] text-xs tracking-widest uppercase mb-2">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full bg-[#FBFDF4] border border-[rgba(62,156,20,0.3)] rounded-xl px-4 py-3 font-['DM_Sans'] text-[#06231B] placeholder:text-[#8FAE94] focus:outline-none focus:border-[#3E9C14] focus:ring-2 focus:ring-[#3E9C14]/25 transition-shadow"
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-[#06231B] font-['DM_Sans'] text-xs tracking-widest uppercase mb-2">Notes (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Any skin sensitivities, preferences, or questions..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-[#FBFDF4] border border-[rgba(62,156,20,0.3)] rounded-xl px-4 py-3 font-['DM_Sans'] text-[#06231B] placeholder:text-[#8FAE94] focus:outline-none focus:border-[#3E9C14] focus:ring-2 focus:ring-[#3E9C14]/25 transition-shadow resize-none"
                />
              </div>
            </div>

            {/* Order summary */}
            <div className="border-2 border-dashed border-[rgba(62,156,20,0.4)] rounded-3xl shadow-sm p-6 mb-8 bg-[#FBFDF4]">
              <p className="text-[#3E9C14] text-xs tracking-widest uppercase font-['DM_Sans'] mb-4">Order Summary</p>
              <div className="space-y-2 text-sm font-['DM_Sans']">
                <div className="flex justify-between text-[#55705A]"><span>Service</span><span className="text-[#06231B]">{selected?.name}</span></div>
                <div className="flex justify-between text-[#55705A]"><span>Date</span><span className="text-[#06231B]">{date}</span></div>
                <div className="flex justify-between text-[#55705A]"><span>Time</span><span className="text-[#06231B]">{time}</span></div>
                <div className="flex justify-between border-t border-[rgba(62,156,20,0.2)] pt-3 mt-3">
                  <span className="text-[#55705A]">Total</span>
                  <span className="font-['Shrikhand'] text-2xl text-[#3E9C14]">${selected?.price}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(62,156,20,0.3)] text-[#55705A] text-xs tracking-widest uppercase font-['DM_Sans'] hover:border-[#3E9C14] transition-colors">
                <ChevronLeft size={14} /> Back
              </button>
              <button
                onClick={handleConfirm}
                disabled={!form.name || !form.email}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#3E9C14] text-[#F2F7E6] text-xs tracking-widest uppercase font-['DM_Sans'] hover:bg-[#9BE81E] shadow-md shadow-[#3E9C14]/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirm Booking <Check size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F2F7E6]">
      <div className="bg-[#06231B] pt-32 pb-20 px-6 md:px-20">
        <div className="max-w-4xl">
          <p className="text-[#9BE81E] text-xs tracking-[0.35em] uppercase font-['DM_Sans'] mb-4">Our story</p>
          <h1 className="font-['Shrikhand'] text-5xl md:text-7xl text-[#F2F7E6] italic font-bold leading-tight mb-8">
            Born from a<br />love of light.
          </h1>
          <p className="text-[#8FAE94] font-['DM_Sans'] text-lg max-w-2xl leading-relaxed">
            Electric Sun Tanning was founded in 2004. The current owner, NAME-EDIT, has been serving clients since September 2014. NAME-EDIT believes the tanning salon experience deserved the same care and intentionality as a five-star spa.
          </p>
        </div>
      </div>

      {/* Story section */}
      <section className="py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#3E9C14] text-xs tracking-[0.35em] uppercase font-['DM_Sans'] mb-6">Our philosophy</p>
            <h2 className="font-['Shrikhand'] text-4xl text-[#06231B] italic mb-6">
              Radiance that respects your skin.
            </h2>
            <div className="space-y-4 text-[#55705A] font-['DM_Sans'] text-sm leading-relaxed">
              <p>
                Too many tanning studios treat the session as a transaction. At Electric Sun Tanning, we take the time to understand your skin type, history, and goals — then build a personalised plan that gets you glowing safely and sustainably.
              </p>
              <p>
                Every product we carry is dermatologist-reviewed and every bed is calibrated weekly. We were the first studio in the city to introduce red-light therapy alongside UV tanning, a combination that has transformed our clients' results.
              </p>
              <p>
                We are women-founded, independently owned, and obsessively focused on the details that make the difference — from the scent you smell when you walk in, to the aftercare sachets you take home.
              </p>
            </div>
          </div>
          <div className="relative h-[480px] bg-[#D9EDBE] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1761470575018-135c213340eb?w=700&h=500&fit=crop&auto=format"
              alt="Warm, amber-lit studio interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-[#06231B] px-6 py-4">
              <p className="text-[#BFF747] font-['Shrikhand'] text-2xl italic">14 years</p>
              <p className="text-[#55705A] font-['DM_Sans'] text-xs tracking-widest uppercase">of radiance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#06231B] py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#9BE81E] text-xs tracking-[0.35em] uppercase font-['DM_Sans'] mb-4 text-center">What we stand for</p>
          <h2 className="font-['Shrikhand'] text-4xl text-[#F2F7E6] italic text-center mb-16">Our values.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(163,230,53,0.15)]">
            {[
              { title: "Skin-first always", body: "We never push for more UV exposure than your skin needs. Our therapists are trained to guide you, not just sell you sessions." },
              { title: "Quality over quantity", body: "Six services, all exceptional. We resist the urge to offer everything and instead perfect what we do." },
              { title: "A space to feel good in", body: "The music, the lighting, the scent — every detail of the studio is considered so you feel the effect before you even step under the lamp." },
            ].map((v) => (
              <div key={v.title} className="bg-[#06231B] p-10">
                <div className="w-8 h-px bg-[#3E9C14] mb-6" />
                <h3 className="font-['Shrikhand'] text-2xl text-[#F2F7E6] italic mb-4">{v.title}</h3>
                <p className="text-[#55705A] font-['DM_Sans'] text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#3E9C14] text-xs tracking-[0.35em] uppercase font-['DM_Sans'] mb-4">The people</p>
          <h2 className="font-['Shrikhand'] text-4xl text-[#06231B] italic mb-16">Meet the team.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.name}>
                <div className="h-72 bg-[#D9EDBE] overflow-hidden mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="text-[#3E9C14] text-xs tracking-widest uppercase font-['DM_Sans'] mb-1">{member.role}</p>
                <h3 className="font-['Shrikhand'] text-2xl text-[#06231B] italic mb-3">{member.name}</h3>
                <p className="text-[#55705A] font-['DM_Sans'] text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function NewsPage() {
  const [activePost, setActivePost] = useState<typeof INSTAGRAM_POSTS[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#F2F7E6]">
      <div className="bg-[#06231B] pt-32 pb-20 px-6 md:px-20">
        <div className="flex items-end justify-between max-w-4xl">
          <div>
            <p className="text-[#9BE81E] text-xs tracking-[0.35em] uppercase font-['DM_Sans'] mb-4">From our feed</p>
            <h1 className="font-['Shrikhand'] text-5xl md:text-7xl text-[#F2F7E6] italic font-bold leading-tight">
              Studio news &<br />inspiration.
            </h1>
          </div>
          <a
            href="https://www.instagram.com/electricsuncaldwell/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-[#8FAE94] font-['DM_Sans'] text-xs tracking-widest uppercase hover:text-[#BFF747] transition-colors"
          >
            <Instagram size={16} /> @electricsuncaldwell
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-20 py-16">
        {/* Featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="bg-[#F2F7E6] relative overflow-hidden rounded-3xl h-[420px] group cursor-pointer shadow-sm" onClick={() => setActivePost(INSTAGRAM_POSTS[0])}>
            <img src={INSTAGRAM_POSTS[0].image} alt={INSTAGRAM_POSTS[0].caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,35,27,0.85)] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-2 mb-3">
                <Instagram size={14} className="text-[#BFF747]" />
                <span className="text-[#8FAE94] font-['DM_Sans'] text-xs">{INSTAGRAM_POSTS[0].date}</span>
              </div>
              <p className="text-[#F2F7E6] font-['DM_Sans'] text-sm leading-relaxed line-clamp-3">{INSTAGRAM_POSTS[0].caption}</p>
              <p className="text-[#55705A] font-['DM_Sans'] text-xs mt-2">♥ {INSTAGRAM_POSTS[0].likes}</p>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-5">
            {INSTAGRAM_POSTS.slice(1, 3).map((post) => (
              <div key={post.id} className="bg-[#F2F7E6] relative overflow-hidden rounded-3xl h-[209px] group cursor-pointer shadow-sm" onClick={() => setActivePost(post)}>
                <img src={post.image} alt={post.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,35,27,0.85)] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Instagram size={12} className="text-[#BFF747]" />
                    <span className="text-[#8FAE94] font-['DM_Sans'] text-xs">{post.date}</span>
                  </div>
                  <p className="text-[#F2F7E6] font-['DM_Sans'] text-xs leading-relaxed line-clamp-2">{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-px bg-[#D9EDBE]">
          {INSTAGRAM_POSTS.slice(3).map((post) => (
            <div key={post.id} className="bg-[#F2F7E6] relative overflow-hidden aspect-square group cursor-pointer" onClick={() => setActivePost(post)}>
              <img src={post.image} alt={post.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-[rgba(6,35,27,0)] group-hover:bg-[rgba(6,35,27,0.5)] transition-colors flex items-center justify-center">
                <p className="text-[#F2F7E6] font-['DM_Sans'] text-xs opacity-0 group-hover:opacity-100 transition-opacity px-4 text-center">♥ {post.likes}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/electricsuncaldwell/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[rgba(62,156,20,0.4)] text-[#3E9C14] text-xs tracking-widest uppercase font-['DM_Sans'] hover:border-[#3E9C14] transition-colors"
          >
            <Instagram size={14} /> Follow on Instagram
          </a>
        </div>
      </div>

      {/* Post modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.85)] p-6" onClick={() => setActivePost(null)}>
          <div className="bg-[#06231B] max-w-lg w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-square overflow-hidden">
              <img src={activePost.image} alt={activePost.caption} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#3E9C14] flex items-center justify-center">
                  <Sun size={14} className="text-[#F2F7E6]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[#BFF747] font-['DM_Sans'] text-sm font-medium">@electricsuntanning</p>
                  <p className="text-[#55705A] font-['DM_Sans'] text-xs">{activePost.date}</p>
                </div>
              </div>
              <p className="text-[#8FAE94] font-['DM_Sans'] text-sm leading-relaxed mb-4">{activePost.caption}</p>
              <p className="text-[#55705A] font-['DM_Sans'] text-xs">♥ {activePost.likes} likes</p>
            </div>
            <button onClick={() => setActivePost(null)} className="absolute top-4 right-4 text-[#F2F7E6] bg-[rgba(0,0,0,0.5)] rounded-full p-1">
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <div className="min-h-screen bg-[#F2F7E6]">
      <div className="bg-[#06231B] pt-32 pb-20 px-6 md:px-20">
        <p className="text-[#9BE81E] text-xs tracking-[0.35em] uppercase font-['DM_Sans'] mb-4">Get in touch</p>
        <h1 className="font-['Shrikhand'] text-5xl md:text-7xl text-[#F2F7E6] italic font-bold leading-tight">
          Come<br />say hi.
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-20 py-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          <h2 className="font-['Shrikhand'] text-3xl text-[#06231B] italic mb-8">Send a message.</h2>
          {sent ? (
            <div className="border border-[rgba(62,156,20,0.2)] p-8 bg-[#FBFDF4]">
              <Check size={24} className="text-[#3E9C14] mb-4" />
              <h3 className="font-['Shrikhand'] text-2xl text-[#06231B] italic mb-2">Message received.</h3>
              <p className="text-[#55705A] font-['DM_Sans'] text-sm">
                Thank you, {form.name.split(" ")[0]}. We typically respond within 4 hours during studio hours.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {[
                { key: "name", label: "Full Name", type: "text", placeholder: "Aurelie Fontaine" },
                { key: "email", label: "Email", type: "email", placeholder: "hello@example.com" },
                { key: "subject", label: "Subject", type: "text", placeholder: "Question about the Glow Package" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-[#06231B] font-['DM_Sans'] text-xs tracking-widest uppercase mb-2">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full bg-[#FBFDF4] border border-[rgba(62,156,20,0.3)] rounded-xl px-4 py-3 font-['DM_Sans'] text-[#06231B] placeholder:text-[#8FAE94] focus:outline-none focus:border-[#3E9C14] focus:ring-2 focus:ring-[#3E9C14]/25 transition-shadow"
                  />
                </div>
              ))}
              <div>
                <label className="block text-[#06231B] font-['DM_Sans'] text-xs tracking-widest uppercase mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#FBFDF4] border border-[rgba(62,156,20,0.3)] rounded-xl px-4 py-3 font-['DM_Sans'] text-[#06231B] placeholder:text-[#8FAE94] focus:outline-none focus:border-[#3E9C14] focus:ring-2 focus:ring-[#3E9C14]/25 transition-shadow resize-none"
                />
              </div>
              <button
                onClick={() => { if (form.name && form.email && form.message) setSent(true); }}
                disabled={!form.name || !form.email || !form.message}
                className="w-full py-4 bg-[#3E9C14] text-[#F2F7E6] text-xs tracking-widest uppercase font-['DM_Sans'] hover:bg-[#9BE81E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h2 className="font-['Shrikhand'] text-3xl text-[#06231B] italic mb-8">Visit us.</h2>
          <div className="space-y-6 mb-10">
            {[
              { icon: <MapPin size={16} />, label: "Address", value: "2713 Blaine Street Suite #100, Caldwell ID 83605" },
              { icon: <Phone size={16} />, label: "Phone", value: "+1 (208) 459-6565" },
              { icon: <Mail size={16} />, label: "Email", value: "hello@electricsuntanning.com" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-10 h-10 border border-[rgba(62,156,20,0.3)] flex items-center justify-center text-[#3E9C14] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[#3E9C14] font-['DM_Sans'] text-xs tracking-widest uppercase mb-1">{item.label}</p>
                  <p className="text-[#06231B] font-['DM_Sans'] text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-[rgba(62,156,20,0.2)] p-6 bg-[#FBFDF4] mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={14} className="text-[#3E9C14]" />
              <p className="text-[#3E9C14] font-['DM_Sans'] text-xs tracking-widest uppercase">Studio Hours</p>
            </div>
            <div className="space-y-2 font-['DM_Sans'] text-sm">
              {[
                { day: "Monday – Friday", hours: "8:00 AM – 8:00 PM" },
                { day: "Saturday", hours: "9:00 AM – 7:00 PM" },
                { day: "Sunday", hours: "10:00 AM – 6:00 PM" },
              ].map((h) => (
                <div key={h.day} className="flex justify-between text-[#55705A]">
                  <span>{h.day}</span>
                  <span className="text-[#06231B]">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="h-48 bg-[#06231B] relative overflow-hidden flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle at 50% 50%, #9BE81E 0%, transparent 70%)",
              }}
            />
            <div className="text-center z-10">
              <MapPin size={24} className="text-[#BFF747] mx-auto mb-2" />
              <p className="text-[#8FAE94] font-['DM_Sans'] text-xs tracking-widest uppercase">2713 Blaine Street Suite #100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = ADMIN_BOOKINGS.filter((b) => {
    const matchSearch = b.client.toLowerCase().includes(searchTerm.toLowerCase()) || b.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusColor: Record<string, string> = {
    confirmed: "text-[#4ADE80] bg-[rgba(74,222,128,0.12)]",
    pending: "text-[#4ADE80] bg-[rgba(74,222,128,0.12)]",
    completed: "text-[#55705A] bg-[rgba(85,112,90,0.12)]",
    cancelled: "text-[#D64545] bg-[rgba(214,69,69,0.1)]",
  };

  return (
    <div className="min-h-screen bg-[#031A12] flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-[#06231B] border-r border-[rgba(163,230,53,0.15)] hidden md:flex flex-col">
        <div className="px-6 py-6 border-b border-[rgba(163,230,53,0.15)]">
          <div className="flex items-center gap-2 text-[#BFF747] font-['Shrikhand'] italic text-lg">
            <Sun size={16} strokeWidth={1.5} />Electric Sun Tanning
          </div>
          <p className="text-[#6FA287] font-['DM_Mono'] text-xs mt-1">Admin Console</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { icon: <BarChart2 size={15} />, label: "Dashboard" },
            { icon: <Calendar size={15} />, label: "Bookings", active: true },
            { icon: <Users size={15} />, label: "Clients" },
            { icon: <Settings size={15} />, label: "Services" },
            { icon: <Bell size={15} />, label: "Notifications" },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs tracking-widest uppercase font-['DM_Sans'] transition-colors ${
                item.active
                  ? "bg-[rgba(163,230,53,0.15)] text-[#BFF747]"
                  : "text-[#55705A] hover:text-[#8FAE94] hover:bg-[rgba(163,230,53,0.07)]"
              } rounded-xl`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-[rgba(163,230,53,0.15)]">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs tracking-widest uppercase font-['DM_Sans'] text-[#6FA287] hover:text-[#55705A] transition-colors">
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-[#06231B] border-b border-[rgba(163,230,53,0.15)] px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-['Shrikhand'] text-xl text-[#F2F7E6] neon-text">Dashboard</h1>
            <p className="text-[#6FA287] font-['DM_Mono'] text-xs">Thursday, 19 June 2026</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#55705A] hover:text-[#8FAE94] transition-colors"><Bell size={18} /></button>
            <div className="w-8 h-8 rounded-full bg-[#3E9C14] flex items-center justify-center text-[#F2F7E6] font-['DM_Sans'] text-xs">AF</div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* KPI cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <DollarSign size={18} />, label: "Revenue MTD", value: "$22,400", delta: "+23%", positive: true },
              { icon: <Calendar size={18} />, label: "Bookings Today", value: "14", delta: "+3 vs yesterday", positive: true },
              { icon: <Users size={18} />, label: "Active Members", value: "87", delta: "+12 this month", positive: true },
              { icon: <TrendingUp size={18} />, label: "Avg. Session Value", value: "$42.80", delta: "+$3.20", positive: true },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-[#06231B] border border-[rgba(163,230,53,0.15)] rounded-2xl p-5 hover:border-[rgba(163,230,53,0.35)] transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[#55705A] font-['DM_Sans'] text-xs tracking-widest uppercase">{kpi.label}</p>
                  <span className="text-[#3E9C14]">{kpi.icon}</span>
                </div>
                <p className="font-['Shrikhand'] text-3xl text-[#F2F7E6] mb-1">{kpi.value}</p>
                <p className={`font-['DM_Mono'] text-xs ${kpi.positive ? "text-[#4ADE80]" : "text-[#D64545]"}`}>{kpi.delta}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-[#06231B] border border-[rgba(163,230,53,0.15)] rounded-2xl p-5">
              <p className="text-[#55705A] font-['DM_Sans'] text-xs tracking-widest uppercase mb-6">Revenue — 6 Months</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3E9C14" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3E9C14" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(163,230,53,0.08)" />
                  <XAxis dataKey="month" tick={{ fill: "#55705A", fontSize: 11, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#55705A", fontSize: 11, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "#0D4430", border: "1px solid rgba(163,230,53,0.25)", borderRadius: 0, fontFamily: "DM Sans", fontSize: 12, color: "#8FAE94" }}
                    formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#9BE81E" strokeWidth={2} fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-[#06231B] border border-[rgba(163,230,53,0.15)] rounded-2xl p-5">
              <p className="text-[#55705A] font-['DM_Sans'] text-xs tracking-widest uppercase mb-6">Service Mix</p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={SERVICE_MIX} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={70} strokeWidth={0}>
                    {SERVICE_MIX.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#0D4430", border: "1px solid rgba(163,230,53,0.25)", borderRadius: 0, fontFamily: "DM Sans", fontSize: 12, color: "#8FAE94" }}
                    formatter={(v: number) => [`${v}%`]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {SERVICE_MIX.map((s) => (
                  <div key={s.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                      <span className="text-[#55705A] font-['DM_Sans'] text-xs">{s.name}</span>
                    </div>
                    <span className="text-[#8FAE94] font-['DM_Mono'] text-xs">{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bookings table */}
          <div className="bg-[#06231B] border border-[rgba(163,230,53,0.15)] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[rgba(163,230,53,0.1)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-[#55705A] font-['DM_Sans'] text-xs tracking-widest uppercase">Recent Bookings</p>
              <div className="flex gap-3">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#55705A]" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-[#0D4430] border border-[rgba(163,230,53,0.2)] rounded-full pl-8 pr-4 py-2 text-xs font-['DM_Sans'] text-[#8FAE94] placeholder:text-[#6FA287] focus:outline-none focus:border-[#3E9C14] w-44"
                  />
                </div>
                <div className="relative">
                  <Filter size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#55705A]" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#0D4430] border border-[rgba(163,230,53,0.2)] rounded-full pl-8 pr-4 py-2 text-xs font-['DM_Sans'] text-[#8FAE94] focus:outline-none focus:border-[#3E9C14] appearance-none cursor-pointer"
                  >
                    <option value="all">All</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#3E9C14] text-[#F2F7E6] text-xs tracking-widest uppercase font-['DM_Sans'] hover:bg-[#9BE81E] transition-colors">
                  <Plus size={12} /> New
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(163,230,53,0.08)]">
                    {["ID", "Client", "Service", "Date & Time", "Status", "Amount", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[#6FA287] font-['DM_Mono'] text-xs tracking-widest uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.id} className="border-b border-[rgba(163,230,53,0.06)] hover:bg-[rgba(163,230,53,0.03)] transition-colors">
                      <td className="px-5 py-4 font-['DM_Mono'] text-xs text-[#55705A]">{b.id}</td>
                      <td className="px-5 py-4 font-['DM_Sans'] text-sm text-[#8FAE94]">{b.client}</td>
                      <td className="px-5 py-4 font-['DM_Sans'] text-sm text-[#F2F7E6]">{b.service}</td>
                      <td className="px-5 py-4 font-['DM_Mono'] text-xs text-[#55705A]">{b.date}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full font-['DM_Mono'] text-[11px] tracking-wide ${statusColor[b.status]}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-['Shrikhand'] text-lg text-[#9BE81E]">${b.amount}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button className="p-1 text-[#55705A] hover:text-[#8FAE94] transition-colors"><Eye size={14} /></button>
                          <button className="p-1 text-[#55705A] hover:text-[#8FAE94] transition-colors"><Edit2 size={14} /></button>
                          <button className="p-1 text-[#55705A] hover:text-[#D64545] transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center text-[#6FA287] font-['DM_Sans'] text-sm">
                        No bookings match your filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

const PAGES: Page[] = ["home", "services", "booking", "about", "news", "contact", "admin"];

function pageFromHash(): Page {
  const h = window.location.hash.replace("#", "") as Page;
  return PAGES.includes(h) ? h : "home";
}

export default function App() {
  const [page, setPageState] = useState<Page>(() => pageFromHash());

  const setPage = (p: Page) => {
    setPageState(p);
    window.history.replaceState(null, "", p === "home" ? window.location.pathname : `#${p}`);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const isAdmin = page === "admin";

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {!isAdmin && <NavBar current={page} setPage={setPage} />}

      {page === "home" && <HeroPage setPage={setPage} />}
      {page === "services" && <ServicesPage setPage={setPage} />}
      {page === "booking" && <BookingPage />}
      {page === "about" && <AboutPage />}
      {page === "news" && <NewsPage />}
      {page === "contact" && <ContactPage />}
      {page === "admin" && (
        <div>
          <div className="bg-[#06231B] border-b border-[rgba(163,230,53,0.15)] px-4 py-2 flex items-center gap-4">
            <button
              onClick={() => setPage("home")}
              className="flex items-center gap-1 text-[#55705A] hover:text-[#8FAE94] transition-colors font-['DM_Sans'] text-xs tracking-widest uppercase"
            >
              <ChevronLeft size={12} /> Back to Site
            </button>
          </div>
          <AdminDashboard />
        </div>
      )}
    </div>
  );
}
