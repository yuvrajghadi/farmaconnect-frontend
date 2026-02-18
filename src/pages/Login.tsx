import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type LocationState = { from?: { pathname?: string } };

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await login(email, password, { rememberMe });
      const redirectTo =
        (location.state as LocationState | null)?.from?.pathname ?? "/orders";
      navigate(redirectTo, { replace: true });
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="min-h-screen lg:grid lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-teal-700 via-sky-700 to-cyan-600 lg:flex">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute right-10 top-24 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute bottom-10 left-20 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          </div>
          <div className="relative z-10 flex w-full flex-col justify-between p-12 text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                B2B Pharmaceutical Portal
              </p>
              <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight">
                Secure access for trusted pharmacy partners.
              </h1>
              <p className="mt-4 max-w-md text-sm text-white/85">
                Manage inventory, place bulk orders, and keep compliance data in
                one secure workspace.
              </p>
            </div>
            <div className="space-y-3 text-sm text-white/85">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                HIPAA-ready workflows and audit trails
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Tiered pricing for verified accounts
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Dedicated support for managed supply chains
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12 lg:px-12">
          <div className="w-full max-w-md space-y-8">
            <div className="lg:hidden">
              <div className="rounded-2xl bg-gradient-to-r from-teal-700 to-sky-600 p-6 text-white shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                  B2B Pharmaceutical Portal
                </p>
                <h1 className="mt-3 text-2xl font-semibold">
                  Secure partner access
                </h1>
                <p className="mt-2 text-sm text-white/85">
                  Sign in to manage inventory and orders.
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-teal-700">
                Sign in
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Welcome back to PharmaFlow
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Use your verified business credentials to continue.
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
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email
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
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus-visible:border-teal-600 focus-visible:ring-2 focus-visible:ring-teal-600/30"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus-visible:ring-2 focus-visible:ring-teal-600/40"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>

              <p className="text-center text-sm text-slate-500">
                New to PharmaFlow?{" "}
                <Link to="/signup" className="font-semibold text-teal-700">
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
