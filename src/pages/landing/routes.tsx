import { Link, type RouteObject } from "react-router-dom";

export const landingRoute: RouteObject = {
  path: "/landing",
  lazy: async () => ({
    Component: (await import("./index")).default,
  }),
  handle: {
    crumb: () => <Link to="/landing">首页</Link>,
  },
};
