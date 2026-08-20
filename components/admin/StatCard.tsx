export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-label text-ink-soft">{label}</p>
      <p className="mt-1 text-2xl font-extrabold tabular text-ink">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink-soft">{sub}</p>}
    </div>
  );
}
