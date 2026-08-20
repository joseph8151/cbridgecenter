import Link from "next/link";

const COLUMNS = [
  {
    title: "Products",
    links: [
      { href: "/test-center", label: "Test Center" },
      { href: "/score-lab", label: "AI Score Lab" },
      { href: "/academy", label: "AI Academy" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/resources/exam-guides", label: "Exam Guides" },
      { href: "/academy#faq", label: "FAQ" },
      { href: "/resources/support", label: "Support" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/company/about", label: "About" },
      { href: "/company/terms", label: "Terms" },
      { href: "/company/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-purple-700 text-purple-100">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-extrabold tracking-tight text-white">
              C-BRIDGE
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-purple-200">
              시험을 보세요. AI가 분석합니다. 목표점수까지 매일 훈련합니다.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-bold uppercase tracking-label text-gold-300">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-purple-200 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-purple-500/40 pt-6 text-xs text-purple-300 md:flex-row md:items-center md:justify-between">
          <p>© 2026 C-Bridge Center. All rights reserved.</p>
          <p>
            C-BRIDGE is an independent test preparation platform and is not
            affiliated with the official test providers.
          </p>
        </div>
      </div>
    </footer>
  );
}
