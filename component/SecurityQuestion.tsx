import Typography from "@mui/material/Typography";
import { MenuItem, NoSsr, Select, SelectChangeEvent } from "@mui/material";
import React, { FC } from "react";
import { SecurityQuestionType, User } from "@typedefs/user";

interface ISecQ {
  userData: User;
  indexSec: number;
  setUserData: (data: User) => void;
  shuffledQuestions?: any[];
  variant?: any;
}

const SecurityQuestionList: FC<ISecQ> = ({ indexSec, userData, setUserData, shuffledQuestions, variant }) => (
  <NoSsr>
    <Select
      key={`sel-${indexSec}`}
      data-testid={`secq-${indexSec}`}
      labelId={`security-question-label-${indexSec}`}
      fullWidth
      variant={variant ? variant : "outlined"}
      value={userData?.securityQuestions && userData?.securityQuestions[indexSec]?.question ? userData?.securityQuestions[indexSec]?.question : shuffledQuestions && shuffledQuestions[indexSec]}
      onChange={(event: SelectChangeEvent) => {
        const setSelectedQuestion = [...(userData?.securityQuestions || [])];
        setSelectedQuestion[indexSec] = { ...(userData?.securityQuestions?.[indexSec] ?? setSelectedQuestion[indexSec]), question: event.target.value };
        setUserData({ ...userData, securityQuestions: setSelectedQuestion });
      }}
      disabled={shuffledQuestions ? false : true}
    >
      {shuffledQuestions
        ? shuffledQuestions.map((question: any, index: any) => (
            <MenuItem key={`${question}-${index}`} value={question}>
              <Typography key={`typog-${index}`}>{question}</Typography>
            </MenuItem>
          ))
        : userData.securityQuestions.map((secQ: SecurityQuestionType, index: number) => (
            <MenuItem key={`${secQ.question}-${index}`} value={secQ.question}>
              <Typography key={`typog-${index}`}>{secQ.question}</Typography>
            </MenuItem>
          ))}
    </Select>
  </NoSsr>
);

export default SecurityQuestionList;
