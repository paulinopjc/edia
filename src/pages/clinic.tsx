import Head from "next/head";
import Loader from "@components/Loader";
import ChatbotContainer from "@containers/Chatbot";
import { Roles } from "@typedefs/roles";
import { GoogleMap } from "@react-google-maps/api";

export default function Clinic() {
  return (
    <>
      <Head>
        <title>Clinic Finder</title>
      </Head>
      <GoogleMap />
    </>
  );
}

Clinic.auth = {
  role: Roles.ADMIN,
  loading: <Loader />,
  unauthorized: "/",
};
