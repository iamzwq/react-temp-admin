import { RouterProvider } from "react-router-dom";
import { App as AntdApp } from "antd";
import { AntdConfigProvider } from "./components/antd-config-provider";
import { ProgressBar } from "./components/progress-bar";
import { StaticAntd } from "./components/static-antd";
import { ThemeProvider } from "./components/theme-provider";
import { router } from "./router";

export default function App() {
  return (
    <ThemeProvider>
      <AntdConfigProvider>
        <AntdApp>
          <StaticAntd />
          <RouterProvider router={router} fallbackElement={<ProgressBar />} />
        </AntdApp>
      </AntdConfigProvider>
    </ThemeProvider>
  );
}
