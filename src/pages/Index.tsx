import { useMemo, useState } from "react";
import { Search, Home, Heart, User } from "lucide-react";
import { partners, categories, type Partner } from "@/data/partners";
import heroImg from "@/assets/hero-traveler.jpg";
import brandLogo from "@/assets/brand-logo.png";

const formatKRW = (n: number) => `₩${n.toLocaleString("ko-KR")}`;

const Index = () => {
  const [active, setActive] = useState<(typeof categories)[number]>("전체");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"home" | "fav" | "my">("home");

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

  const popular = useMemo(
    () => [...partners].sort((a, b) => a.fromPrice - b.fromPrice).slice(0, 6),
    []
  );

  // 카테고리별 그룹핑
  const groups = useMemo(() => {
    const order = categories.filter((c) => c !== "전체");
    return order
      .map((cat) => ({
        cat,
        items: filtered.filter((p) => p.category === cat),
      }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const handleClick = (p: Partner) => {
    try {
      const log = JSON.parse(localStorage.getItem("click_log") || "[]");
      log.push({ id: p.id, ts: Date.now() });
      localStorage.setItem("click_log", JSON.stringify(log));
    } catch {}
    window.open(p.deeplink, "_blank", "noopener,noreferrer");
  };

  const tagColor = (tag?: string) => {
    if (tag === "인기") return "bg-primary text-primary-foreground";
    if (tag === "특가") return "bg-destructive text-destructive-foreground";
    return "bg-foreground text-background";
  };

  return (
    <main className="min-h-screen bg-surface pb-24">
      {/* 제휴 고지 */}
      <div className="bg-foreground text-background text-[10.5px] leading-snug px-4 py-1.5 text-center">
        본 페이지는 제휴 마케팅의 일환으로 일정액의 수수료를 제공받습니다.
      </div>

      {/* Top brand (앱 네비게이션 - 로고 + 앱이름 항상 노출) */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
        <div className="px-5 pt-[max(env(safe-area-inset-top),10px)] pb-2.5 flex items-center gap-2">
          <img
            src={brandLogo}
            alt="떠나요 앱 로고"
            width={28}
            height={28}
            className="w-7 h-7 rounded-[8px]"
          />
          <h1 className="text-[15px] font-bold text-foreground tracking-tight">
            떠나요
          </h1>
        </div>
      </header>

      {/* Hero banner */}
      <section className="px-5">
        <div className="relative rounded-[20px] overflow-hidden aspect-[16/9] shadow-[var(--shadow-card)]">
          <img
            src={heroImg}
            alt="여행, 가장 저렴하게 떠나는 방법"
            width={1024}
            height={576}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <span className="text-[10.5px] font-semibold text-white/85 mb-1">
              오늘의 추천
            </span>
            <h2 className="text-white text-[18px] font-bold leading-[1.25] tracking-tight break-keep">
              여행, 가장 저렴하게
              <br />
              떠나는 방법
            </h2>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="px-5 mt-3">
        <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2.5 shadow-[var(--shadow-soft)]">
          <Search className="w-[16px] h-[16px] text-muted-foreground shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="어떤 여행 서비스를 찾으세요?"
            className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-muted-foreground min-w-0"
          />
        </div>
      </section>

      {/* 인기 가로 스크롤 */}
      <section className="mt-5">
        <h3 className="px-5 text-[14px] font-bold text-foreground mb-2.5">
          지금 가장 인기있어요
        </h3>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-5 pb-1">
          {popular.map((p) => (
            <button
              key={p.id}
              onClick={() => handleClick(p)}
              className="shrink-0 w-[140px] text-left active:scale-[0.98] transition-transform"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-[var(--shadow-soft)]">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={140}
                  height={175}
                  className="w-full h-full object-cover"
                />
                {p.tag && (
                  <span
                    className={`absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${tagColor(p.tag)}`}
                  >
                    {p.tag}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-2.5 pt-8">
                  <p className="text-white text-[13px] font-bold leading-tight truncate">
                    {p.name}
                  </p>
                  <p className="text-white/80 text-[10.5px] truncate mt-0.5">
                    {p.description}
                  </p>
                  <p className="text-white text-[11px] font-semibold mt-1 tabular-nums">
                    {formatKRW(p.fromPrice)}
                    <span className="opacity-70 font-medium">~/{p.unit}</span>
                  </p>
                </div>
              </div>
            </button>
          ))}
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

      {/* 카테고리별 그룹 리스트 */}
      <section className="px-5 mt-5 space-y-5">
        {groups.map((g) => (
          <div key={g.cat}>
            <h3 className="text-[13.5px] font-bold text-foreground mb-2 px-0.5">
              {g.cat}
            </h3>
            <div className="bg-card rounded-2xl border border-border/60 shadow-[var(--shadow-soft)] divide-y divide-border/60 overflow-hidden">
              {g.items
                .sort((a, b) => a.fromPrice - b.fromPrice)
                .map((p, idx) => {
                  const isMin = idx === 0 && g.items.length > 1;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleClick(p)}
                      className="w-full px-3 py-2.5 flex items-center gap-3 active:bg-muted transition-colors text-left"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        width={44}
                        height={44}
                        className="w-11 h-11 rounded-xl object-cover bg-muted shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-bold text-[13.5px] text-foreground truncate">
                            {p.name}
                          </h4>
                          {isMin && (
                            <span className="text-[9.5px] font-bold text-primary bg-primary-soft px-1.5 py-px rounded">
                              최저가
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                          {p.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p
                          className={`text-[13px] font-bold tabular-nums ${
                            isMin ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {formatKRW(p.fromPrice)}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          ~ /{p.unit}
                        </p>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}

        {groups.length === 0 && (
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
            일정액의 수수료를 받습니다. 표시된 가격은 참고용 시작가이며
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
                <Icon className={`w-5 h-5 ${on ? "fill-foreground/0" : ""}`} strokeWidth={on ? 2.4 : 1.8} />
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
