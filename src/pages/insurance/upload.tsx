import Head from "next/head";
import Loader from "@components/Loader";
import { Roles } from "@typedefs/roles";
import UploadContainer from "@containers/Admin/UploadContainer";

export default function Upload() {
  return (
    <>
      <Head>
        <title>Upload Entry Information</title>
      </Head>
      <UploadContainer />
    </>
  );
}

Upload.auth = {
  role: Roles.ADMIN,
  loading: <Loader />,
  unauthorized: "/",
};
