import { useMemo, useState } from "react";
import { Search, ChevronRight, Plane } from "lucide-react";
import { partners, categories } from "@/data/partners";

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
      <header className="bg-gradient-to-br from-primary to-[hsl(217,100%,60%)] text-primary-foreground px-5 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-2 text-sm/none opacity-90 mb-3">
          <Plane className="w-4 h-4" />
          <span>여행최저가앱</span>
        </div>
        <h1 className="text-2xl font-bold leading-tight tracking-tight">
          여행, 가장 싸게
          <br />
          한 번에 비교해요
        </h1>
        <p className="mt-2 text-sm opacity-90">
          호텔·투어·eSIM·렌터카까지 최저가 파트너 모음
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
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  on
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground border border-border"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </nav>

      {/* List */}
      <section className="px-5 mt-4 bg-card rounded-2xl divide-y divide-border overflow-hidden shadow-[var(--shadow-soft)]">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => handleClick(p.id, p.deeplink)}
            className="w-full px-4 py-3 flex items-center gap-3 active:bg-muted transition-colors text-left"
          >
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              width={40}
              height={40}
              className="w-10 h-10 rounded-xl object-cover shrink-0 bg-muted"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[15px] text-foreground truncate">{p.name}</h3>
              <p className="text-[12px] text-muted-foreground truncate mt-0.5">{p.description}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-16 text-sm">
            검색 결과가 없어요
          </div>
        )}
      </section>

      {/* Disclosure (TDS / 공정위 표시광고법 대응) */}
      <footer className="px-5 mt-8">
        <div className="bg-card rounded-2xl p-4 text-[12px] leading-relaxed text-muted-foreground border border-border">
          <p className="font-semibold text-foreground mb-1">광고 표시 안내</p>
          <p>
            본 서비스는 제휴 마케팅(링크프라이스)의 일환으로 이용자가 링크를 통해
            상품을 구매할 경우 운영자가 일정 수수료를 제공받을 수 있습니다.
            상품 가격·재고·정책은 각 파트너사의 정책을 따릅니다.
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
