import { User as IUser } from "@typedefs/user";
import User from "@models/user.model";
import * as bcrypt from "bcrypt";

export const FindApiForReset = async (data: Partial<IUser>) => {
  try {
    const { username } = data;
    const { securityQuestions } = await User.findOne({ username });
    const questions = [];
    for (let q of securityQuestions) {
      questions.push({ question: q?.question });
    }
    if (questions.length < 1) return null;
    return questions;
  } catch (e) {
    console.log("e", e);
    return false;
  }
};

export const ResetApi = async (data: Partial<IUser>) => {
  try {
    const { username, password, securityQuestions } = data;
    const { securityQuestions: docSecurityQuestions } = await User.findOne({ username });
    if (securityQuestions && docSecurityQuestions) {
      for (let i = 0; i < 3; i++) {
        if (!bcrypt.compareSync(securityQuestions[i].answer, docSecurityQuestions[i].answer)) {
          // console.log("securityQuestions[i].answer: ", securityQuestions[i].answer, " docSecurityQuestions[i].answer: ", docSecurityQuestions[i].answer);
          return false;
        }
      }
      const res = await User.findOneAndUpdate({ username }, { password: await bcrypt.hash(password as string, 10) });
      if (res) return true;
      return false;
    }
  } catch (e) {
    console.log("e", e);
    return false;
  }
};
