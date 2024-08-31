import { Link, type RouteObject } from "react-router-dom";

export const navRoute: RouteObject = {
  path: "nav",
  lazy: async () => ({
    Component: (await import("./index")).default,
  }),
  handle: {
    crumb: () => "一级菜单",
  },
  children: [
    {
      path: "sub-1",
      lazy: async () => ({
        Component: (await import("./sub-nav-1")).default,
      }),
      handle: {
        crumb: () => <Link to="/nav/sub-1">二级菜单-1</Link>,
      },
    },
    {
      path: "sub-2",
      lazy: async () => ({
        Component: (await import("./sub-nav-2")).default,
      }),
      handle: {
        crumb: () => <Link to="/nav/sub-2">二级菜单-2</Link>,
      },
    },
  ],
};
