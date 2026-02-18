import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export type StockItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  expirationDate: string;
};

type StockResponse = {
  items: StockItem[];
};

async function fetchStock(category: string) {
  const { data } = await api.get<StockResponse>("/stock", {
    params: { category }
  });
  return data.items;
}

export default function StockTable() {
  const [category, setCategory] = useState("Cardiology");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["stock", category],
    queryFn: () => fetchStock(category)
  });

  const sorted = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      const aDate = Date.parse(a.expirationDate);
      const bDate = Date.parse(b.expirationDate);
      if (aDate < bDate) return sortDir === "asc" ? -1 : 1;
      if (aDate > bDate) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortDir]);

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
        <div className="mt-4 h-24 bg-slate-100 rounded animate-pulse" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card p-4 border-red-200 bg-red-50 text-red-700">
        Unable to load stock data. Please try again.
      </div>
    );
  }

  if (!sorted.length) {
    return (
      <div className="card p-4 text-slate-500">
        No inventory found for the selected category.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <select
          className="border rounded-md px-3 py-2 text-sm bg-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Cardiology</option>
          <option>Oncology</option>
          <option>Dermatology</option>
          <option>Neurology</option>
        </select>

        <button
          className="text-sm text-clinical-700 underline"
          onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
        >
          Sort by Expiration ({sortDir})
        </button>
      </div>

      <div className="overflow-x-auto card">
        <table className="w-full text-sm">
          <thead className="bg-clinical-50 text-slate-600">
            <tr>
              <th className="text-left p-3">Drug</th>
              <th className="text-left p-3">Availability</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Expires</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3">
                  <span className="text-slate-700">{item.quantity}</span>
                  {item.quantity < 50 && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                      Low Stock
                    </span>
                  )}
                </td>
                <td className="p-3">${item.price.toFixed(2)}</td>
                <td className="p-3">
                  {new Date(item.expirationDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
