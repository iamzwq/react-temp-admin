import { useShallow } from "zustand/shallow";
import { pick } from "@/utils";

export const useSelector = <T extends object, K extends keyof T>(fields: K[]) =>
  useShallow((state: T) => pick(state, fields));
