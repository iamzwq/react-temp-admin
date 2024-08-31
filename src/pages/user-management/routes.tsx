import { Link, type RouteObject } from "react-router-dom";

export const userManagerRoute: RouteObject = {
  path: "user-management",
  lazy: async () => ({
    Component: (await import("./index")).default,
  }),
  handle: {
    crumb: () => <Link to="/user-management">用户管理</Link>,
  },
};
