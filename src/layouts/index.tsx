import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Flex, Layout } from "antd";
import { ThemeSwitch } from "@/components/theme-switch";
import Breadcrumb from "./components/breadcrumb";
import Content from "./components/content";
import Sider from "./components/sider";
import UserAvatar from "./components/user-avatar";
import { useSettingsStore } from "@/stores/settings";

export default function MainLayout() {
  const collapsed = useSettingsStore((state) => state.collapsed);
  const setCollapsed = useSettingsStore((state) => state.setCollapsed);

  return (
    <Layout hasSider className="w-screen overflow-hidden">
      <Sider />
      <Layout>
        <Layout.Header className="flex items-center dark:text-white sticky top-0 z-[999] border-b border-b-gray-200 dark:border-b-gray-700 pl-0">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-inherit hover:text-inherit mr-2"
          />
          <Breadcrumb />
          <Flex gap={8} className="ml-auto items-center">
            <ThemeSwitch />
            <UserAvatar />
          </Flex>
        </Layout.Header>
        <Content />
      </Layout>
    </Layout>
  );
}
