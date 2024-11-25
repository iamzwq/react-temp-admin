import { type RouteObject } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/common";

export const landingRoute: RouteObject = {
  path: ROUTE_PATHS.landing,
  lazy: async () => ({
    Component: (await import("@/pages/landing")).default,
  }),
  handle: {
    title: "首页",
  },
};
