import { NavLink, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Orders from "./pages/Orders";
import StockCatalog from "./pages/StockCatalog";
import LandingPage from "./pages/LandingPage";
import { useAuth } from "./hooks/useAuth";

function Shell({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "px-3 py-2 rounded-md text-sm",
      isActive ? "bg-clinical-100 text-clinical-800" : "text-slate-600"
    ].join(" ");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold text-clinical-800">
            Pharma Stock & Ordering
          </div>
          <nav className="flex items-center gap-2">
            <NavLink to="/" className={linkClass} end>
              Stock
            </NavLink>
            <NavLink to="/orders" className={linkClass}>
              Orders
            </NavLink>
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
            <button
              onClick={logout}
              className="ml-2 text-sm text-slate-500 hover:text-slate-700"
            >
              Sign out
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route
        path="/"
        element={<LandingPage />}
      />
      <Route
        path="/stock"
        element={
          <RequireAuth>
            <Shell>
              <StockCatalog />
            </Shell>
          </RequireAuth>
        }
      />
      <Route
        path="/orders"
        element={
          <RequireAuth>
            <Shell>
              <Orders />
            </Shell>
          </RequireAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <Shell>
              <AdminDashboard />
            </Shell>
          </RequireAuth>
        }
      />
    </Routes>
  );
}
