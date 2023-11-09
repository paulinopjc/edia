import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "@components/Copyright";
import { InputLabel } from "@mui/material";
import React, { useState } from "react";
import { SecurityQuestionType, User } from "@typedefs/user";
import { CheckForResetClient, ResetClient } from "@helper/client/user/userClient";
import SecurityQuestionList from "@components/SecurityQuestion";
import { useRouter } from "next/router";

const PasswordReset = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [userData, setUserData] = useState<Partial<User> | any>({
    username: "",
    securityQuestions: [
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
    ],
  });

  return (
    <Container component="main" maxWidth="xs">
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
          Password Reset
        </Typography>
        <Box
          component="form"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            !isValid ? CheckForResetClient(userData, setUserData, setIsValid) : ResetClient(userData, router);
          }}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField required fullWidth id="username" label="Username" name="username" onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
            </Grid>

            {!isValid
              ? null
              : userData.securityQuestions?.map((e: SecurityQuestionType, index: number) => {
                  return (
                    <>
                      <Grid item xs={12}>
                        <InputLabel id="security-question-label" key={`sec-label-${index}`}>
                          Security Question {index + 1}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12}>
                        <SecurityQuestionList userData={userData} indexSec={index} setUserData={setUserData} />
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
            {!isValid ? null : (
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  label="New Password"
                  name="password"
                  autoComplete="password"
                  autoFocus
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
              </Grid>
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {!isValid ? `Check Username` : `Reset Your Password`}
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default PasswordReset;
