import { Helmet } from "react-helmet-async";
import { Button, ColorPicker, DatePicker, Flex, Typography } from "antd";
import { useSettingsStore } from "@/stores/settings";
import { message } from "@/utils";

const { RangePicker } = DatePicker;

export default function LandingPage() {
  const colorPrimary = useSettingsStore((state) => state.colorPrimary);
  const setColorPrimary = useSettingsStore((state) => state.setColorPrimary);

  return (
    <>
      <Helmet>
        <title>首页 | {import.meta.env.VITE_APP_TITLE}</title>
      </Helmet>
      <Typography.Title level={4}>Landing Page</Typography.Title>
      <Flex gap={16} wrap>
        <Button type="primary">primary</Button>
        <Button>default</Button>
        <RangePicker />
        <ColorPicker
          showText
          value={colorPrimary}
          onChange={(color) => {
            setColorPrimary(color.toHex());
          }}
        />
        <Button type="primary" onClick={() => message.success("show message success!")}>
          show message
        </Button>
      </Flex>
    </>
  );
}
