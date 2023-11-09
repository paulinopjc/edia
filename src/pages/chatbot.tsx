import Head from "next/head";
import Loader from "@components/Loader";
import ChatbotContainer from "@containers/Chatbot";
import { Roles } from "@typedefs/roles";

export default function Chatbot() {
  return (
    <>
      <Head>
        <title>Chatbot</title>
      </Head>
      <ChatbotContainer />
    </>
  );
}

Chatbot.auth = {
  role: Roles.ADMIN,
  loading: <Loader />,
  unauthorized: "/",
};
