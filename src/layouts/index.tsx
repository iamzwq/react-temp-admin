import { useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Flex, Layout } from "antd";
import { AppHelmet } from "@/components/helmet";
import { ThemeSwitch } from "@/components/theme-switch";
import Breadcrumb from "./components/bread-crumb";
import CustomSkin from "./components/custom-skin";
import Content from "./components/main-content";
import SiderBar from "./components/sider-bar";
import UserAvatar from "./components/user-avatar";
import { setCollapsed, useSelector, useSettingsStore } from "@/stores";

export default function MainLayout() {
  const { collapsed } = useSettingsStore(useSelector(["collapsed"]));

  // 设置header阴影
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.scrollingElement?.scrollTop || document.body.scrollTop;
      const className = "shadow-[0_6px_10px_-10px_rgba(0,0,0,0.3)]";
      if (scrollTop > 0) {
        document.getElementById("app-header-bar")?.classList.add(className);
      } else {
        document.getElementById("app-header-bar")?.classList.remove(className);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log("out  👉: ");

  return (
    <>
      <AppHelmet />
      <Layout>
        <SiderBar />
        <Layout>
          <Layout.Header
            id="app-header-bar"
            className="flex items-center sticky top-0 z-[999] pl-0 bg-white dark:bg-[#001529]"
          >
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
    </>
  );
}
