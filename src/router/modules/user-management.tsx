import { Link, type RouteObject } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/common";

export const userManagerRoute: RouteObject = {
  path: ROUTE_PATHS.userManagement,
  lazy: async () => ({
    Component: (await import("@/pages/user-management")).default,
  }),
  handle: {
    title: "用户管理",
    crumb: () => <Link to={ROUTE_PATHS.userManagement}>用户管理</Link>,
  },
};
