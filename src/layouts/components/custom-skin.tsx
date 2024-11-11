import { SkinOutlined } from "@ant-design/icons";
import { ColorPicker } from "antd";
import { setColorPrimary, useSelector, useSettingsStore } from "@/stores";

export default function CustomSkin() {
  const { colorPrimary } = useSettingsStore(useSelector(["colorPrimary"]));
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
