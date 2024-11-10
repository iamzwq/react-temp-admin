import { App } from "antd";
// import type { MessageInstance } from "antd/es/message/interface";
// import type { ModalStaticFunctions } from "antd/es/modal/confirm";
// import type { NotificationInstance } from "antd/es/notification/interface";

// let message: MessageInstance;
// let notification: NotificationInstance;
// let modal: Omit<ModalStaticFunctions, "warn">;

export function StaticAntd() {
  const staticFunction = App.useApp();
  window.$message = staticFunction.message;
  window.$modal = staticFunction.modal;
  window.$notification = staticFunction.notification;
  // message = staticFunction.message;
  // modal = staticFunction.modal;
  // notification = staticFunction.notification;
  return null;
}

// export { message, modal, notification };
