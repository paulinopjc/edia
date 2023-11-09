import React, { useCallback, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import Snackbar from "@components/Snackbar";
import { ClientUpload } from "@helper/client/upload";
import { useSession } from "next-auth/react";

export default function FileUploader() {
  const { data: session } = useSession({ required: true });
  const [files, setFiles] = useState([]);
  const [snackbar, setSnackbar] = useState<any>({
    isOpen: false,
    isError: false,
    message: null,
  });

  const uploadFile = () => {
    if (files.length >= 1) {
      ClientUpload(files[0], session?.user.accessToken!, setSnackbar, setFiles);
    } else {
      alert("Error: Input file");
    }
  };

  const onDrop = useCallback(async (acceptedFiles: any) => {
    // Do something with the accepted files (e.g. upload to server)
    console.log("acceptedFiles: ", acceptedFiles[0]);
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls", ".xlsx"],
    },
  });

  return (
    <Box sx={{ mt: 2, mb: 5 }}>
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 150,
          borderRadius: 1,
          borderWidth: 2,
          borderStyle: "dashed",
          borderColor: "text.disabled",
          p: 2,
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Typography variant="body1" color="text.secondary">
          Drag and drop files here, or click to select files
        </Typography>
      </Box>
      {files?.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="body1" color="text.primary">
            Selected files:
          </Typography>
          <ul>
            {files?.map((file: any) => (
              <li key={file?.name}>{file?.name}</li>
            ))}
          </ul>
        </Box>
      )}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button variant="contained" disabled={files?.length === 0} onClick={uploadFile}>
          Upload
        </Button>
      </Box>
    </Box>
  );
}
