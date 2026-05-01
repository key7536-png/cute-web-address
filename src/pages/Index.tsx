import { useMemo, useState } from "react";
import { ChevronLeft, MoreHorizontal, Search, Home, Heart, User, Sparkles, MapPin } from "lucide-react";
import { partners, categories, type Partner } from "@/data/partners";
import brandLogo from "@/assets/brand-logo.png";
import heroImg from "@/assets/hero-travel.jpg";

const formatKRW = (n: number) => `₩${n.toLocaleString("ko-KR")}`;

const closeMiniApp = () => {
  try {
    if (window.location !== window.parent.location) {
      window.parent.postMessage({ type: "MINI_APP_CLOSE" }, "*");
    }
    if (window.history.length <= 1) {
      window.close();
    } else {
      window.history.back();
    }
  } catch {
    window.history.back();
  }
};

const Index = () => {
  const [active, setActive] = useState<(typeof categories)[number]>("전체");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"home" | "fav" | "my">("home");
  const [showMore, setShowMore] = useState(false);

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

  const featured = popular[0];

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

  const tagStyle = (tag?: string) => {
    if (tag === "인기") return "bg-gradient-ember text-primary-foreground";
    if (tag === "특가") return "bg-foreground text-background";
    return "bg-white/90 text-foreground backdrop-blur";
  };

  const handleShare = () => {
    setShowMore(false);
    const shareUrl = "intoss://share?url=" + encodeURIComponent(window.location.href);
    try {
      window.location.href = shareUrl;
    } catch {
      if (navigator.share) {
        navigator.share({ title: "떠나요", url: window.location.href });
      }
    }
  };

  const handleReport = () => {
    setShowMore(false);
    alert("신고가 접수되었습니다.");
  };

  return (
    <main className="min-h-screen bg-surface pb-32">
      {/* 제휴 고지 */}
      <div className="bg-foreground text-background text-[10.5px] leading-snug px-4 py-1.5 text-center">
        본 페이지는 제휴 마케팅의 일환으로 일정액의 수수료를 제공받습니다.
      </div>

      {/* 토스 비게임 헤더 */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="px-2 pt-[max(env(safe-area-inset-top),0px)] h-[52px] flex items-center justify-between">
          <button
            onClick={closeMiniApp}
            aria-label="뒤로가기"
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-muted transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" strokeWidth={2.2} />
          </button>

          <div className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
            <img
              src={brandLogo}
              alt="떠나요 로고"
              width={24}
              height={24}
              className="w-6 h-6 rounded-[7px]"
            />
            <span className="text-[16px] font-bold text-foreground tracking-tight">
              떠나요
            </span>
          </div>

          <button
            onClick={() => setShowMore(true)}
            aria-label="더보기"
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-muted transition-colors"
          >
            <MoreHorizontal className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </header>

      {/* 🌅 Hero — 노을 그라데이션 */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-sunset" />
        {/* 노을 위 별 효과 */}
        <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-white rounded-full opacity-80 animate-float" />
        <div className="absolute top-12 right-20 w-1 h-1 bg-white rounded-full opacity-60" />
        <div className="absolute top-20 right-12 w-0.5 h-0.5 bg-white rounded-full opacity-90" />
        {/* 부드러운 페이드 */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-surface" />

        <div className="relative px-5 pt-7 pb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 shadow-soft">
            <Sparkles className="w-3 h-3" />
            오늘의 여행, 가장 합리적으로
          </div>
          <h2 className="mt-5 text-white text-[34px] font-extrabold leading-[1.1] tracking-tight break-keep drop-shadow-sm">
            떠나는 모든 순간,
            <br />
            <span className="italic font-black">최저가의 기준.</span>
          </h2>
          <p className="mt-4 text-[13.5px] leading-relaxed text-white/90 break-keep max-w-[88%]">
            숙소·eSIM·투어·렌터카까지 — 신뢰할 수 있는 브랜드의 가격을 한 화면에서 비교하세요.
          </p>

          {/* 검색 — 히어로 위에 띄움 */}
          <div className="mt-6 flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-float">
            <Search className="w-[18px] h-[18px] text-muted-foreground shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="어디로 떠날까요?"
              className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-muted-foreground min-w-0 font-medium"
            />
          </div>
        </div>
      </section>

      {/* ✨ 피처드 — 매거진 스타일 큰 카드 */}
      {featured && (
        <section className="px-5 -mt-4 relative z-10 animate-fade-in">
          <button
            onClick={() => handleClick(featured)}
            className="block w-full text-left active:scale-[0.99] transition-transform"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-float">
              <img
                src={featured.image}
                alt={featured.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/95 text-foreground backdrop-blur">
                  ⭐ 에디터 픽
                </span>
                {featured.tag && (
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${tagStyle(featured.tag)}`}>
                    {featured.tag}
                  </span>
                )}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-1 text-white/80 text-[10.5px] font-medium mb-1.5">
                  <MapPin className="w-3 h-3" />
                  {featured.category}
                </div>
                <h3 className="text-white text-[22px] font-extrabold leading-tight tracking-tight">
                  {featured.name}
                </h3>
                <p className="text-white/85 text-[12.5px] mt-1">
                  {featured.description}
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-white/70 text-[10px] font-medium">최저가</p>
                    <p className="text-white text-[20px] font-extrabold tabular-nums leading-none mt-0.5">
                      {formatKRW(featured.fromPrice)}
                      <span className="text-[12px] font-semibold opacity-80"> ~/{featured.unit}</span>
                    </p>
                  </div>
                  <div className="bg-white text-foreground text-[12px] font-bold px-4 py-2 rounded-full shadow-glow">
                    바로가기 →
                  </div>
                </div>
              </div>
            </div>
          </button>
        </section>
      )}

      {/* 🔥 인기 가로 스크롤 */}
      <section className="mt-7">
        <div className="flex items-baseline justify-between px-5 mb-3">
          <h3 className="text-[15px] font-extrabold text-foreground tracking-tight">
            지금 가장 인기있어요
          </h3>
          <span className="text-[10.5px] text-muted-foreground font-medium">실시간</span>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
          {popular.slice(1).map((p, i) => (
            <button
              key={p.id}
              onClick={() => handleClick(p)}
              className="shrink-0 w-[150px] text-left active:scale-[0.97] transition-transform animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-card">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {p.tag && (
                  <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${tagStyle(p.tag)}`}>
                    {p.tag}
                  </span>
                )}
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/30 backdrop-blur flex items-center justify-center">
                  <span className="text-white text-[11px] font-extrabold">{i + 2}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-10">
                  <p className="text-white text-[13px] font-bold leading-tight truncate">
                    {p.name}
                  </p>
                  <p className="text-white text-[12px] font-extrabold mt-1 tabular-nums">
                    {formatKRW(p.fromPrice)}
                    <span className="opacity-75 font-medium text-[10px]">~</span>
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 카테고리 칩 */}
      <nav className="px-5 mt-7">
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1">
          {categories.map((c) => {
            const on = c === active;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`shrink-0 px-4 py-2 rounded-full text-[12.5px] font-bold transition-all ${
                  on
                    ? "bg-foreground text-background shadow-card"
                    : "bg-card text-muted-foreground border border-border hover:border-primary/30"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 카테고리별 그룹 */}
      <section className="px-5 mt-5 space-y-6">
        {groups.map((g, gi) => (
          <div key={g.cat} className="animate-fade-in" style={{ animationDelay: `${gi * 80}ms` }}>
            <div className="flex items-baseline justify-between mb-2.5 px-0.5">
              <h3 className="text-[15px] font-extrabold text-foreground tracking-tight">
                {g.cat}
              </h3>
              <span className="text-[10.5px] text-muted-foreground font-medium">
                {g.items.length}개 비교
              </span>
            </div>
            <div className="bg-card rounded-2xl border border-border/60 shadow-card overflow-hidden">
              {g.items
                .sort((a, b) => a.fromPrice - b.fromPrice)
                .map((p, idx) => {
                  const isMin = idx === 0 && g.items.length > 1;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleClick(p)}
                      className={`w-full px-3.5 py-3 flex items-center gap-3 active:bg-muted/60 transition-colors text-left ${
                        idx > 0 ? "border-t border-border/50" : ""
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="w-12 h-12 rounded-xl object-cover bg-muted"
                        />
                        {isMin && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-ember flex items-center justify-center shadow-glow">
                            <Sparkles className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-bold text-[14px] text-foreground truncate">
                            {p.name}
                          </h4>
                          {isMin && (
                            <span className="text-[9.5px] font-extrabold text-primary bg-primary-soft px-1.5 py-0.5 rounded-md">
                              최저가
                            </span>
                          )}
                          {p.tag && !isMin && (
                            <span className="text-[9.5px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md">
                              {p.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11.5px] text-muted-foreground truncate mt-0.5">
                          {p.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p
                          className={`text-[14px] font-extrabold tabular-nums leading-none ${
                            isMin ? "text-gradient-sunset" : "text-foreground"
                          }`}
                        >
                          {formatKRW(p.fromPrice)}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1">
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
      <footer className="px-5 mt-8 mb-4">
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

      {/* 플로팅 탭바 */}
      <nav className="fixed bottom-0 inset-x-0 z-30 flex justify-center pb-[max(env(safe-area-inset-bottom),16px)] px-6 pointer-events-none">
        <div className="pointer-events-auto bg-background/95 backdrop-blur-xl border border-border rounded-[28px] shadow-float px-2 py-1">
          <div className="flex items-center gap-1">
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
                  className={`flex flex-col items-center gap-0.5 px-6 py-2 rounded-[22px] transition-all ${
                    on
                      ? "bg-primary-soft text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon
                    className="w-[22px] h-[22px]"
                    strokeWidth={on ? 2.4 : 1.8}
                  />
                  <span className={`text-[10px] font-bold ${on ? "text-primary" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 더보기 바텀시트 */}
      {showMore && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50 animate-fade-in"
            onClick={() => setShowMore(false)}
          />
          <div className="fixed bottom-0 inset-x-0 z-50 bg-background rounded-t-[24px] pb-[max(env(safe-area-inset-bottom),24px)] shadow-float animate-scale-in">
            <div className="w-10 h-1 bg-border rounded-full mx-auto mt-3 mb-4" />
            <button
              onClick={handleShare}
              className="w-full px-6 py-4 flex items-center gap-3 text-[15px] font-medium text-foreground active:bg-muted transition-colors"
            >
              공유하기
            </button>
            <div className="h-px bg-border mx-6" />
            <button
              onClick={handleReport}
              className="w-full px-6 py-4 flex items-center gap-3 text-[15px] font-medium text-destructive active:bg-muted transition-colors"
            >
              신고하기
            </button>
            <div className="h-px bg-border mx-6" />
            <button
              onClick={() => setShowMore(false)}
              className="w-full px-6 py-4 flex items-center justify-center text-[15px] font-medium text-muted-foreground active:bg-muted transition-colors"
            >
              닫기
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default Index;
