import { Helmet } from "react-helmet-async";
import { Button, DatePicker, Flex, Typography } from "antd";
import { message } from "@/utils";

const { RangePicker } = DatePicker;

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>首页 | {import.meta.env.VITE_APP_TITLE}</title>
      </Helmet>
      <Typography.Title level={4}>Landing Page</Typography.Title>
      <Flex gap={16} wrap>
        <RangePicker />
        <Button type="primary" onClick={() => message.success("show message success!")}>
          show message
        </Button>
      </Flex>
      <div className="h-screen" />
    </>
  );
}
