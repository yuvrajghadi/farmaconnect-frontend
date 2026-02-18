import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await signup({ email, password, companyName, licenseNumber });
      navigate("/orders", { replace: true });
    } catch {
      setError("Unable to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="min-h-screen lg:grid lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-sky-700 via-cyan-700 to-teal-600 lg:flex">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute left-12 top-20 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute bottom-8 right-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          </div>
          <div className="relative z-10 flex w-full flex-col justify-between p-12 text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                Partner Onboarding
              </p>
              <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight">
                Create a verified account for your organization.
              </h1>
              <p className="mt-4 max-w-md text-sm text-white/85">
                Submit your business information once and access controlled
                pricing and supply reporting instantly.
              </p>
            </div>
            <div className="space-y-3 text-sm text-white/85">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                License verification within 24 hours
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Dedicated compliance support
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Role-based access for teams
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12 lg:px-12">
          <div className="w-full max-w-md space-y-8">
            <div className="lg:hidden">
              <div className="rounded-2xl bg-gradient-to-r from-sky-700 to-teal-600 p-6 text-white shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                  Partner Onboarding
                </p>
                <h1 className="mt-3 text-2xl font-semibold">
                  Create your account
                </h1>
                <p className="mt-2 text-sm text-white/85">
                  Get access to pricing and ordering in minutes.
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-teal-700">
                Create account
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Register your pharmacy team
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Provide your company details for quick verification.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-sm"
            >
              {error && (
                <div
                  className="rounded-md bg-red-50 p-3 text-sm text-red-700"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="companyName"
                  className="text-sm font-medium text-slate-700"
                >
                  Company name
                </label>
                <input
                  id="companyName"
                  type="text"
                  autoComplete="organization"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus-visible:border-teal-600 focus-visible:ring-2 focus-visible:ring-teal-600/30"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus-visible:border-teal-600 focus-visible:ring-2 focus-visible:ring-teal-600/30"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus-visible:border-teal-600 focus-visible:ring-2 focus-visible:ring-teal-600/30"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="licenseNumber"
                  className="text-sm font-medium text-slate-700"
                >
                  License number
                </label>
                <input
                  id="licenseNumber"
                  type="text"
                  autoComplete="off"
                  minLength={6}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus-visible:border-teal-600 focus-visible:ring-2 focus-visible:ring-teal-600/30"
                  value={licenseNumber}
                  onChange={(event) => setLicenseNumber(event.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>

              <p className="text-center text-sm text-slate-500">
                Already have access?{" "}
                <Link to="/login" className="font-semibold text-teal-700">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
