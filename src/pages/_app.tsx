//@ts-nocheck
// import "@/styles/globals.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import Loader from "@components/Loader";
import DrawerContainer from "@containers/DrawerContainer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f9b17a",
    },
    background: {
      default: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#2d3250",
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        {Component?.auth ? (
          <Auth>
            <DrawerContainer>
              <Component {...pageProps} />
            </DrawerContainer>
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </SessionProvider>
  );
}

function Auth({ children }: any) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status, data } = useSession({ required: true });

  if (status === "loading") {
    return <Loader />;
  }
  if (data == null) {
    return <>Please login</>;
  }

  return children;
}
