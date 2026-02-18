import { Link } from "react-router-dom";
import {
  BarChart3,
  ShieldCheck,
  Truck,
  Lock,
  CheckCircle2,
  Headset,
  ArrowRight
} from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Contact", href: "#contact" }
];

const complianceItems = [
  { label: "HIPAA Compliant", icon: ShieldCheck },
  { label: "256-bit SSL Security", icon: Lock },
  { label: "FDA Approved Sources", icon: CheckCircle2 },
  { label: "24/7 Support", icon: Headset }
];

const features = [
  {
    title: "Real-Time Stock",
    description: "Check availability instantly across 50+ suppliers.",
    icon: BarChart3
  },
  {
    title: "Smart Ordering",
    description: "Bulk upload CSVs and get instant pricing.",
    icon: ShieldCheck
  },
  {
    title: "Live Tracking",
    description: "Monitor shipments from warehouse to your door.",
    icon: Truck
  }
];

const footerColumns = [
  {
    title: "Company",
    links: ["About", "Careers", "Partners"]
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Compliance"]
  },
  {
    title: "Contact",
    links: ["support@pharmaconnect.com", "+1 (800) 555-0909", "New York, NY"]
  }
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          PharmaConnect
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-teal-600"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-full border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
          >
            Open Account
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(13,148,136,0.15),_transparent_55%)]" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
            Trusted by pharmacies and clinics
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Streamline Your Pharmacy Supply Chain.
          </h1>
          <p className="text-base text-slate-600 sm:text-lg">
            Real-time inventory, automated bulk ordering, and next-day delivery
            for pharmacies and clinics.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              View Demo
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-slate-500">
            <span>99.98% uptime SLA</span>
            <span>Same-day verification</span>
            <span>50+ vetted suppliers</span>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-teal-50 p-6 shadow-lg">
            <div className="rounded-2xl bg-slate-900 p-5 text-white">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Live Inventory Dashboard</span>
                <span>Updated 2 min ago</span>
              </div>
              <div className="mt-6 space-y-4">
                <div className="h-4 w-4/5 rounded-full bg-teal-500/70" />
                <div className="h-3 w-full rounded-full bg-slate-700" />
                <div className="h-3 w-3/4 rounded-full bg-slate-700" />
                <div className="h-24 rounded-2xl bg-slate-800 p-4">
                  <div className="h-2 w-1/2 rounded-full bg-teal-500/80" />
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="h-6 rounded-md bg-slate-700" />
                    <div className="h-6 rounded-md bg-slate-700" />
                    <div className="h-6 rounded-md bg-slate-700" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold text-slate-500">
                Next-Day Delivery Coverage
              </p>
              <div className="mt-3 h-28 rounded-xl bg-gradient-to-br from-teal-100 to-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComplianceBar() {
  return (
    <section className="border-y border-slate-200 bg-slate-100/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6">
        {complianceItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-2 text-xs font-semibold text-slate-600"
            >
              <Icon className="h-4 w-4 text-teal-600" />
              {item.label}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FeaturesGrid() {
  return (
    <section id="features" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            Built for compliant, high-volume ordering
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Automate sourcing, eliminate backorders, and keep your teams focused
            on patient care.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section id="solutions" className="bg-teal-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600">
            Solutions
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            One platform for purchasing, compliance, and analytics
          </h2>
          <p className="text-sm text-slate-600">
            Centralize procurement across multiple locations with automated
            compliance checks, approvals, and budget controls.
          </p>
          <div className="grid gap-3 text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-600" />
              Controlled purchasing workflows
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-600" />
              Rebate tracking and audit-ready reports
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-600" />
              Dedicated account success team
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Operational Snapshot</span>
            <span>Last 24 hours</span>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-slate-800 p-4">
              <p className="text-xs text-slate-400">Orders processed</p>
              <p className="mt-2 text-2xl font-semibold">1,248</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-xs text-slate-400">Avg. fulfillment</p>
                <p className="mt-2 text-lg font-semibold">18h</p>
              </div>
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-xs text-slate-400">Inventory alerts</p>
                <p className="mt-2 text-lg font-semibold">32</p>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-800 p-4">
              <p className="text-xs text-slate-400">Compliance score</p>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-700">
                <div className="h-2 w-4/5 rounded-full bg-teal-500" />
              </div>
              <p className="mt-2 text-xs text-slate-400">98% verified</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <p className="text-lg font-semibold text-white">PharmaConnect</p>
            <p className="text-sm text-slate-400">
              Secure procurement and analytics for modern pharmacy teams.
            </p>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-3 text-sm">
              <p className="font-semibold text-white">{column.title}</p>
              <div className="space-y-2 text-slate-400">
                {column.links.map((link) => (
                  <p key={link}>{link}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-500">
          © 2026 PharmaConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <ComplianceBar />
      <FeaturesGrid />
      <SolutionsSection />
      <Footer />
    </div>
  );
}
