import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button, Layout } from "antd";
import { notification } from "@/utils";

import ReactIcon from "@/assets/react.svg?react";

export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>登录页 | xx系统</title>
      </Helmet>
      <Layout className="min-h-screen">
        <Layout.Content className="flex">
          <div className="w-2/5 bg-zinc-800 flex justify-center items-center">
            <ReactIcon className="size-24 animate-bounce" />
          </div>
          <div className="w-3/5 flex justify-center items-center">
            <Button
              type="primary"
              onClick={() => {
                navigate("/landing");
                setTimeout(() => {
                  notification.success({
                    message: "登录成功",
                    description: "欢迎回来",
                  });
                }, 300);
              }}
            >
              登录
            </Button>
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
}
