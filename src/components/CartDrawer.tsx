import { UserTier } from "../context/AuthContext";

type CartItem = {
  id: string;
  name: string;
  listPrice: number;
  tierPrices: Record<UserTier, number>;
  qty: number;
};

type Props = {
  items: CartItem[];
  tier: UserTier;
  onQtyChange: (id: string, qty: number) => void;
};

export function CartDrawer({ items, tier, onQtyChange }: Props) {
  return (
    <aside className="card p-4 w-full max-w-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <span className="text-xs text-slate-500">Tier: {tier}</span>
      </div>
      <div className="divide-y mt-3">
        {items.map((item) => {
          const yourPrice = item.tierPrices[tier];
          return (
            <div key={item.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-slate-500">
                  Your Price: ${yourPrice.toFixed(2)} · List: $
                  {item.listPrice.toFixed(2)}
                </div>
              </div>
              <input
                type="number"
                min={1}
                className="w-20 border rounded-md px-2 py-1 text-sm"
                value={item.qty}
                onChange={(e) => onQtyChange(item.id, Number(e.target.value))}
              />
            </div>
          );
        })}
      </div>
    </aside>
  );
}
