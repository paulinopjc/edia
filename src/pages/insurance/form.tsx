import Head from "next/head";
import Loader from "@components/Loader";
import { Roles } from "@typedefs/roles";
import Form from "@containers/Agent/Form";

export default function AgentForm() {
  return (
    <>
      <Head>
        <title>Insurance Policy</title>
      </Head>
      <Form />
    </>
  );
}

AgentForm.auth = {
  role: Roles.AGENT,
  loading: <Loader />,
  unauthorized: "/",
};
