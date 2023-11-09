import { getSession } from "next-auth/react";
import Head from "next/head";
import Loader from "@components/Loader";
import { LogsContainer } from "@containers/Logs";
import { API } from "@libs/api";
import { Roles } from "@typedefs/roles";

export default function Logs({ data }: any) {
  const { data: logs } = data;
  return (
    <>
      <Head>
        <title>Logs</title>
      </Head>
      <LogsContainer data={logs} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession(context);
    const { data } = await API.get("/api/logs", {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      params: { limit: 100, page: 0, search: "" },
    });
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    return {
      props: {
        data: { data: [] },
      },
    };
  }
}

Logs.auth = {
  role: Roles.ADMIN,
  loading: <Loader />,
  unauthorized: "/",
};
