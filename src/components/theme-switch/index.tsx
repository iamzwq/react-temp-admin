import { DesktopOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Dropdown, type MenuProps } from "antd";
import { useTheme } from "../theme-provider";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const items: MenuProps["items"] = [
    {
      label: (
        <div>
          <SunOutlined /> 浅色模式
        </div>
      ),
      key: "0",
      onClick: () => setTheme("light"),
    },
    {
      label: (
        <div>
          <MoonOutlined /> 深色模式
        </div>
      ),
      key: "1",
      onClick: () => setTheme("dark"),
    },
    {
      label: (
        <div>
          <DesktopOutlined /> 跟随系统
        </div>
      ),
      key: "3",
      onClick: () => setTheme("system"),
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
