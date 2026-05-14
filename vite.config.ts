import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // 토스 AIT WebView 호환: 절대경로(/assets/...) 대신 상대경로(./assets/...)로 빌드
  base: mode === "development" ? "/" : "./",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // 토스 AIT WebView는 file://류 스킴으로 자산을 로드하므로 crossorigin 속성이 있으면
    // CORS 체크 실패로 CSS/JS가 적용되지 않음. 빌드된 HTML에서 crossorigin 속성 제거.
    {
      name: "strip-crossorigin",
      enforce: "post" as const,
      transformIndexHtml(html: string) {
        return html.replace(/\s+crossorigin(="[^"]*")?/g, "");
      },
    },
  ].filter(Boolean),
  build: {
    // 토스 AIT WebView (구형 iOS/Android) 호환
    target: ["es2015", "safari12", "chrome70"],
    cssTarget: ["safari12", "chrome70"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
