import { Helmet } from "react-helmet-async";
import { Button, DatePicker, Flex, Typography } from "antd";
import { Test1 } from "./components/test-1";
import { Test2 } from "./components/test-2";

const { RangePicker } = DatePicker;

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>首页 | {import.meta.env.VITE_APP_TITLE}</title>
      </Helmet>
      <Typography.Title level={4}>首页</Typography.Title>
      <Flex gap={16} wrap>
        <RangePicker />
        <Button type="primary" onClick={() => window.$message?.success("show message success!")}>
          message
        </Button>
      </Flex>
      <Flex gap={16}>
        <Test1 />
        <Test2 />
      </Flex>
      <div className="h-screen" />
    </>
  );
}
