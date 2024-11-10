interface Window {
  $message?: import("antd/es/message/interface").MessageInstance;
  $modal?: Omit<import("antd/es/modal/confirm").ModalStaticFunctions, "warn">;
  $notification?: import("antd/es/notification/interface").NotificationInstance;
}
