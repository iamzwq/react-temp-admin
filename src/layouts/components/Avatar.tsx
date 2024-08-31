import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar as AntdAvatar, Dropdown, type MenuProps } from "antd";

export default function Avatar() {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "loginOut",
      label: (
        <>
          <LogoutOutlined /> 退出登录
        </>
      ),
      onClick: () => {
        navigate("/login");
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click", "hover"]}>
      <AntdAvatar
        style={{ backgroundColor: "#87d068" }}
        size={36}
        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
      />
    </Dropdown>
  );
}
