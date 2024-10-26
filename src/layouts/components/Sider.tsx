import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChartOutlined, HomeOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, type MenuProps } from "antd";
import { useTheme } from "@/components/theme-provider";
import { useSettingsStore } from "@/stores/settings";

import ReactIcon from "@/assets/svg/react.svg?react";

// 递归函数，找到匹配的菜单项
const findSelectedKeys = (items: MenuProps["items"], pathname: string, path: string[] = []) => {
  const selectedKeys: string[] = [];
  let openKeys: string[] = [];

  const travel = (items: MenuProps["items"], pathname: string, path: string[]) => {
    for (const item of items!) {
      if (item!.key === pathname) {
        selectedKeys.push(item!.key);
        openKeys = [...path];
        return;
      }
      if ((item as any).children) {
        path.push(item!.key as string);
        travel((item as any).children, pathname, path);
        path.pop();
      }
    }
  };

  travel(items, pathname, path);
  return { selectedKeys, openKeys };
};

const items: MenuProps["items"] = [
  {
    icon: <HomeOutlined />,
    label: <Link to="/landing">首页</Link>,
    key: "/landing",
  },
  {
    icon: <UserOutlined />,
    label: <Link to="/user-management">用户管理</Link>,
    key: "/user-management",
  },
  {
    icon: <MenuOutlined />,
    label: "一级菜单",
    key: "/nav",
    children: [
      {
        key: "/nav/sub-1",
        label: <Link to="/nav/sub-1">二级菜单-1</Link>,
      },
      {
        key: "/nav/sub-2",
        label: <Link to="/nav/sub-2">二级菜单-2</Link>,
      },
    ],
  },
  {
    icon: <BarChartOutlined />,
    label: <Link to="/echarts-demo">Echarts Demo</Link>,
    key: "/echarts-demo",
  },
];

export default function Sider() {
  const location = useLocation();

  const firstRenderRef = useRef(true);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const collapsed = useSettingsStore((state) => state.collapsed);

  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (location.pathname === "/") return;

    const { selectedKeys, openKeys } = findSelectedKeys(items, location.pathname);
    setSelectedKeys(selectedKeys);
    // 首次渲染时，设置默认值
    if (firstRenderRef.current) {
      setOpenKeys(openKeys);
    }
    // 将首次渲染标记设置为false
    firstRenderRef.current = false;
  }, [location.pathname]);

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme={isDarkMode ? "dark" : "light"}
      className="h-screen overflow-auto !sticky top-0 left-0 start-0"
    >
      <Link
        className="font-bold text-xl hover:text-current h-16 flex justify-center items-center gap-2 text-nowrap"
        to="/"
      >
        <ReactIcon className="size-6" />
        {collapsed ? null : <span className="text-gradient-ripple">React Admin</span>}
      </Link>
      <Menu
        theme={isDarkMode ? "dark" : "light"}
        mode="inline"
        items={items}
        selectedKeys={selectedKeys}
        // onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
        openKeys={openKeys}
        onOpenChange={(openKeys) => setOpenKeys(openKeys)}
        className="!border-e-0"
      />
    </Layout.Sider>
  );
}
