import { Link, type RouteObject } from "react-router-dom";

export const nestMenuRoute: RouteObject = {
  path: "nest-menu",
  lazy: async () => ({
    Component: (await import("@/pages/nest-menu")).default,
  }),
  handle: {
    title: "嵌套菜单",
    crumb: () => "嵌套菜单",
  },
  children: [
    {
      path: "sub-menu-1",
      lazy: async () => ({
        Component: (await import("@/pages/nest-menu/sub-menu-1")).default,
      }),
      handle: {
        title: "二级菜单-1",
        crumb: () => <Link to="/nest-menu/sub-1">二级菜单-1</Link>,
      },
    },
    {
      path: "sub-menu-2",
      lazy: async () => ({
        Component: (await import("@/pages/nest-menu/sub-menu-2")).default,
      }),
      handle: {
        title: "二级菜单-2",
        crumb: () => <Link to="/nest-menu/sub-2">二级菜单-2</Link>,
      },
    },
  ],
};
