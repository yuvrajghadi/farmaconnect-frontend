import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { Pagination } from "../components/Pagination";
import type {
  InventoryBatch,
  InventoryListItem,
  InventoryListParams,
  InventoryListResponse
} from "../types/api";

const PAGE_SIZE = 8;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(new Date(value));

const isExpiringSoon = (value?: string) => {
  if (!value) return false;
  const expiryDate = new Date(value);
  const threshold = new Date();
  threshold.setMonth(threshold.getMonth() + 3);
  return expiryDate <= threshold;
};

const getPrimaryBatch = (batches: InventoryBatch[] = []) => {
  if (!batches.length) return null;
  return [...batches].sort(
    (a, b) =>
      new Date(a.expirationDate).getTime() -
      new Date(b.expirationDate).getTime()
  )[0];
};

const fetchInventory = async (params: InventoryListParams) => {
  const { data } = await api.get<InventoryListResponse>("/inventory", {
    params
  });
  return data;
};

export default function StockCatalog() {
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>(
    {}
  );
  const [pendingItems, setPendingItems] = useState<Record<string, boolean>>({});
  const [actionError, setActionError] = useState<string | null>(null);

  const queryParams = useMemo<InventoryListParams>(
    () => ({
      page,
      limit: PAGE_SIZE,
      search: query.trim() ? query.trim() : undefined,
      category: category === "All" ? undefined : category
    }),
    [page, query, category]
  );

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["inventory", page, query, category],
    queryFn: () => fetchInventory(queryParams),
    staleTime: 30_000
  });

  const items = data?.data ?? [];
  const totalItems = data?.total ?? items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    items.forEach((item) => {
      if (item.category?.name) {
        unique.add(item.category.name);
      }
    });
    return ["All", ...Array.from(unique).sort()];
  }, [items]);

  const handleAddToCart = async (item: InventoryListItem) => {
    setActionError(null);
    setPendingItems((prev) => ({ ...prev, [item.id]: true }));
    setCartQuantities((prev) => ({ ...prev, [item.id]: 1 }));
    try {
      await api.post("/cart/items", { itemId: item.id, quantity: 1 });
    } catch {
      setActionError("Unable to add item to cart. Please try again.");
    } finally {
      setPendingItems((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  const handleQtyChange = (id: string, nextValue: number) => {
    setCartQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, nextValue)
    }));
  };

  const handleQtyCommit = async (item: InventoryListItem) => {
    const quantity = cartQuantities[item.id];
    if (!quantity) return;
    setActionError(null);
    setPendingItems((prev) => ({ ...prev, [item.id]: true }));
    try {
      await api.patch(`/cart/items/${item.id}`, { quantity });
    } catch {
      setActionError("Unable to update quantity. Please try again.");
    } finally {
      setPendingItems((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="space-y-6">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-teal-700">
                Inventory
              </p>
              <h1 className="mt-2 text-3xl font-semibold">Inventory</h1>
              <p className="mt-1 text-sm text-slate-500">
                Search, filter, and order high-demand stock quickly.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFiltersOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
              >
                Filter
                <span className="text-xs" aria-hidden="true">
                  ▼
                </span>
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search by drug, brand, category, or batch..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus-visible:border-teal-600 focus-visible:ring-2 focus-visible:ring-teal-600/20"
            />
          </div>
          {filtersOpen && (
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wide text-slate-400">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                    setPage(1);
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus-visible:border-teal-600 focus-visible:ring-2 focus-visible:ring-teal-600/20"
                >
                  {categories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                  setPage(1);
                }}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-800"
              >
                Reset filters
              </button>
            </div>
          )}
        </header>

        {actionError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {actionError}
          </div>
        )}

        {isLoading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-4 w-32 rounded bg-slate-100" />
            <div className="mt-4 h-36 rounded bg-slate-100" />
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Unable to load inventory. Please try again.
          </div>
        )}

        {!isLoading && !isError && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="max-h-[60vh] overflow-auto">
              <table className="min-w-full border-separate border-spacing-0 text-sm">
                <thead className="sticky top-0 z-10 bg-slate-100/90 backdrop-blur">
                  <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3">Drug Name</th>
                    <th className="px-4 py-3">Brand</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Batch #</th>
                    <th className="px-4 py-3">Expiry Date</th>
                    <th className="px-4 py-3 text-right">Stock Qty</th>
                    <th className="px-4 py-3 text-right">Price</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-8 text-center text-sm text-slate-500"
                      >
                        No inventory matches your filters.
                      </td>
                    </tr>
                  ) : (
                    items.map((item, index) => {
                      const primaryBatch = getPrimaryBatch(item.batches);
                      const quantity = cartQuantities[item.id];
                      const isSoon = isExpiringSoon(
                        primaryBatch?.expirationDate
                      );
                      const price = Number(item.basePrice);
                      return (
                        <tr
                          key={item.id}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-slate-50"
                          } transition hover:bg-teal-50/40`}
                        >
                          <td className="px-4 py-3 font-semibold text-slate-900">
                            {item.drugName}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {item.brand?.name ?? "—"}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                              {item.category?.name ?? "Uncategorized"}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-slate-500">
                            {primaryBatch?.batchNumber ?? "—"}
                          </td>
                          <td
                            className={`px-4 py-3 text-sm font-medium ${
                              isSoon ? "text-red-600" : "text-slate-600"
                            }`}
                          >
                            {primaryBatch?.expirationDate
                              ? formatDate(primaryBatch.expirationDate)
                              : "—"}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-700">
                            {item.totalQuantity ?? 0}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-slate-900">
                            {Number.isFinite(price)
                              ? `$${price.toFixed(2)}`
                              : "—"}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {quantity ? (
                              <input
                                type="number"
                                min={1}
                                step={1}
                                value={quantity}
                                onChange={(event) =>
                                  handleQtyChange(
                                    item.id,
                                    Number(event.target.value)
                                  )
                                }
                                onBlur={() => handleQtyCommit(item)}
                                disabled={pendingItems[item.id]}
                                className="w-20 rounded-md border border-slate-200 px-2 py-1 text-right text-sm shadow-sm outline-none transition focus-visible:border-teal-600 focus-visible:ring-2 focus-visible:ring-teal-600/30 disabled:opacity-60"
                                aria-label={`Quantity for ${item.drugName}`}
                              />
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleAddToCart(item)}
                                disabled={pendingItems[item.id]}
                                className="inline-flex items-center justify-center rounded-md bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/30 disabled:opacity-60"
                              >
                                {pendingItems[item.id]
                                  ? "Adding..."
                                  : "Add to Cart"}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
              <span>{totalItems} items found</span>
              <span>{isFetching ? "Refreshing..." : "Prices shown in USD"}</span>
            </div>
          </div>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
