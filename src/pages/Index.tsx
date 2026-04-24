import { useMemo, useState } from "react";
import { Search, ArrowUpRight, Sparkles, TrendingDown, Info } from "lucide-react";
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
    () =>
      filtered.reduce(
        (m, p) => (m === null || p.fromPrice < m ? p.fromPrice : m),
        null as number | null
      ),
    [filtered]
  );

  const highest = useMemo(
    () => filtered.reduce((m, p) => (p.fromPrice > m ? p.fromPrice : m), 0),
    [filtered]
  );

  // 비교용 정렬 (낮은 가격순 Top 3)
  const compareTop = useMemo(
    () => [...filtered].sort((a, b) => a.fromPrice - b.fromPrice).slice(0, 3),
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
    <main className="min-h-screen bg-surface pb-16">
      {/* 제휴 고지 (공정위 추천·보증 심사지침 / 표시광고법) */}
      <div className="bg-foreground text-background text-[11px] leading-snug px-4 py-1.5 text-center">
        본 페이지는 제휴 마케팅 활동의 일환으로 일정액의 수수료를 제공받습니다.
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary via-[hsl(217,100%,55%)] to-[hsl(225,100%,62%)] text-primary-foreground px-5 pt-10 pb-9 rounded-b-[28px]">
        <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 w-56 h-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide bg-white/15 backdrop-blur px-2.5 py-1 rounded-full mb-3.5">
            <Sparkles className="w-3 h-3" />
            <span>여행 최저가 모음</span>
          </div>
          <h1 className="text-[24px] font-bold leading-[1.25] tracking-tight break-keep">
            여행, 가장 싸게
            <br />
            한 번에 비교해요
          </h1>
          <p className="mt-2 text-[13px] opacity-85 break-keep">
            호텔·투어·eSIM·렌터카까지 검증된 파트너만 모았어요
          </p>

          <div className="mt-5 flex items-center gap-2 bg-card text-foreground rounded-2xl px-4 py-3 shadow-[var(--shadow-card)]">
            <Search className="w-[18px] h-[18px] text-muted-foreground shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="브랜드·서비스 검색"
              className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-muted-foreground min-w-0"
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
                className={`shrink-0 px-3.5 py-2 rounded-full text-[13px] font-semibold transition-all ${
                  on
                    ? "bg-foreground text-background shadow-[var(--shadow-soft)]"
                    : "bg-card text-muted-foreground border border-border"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 최저가 비교 카드 */}
      {compareTop.length > 0 && (
        <section className="px-5 mt-4">
          <div className="bg-card border border-border rounded-2xl p-4 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-primary" />
                <h2 className="text-[13px] font-bold text-foreground">
                  {active === "전체" ? "전체" : active} 최저가 TOP 3
                </h2>
              </div>
              <span className="text-[11px] text-muted-foreground font-medium">
                {filtered.length}곳 비교
              </span>
            </div>

            <div className="space-y-2">
              {compareTop.map((p, idx) => {
                const pct =
                  highest > 0
                    ? Math.max(0.18, p.fromPrice / highest)
                    : 1;
                const isFirst = idx === 0;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleClick(p.id, p.deeplink)}
                    className="w-full text-left active:opacity-70 transition-opacity"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className={`text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                            isFirst
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="text-[13px] font-semibold text-foreground truncate">
                          {p.name}
                        </span>
                      </div>
                      <span
                        className={`text-[13px] font-bold tabular-nums shrink-0 ml-2 ${
                          isFirst ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {formatKRW(p.fromPrice)}
                        <span className="text-[10px] font-medium text-muted-foreground ml-0.5">
                          /{p.unit}
                        </span>
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isFirst ? "bg-primary" : "bg-foreground/30"
                        }`}
                        style={{ width: `${pct * 100}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* List */}
      <section className="px-5 mt-3">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h2 className="text-[13px] font-bold text-foreground">전체 파트너</h2>
          <span className="text-[11px] text-muted-foreground">
            가격 낮은 순
          </span>
        </div>

        <div className="space-y-2">
          {[...filtered]
            .sort((a, b) => a.fromPrice - b.fromPrice)
            .map((p) => {
              const isLowest = p.fromPrice === lowest;
              return (
                <button
                  key={p.id}
                  onClick={() => handleClick(p.id, p.deeplink)}
                  className="w-full bg-card rounded-2xl p-3 flex items-center gap-3 shadow-[var(--shadow-soft)] border border-border/60 active:scale-[0.99] transition-transform text-left"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={52}
                    height={52}
                    className="w-[52px] h-[52px] rounded-2xl object-cover bg-muted shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-bold text-[14px] text-foreground truncate">
                        {p.name}
                      </h3>
                      {isLowest && (
                        <span className="text-[10px] font-bold text-primary-foreground bg-primary px-1.5 py-px rounded">
                          최저가
                        </span>
                      )}
                      {p.tag && !isLowest && (
                        <span className="text-[10px] font-bold text-primary bg-primary-soft px-1.5 py-px rounded">
                          {p.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[11.5px] text-muted-foreground truncate mt-0.5">
                      {p.description}
                    </p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span
                        className={`text-[14px] font-bold tracking-tight tabular-nums ${
                          isLowest ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {formatKRW(p.fromPrice)}
                      </span>
                      <span className="text-[10.5px] text-muted-foreground">
                        ~ /{p.unit}
                      </span>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </button>
              );
            })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-16 text-sm bg-card rounded-2xl border border-border">
            검색 결과가 없어요
          </div>
        )}
      </section>

      {/* Disclosure */}
      <footer className="px-5 mt-7">
        <div className="bg-card rounded-2xl p-4 border border-border space-y-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-muted-foreground" />
            <p className="text-[12px] font-bold text-foreground">
              제휴 마케팅 안내 (광고)
            </p>
          </div>
          <p className="text-[11.5px] leading-relaxed text-muted-foreground break-keep">
            본 서비스의 일부 링크는 링크프라이스(LinkPrice) 등 제휴 마케팅
            프로그램의 일환으로 제공되며, 이용자가 링크를 통해 상품을 구매·예약할
            경우 운영자가 광고주로부터 일정액의 수수료를 받습니다.
          </p>
          <p className="text-[11.5px] leading-relaxed text-muted-foreground break-keep">
            표시된 가격은 참고용 시작가이며 시점·옵션·환율에 따라 달라질 수 있습니다.
            실제 가격·재고·환불·취소 정책은 각 파트너사 정책을 따릅니다.
          </p>
          <p className="text-[10.5px] leading-relaxed text-muted-foreground/80 break-keep pt-1">
            * 본 고지는 「표시·광고의 공정화에 관한 법률」 및 공정거래위원회
            「추천·보증 등에 관한 표시·광고 심사지침」에 따른 경제적 이해관계 표시입니다.
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
