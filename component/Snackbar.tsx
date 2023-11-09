import { IconButton, Snackbar } from "@mui/material";
import React, { FC, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ISnackbarComponent {
  snackbar: {
    isOpen: boolean;
    isError: boolean;
    message: string;
  };
  setSnackbar: (snackbar: any) => void;
}

const SnackBarComponent: FC<ISnackbarComponent> = ({ snackbar, setSnackbar }) => {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ isOpen: false, isError: false, message: "" });
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return <Snackbar open={snackbar.isOpen} autoHideDuration={6000} onClose={handleClose} message={snackbar.message} action={action} />;
};

export default SnackBarComponent;
