import { useMemo, useState } from "react";
import { ArrowRight, Compass, Home, Heart, User } from "lucide-react";
import { partners, categories, type Partner } from "@/data/partners";

const formatKRW = (n: number) =>
  n === 0 ? "0원" : `${n.toLocaleString("ko-KR")}원`;

const Index = () => {
  const [active, setActive] = useState<(typeof categories)[number]>("전체");
  const [tab, setTab] = useState<"home" | "fav" | "my">("home");

  const filtered = useMemo(() => {
    const list =
      active === "전체"
        ? partners
        : partners.filter((p) => p.category === active);
    return [...list].sort((a, b) => b.discount - a.discount);
  }, [active]);

  // 카테고리별 최저가 id 집합 (전체 partners 기준)
  const lowestIds = useMemo(() => {
    const map = new Map<string, Partner>();
    for (const p of partners) {
      const cur = map.get(p.category);
      if (!cur || p.fromPrice < cur.fromPrice) map.set(p.category, p);
    }
    return new Set(Array.from(map.values()).map((p) => p.id));
  }, []);

  const handleClick = (p: Partner) => {
    try {
      const log = JSON.parse(localStorage.getItem("click_log") || "[]");
      log.push({ id: p.id, ts: Date.now() });
      localStorage.setItem("click_log", JSON.stringify(log));
    } catch {}
    window.open(p.deeplink, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-surface pb-24">
      {/* 제휴 고지 */}
      <div className="bg-foreground text-background text-[10.5px] leading-snug px-4 py-1.5 text-center">
        본 페이지는 제휴 마케팅의 일환으로 일정액의 수수료를 제공받습니다.
      </div>

      {/* Top brand */}
      <header className="px-5 pt-4 pb-3 flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
          <Compass className="w-4 h-4 text-primary-foreground" strokeWidth={2.4} />
        </div>
        <h1 className="text-[15px] font-bold text-foreground tracking-tight">
          여행최저가
        </h1>
      </header>

      {/* Hero CTA Card */}
      <section className="px-5">
        <div
          className="relative rounded-[20px] overflow-hidden p-5 shadow-[var(--shadow-card)]"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute right-4 bottom-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <Compass className="w-6 h-6 text-white" strokeWidth={2.2} />
          </div>
          <p className="text-white/85 text-[11px] font-semibold mb-1">
            지금 가장 싼 여행
          </p>
          <h2 className="text-white text-[19px] font-extrabold leading-tight tracking-tight break-keep">
            AI가 비교한
            <br />
            실시간 특가 목록
          </h2>
          <button
            type="button"
            className="mt-3.5 inline-flex items-center gap-1.5 bg-white text-primary text-[12.5px] font-bold rounded-full px-3.5 py-1.5 active:scale-[0.98] transition"
          >
            특가 소식 받기 <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.6} />
          </button>
        </div>
      </section>

      {/* Categories */}
      <nav className="px-5 mt-5">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
          {categories.map((c) => {
            const on = c === active;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold transition-all ${
                  on
                    ? "bg-foreground text-background"
                    : "bg-card text-muted-foreground border border-border"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 실시간 인기 여행 딜 */}
      <section className="px-5 mt-5">
        <div className="flex items-end justify-between mb-3 px-0.5">
          <h3 className="text-[15px] font-bold text-foreground tracking-tight">
            실시간 인기 여행 딜
          </h3>
          <span className="text-[11px] text-muted-foreground font-medium">
            업데이트순
          </span>
        </div>

        <ul className="space-y-2.5">
          {filtered.map((p) => {
            const isLowest = lowestIds.has(p.id);
            return (
              <li key={p.id}>
                <button
                  onClick={() => handleClick(p)}
                  className="w-full bg-card rounded-2xl p-3 flex items-center gap-3 shadow-[var(--shadow-card)] active:scale-[0.99] transition text-left"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover bg-muted shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[9.5px] font-extrabold text-muted-foreground bg-muted px-1.5 py-px rounded">
                        AD
                      </span>
                      <span className="text-[11px] text-muted-foreground font-medium truncate">
                        {p.name} · {p.brand}
                      </span>
                    </div>
                    <p className="text-[13.5px] font-bold text-foreground leading-tight truncate break-keep">
                      {p.description}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-primary text-[14px] font-extrabold tabular-nums">
                        {p.discount}%
                      </span>
                      <span className="text-foreground text-[13px] font-bold tabular-nums">
                        {formatKRW(p.fromPrice)}
                      </span>
                      <span className="text-[10.5px] text-muted-foreground">
                        ~/{p.unit}
                      </span>
                    </div>
                  </div>
                  {isLowest && (
                    <span className="shrink-0 self-start text-[10px] font-bold text-primary bg-primary-soft px-2 py-1 rounded-md">
                      최저가
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-16 text-sm bg-card rounded-2xl border border-border">
            검색 결과가 없어요
          </div>
        )}
      </section>

      {/* Disclosure */}
      <footer className="px-5 mt-7">
        <div className="bg-card rounded-2xl p-4 border border-border space-y-2">
          <p className="text-[12px] font-bold text-foreground">
            제휴 마케팅 안내 (광고)
          </p>
          <p className="text-[11px] leading-relaxed text-muted-foreground break-keep">
            본 서비스의 일부 링크는 링크프라이스 등 제휴 프로그램의 일환이며,
            이용자가 링크를 통해 상품을 구매·예약할 경우 운영자가 광고주로부터
            일정액의 수수료를 받습니다. 표시된 할인율과 가격은 참고용이며
            시점·옵션·환율에 따라 달라질 수 있습니다.
          </p>
          <p className="text-[10px] leading-relaxed text-muted-foreground/80 break-keep">
            *「표시·광고의 공정화에 관한 법률」 및 공정거래위원회
            「추천·보증 등에 관한 표시·광고 심사지침」에 따른 경제적 이해관계 표시
          </p>
        </div>
      </footer>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-card/95 backdrop-blur border-t border-border z-30">
        <div className="max-w-[640px] mx-auto grid grid-cols-3 px-2 pt-1.5 pb-[max(env(safe-area-inset-bottom),8px)]">
          {[
            { key: "home", label: "홈", icon: Home },
            { key: "fav", label: "찜", icon: Heart },
            { key: "my", label: "My", icon: User },
          ].map(({ key, label, icon: Icon }) => {
            const on = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key as typeof tab)}
                className={`flex flex-col items-center gap-0.5 py-1.5 transition-colors ${
                  on ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={on ? 2.4 : 1.8} />
                <span className="text-[10.5px] font-semibold">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </main>
  );
};

export default Index;
