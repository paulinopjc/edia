import * as React from "react";
import Container from "@mui/material/Container";
import UploadFile from "@components/Insurance/Upload";

const UploadContainer = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <UploadFile />
    </Container>
  );
};

export default UploadContainer;
