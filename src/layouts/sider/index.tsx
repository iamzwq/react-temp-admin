import { Link } from "react-router-dom";
import { HomeOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu, type MenuProps } from "antd";
import { useTheme } from "@/components/theme-provider";
import { useSettingsStore } from "@/stores/settings";

import ReactIcon from "@/assets/react.svg?react";

const items: MenuProps["items"] = [
  {
    icon: <HomeOutlined />,
    label: <Link to="/landing-page">首页</Link>,
    key: "/landing-page",
  },
  {
    icon: <UserOutlined />,
    label: <Link to="/user-management">用户管理</Link>,
    key: "/user-management",
  },
  {
    icon: <VideoCameraOutlined />,
    label: "视频",
    key: "/video",
  },
];

export default function Sider() {
  const collapsed = useSettingsStore((state) => state.collapsed);

  const { isDark } = useTheme();

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="h-screen overflow-auto fixed top-0 left-0 bottom-0 dark:text-white"
    >
      <Link
        className="font-bold text-2xl hover:text-current h-[var(--layout-header-height)] flex justify-center items-center gap-2"
        to="/"
      >
        <ReactIcon className="size-6" />
        {collapsed ? null : "React Admin"}
      </Link>
      <Menu theme={isDark ? "dark" : "light"} mode="inline" items={items} className="!border-e-0" />
    </Layout.Sider>
  );
}
