import { Helmet } from "react-helmet-async";
import { Alert, Card, Divider, Layout, Typography } from "antd";
import { ThemeSwitch } from "@/components/theme-switch";
import LoginForm from "./components/login-form";
import ThirdPartyLogin from "./components/third-party-login";

import ReactIcon from "@/assets/svg/react.svg?react";

export default function Login() {
  return (
    <>
      <Helmet>
        <title>登录页 | {import.meta.env.VITE_APP_TITLE}</title>
      </Helmet>
      <Layout className="min-h-screen relative">
        <Layout.Content className="flex">
          <div className="w-2/5 bg-zinc-800 dark:bg-zinc-950 hidden md:flex justify-center items-center">
            <ReactIcon className="size-24 animate-spin-slow" />
          </div>
          <div className="w-screen md:w-3/5 flex justify-center items-center">
            <Card
              title={
                <Typography.Title level={2} className="flex justify-center pt-8 pb-4">
                  React Vite Admin
                </Typography.Title>
              }
              className="w-[450px]"
            >
              <Alert message="用户名：admin，密码：123456" type="info" showIcon className="mb-6" />
              <LoginForm />
              <Divider>OR</Divider>
              <ThirdPartyLogin />
            </Card>
          </div>
        </Layout.Content>
        <div className="absolute top-4 right-4">
          <ThemeSwitch />
        </div>
      </Layout>
    </>
  );
}
