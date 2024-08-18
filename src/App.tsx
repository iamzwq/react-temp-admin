import { RouterProvider } from "react-router-dom";
import { App as AntdApp, ConfigProvider, theme as antdTheme } from "antd";
import { ThemeProvider, useTheme } from "./components/theme-provider";
import { useSettingsStore } from "./stores/settings";
import { router } from "./router";

import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";

export default function App() {
  const colorPrimary = useSettingsStore((state) => state.colorPrimary);

  const { theme } = useTheme();
  const { defaultAlgorithm, darkAlgorithm } = antdTheme;

  return (
    <ThemeProvider>
      <ConfigProvider
        locale={zhCN}
        theme={{
          cssVar: true, // 开启 css 变量
          hashed: false, // 如果你的应用中只存在一个版本的 antd，你可以设置为 false 来进一步减小样式体积。
          algorithm: theme === "dark" ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorPrimary,
          },
          components: {
            Layout: {
              headerPadding: "0 24px",
              headerBg: "var(--layout-header-bg)",
              headerHeight: "var(--layout-header-height)",
              siderBg: "var(--layout-sider-bg)",
            },
            Menu: {
              itemBg: "var(--layout-sider-bg)",
              darkItemBg: "var(--layout-sider-bg)",
              subMenuItemBg: "var(--layout-sider-bg)",
              darkSubMenuItemBg: "var(--layout-sider-bg)",
            },
          },
        }}
        componentSize="large"
      >
        <AntdApp>
          <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
        </AntdApp>
      </ConfigProvider>
    </ThemeProvider>
  );
}
