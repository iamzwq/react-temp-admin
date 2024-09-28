import { SkinOutlined } from "@ant-design/icons";
import { ColorPicker } from "antd";
import { useSettingsState } from "@/stores/settings";

export default function CustomSkin() {
  const { colorPrimary, setColorPrimary } = useSettingsState();
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
