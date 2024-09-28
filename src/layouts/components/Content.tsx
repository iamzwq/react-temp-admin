import { Outlet, useMatches } from "react-router-dom";
import { Layout } from "antd";
import { PageAnimate } from "@/components/page-animate";

export default function Content() {
  const matches = useMatches();
  const currRouter = matches.at(-1);
  return (
    <Layout.Content className="min-h-[calc(100vh-64px)] p-4">
      <PageAnimate key={currRouter!.pathname}>
        <Outlet /> {/* Outlet是子路由的占位符 */}
      </PageAnimate>
    </Layout.Content>
  );
}
