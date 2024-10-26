import { type RouteObject } from "react-router-dom";

export const landingRoute: RouteObject = {
  path: "/landing",
  lazy: async () => ({
    Component: (await import("./index")).default,
  }),
};
