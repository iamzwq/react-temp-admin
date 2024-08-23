import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>404 | {import.meta.env.VITE_APP_TITLE}</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="您访问的页面不存在。"
        extra={
          <Button type="primary" onClick={() => navigate("/landing")}>
            返回首页
          </Button>
        }
      />
    </>
  );
}
