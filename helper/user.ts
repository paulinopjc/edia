import { User as IUser } from "@typedefs/user";
import User from "@models/user.model";
import * as bcrypt from "bcrypt";
import { JWTSign } from "@libs/jwt";
import { Query } from "@typedefs/query";
import { Types } from "mongoose";
import { toInteger } from "lodash";

export const RegisterApi = async (data: IUser) => {
  try {
    const hashed = await bcrypt.hash(data.password, 10);
    const secQuestions = [];
    console.log("data.securityQuestions", data.securityQuestions);
    if (data.securityQuestions && data.securityQuestions.length > 1) {
      for (let question of data?.securityQuestions) {
        secQuestions.push({ ...question, answer: await bcrypt.hash(question.answer, 10) });
      }
    }
    // console.log("secQuestions", secQuestions);
    const updated = {
      ...data,
      password: hashed,
      securityQuestions: secQuestions.length > 1 ? secQuestions : null,
    };
    console.log("updated", updated);
    await User.create(updated);
    return { status: true, code: null };
  } catch (e: any) {
    console.log("e", e);
    return { status: false, code: e?.code };
  }
};

export const LoginApi = async (data: Partial<IUser>) => {
  try {
    const { username, password } = data;
    const { password: docPass, role, _id } = await User.findOne({ username });
    if (!docPass) return false;
    const isMatch = await bcrypt.compare(password as string, docPass);
    if (!isMatch) return false;
    const jwtToken = JWTSign({ username, role, _id });
    await User.findOneAndUpdate({ username }, { lastLogin: new Date().toISOString() });
    return jwtToken;
  } catch (e) {
    console.log("e", e);
    return false;
  }
};

export const UserUpdateApi = async (data: IUser) => {
  try {
    let hashed, updated;
    if (data.password) {
      hashed = await bcrypt.hash(data.password, 10);
      updated = {
        ...data,
        password: hashed,
      };
    }

    if (data.securityQuestions && data.securityQuestions.length > 1) {
      const secQuestions = [];
      console.log("data.securityQuestions", data.securityQuestions);
      for (let question of data?.securityQuestions) {
        secQuestions.push({ ...question, answer: await bcrypt.hash(question.answer, 10) });
      }
      updated = {
        ...data,
        password: hashed,
        securityQuestions: secQuestions.length > 1 ? secQuestions : null,
      };
    }

    await User.updateOne({ _id: new Types.ObjectId(data._id) }, updated);
    return { status: true, code: null };
  } catch (e: any) {
    return { status: false, code: e?.code };
  }
};

export const getUsers = async (query: Query) => {
  try {
    const { limit, page, search } = query;
    return await User.aggregate([
      {
        $match: {
          $or: [
            { username: { $regex: search ?? "", $options: "i" } },
            { role: { $regex: search ?? "", $options: "i" } },
            { firstName: { $regex: search ?? "", $options: "i" } },
            { lastName: { $regex: search ?? "", $options: "i" } },
          ],
        },
      },
      {
        $project: {
          username: 1,
          role: 1,
          firstName: 1,
          lastName: 1,
          _id: 1,
          lastLogin: 1,
          "securityQuestions.question": 1,
        },
      },
    ])
      .limit(toInteger(limit))
      .skip(toInteger(page))
      .sort({ createdAt: -1 });
  } catch (e) {
    console.log("e", e);
  }
};

export const deleteUser = async (_id: string) => {
  return await User.deleteOne({ _id: new Types.ObjectId(_id) });
};
