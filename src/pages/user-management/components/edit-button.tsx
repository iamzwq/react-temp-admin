import { useState } from "react";
import { Button } from "antd";
import EditModal from "./edit-modal";

type EditButtonProps = {
  data: any;
};

const createPromise = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

export default function EditButton({ data }: EditButtonProps) {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    return createPromise(values);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button type="link" size="small" onClick={handleOpen}>
        编辑
      </Button>
      <EditModal open={open} initialValues={data} onCreate={onCreate} onCancel={handleClose} />
    </>
  );
}
