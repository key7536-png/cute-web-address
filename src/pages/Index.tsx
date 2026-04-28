import { useMemo, useState } from "react";
import { ChevronLeft, MoreHorizontal, Search, Home, Heart, User } from "lucide-react";
import { partners, categories, type Partner } from "@/data/partners";
import brandLogo from "@/assets/brand-logo.png";

const formatKRW = (n: number) => `₩${n.toLocaleString("ko-KR")}`;

// ✅ 토스 미니앱 종료 함수
const closeMiniApp = () => {
  try {
    // Toss bridge 환경
    if (window.location !== window.parent.location) {
      window.parent.postMessage({ type: "MINI_APP_CLOSE" }, "*");
    }
    // 히스토리가 없으면 창 닫기
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

  // ✅ 공유 기능: intoss:// 스킴 사용
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

      {/* ✅ 토스 비게임 내비게이션 바
          [좌] 뒤로가기(<)  [중앙] 브랜드로고 + 앱이름  [우] 더보기(⋯) */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="px-2 pt-[max(env(safe-area-inset-top),0px)] h-[52px] flex items-center justify-between">

          {/* 좌측: 뒤로가기 버튼 */}
          <button
            onClick={closeMiniApp}
            aria-label="뒤로가기"
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2.2} />
          </button>

          {/* 중앙: 브랜드 로고 + 미니앱 이름(국문) - 필수 */}
          <div className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
            <img
              src={brandLogo}
              alt="떠나요 로고"
              width={24}
              height={24}
              className="w-6 h-6 rounded-[7px]"
            />
            <span className="text-[16px] font-bold text-gray-900 tracking-tight">
              떠나요
            </span>
          </div>

          {/* 우측: 더보기(⋯) — 토스 공통 기능(신고, 공유) */}
          <button
            onClick={() => setShowMore(true)}
            aria-label="더보기"
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
          >
            <MoreHorizontal className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </header>

      {/* Hero banner */}
      <section className="bg-gradient-to-b from-[hsl(265_65%_90%)] via-[hsl(260_55%_94%)] to-[hsl(255_50%_98%)] px-5 pt-5 pb-6">
        <span className="inline-block text-[11.5px] font-bold text-foreground bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/70 shadow-sm">
          오늘의 여행, 가장 합리적으로
        </span>
        <h2 className="mt-4 text-foreground text-[30px] font-extrabold leading-[1.15] tracking-tight break-keep">
          떠나는 모든 순간,
          <br />
          최저가의 기준
        </h2>
        <p className="mt-3 text-[13.5px] leading-relaxed text-foreground/75 break-keep">
          숙소부터 eSIM, 투어, 렌터카까지 — 신뢰할 수 있는 브랜드의 가격을 한 화면에서 비교해보세요.
        </p>
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
      <footer className="px-5 mt-7 mb-4">
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

      {/* ✅ 토스 스타일 플로팅 탭바
          - 화면 좌우에서 띄운 형태 (full-width X)
          - 둥근 pill 모양, 그림자 적용 */}
      <nav className="fixed bottom-0 inset-x-0 z-30 flex justify-center pb-[max(env(safe-area-inset-bottom),16px)] px-6 pointer-events-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-2 py-1">
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
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  <Icon
                    className="w-[22px] h-[22px]"
                    strokeWidth={on ? 2.4 : 1.8}
                  />
                  <span className={`text-[10px] font-semibold ${on ? "text-gray-900" : "text-gray-400"}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ✅ 더보기(⋯) 바텀시트 — 토스 공통 기능(신고, 공유) */}
      {showMore && (
        <>
          {/* 딤 */}
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setShowMore(false)}
          />
          {/* 시트 */}
          <div className="fixed bottom-0 inset-x-0 z-50 bg-white rounded-t-[24px] pb-[max(env(safe-area-inset-bottom),24px)] shadow-[0_-4px_24px_rgba(0,0,0,0.1)]">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-4" />
            <button
              onClick={handleShare}
              className="w-full px-6 py-4 flex items-center gap-3 text-[15px] font-medium text-gray-800 active:bg-gray-50 transition-colors"
            >
              공유하기
            </button>
            <div className="h-px bg-gray-100 mx-6" />
            <button
              onClick={handleReport}
              className="w-full px-6 py-4 flex items-center gap-3 text-[15px] font-medium text-red-500 active:bg-gray-50 transition-colors"
            >
              신고하기
            </button>
            <div className="h-px bg-gray-100 mx-6" />
            <button
              onClick={() => setShowMore(false)}
              className="w-full px-6 py-4 flex items-center justify-center text-[15px] font-medium text-gray-500 active:bg-gray-50 transition-colors"
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
