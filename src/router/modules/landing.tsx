import { type RouteObject } from "react-router-dom";

export const landingRoute: RouteObject = {
  path: "/landing",
  lazy: async () => ({
    Component: (await import("@/pages/landing")).default,
  }),
  handle: {
    title: "首页",
  },
};
