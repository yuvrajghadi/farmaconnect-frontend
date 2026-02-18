import { useEffect, useMemo, useState } from "react";
import { Pagination } from "../components/Pagination";

const orders = [
  { id: "ORD-1055", date: "2026-02-16", total: 1890.15, status: "Pending" },
  { id: "ORD-1054", date: "2026-02-14", total: 920.45, status: "Processing" },
  { id: "ORD-1053", date: "2026-02-12", total: 3100.0, status: "Shipped" },
  { id: "ORD-1052", date: "2026-02-10", total: 1250.75, status: "Pending" },
  { id: "ORD-1051", date: "2026-02-08", total: 845.2, status: "Processing" },
  { id: "ORD-1050", date: "2026-02-06", total: 2499.0, status: "Shipped" },
  { id: "ORD-1049", date: "2026-02-03", total: 642.3, status: "Delivered" },
  { id: "ORD-1048", date: "2026-01-30", total: 1750.9, status: "Delivered" },
  { id: "ORD-1047", date: "2026-01-28", total: 980.55, status: "Delivered" },
  { id: "ORD-1046", date: "2026-01-23", total: 1320.4, status: "Pending" },
  { id: "ORD-1045", date: "2026-01-19", total: 565.75, status: "Processing" },
  { id: "ORD-1044", date: "2026-01-11", total: 2105.3, status: "Shipped" }
];

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800"
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(new Date(value));

export default function Orders() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredOrders = useMemo(() => {
    if (statusFilter === "All") {
      return orders;
    }
    return orders.filter((order) => order.status === statusFilter);
  }, [statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const pagedOrders = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-teal-700">
            Orders
          </p>
          <h1 className="text-3xl font-semibold">Orders History</h1>
          <p className="text-sm text-slate-500">
            Track past orders, totals, and fulfillment status at a glance.
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide text-slate-400">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus-visible:border-teal-600 focus-visible:ring-2 focus-visible:ring-teal-600/20"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <div className="text-xs text-slate-500">
            {filteredOrders.length} orders found
          </div>
        </div>

        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Total Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {pagedOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No orders match the selected status.
                  </td>
                </tr>
              ) : (
                pagedOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    } border-t border-slate-100`}
                  >
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          statusStyles[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 md:hidden">
          {pagedOrders.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-sm">
              No orders match the selected status.
            </div>
          ) : (
            pagedOrders.map((order) => (
              <div
                key={order.id}
                className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Order
                    </p>
                    <p className="text-base font-semibold text-slate-900">
                      {order.id}
                    </p>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{formatDate(order.date)}</span>
                  <span className="font-semibold text-slate-900">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
