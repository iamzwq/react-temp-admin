import type { PropsWithChildren } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "../theme-provider";
import { useSettingsState } from "@/stores/settings";

import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";

export function AntdConfigProvider({ children }: PropsWithChildren) {
  const { theme } = useTheme();
  const { defaultAlgorithm, darkAlgorithm } = antdTheme;
  const { colorPrimary } = useSettingsState();
  return (
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
            bodyBg: "var(--layout-color-bg-body)",
          },
          Menu: {
            itemBg: "var(--layout-sider-bg)",
            darkItemBg: "var(--layout-sider-bg)",
            subMenuItemBg: "var(--layout-sider-bg)",
            darkSubMenuItemBg: "var(--layout-sider-bg)",
          },
          Message: {
            contentBg: "var(--message-content-bg)",
            colorText: "var(--message-content-color)",
          },
        },
      }}
      componentSize="large"
    >
      {children}
    </ConfigProvider>
  );
}
