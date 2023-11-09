import { getSession } from "next-auth/react";
import Head from "next/head";
import Loader from "@components/Loader";
import { UserContainer } from "@containers/User/User";
import { API } from "@libs/api";
import { Roles } from "@typedefs/roles";

export default function Users({ data }: any) {
  const { data: users } = data;
  return (
    <>
      <Head>
        <title> User List</title>
      </Head>
      <UserContainer data={users} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession(context);
    const { data } = await API.get("/api/user", {
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

Users.auth = {
  role: Roles.ADMIN,
  loading: <Loader />,
  unauthorized: "/",
};