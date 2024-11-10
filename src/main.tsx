import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "./components/error-boundary";
import App from "./app";

import "./styles/index.css";
import "./styles/light.css";
import "./styles/dark.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000, // 数据变得 "陈旧"（stale）的时间 10s
      refetchOnWindowFocus: false, // 窗口聚焦时重新获取数据
      refetchOnReconnect: false, // 网络重新连接时重新获取数据
      retry: false, // 失败时重试
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
);
