import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "@components/Copyright";
import { Checkbox, IconButton, InputLabel, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UpdateClient } from "@helper/client/user/userClient";
import { isEmpty } from "@helper/objects";
import { shuffle } from "lodash";
import React, { FC, useEffect, useState } from "react";
import { SecurityQuestions } from "@constants/securityQuestions";
import { User } from "@typedefs/user";
import SecurityQuestionList from "@components/SecurityQuestion";
import SnackBarComponent from "./Snackbar";

const UserEdit: FC<{ data: User }> = ({ data }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<any>(shuffle(SecurityQuestions));
  const [userData, setUserData] = useState<Partial<User> | any>(data);
  const [doesUserAcknowledged, setDoesUserAcknowledged] = useState(false);
  const [containsSecQuestion, setContainsSecQuestion] = useState(true);
  const [snackbar, setSnackbar] = useState<any>({
    isOpen: false,
    isError: false,
    message: null,
  });

  useEffect(() => {
    if ((userData && !userData?.securityQuestions) || userData?.securityQuestions.length < 1) {
      setContainsSecQuestion(false);
    } else if (userData && userData?.securityQuestions && userData?.securityQuestions.length == 3) {
      setDoesUserAcknowledged(true);
      setContainsSecQuestion(true);
    }
  }, [userData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    for (let questions of userData.securityQuestions) {
      if (questions.question.length <= 1 || questions.answer.length <= 1) {
        alert("Security Question is Needed");
      }
    }
    const { role, _id, lastLogin, ...rest } = userData;
    if (isEmpty(rest, false, containsSecQuestion)) return setSnackbar({ isOpen: true, isError: true, message: "Check your fields." });
    const res = await UpdateClient(rest);
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
    <Container component="form" noValidate maxWidth="sm" sx={{ mb: 4, mt: 5 }} onSubmit={handleSubmit}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <SnackBarComponent setSnackbar={setSnackbar} snackbar={snackbar} />
        <Typography component="h1" variant="h4" align="center">
          Edit Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={userData?.firstName}
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={userData?.lastName}
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={userData?.username}
              required
              id="username"
              name="username"
              label="Username"
              fullWidth
              autoComplete="username"
              variant="standard"
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              placeholder="*******"
              id="password"
              name="password1"
              label="Password"
              type="pasword"
              fullWidth
              variant="standard"
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
          </Grid>
          {Array(3)
            .fill(null)
            .map((e: any, index: any) => {
              return (
                <>
                  <Grid item xs={12}>
                    <InputLabel id="security-question-label" key={`sec-label-${index}`}>
                      Security Question {index + 1}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12}>
                    <SecurityQuestionList variant="standard" indexSec={index} key={`seq-${index}`} userData={userData} setUserData={setUserData} shuffledQuestions={shuffledQuestions}></SecurityQuestionList>
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
                      variant="standard"
                      value={(userData?.securityQuestions && userData?.securityQuestions[index]?.answer) ?? ""}
                      onChange={(e) => {
                        const setSelectedQuestion = [...(userData?.securityQuestions || [])];
                        setSelectedQuestion[index] = { ...(userData?.securityQuestions?.[index] ?? setSelectedQuestion[index]), answer: e.target.value };
                        setUserData({ ...userData, securityQuestions: setSelectedQuestion });
                      }}
                    />
                  </Grid>
                </>
              );
            })}
          <Grid item xs={12}>
            <Typography align="center" color={"red"}>
              Note: If the admin registered your account, and you haven't changed your password, the security questions are needed. Please check if you acknowledge
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <Checkbox checked={doesUserAcknowledged} color="primary" onChange={(e) => setDoesUserAcknowledged(!doesUserAcknowledged)} /> I acknowledge
            </Typography>
          </Grid>
        </Grid>
        <Button disabled={!doesUserAcknowledged} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update My Account
        </Button>
      </Paper>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default UserEdit;
