import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Flex, Layout } from "antd";
import { ThemeSwitch } from "@/components/theme-switch";
import Breadcrumb from "./components/breadcrumb";
import Content from "./components/content";
import CustomSkin from "./components/custom-skin";
import Sider from "./components/sider";
import UserAvatar from "./components/user-avatar";
import { setCollapsed, useSettingsStore } from "@/stores/settings";

export default function MainLayout() {
  const collapsed = useSettingsStore((state) => state.collapsed);

  return (
    <Layout>
      <Sider />
      <Layout>
        <Layout.Header className="flex items-center sticky top-0 z-[999] pl-0 bg-white dark:bg-[#001529]">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="mr-2"
          />
          <Breadcrumb />
          <Flex gap={12} className="ml-auto items-center">
            <CustomSkin />
            <ThemeSwitch />
            <UserAvatar />
          </Flex>
        </Layout.Header>
        <Content />
      </Layout>
    </Layout>
  );
}
