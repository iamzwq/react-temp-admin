import { Helmet } from "react-helmet-async";

export default function UserManagement() {
  return (
    <>
      <Helmet>
        <title>用户管理 | {import.meta.env.VITE_APP_TITLE}</title>
      </Helmet>
      <div>user management</div>
    </>
  );
}
