import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        p: 1,
        backgroundColor: "background.paper",
      }}
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Edia
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
