import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "@components/Copyright";
import Router from "next/router";
import SnackBarComponent from "@components/Snackbar";
import { isEmptyNoSec } from "../helper/objects";
import { IconButton, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { signIn } from "next-auth/react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState<any>({
    isOpen: false,
    isError: false,
    message: null,
  });

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let object: any = {};
    new FormData(event.currentTarget).forEach((value: any, key: any) => (object[key] = value));
    if (isEmptyNoSec(object)) return setSnackbar({ isOpen: true, isError: true, message: "Check your fields" });
    signIn("credentials", { username: object?.username!, password: object?.password!, redirect: false }).then((e) => {
      if (e?.error) setSnackbar({ isOpen: true, isError: true, message: "Your credentials is invalid, please try again" });
      else if (e?.ok) Router.push("/dashboard");
    });
    // const res = await LoginClient(object);
    // if (!res.isOpen && !res.isError && res.message.length > 1) {
    //   setCookie("auth", res.message);
    // }
  };

  return (
    <Container component="main" maxWidth="xs">
      <SnackBarComponent setSnackbar={setSnackbar} snackbar={snackbar} />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth name="username" label="Username" type="text" id="username" autoComplete="current-username" />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setIsPasswordVisible(!isPasswordVisible);
                    }}
                  >
                    {isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={() => Router.push("/reset")}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item alignItems="center" justifyContent="center">
              <Link href="#" variant="body2" onClick={() => Router.push("/register")}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
