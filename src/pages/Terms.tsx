import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-surface pb-20">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="px-2 pt-[max(env(safe-area-inset-top),0px)] h-[52px] flex items-center">
          <button
            onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
            aria-label="뒤로가기"
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2.2} />
          </button>
          <h1 className="text-[16px] font-bold text-gray-900 tracking-tight absolute left-1/2 -translate-x-1/2">
            서비스 이용약관
          </h1>
        </div>
      </header>

      <article className="px-5 py-6 max-w-2xl mx-auto text-foreground">
        <h2 className="text-[22px] font-extrabold leading-tight mb-2">서비스 이용약관</h2>
        <p className="text-[12px] text-muted-foreground mb-6">시행일자: 2026년 5월 1일</p>

        <section className="space-y-6 text-[13.5px] leading-relaxed break-keep">
          <div>
            <h3 className="font-bold text-[15px] mb-2">제1조 (목적)</h3>
            <p>본 약관은 떠나요(이하 "서비스")가 제공하는 숙박, 항공, 여행 관련 서비스 이용에 관한 조건 및 절차를 규정함을 목적으로 합니다.</p>
          </div>

          <div>
            <h3 className="font-bold text-[15px] mb-2">제2조 (서비스 내용)</h3>
            <p className="mb-2">서비스는 다음과 같은 여행 관련 서비스를 제공합니다.</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>숙박 예약 서비스</li>
              <li>항공권 예약 서비스</li>
              <li>여행 패키지 추천 서비스</li>
              <li>여행 관련 부가 서비스</li>
            </ol>
          </div>

          <div>
            <h3 className="font-bold text-[15px] mb-2">제3조 (이용 계약 체결)</h3>
            <p>① 이용자는 본 약관에 동의함으로써 서비스 이용 계약을 체결합니다.</p>
            <p>② 서비스는 토스 로그인을 통해 이용할 수 있습니다.</p>
          </div>

          <div>
            <h3 className="font-bold text-[15px] mb-2">제4조 (예약 및 취소)</h3>
            <p>① 예약은 결제 완료 시점에 확정됩니다.</p>
            <p>② 취소 및 환불은 각 상품의 취소 정책에 따릅니다.</p>
            <p>③ 항공권 및 숙박 예약의 취소 수수료는 상품별로 상이할 수 있습니다.</p>
          </div>

          <div>
            <h3 className="font-bold text-[15px] mb-2">제5조 (이용자 의무)</h3>
            <p>① 이용자는 허위 정보를 입력해서는 안 됩니다.</p>
            <p>② 타인의 정보를 도용하여 서비스를 이용해서는 안 됩니다.</p>
          </div>

          <div>
            <h3 className="font-bold text-[15px] mb-2">제6조 (서비스 변경 및 중단)</h3>
            <p>서비스는 운영상 필요한 경우 서비스 내용을 변경하거나 중단할 수 있으며, 이 경우 사전에 공지합니다.</p>
          </div>

          <div>
            <h3 className="font-bold text-[15px] mb-2">제7조 (면책조항)</h3>
            <p>① 서비스는 항공사, 숙박업체 등 제3자의 사정으로 인한 예약 변경 및 취소에 대해 책임을 지지 않습니다.</p>
            <p>② 천재지변 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.</p>
          </div>

          <div>
            <h3 className="font-bold text-[15px] mb-2">부칙</h3>
            <p>본 약관은 2026년 5월 1일부터 적용됩니다.</p>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Terms;
