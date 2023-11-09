import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton, MenuItem, Select, SelectChangeEvent, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RegisterClient } from "@helper/client/user/userClient";
import { isEmpty } from "@helper/objects";
import React, { useEffect, useState } from "react";
import { User } from "@typedefs/user";
import { Roles } from "@typedefs/roles";
import SnackBarComponent from "./Snackbar";

export const RegistrationAdmin = () => {
  const [userData, setUserData] = useState<Partial<User> | any>({
    firstName: "",
    lastName: "",
    username: "",
    password: "Password123!",
    role: Roles.AGENT,
  });

  const [snackbar, setSnackbar] = useState<any>({
    isOpen: false,
    isError: false,
    message: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEmpty(userData, true)) return setSnackbar({ isOpen: true, isError: true, message: "Check your fields" });
    const res = await RegisterClient(userData);
    setSnackbar(res);
  };

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

  return (
    <Container component="main" maxWidth="xs">
      <SnackBarComponent setSnackbar={setSnackbar} snackbar={snackbar} />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth id="username" label="Username" name="username" onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <Select
                key={"roles"}
                fullWidth
                labelId={"roles-select"}
                value={userData?.role}
                onChange={(event: SelectChangeEvent) => {
                  setUserData({ ...userData, role: event.target.value });
                }}
              >
                {Object.values(Roles)
                  .filter((e) => typeof e == "string")
                  .map((role: any) => {
                    return (
                      <MenuItem key={Roles[role]} value={Roles[role]}>
                        {role}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" color={"red"}>
                Default Password is: Password123!
              </Typography>
            </Grid>
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add User
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
