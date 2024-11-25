import { Link, type RouteObject } from "react-router-dom";
import { ProgressBar } from "@/components/progress-bar";
import { ROUTE_PATHS } from "@/constants/common";

export const echartsDemoRoute: RouteObject = {
  path: ROUTE_PATHS.echartsDemo,
  lazy: async () => ({
    Component: (await import("@/pages/echarts-demo/layout")).default,
  }),
  HydrateFallback: ProgressBar,
  handle: {
    title: "Echarts Demo",
    crumb: () => <Link to={ROUTE_PATHS.echartsDemo}>Echarts Demo</Link>,
  },
};
