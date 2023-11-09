import { getSession } from "next-auth/react";
import Head from "next/head";
import UserSetting from "@containers/User/UserEdit";
import { API } from "@libs/api";

export default function Users({ data }: any) {
  const { data: user } = data;
  console.log("datausersrsrsr", user[0]);
  return (
    <>
      <Head>
        <title>Edit Details</title>
      </Head>
      <UserSetting data={user[0]} />
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
      params: { limit: 100, page: 0, search: session?.user.username },
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
