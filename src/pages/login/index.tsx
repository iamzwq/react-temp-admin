import { useNavigate } from "react-router-dom";
import { Button, Layout } from "antd";

import ReactIcon from "@/assets/react.svg?react";

export default function Login() {
  const navigate = useNavigate();
  return (
    <Layout className="min-h-screen">
      <Layout.Content className="flex">
        <div className="w-2/5 bg-zinc-800 flex justify-center items-center">
          <ReactIcon className="size-20" />
        </div>
        <div className="w-3/5 flex justify-center items-center">
          <Button type="primary" onClick={() => navigate("/landing-page")}>
            登录
          </Button>
        </div>
      </Layout.Content>
    </Layout>
  );
}
