import { Link, type RouteObject } from "react-router-dom";

export const echartsDemoRoute: RouteObject = {
  path: "/echarts-demo",
  lazy: async () => ({
    Component: (await import("@/pages/echarts-demo/layout")).default,
  }),
  handle: {
    crumb: () => <Link to="/echarts-demo">Echarts Demo</Link>,
  },
};
