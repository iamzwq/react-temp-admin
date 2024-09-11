import { useEffect, useState } from "react";
import { unstable_usePrompt } from "react-router-dom";
import { Form, type FormInstance, Input } from "antd";
import type { Values } from "../types";

interface EditFormProps {
  initialValues: Values;
  onFormInstanceReady: (instance: FormInstance<Values>) => void;
}

export default function EditForm({ initialValues, onFormInstanceReady }: EditFormProps) {
  const [form] = Form.useForm();
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    onFormInstanceReady(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // https://reactrouter.com/en/main/hooks/use-prompt
  // Block navigating elsewhere when data has been entered into the input
  unstable_usePrompt({
    message: "您还有未保存的修改，确定要离开吗？",
    when: ({ currentLocation, nextLocation }) =>
      hasChanged && currentLocation.pathname !== nextLocation.pathname,
  });

  return (
    <Form
      layout="horizontal"
      form={form}
      name="form_in_modal"
      initialValues={initialValues}
      preserve={false}
      labelAlign="left"
      onChange={() => {
        setHasChanged(true);
      }}
      labelCol={{ flex: "50px" }}
      wrapperCol={{ flex: 1 }}
      className="mt-4"
    >
      <Form.Item name="name" label="Name">
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
      <Form.Item name={["address", "city"]} label="City">
        <Input />
      </Form.Item>
      <Form.Item name={["address", "street"]} label="Street">
        <Input />
      </Form.Item>
    </Form>
  );
}
