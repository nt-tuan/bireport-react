import { Toaster } from "@blueprintjs/core";

export const MyToaster = Toaster.create({});
export const toastError = (message: string) =>
  MyToaster.show({ message, intent: "danger" });
