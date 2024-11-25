import { DesktopOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Dropdown, type MenuProps } from "antd";
import { useTheme } from "../theme-provider";

export function ThemeSwitch() {
  const { theme, setTheme, isDarkMode } = useTheme();

  const handleChange = async (theme: "system" | "light" | "dark") => {
    const handler = () => {
      setTheme(theme);
    };
    if (!document.startViewTransition) {
      handler();
      return;
    }

    await document.startViewTransition(handler).ready;

    const r = Math.hypot(window.innerWidth, window.innerHeight);
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${window.innerWidth}px 0px)`,
          `circle(${r}px at ${window.innerWidth}px 0px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in",
        direction: isDarkMode ? "normal" : "reverse",
        pseudoElement: isDarkMode ? `::view-transition-new(root)` : `::view-transition-old(root)`,
      },
    );
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div>
          <SunOutlined /> 浅色模式
        </div>
      ),
      key: "0",
      onClick: () => handleChange("light"),
    },
    {
      label: (
        <div>
          <MoonOutlined /> 深色模式
        </div>
      ),
      key: "1",
      onClick: () => handleChange("dark"),
    },
    {
      label: (
        <div>
          <DesktopOutlined /> 跟随系统
        </div>
      ),
      key: "3",
      onClick: () => handleChange("system"),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} className="p-2">
      {theme === "dark" ? (
        <MoonOutlined className="text-xl" />
      ) : theme === "light" ? (
        <SunOutlined className="text-xl p-2" />
      ) : (
        <DesktopOutlined className="text-xl" />
      )}
    </Dropdown>
  );
}
