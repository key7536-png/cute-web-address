import { useMemo, useState } from "react";
import { Search, ArrowUpRight, Sparkles } from "lucide-react";
import { partners, categories } from "@/data/partners";

const formatKRW = (n: number) => `₩${n.toLocaleString("ko-KR")}`;

const Index = () => {
  const [active, setActive] = useState<(typeof categories)[number]>("전체");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return partners.filter((p) => {
      const inCat = active === "전체" || p.category === active;
      const inQuery =
        !query.trim() ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      return inCat && inQuery;
    });
  }, [active, query]);

  const lowest = useMemo(
    () => filtered.reduce((m, p) => (m === null || p.fromPrice < m ? p.fromPrice : m), null as number | null),
    [filtered]
  );

  const handleClick = (id: string, deeplink: string) => {
    try {
      const log = JSON.parse(localStorage.getItem("click_log") || "[]");
      log.push({ id, ts: Date.now() });
      localStorage.setItem("click_log", JSON.stringify(log));
    } catch {}
    window.open(deeplink, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-surface pb-24">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary via-[hsl(217,100%,55%)] to-[hsl(225,100%,62%)] text-primary-foreground px-5 pt-12 pb-10 rounded-b-[2rem]">
        <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 w-56 h-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide bg-white/15 backdrop-blur px-2.5 py-1 rounded-full mb-4">
            <Sparkles className="w-3 h-3" />
            <span>여행 최저가 모음</span>
          </div>
          <h1 className="text-[26px] font-bold leading-[1.2] tracking-tight">
            여행, 가장 싸게
            <br />
            한 번에 비교해요
          </h1>
          <p className="mt-2 text-[13px] opacity-85">
            호텔·투어·eSIM·렌터카까지, 검증된 파트너만 모았어요
          </p>

          <div className="mt-6 flex items-center gap-2 bg-card text-foreground rounded-2xl px-4 py-3 shadow-[var(--shadow-card)]">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="브랜드·서비스 검색"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </header>

      {/* Categories */}
      <nav className="px-5 pt-5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
          {categories.map((c) => {
            const on = c === active;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${
                  on
                    ? "bg-foreground text-background shadow-[var(--shadow-soft)]"
                    : "bg-card text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Stat strip */}
      {lowest !== null && (
        <div className="px-5 mt-5">
          <div className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between shadow-[var(--shadow-soft)]">
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground tracking-wide">
                지금 보고 있는 카테고리 최저가
              </p>
              <p className="text-[20px] font-bold text-foreground mt-0.5">
                {formatKRW(lowest)}
                <span className="text-[12px] font-medium text-muted-foreground ml-1">부터</span>
              </p>
            </div>
            <div className="text-[11px] font-semibold text-accent-foreground bg-accent px-2.5 py-1 rounded-full">
              {filtered.length}개 파트너
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <section className="px-5 mt-4 space-y-2.5">
        {filtered.map((p) => {
          const isLowest = p.fromPrice === lowest;
          return (
            <button
              key={p.id}
              onClick={() => handleClick(p.id, p.deeplink)}
              className="group w-full bg-card rounded-2xl p-3 flex items-center gap-3 shadow-[var(--shadow-soft)] border border-border/60 hover:border-primary/30 hover:shadow-[var(--shadow-card)] transition-all text-left"
            >
              <div className="relative shrink-0">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-2xl object-cover bg-muted"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-[15px] text-foreground truncate">{p.name}</h3>
                  {p.tag && (
                    <span className="text-[10px] font-bold text-primary bg-primary-soft px-1.5 py-0.5 rounded">
                      {p.tag}
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-muted-foreground truncate mt-0.5">
                  {p.description}
                </p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-[10px] text-muted-foreground">{p.unit}</span>
                  <span className="text-[10px] text-muted-foreground">·</span>
                  <span className={`text-[14px] font-bold tracking-tight ${isLowest ? "text-primary" : "text-foreground"}`}>
                    {formatKRW(p.fromPrice)}
                  </span>
                  <span className="text-[10px] text-muted-foreground">~</span>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-muted group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center shrink-0 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-16 text-sm bg-card rounded-2xl border border-border">
            검색 결과가 없어요
          </div>
        )}
      </section>

      {/* Disclosure */}
      <footer className="px-5 mt-8">
        <div className="bg-card rounded-2xl p-4 text-[11.5px] leading-relaxed text-muted-foreground border border-border">
          <p className="font-semibold text-foreground mb-1">광고 표시 안내</p>
          <p>
            본 서비스는 제휴 마케팅(링크프라이스)의 일환으로 이용자가 링크를 통해
            상품을 구매할 경우 운영자가 일정 수수료를 제공받을 수 있습니다.
            표시된 가격은 시점·옵션에 따라 변동되며, 실제 가격·재고·정책은
            각 파트너사의 정책을 따릅니다.
          </p>
        </div>
        <p className="text-center text-[11px] text-muted-foreground mt-4">
          © 여행최저가앱
        </p>
      </footer>
    </main>
  );
};

export default Index;
