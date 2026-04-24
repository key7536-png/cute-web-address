import hotelscombinedImg from "@/assets/hotelscombined.jpg";
import agodaImg from "@/assets/agoda.jpg";
import rakutenImg from "@/assets/rakuten.jpg";
import klookImg from "@/assets/klook.jpg";
import kkdayImg from "@/assets/kkday.jpg";
import myrealtripImg from "@/assets/myrealtrip.jpg";
import usimsaImg from "@/assets/usimsa.jpg";
import airaloImg from "@/assets/airalo.jpg";
import jejupassImg from "@/assets/jejupass.jpg";
import rentalcarsImg from "@/assets/rentalcars.jpg";

export type Partner = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  deeplink: string;
};

export const partners: Partner[] = [
  {
    id: "hcombine2",
    name: "호텔스컴바인",
    category: "호텔",
    description: "전 세계 호텔 최저가 비교",
    image: hotelscombinedImg,
    deeplink: "https://linkmoa.kr/click.php?m=hcombine2&a=A100704224&l=0000",
  },
  {
    id: "agoda",
    name: "아고다",
    category: "호텔",
    description: "아시아 호텔 특가",
    image: agodaImg,
    deeplink: "https://linkmoa.kr/click.php?m=agoda&a=A100704224&l=0000",
  },
  {
    id: "rakutentr",
    name: "라쿠텐 트래블",
    category: "호텔",
    description: "일본 호텔·료칸 예약",
    image: rakutenImg,
    deeplink: "https://linkmoa.kr/click.php?m=rakutentr&a=A100704224&l=0000",
  },
  {
    id: "klook",
    name: "클룩",
    category: "투어·액티비티",
    description: "현지 투어와 입장권",
    image: klookImg,
    deeplink: "https://linkmoa.kr/click.php?m=klook&a=A100704224&l=0000",
  },
  {
    id: "kkday",
    name: "케이케이데이",
    category: "투어·액티비티",
    description: "글로벌 액티비티 예약",
    image: kkdayImg,
    deeplink: "https://linkmoa.kr/click.php?m=kkday&a=A100704224&l=0000",
  },
  {
    id: "myrealtrip",
    name: "마이리얼트립",
    category: "투어·액티비티",
    description: "국내외 가이드 투어",
    image: myrealtripImg,
    deeplink: "https://linkmoa.kr/click.php?m=myrealtrip&a=A100704224&l=0000",
  },
  {
    id: "usimsa",
    name: "유심사",
    category: "유심·eSIM",
    description: "해외 데이터 유심",
    image: usimsaImg,
    deeplink: "https://linkmoa.kr/click.php?m=usimsa&a=A100704224&l=0000",
  },
  {
    id: "airalo",
    name: "Airalo",
    category: "유심·eSIM",
    description: "전 세계 eSIM",
    image: airaloImg,
    deeplink: "https://linkmoa.kr/click.php?m=airalo&a=A100704224&l=0000",
  },
  {
    id: "jejupass",
    name: "제주패스",
    category: "렌터카",
    description: "제주 렌터카 최저가",
    image: jejupassImg,
    deeplink: "https://linkmoa.kr/click.php?m=jejupass&a=A100704224&l=0000",
  },
  {
    id: "rentalcars",
    name: "렌탈카스",
    category: "렌터카",
    description: "전 세계 렌터카",
    image: rentalcarsImg,
    deeplink: "https://linkmoa.kr/click.php?m=rentalcars&a=A100704224&l=0000",
  },
];

export const categories = [
  "전체",
  "호텔",
  "투어·액티비티",
  "유심·eSIM",
  "렌터카",
] as const;
