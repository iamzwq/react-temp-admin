import { Link, type RouteObject } from "react-router-dom";

export const echartsDemoRoute: RouteObject = {
  path: "/echarts-demo",
  lazy: async () => ({
    Component: (await import("@/pages/echarts-demo/layout")).default,
  }),
  handle: {
    title: "Echarts Demo",
    crumb: () => <Link to="/echarts-demo">Echarts Demo</Link>,
  },
};
