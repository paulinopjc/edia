import Head from "next/head";
import Loader from "@components/Loader";
import { Roles } from "@typedefs/roles";
import MapContainer from "@containers/MapContainer";

export default function Clinic() {
  return (
    <>
      <Head>
        <title>Clinic Finder</title>
      </Head>
      <MapContainer />
    </>
  );
}

Clinic.auth = {
  role: Roles.ADMIN,
  loading: <Loader />,
  unauthorized: "/",
};
