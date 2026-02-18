const stats = [
  {
    label: "Total Sales (Today)",
    value: "$24,560",
    trend: "+8.4%",
    tone: "text-emerald-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M4 14l4-4 4 4 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 20h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  },
  {
    label: "Pending Orders",
    value: "38",
    trend: "+6",
    tone: "text-blue-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 8v4l2 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  },
  {
    label: "Low Stock Items",
    value: "12",
    trend: "Needs review",
    tone: "text-red-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M12 3l9 16H3L12 3z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 9v4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    )
  },
  {
    label: "Active Users",
    value: "146",
    trend: "12 online",
    tone: "text-purple-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="9" r="2" stroke="currentColor" strokeWidth="2" />
        <path
          d="M4 20c0-3 3-5 5-5s5 2 5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 20c.3-2 2-3 4-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }
];

const recentOrders = [
  { id: "ORD-1048", client: "Westside Pharmacy", total: "$1,250.75" },
  { id: "ORD-1047", client: "North River Clinic", total: "$845.20" },
  { id: "ORD-1046", client: "Green Valley Health", total: "$2,499.00" },
  { id: "ORD-1045", client: "City Care Hospital", total: "$642.30" },
  { id: "ORD-1044", client: "Oakridge Wellness", total: "$1,750.90" }
];

const quickActions = [
  { label: "Upload Inventory CSV", helper: "Add or update stock" },
  { label: "Manage Users", helper: "Invite and assign roles" },
  { label: "View Reports", helper: "Sales & compliance metrics" }
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="space-y-6">
        <header>
          <p className="text-xs uppercase tracking-[0.3em] text-teal-700">
            Admin Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold">
            Operations overview
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor sales, orders, and inventory activity in real time.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl bg-slate-100 p-2 ${stat.tone}`}>
                  {stat.icon}
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {stat.trend}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Orders
              </h2>
              <button
                type="button"
                className="text-xs font-semibold text-teal-700 hover:text-teal-800"
              >
                View all
              </button>
            </div>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-3 py-2">Order</th>
                    <th className="px-3 py-2">Client</th>
                    <th className="px-3 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      <td className="px-3 py-2 font-semibold text-slate-900">
                        {order.id}
                      </td>
                      <td className="px-3 py-2 text-slate-600">
                        {order.client}
                      </td>
                      <td className="px-3 py-2 text-right font-semibold text-slate-900">
                        {order.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Quick Actions
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Jump straight to the workflows your team uses daily.
            </p>
            <div className="mt-5 grid gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="group rounded-xl border border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-teal-200 hover:bg-teal-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">
                      {action.label}
                    </span>
                    <span className="text-sm text-teal-700 transition group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{action.helper}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
