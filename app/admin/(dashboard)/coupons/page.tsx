"use client";

import { useState } from "react";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { Coupon } from "@/lib/data/admin";
import { formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function AdminCouponsPage() {
  const { coupons, addCoupon } = useAdminData();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Coupons</h1>
          <p className="text-sm text-ink-soft">{coupons.length} active coupons</p>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
        >
          <Plus size={15} /> New Coupon
        </button>
      </div>

      {open && <CouponForm onCreate={(c) => { addCoupon(c); setOpen(false); }} />}

      <div className="mt-4 overflow-x-auto rounded-card border border-line bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-line bg-cream-deep text-left text-[11px] font-bold uppercase tracking-label text-ink-soft">
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Discount</th>
              <th className="px-4 py-3">Expires</th>
              <th className="px-4 py-3">Usage</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id} className="border-b border-line last:border-0 hover:bg-cream-deep/60">
                <td className="px-4 py-3 font-mono font-bold text-purple-600">{c.code}</td>
                <td className="px-4 py-3 text-ink">
                  {c.type === "percent" ? `${c.value}% Discount` : `₩${c.value.toLocaleString()} Discount`}
                </td>
                <td className="px-4 py-3 text-ink-soft">{formatDate(c.expiresAt)}</td>
                <td className="px-4 py-3 tabular text-ink-soft">{c.usedCount} / {c.usageLimit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CouponForm({ onCreate }: { onCreate: (c: Coupon) => void }) {
  const [code, setCode] = useState("");
  const [type, setType] = useState<Coupon["type"]>("percent");
  const [value, setValue] = useState(10);
  const [expiresAt, setExpiresAt] = useState("2026-12-31");
  const [usageLimit, setUsageLimit] = useState(100);

  return (
    <div className="mt-4 grid gap-3 rounded-card border border-line bg-white p-5 sm:grid-cols-5">
      <input
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="CODE"
        className="admin-input font-mono"
      />
      <select value={type} onChange={(e) => setType(e.target.value as Coupon["type"])} className="admin-input">
        <option value="percent">% Discount</option>
        <option value="amount">₩ Discount</option>
      </select>
      <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="admin-input" />
      <input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className="admin-input" />
      <input type="number" value={usageLimit} onChange={(e) => setUsageLimit(Number(e.target.value))} className="admin-input" />
      <button
        onClick={() => {
          if (!code.trim()) return;
          onCreate({
            id: `c-${Date.now()}`,
            code: code.trim(),
            type,
            value,
            expiresAt,
            usageLimit,
            usedCount: 0,
          });
        }}
        className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700 sm:col-span-5"
      >
        Create Coupon
      </button>
    </div>
  );
}
