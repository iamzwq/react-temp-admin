import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";
import { echartsDemoRoute } from "./modules/echarts-demo";
import { landingRoute } from "./modules/landing";
import { nestMenuRoute } from "./modules/nest-menu";
import { userManagerRoute } from "./modules/user-management";

const routes: RouteObject[] = [
  {
    path: "login",
    lazy: async () => ({
      Component: (await import("@/pages/login")).default,
    }),
  },
  {
    path: "/",
    lazy: async () => ({
      Component: (await import("@/layouts")).default,
    }),
    children: [
      {
        index: true,
        element: <Navigate replace to="/landing" />,
      },
      landingRoute,
      userManagerRoute,
      nestMenuRoute,
      echartsDemoRoute,
    ],
  },
  {
    path: "*",
    lazy: async () => ({
      Component: (await import("@/pages/not-found")).default,
    }),
  },
];

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_APP_BASE_URL,
});
