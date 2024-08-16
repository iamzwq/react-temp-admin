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
        element: <Navigate replace to="/landing-page" />,
      },
      {
        path: "landing-page",
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
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_APP_BASE_URL,
});
