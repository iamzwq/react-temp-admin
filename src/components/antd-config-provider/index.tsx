import type { PropsWithChildren } from "react";
import { legacyLogicalPropertiesTransformer, StyleProvider } from "@ant-design/cssinjs";
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
    <StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
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
              // siderBg: "#141414",
            },
            // Menu: {
            //   darkItemBg: "#141414",
            //   darkSubMenuItemBg: "#141414",
            // },
          },
        }}
        componentSize="large"
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}
