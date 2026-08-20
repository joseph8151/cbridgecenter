import Link from "next/link";
import { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-card border border-dashed border-line bg-cream-deep px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lavender text-purple-600">
        <Icon size={24} />
      </span>
      <p className="mt-5 text-lg font-extrabold text-ink">{title}</p>
      <p className="mt-2 max-w-sm text-sm text-ink-soft">{description}</p>
      <Link
        href={ctaHref}
        className="mt-6 rounded-full bg-purple-600 px-6 py-3 text-sm font-bold text-white hover:bg-purple-700"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
