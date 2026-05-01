import hcombineImg from "@/assets/p-hcombine.jpg";
import agodaImg from "@/assets/p-agoda.jpg";
import rakutenImg from "@/assets/p-rakuten.jpg";
import klookImg from "@/assets/p-klook.jpg";
import kkdayImg from "@/assets/p-kkday.jpg";
import myrealtripImg from "@/assets/p-myrealtrip.jpg";
import usimsaImg from "@/assets/p-usimsa.jpg";
import airaloImg from "@/assets/p-airalo.jpg";
import jejupassImg from "@/assets/p-jejupass.jpg";
import rentalcarsImg from "@/assets/p-rentalcars.jpg";
import travelokaImg from "@/assets/p-traveloka.jpg";
import hotelscomImg from "@/assets/p-hotelscom.jpg";
import tripcomImg from "@/assets/p-tripcom.jpg";
import kkdaybitlImg from "@/assets/p-kkdaybitl.jpg";
import ybtourImg from "@/assets/p-ybtour.jpg";
import yanoljaImg from "@/assets/p-yanolja.jpg";

export type Partner = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  deeplink: string;
  /** 파트너사 노출 시작 가격 (KRW). 표시는 "₩{price}~" 형태 */
  fromPrice: number;
  /** 가격 단위 부가 설명 (예: 1박, 1일) */
  unit: string;
  /** 강조 태그 (예: 인기, 특가) */
  tag?: string;
};

export const partners: Partner[] = [
  {
    id: "hcombine2",
    name: "호텔스컴바인",
    category: "호텔",
    description: "전 세계 호텔 최저가 비교",
    image: hcombineImg,
    deeplink: "https://linkmoa.kr/click.php?m=hcombine2&a=A100704224&l=0000",
    fromPrice: 38900,
    unit: "1박",
    tag: "인기",
  },
  {
    id: "agoda",
    name: "아고다",
    category: "호텔",
    description: "아시아 호텔 특가",
    image: agodaImg,
    deeplink: "https://linkmoa.kr/click.php?m=agoda&a=A100704224&l=0000",
    fromPrice: 32000,
    unit: "1박",
    tag: "특가",
  },
  {
    id: "rakutentr",
    name: "라쿠텐 트래블",
    category: "호텔",
    description: "일본 호텔·료칸 예약",
    image: rakutenImg,
    deeplink: "https://linkmoa.kr/click.php?m=rakutentr&a=A100704224&l=0000",
    fromPrice: 54000,
    unit: "1박",
  },
  {
    id: "klook",
    name: "클룩",
    category: "투어·액티비티",
    description: "현지 투어와 입장권",
    image: klookImg,
    deeplink: "https://linkmoa.kr/click.php?m=klook&a=A100704224&l=0000",
    fromPrice: 4900,
    unit: "1인",
    tag: "인기",
  },
  {
    id: "kkday",
    name: "케이케이데이",
    category: "투어·액티비티",
    description: "글로벌 액티비티 예약",
    image: kkdayImg,
    deeplink: "https://linkmoa.kr/click.php?m=kkday&a=A100704224&l=0000",
    fromPrice: 5500,
    unit: "1인",
  },
  {
    id: "myrealtrip",
    name: "마이리얼트립",
    category: "투어·액티비티",
    description: "국내외 가이드 투어",
    image: myrealtripImg,
    deeplink: "https://linkmoa.kr/click.php?m=myrealtrip&a=A100704224&l=0000",
    fromPrice: 9900,
    unit: "1인",
  },
  {
    id: "usimsa",
    name: "유심사",
    category: "유심·eSIM",
    description: "해외 데이터 유심",
    image: usimsaImg,
    deeplink: "https://linkmoa.kr/click.php?m=usimsa&a=A100704224&l=0000",
    fromPrice: 3900,
    unit: "1일",
    tag: "특가",
  },
  {
    id: "airalo",
    name: "Airalo",
    category: "유심·eSIM",
    description: "전 세계 eSIM",
    image: airaloImg,
    deeplink: "https://linkmoa.kr/click.php?m=airalo&a=A100704224&l=0000",
    fromPrice: 4500,
    unit: "1GB",
  },
  {
    id: "jejupass",
    name: "제주패스",
    category: "렌터카",
    description: "제주 렌터카 최저가",
    image: jejupassImg,
    deeplink: "https://linkmoa.kr/click.php?m=jejupass&a=A100704224&l=0000",
    fromPrice: 19000,
    unit: "1일",
    tag: "인기",
  },
  {
    id: "rentalcars",
    name: "렌탈카스",
    category: "렌터카",
    description: "전 세계 렌터카",
    image: rentalcarsImg,
    deeplink: "https://linkmoa.kr/click.php?m=rentalcars&a=A100704224&l=0000",
    fromPrice: 24000,
    unit: "1일",
  },
  {
    id: "traveloka",
    name: "트래블로카",
    category: "호텔",
    description: "동남아 호텔·항공 통합 예약",
    image: travelokaImg,
    deeplink: "https://bitl.bz/6BQjrg",
    fromPrice: 28900,
    unit: "1박",
    tag: "특가",
  },
  {
    id: "hotelscom",
    name: "호텔스닷컴",
    category: "호텔",
    description: "10박 시 1박 무료 리워드",
    image: hotelscomImg,
    deeplink: "https://bitl.bz/ZSDxnD",
    fromPrice: 41000,
    unit: "1박",
  },
  {
    id: "tripcom",
    name: "트립닷컴",
    category: "호텔",
    description: "글로벌 호텔·항공 최저가",
    image: tripcomImg,
    deeplink: "https://bitl.bz/LZshFb",
    fromPrice: 35000,
    unit: "1박",
    tag: "인기",
  },
  {
    id: "kkdaybitl",
    name: "KKday",
    category: "투어·액티비티",
    description: "현지인이 만든 액티비티",
    image: kkdaybitlImg,
    deeplink: "https://bitl.bz/iuiVKb",
    fromPrice: 5200,
    unit: "1인",
  },
  {
    id: "ybtour",
    name: "노랑풍선",
    category: "투어·액티비티",
    description: "패키지·자유여행 전문",
    image: ybtourImg,
    deeplink: "https://bitl.bz/76LUrd",
    fromPrice: 12900,
    unit: "1인",
  },
  {
    id: "yanolja",
    name: "야놀자",
    category: "호텔",
    description: "국내 숙소·레저 1위",
    image: yanoljaImg,
    deeplink: "https://bitl.bz/NqRYRy",
    fromPrice: 29000,
    unit: "1박",
    tag: "인기",
  },
];

export const categories = [
  "전체",
  "호텔",
  "투어·액티비티",
  "유심·eSIM",
  "렌터카",
] as const;
