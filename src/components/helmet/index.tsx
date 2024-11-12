import { Helmet } from "react-helmet-async";
import { useMatches } from "react-router-dom";
import { at } from "@/utils";

export function AppHelmet() {
  const matches = useMatches();
  const currRouter = at(matches, -1);
  return (
    <Helmet>
      <title>
        {(currRouter?.handle as any)?.title || "React"} | {import.meta.env.VITE_APP_TITLE_SUFFIX}
      </title>
    </Helmet>
  );
}
