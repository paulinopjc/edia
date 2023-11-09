import Head from "next/head";
import PasswordReset from "@containers/PasswordReset";

export default function Reset() {
  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <PasswordReset />
    </>
  );
}
