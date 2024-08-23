import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

export default function NavLayout() {
  return (
    <>
      <Helmet>
        <title>导航页 | xx系统</title>
      </Helmet>
      <div className="text-indigo-700">
        Nav Layout
        <Outlet />
      </div>
    </>
  );
}
