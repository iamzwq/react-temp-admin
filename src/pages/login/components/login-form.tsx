import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, type FormProps, Input } from "antd";
import { useLogin } from "../api";
import { notification } from "@/utils";

type FieldType = {
  username?: string;
  password?: string;
};

export default function LoginForm() {
  const navigate = useNavigate();

  const { mutate: onLogin, isPending } = useLogin();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (isPending) return;
    onLogin(values);
    navigate("/landing");
    setTimeout(() => {
      notification.success({
        message: "登录成功",
        description: "欢迎回来",
      });
    }, 300);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      initialValues={{ username: "admin", password: "123456" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item name="username" rules={[{ required: true, message: "请输入手机号" }]}>
        <Input addonBefore={<UserOutlined />} placeholder="请输入手机号" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
        <Input.Password addonBefore={<LockOutlined />} placeholder="请输入密码" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={isPending}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
