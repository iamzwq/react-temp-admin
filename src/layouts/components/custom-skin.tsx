import { SkinOutlined } from "@ant-design/icons";
import { ColorPicker } from "antd";
import { setColorPrimary, useSettingsStore } from "@/stores/settings";

export default function CustomSkin() {
  const colorPrimary = useSettingsStore((state) => state.colorPrimary);
  return (
    <ColorPicker
      showText
      value={colorPrimary}
      onChange={(color) => {
        setColorPrimary(color.toHex());
      }}
    >
      <SkinOutlined className="text-xl" />
    </ColorPicker>
  );
}
