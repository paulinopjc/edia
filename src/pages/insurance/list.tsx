import Head from "next/head";
import Loader from "@components/Loader";
import { Roles } from "@typedefs/roles";
import { PolicyContainer } from "@containers/PolicyContainer";
import { getSession } from "next-auth/react";
import { API } from "@libs/api";

export default function PolicyList({ data: { data } }: any) {
  console.log("data", data);
  return (
    <>
      <Head>
        <title>Insurance Policy List</title>
      </Head>
      <PolicyContainer data={data} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession(context);
    const { data } = await API.get("/api/policy", {
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

PolicyList.auth = {
  role: Roles.AGENT,
  loading: <Loader />,
  unauthorized: "/",
};
