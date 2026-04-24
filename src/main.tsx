import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 더블탭/핀치 확대 방지 (인앱 검수 대응)
if (typeof window !== "undefined") {
  // 핀치 줌 방지
  document.addEventListener(
    "gesturestart",
    (e) => e.preventDefault(),
    { passive: false }
  );
  document.addEventListener(
    "gesturechange",
    (e) => e.preventDefault(),
    { passive: false }
  );
  document.addEventListener(
    "gestureend",
    (e) => e.preventDefault(),
    { passive: false }
  );

  // 멀티터치 확대 방지
  document.addEventListener(
    "touchmove",
    (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    },
    { passive: false }
  );

  // 더블탭 확대 방지
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) e.preventDefault();
      lastTouchEnd = now;
    },
    { passive: false }
  );

  // Ctrl + 휠 확대 방지 (웹뷰 디버깅 환경)
  document.addEventListener(
    "wheel",
    (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault();
    },
    { passive: false }
  );
}

createRoot(document.getElementById("root")!).render(<App />);
