import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";

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
      {
        path: "landing",
        lazy: async () => ({
          Component: (await import("@/pages/landing")).default,
        }),
      },
      {
        path: "user-management",
        lazy: async () => ({
          Component: (await import("@/pages/user-management")).default,
        }),
      },
      {
        path: "nav",
        lazy: async () => ({
          Component: (await import("@/pages/nav")).default,
        }),
        children: [
          {
            path: "sub-1",
            lazy: async () => ({
              Component: (await import("@/pages/nav/sub-nav-1")).default,
            }),
          },
          {
            path: "sub-2",
            lazy: async () => ({
              Component: (await import("@/pages/nav/sub-nav-2")).default,
            }),
          },
        ],
      },
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
