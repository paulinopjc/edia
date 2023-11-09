import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "@components/Copyright";
import Router from "next/router";
import { IconButton, InputLabel, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RegisterClient } from "@helper/client/user/userClient";
import { isEmpty } from "@helper/objects";
import { shuffle } from "lodash";
import { SecurityQuestions } from "@constants/securityQuestions";
import { User } from "@typedefs/user";
import SecurityQuestionList from "@components/SecurityQuestion";
import SnackBarComponent from "@components/Snackbar";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Registration() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<any>(shuffle(SecurityQuestions));
  const [userData, setUserData] = useState<Partial<User> | any>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    securityQuestions: [
      { question: SecurityQuestions[0], answer: "" },
      { question: SecurityQuestions[1], answer: "" },
      { question: SecurityQuestions[2], answer: "" },
    ],
  });
  const [snackbar, setSnackbar] = useState<any>({
    isOpen: false,
    isError: false,
    message: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEmpty(userData)) return setSnackbar({ isOpen: true, isError: true, message: "Check your fields" });
    const res = await RegisterClient(userData);
    setSnackbar(res);
    Router.push("/");
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
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
            </Grid>
            {userData.securityQuestions.map((e: any, index: any) => {
              return (
                <>
                  <Grid item xs={12}>
                    <InputLabel id="security-question-label" key={`sec-label-${index}`}>
                      Security Question {index + 1}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12}>
                    <SecurityQuestionList indexSec={index} key={`seq-${index}`} userData={userData} setUserData={setUserData} shuffledQuestions={shuffledQuestions}></SecurityQuestionList>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoFocus
                      key={`field-${index}`}
                      required
                      fullWidth
                      name={`answer-${index}`}
                      label={`Answer ${index + 1}`}
                      type="answer"
                      id={`answer-${index}`}
                      value={userData?.securityQuestions[index].answer || ""}
                      onChange={(e) => {
                        const setSelectedQuestion = [...(userData?.securityQuestions || [])];
                        setSelectedQuestion[index] = { ...userData?.securityQuestions[index], answer: e.target.value };
                        setUserData({ ...userData, securityQuestions: setSelectedQuestion });
                      }}
                    />
                  </Grid>
                </>
              );
            })}
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={() => Router.push("/")}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
