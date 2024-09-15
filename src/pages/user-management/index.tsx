import { Helmet } from "react-helmet-async";
import { Table, type TableProps } from "antd";
import EditButton from "./components/edit-button";
import { useUserList } from "./api";

interface DataType {
  key: string;
  name: string;
  phone: string;
  email: string;
  company: any;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Website",
    dataIndex: "website",
    key: "website",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
    render: (_, record) => record.company.name,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => {
      return <EditButton data={record} />;
    },
  },
];

export default function UserManagement() {
  const { data, isFetching } = useUserList();

  return (
    <>
      <Helmet>
        <title>用户管理 | {import.meta.env.VITE_APP_TITLE}</title>
      </Helmet>
      <Table columns={columns} dataSource={data} loading={isFetching} pagination={false} rowKey="id" />
    </>
  );
}
