export type Partner = {
  id: string;
  name: string;
  category: string;
  description: string;
  emoji: string;
  deeplink: string;
};

// 딥링크(l=0000)가 존재하는 파트너만 등록
export const partners: Partner[] = [
  {
    id: "hcombine2",
    name: "호텔스컴바인",
    category: "호텔",
    description: "전 세계 호텔 최저가 비교",
    emoji: "🏨",
    deeplink: "https://linkmoa.kr/click.php?m=hcombine2&a=A100704224&l=0000",
  },
  {
    id: "agoda",
    name: "아고다",
    category: "호텔",
    description: "아시아 호텔 특가",
    emoji: "🌏",
    deeplink: "https://linkmoa.kr/click.php?m=agoda&a=A100704224&l=0000",
  },
  {
    id: "rakutentr",
    name: "라쿠텐 트래블",
    category: "호텔",
    description: "일본 호텔·료칸 예약",
    emoji: "🗾",
    deeplink: "https://linkmoa.kr/click.php?m=rakutentr&a=A100704224&l=0000",
  },
  {
    id: "klook",
    name: "클룩",
    category: "투어·액티비티",
    description: "현지 투어와 입장권",
    emoji: "🎟️",
    deeplink: "https://linkmoa.kr/click.php?m=klook&a=A100704224&l=0000",
  },
  {
    id: "kkday",
    name: "케이케이데이",
    category: "투어·액티비티",
    description: "글로벌 액티비티 예약",
    emoji: "🎡",
    deeplink: "https://linkmoa.kr/click.php?m=kkday&a=A100704224&l=0000",
  },
  {
    id: "myrealtrip",
    name: "마이리얼트립",
    category: "투어·액티비티",
    description: "국내외 가이드 투어",
    emoji: "🧳",
    deeplink: "https://linkmoa.kr/click.php?m=myrealtrip&a=A100704224&l=0000",
  },
  {
    id: "usimsa",
    name: "유심사",
    category: "유심·eSIM",
    description: "해외 데이터 유심",
    emoji: "📶",
    deeplink: "https://linkmoa.kr/click.php?m=usimsa&a=A100704224&l=0000",
  },
  {
    id: "airalo",
    name: "Airalo",
    category: "유심·eSIM",
    description: "전 세계 eSIM",
    emoji: "🌐",
    deeplink: "https://linkmoa.kr/click.php?m=airalo&a=A100704224&l=0000",
  },
  {
    id: "jejupass",
    name: "제주패스",
    category: "렌터카",
    description: "제주 렌터카 최저가",
    emoji: "🚗",
    deeplink: "https://linkmoa.kr/click.php?m=jejupass&a=A100704224&l=0000",
  },
  {
    id: "rentalcars",
    name: "렌탈카스",
    category: "렌터카",
    description: "전 세계 렌터카",
    emoji: "🚙",
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
