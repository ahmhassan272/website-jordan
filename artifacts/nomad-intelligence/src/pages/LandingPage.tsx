import { useState, useEffect, useRef } from "react";
import { content, type Lang } from "@/lib/i18n";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("ar");
  const t = content[lang];
  const isRTL = t.dir === "rtl";

  useEffect(() => {
    document.documentElement.setAttribute("dir", t.dir);
    document.documentElement.setAttribute("lang", t.lang);
  }, [lang, t.dir, t.lang]);

  const heroSection = useInView();
  const packagesSection = useInView();
  const comparisonSection = useInView();
  const whySection = useInView();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen bg-[#080d1a] text-white"
      style={{ fontFamily: isRTL ? "'Cairo', 'Inter', sans-serif" : "'Inter', sans-serif" }}
    >
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-[#080d1a]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <span className="text-white font-black text-sm">N</span>
            </div>
            <span className="font-bold text-white text-lg tracking-tight">{t.nav.logo}</span>
          </div>

          <div className={`hidden md:flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <button onClick={() => scrollTo("packages")} className="text-sm text-white/60 hover:text-cyan-400 transition-colors" data-testid="nav-services">{t.nav.services}</button>
            <button onClick={() => scrollTo("comparison")} className="text-sm text-white/60 hover:text-cyan-400 transition-colors" data-testid="nav-compare">{t.nav.compare}</button>
            <button onClick={() => scrollTo("why")} className="text-sm text-white/60 hover:text-cyan-400 transition-colors" data-testid="nav-why">{t.nav.why}</button>
            <button onClick={() => scrollTo("footer")} className="text-sm text-white/60 hover:text-cyan-400 transition-colors" data-testid="nav-contact">{t.nav.contact}</button>
          </div>

          <button
            data-testid="lang-toggle"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 text-cyan-400 text-sm font-medium hover:bg-cyan-400/10 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            {t.nav.langToggle}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080d1a] via-[#0a1628] to-[#080d1a]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/5 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-400/5 blur-3xl" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(0,200,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div ref={heroSection.ref} className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-sm mb-8 ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {lang === "ar" ? "وكالة تصميم رقمية احترافية — الأردن" : "Premium Digital Agency — Jordan"}
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "100ms" }}
          >
            <span className="gradient-text">{t.hero.headline}</span>
          </h1>

          {/* Sub-headline */}
          <p
            className={`text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "200ms" }}
          >
            {t.hero.subheadline}
          </p>

          {/* CTA */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "300ms" }}
          >
            <a
              href={`https://wa.me/962776608809?text=${encodeURIComponent(lang === "ar" ? "مرحباً، أريد الحصول على نموذج مجاني لموقعي" : "Hello, I'd like to get a free mockup for my website")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-cta"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all glow hover:scale-105 shadow-lg shadow-cyan-500/25"
            >
              {t.hero.cta}
            </a>
          </div>

          <p className={`mt-4 text-white/30 text-sm ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "400ms" }}>
            {t.hero.ctaSub}
          </p>

          {/* Stats */}
          <div
            className={`mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-12 ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "500ms" }}
          >
            {[
              { num: "50+", label: lang === "ar" ? "عميل سعيد" : "Happy Clients" },
              { num: "7", label: lang === "ar" ? "أيام تسليم" : "Day Delivery" },
              { num: "100%", label: lang === "ar" ? "ضمان الجودة" : "Quality Guarantee" },
            ].map((s, i) => (
              <div key={i} className="text-center" data-testid={`stat-${i}`}>
                <div className="text-3xl font-black gradient-text">{s.num}</div>
                <div className="text-white/40 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="packages" className="py-24 px-4 sm:px-6">
        <div ref={packagesSection.ref} className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${packagesSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-5xl font-black mb-4">
              <span className="gradient-text">{t.packages.sectionTitle}</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">{t.packages.sectionSub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 stagger-children">
            {t.plans.map((plan, i) => (
              <div
                key={i}
                data-testid={`plan-card-${i}`}
                className={`relative rounded-2xl border p-6 card-hover flex flex-col ${packagesSection.inView ? "animate-fade-in-up" : "opacity-0"} ${
                  plan.highlighted
                    ? "border-cyan-400/50 bg-gradient-to-b from-cyan-950/40 to-[#0a1628] shadow-2xl shadow-cyan-500/20"
                    : "border-white/10 bg-[#0d1426]"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {plan.highlighted && (
                  <div className={`absolute -top-4 ${isRTL ? "right-6" : "left-6"}`}>
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg">
                      {t.packages.bestValue}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-xl font-bold text-white mb-1 ${isRTL ? "text-right" : "text-left"}`}>{plan.name}</h3>
                  <div className={`text-4xl font-black gradient-text mt-3 ${isRTL ? "text-right" : "text-left"}`}>{plan.price}</div>
                </div>

                <p className={`text-white/50 text-sm leading-relaxed mb-6 italic ${isRTL ? "text-right" : "text-left"}`}>{plan.desc}</p>

                <div className="mb-6 flex-1">
                  <p className={`text-white/40 text-xs uppercase tracking-widest mb-3 font-semibold ${isRTL ? "text-right" : "text-left"}`}>{t.packages.includes}</p>
                  <ul className="space-y-2">
                    {plan.features.map((f, j) => (
                      <li key={j} className={`flex items-start gap-2 text-sm text-white/70 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                        <CheckIcon />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`space-y-2 pt-4 border-t border-white/5 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                  <p className="text-xs text-white/40">
                    <span className="text-white/60 font-medium">{t.packages.suitableFor}</span> {plan.suitable}
                  </p>
                  <p className="text-xs text-white/40">
                    <span className="text-white/60 font-medium">{t.packages.delivery}</span> {plan.delivery} {t.packages.days}
                  </p>
                </div>

                <a
                  href={`https://wa.me/962776608809?text=${encodeURIComponent(lang === "ar" ? `مرحباً، أريد الاشتراك في ${plan.name}` : `Hello, I'd like to get the ${plan.nameEn}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`plan-cta-${i}`}
                  className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-all ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 glow"
                      : "border border-white/20 text-white/70 hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-cyan-400/5"
                  }`}
                >
                  {t.packages.choosePlan}
                </a>
              </div>
            ))}
          </div>

          {/* Add-on Banner */}
          <div className={`mt-8 rounded-2xl border border-white/10 bg-[#0d1426] p-6 ${packagesSection.inView ? "animate-fade-in-up" : "opacity-0"}`} data-testid="addon-banner">
            <div className={`flex flex-col md:flex-row md:items-center gap-6 ${isRTL ? "md:flex-row-reverse" : ""}`}>
              <div className="flex-1">
                <div className={`flex items-center gap-3 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 text-xl">
                    🛡️
                  </div>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <h4 className="font-bold text-white">{t.addon.nameAr}</h4>
                    <span className="text-emerald-400 font-black text-xl">{t.addon.price}</span>
                  </div>
                </div>
                <p className={`text-white/50 text-sm italic mb-4 ${isRTL ? "text-right" : "text-left"}`}>{t.addon.desc}</p>
                <div className={`flex flex-wrap gap-x-4 gap-y-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                  {t.addon.features.map((f, i) => (
                    <div key={i} className={`flex items-center gap-1.5 text-xs text-white/50 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <CheckIcon />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`flex flex-col gap-2 ${isRTL ? "text-right items-end" : "text-left items-start"} md:items-end`}>
                <span className="text-xs text-white/30 max-w-[200px]">{t.addon.note}</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className={`text-center text-white/30 text-sm mt-6 ${packagesSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            {t.packages.footerNote}
          </p>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section id="comparison" className="py-24 px-4 sm:px-6 bg-[#060b17]">
        <div ref={comparisonSection.ref} className="max-w-5xl mx-auto">
          <div className={`text-center mb-12 ${comparisonSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-5xl font-black mb-4">
              <span className="gradient-text">{t.comparison.title}</span>
            </h2>
          </div>

          <div className={`rounded-2xl overflow-hidden border border-white/10 ${comparisonSection.inView ? "animate-fade-in-up" : "opacity-0"}`} data-testid="comparison-table">
            <div className="overflow-x-auto">
              <table className={`w-full text-sm ${isRTL ? "text-right" : "text-left"}`} dir={t.dir}>
                <thead>
                  <tr className="bg-[#0d1426] border-b border-white/10">
                    {t.comparison.headers.map((h, i) => (
                      <th
                        key={i}
                        className={`px-5 py-4 font-bold ${
                          i === 0
                            ? "text-white/50"
                            : i === 1
                            ? "text-cyan-400"
                            : "text-white/40"
                        }`}
                      >
                        {i === 1 ? (
                          <span className="inline-flex items-center gap-1.5">
                            {h}
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-400">
                              {lang === "ar" ? "نحن" : "Us"}
                            </span>
                          </span>
                        ) : h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.comparison.rows.map((row, ri) => (
                    <tr
                      key={ri}
                      className="border-b border-white/5 hover:bg-white/2 transition-colors"
                      data-testid={`comparison-row-${ri}`}
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`px-5 py-4 ${
                            ci === 0
                              ? "text-white/70 font-medium"
                              : ci === 1
                              ? `font-bold ${cell.startsWith("✅") ? "text-cyan-400" : "text-white"}`
                              : `text-white/40 ${cell.startsWith("❌") ? "text-red-400/70" : ""}`
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className={`mt-6 text-white/40 text-sm leading-relaxed text-center ${comparisonSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            {t.comparison.footnote}
          </p>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why" className="py-24 px-4 sm:px-6">
        <div ref={whySection.ref} className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${whySection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-5xl font-black">
              <span className="gradient-text">{t.whyUs.title}</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {t.whyUs.cards.map((card, i) => (
              <div
                key={i}
                data-testid={`why-card-${i}`}
                className={`rounded-2xl border border-white/10 bg-[#0d1426] p-6 card-hover ${whySection.inView ? "animate-fade-in-up" : "opacity-0"} ${isRTL ? "text-right" : "text-left"}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section id="footer" className="py-24 px-4 sm:px-6 bg-[#060b17] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            <span className="gradient-text">{t.footer.cta}</span>
          </h2>
          <p className="text-white/40 mb-8 text-lg">{t.footer.tagline}</p>
          <a
            href={`https://wa.me/962776608809?text=${encodeURIComponent(lang === "ar" ? "مرحباً، أريد الحصول على نموذج مجاني لموقعي" : "Hello, I'd like to get a free mockup for my website")}`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-cta"
            className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all glow hover:scale-105 shadow-lg shadow-cyan-500/25 mb-12"
          >
            {t.footer.ctaBtn}
          </a>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <span className="text-white font-black text-[10px]">N</span>
              </div>
              <span className="text-white/60 font-medium text-sm">{t.nav.logo}</span>
            </div>
            <a
              href={`mailto:${t.footer.email}`}
              data-testid="footer-email"
              className="text-cyan-400/70 hover:text-cyan-400 text-sm transition-colors"
            >
              {t.footer.email}
            </a>
            <p className="text-white/20 text-xs">{t.footer.rights}</p>
          </div>
        </div>
      </section>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href="https://wa.me/962776608809"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="whatsapp-float"
        className={`fixed bottom-6 ${isRTL ? "left-6" : "right-6"} z-50 w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center shadow-2xl whatsapp-pulse hover:scale-110 transition-transform`}
        aria-label="WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
