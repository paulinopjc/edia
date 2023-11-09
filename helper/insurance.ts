import { User } from "@typedefs/user";
import Policy from "@models/policy.model";
import { session } from "@libs/mongoose/session.handler";
import { Query } from "@typedefs/query";
import { toInteger } from "lodash";
import { Types } from "mongoose";

import { convertDateToIso } from "@helper/date";
import { InsurancePolicy } from "@typedefs/policy";

export const savePolicy = async (insurancePolicy: InsurancePolicy | InsurancePolicy[], agentDetails: Partial<User>) => {
  //const mongoSession = await session();
  const { username, _id } = agentDetails;
  
  try {
    console.log("POLICY SENT: ", insurancePolicy);
    const policy = (Array.isArray(insurancePolicy) ? insurancePolicy : [insurancePolicy]).map((e: InsurancePolicy) => ({
      updateOne: {
        filter: { giaOr: e.giaOr, giaIssuedDate: convertDateToIso(String(e.giaIssuedDate)) },
        update: {
          ...e,
          creator: _id,
          updatedByAgent: _id,
          updatedByAgentName: username,
          giaIssuedDate: convertDateToIso(String(e.giaIssuedDate)),
          inception: convertDateToIso(String(e.inception)),
          expiry: convertDateToIso(String(e.expiry)),
          giaDate: convertDateToIso(String(e.giaDate)),
          insuranceOrNoDate: convertDateToIso(String(e.insuranceOrNoDate)),
        },
        upsert: true,
      },
    }));
    //const response = await Policy.bulkWrite(policy, { session: mongoSession }); // use this for session
    const response = await Policy.bulkWrite(policy);
    return response;
  } catch (e) {
    console.log("error", e);
    //mongoSession.abortTransaction();
    return e;
  }
};

export const getPolicies = async (query: Query) => {
  try {
    const { limit, page, search } = query;
    return await Policy.aggregate([
      {
        $match: {
          $or: [{ soaNo: { $regex: search ?? "", $options: "i" } }, { insurer: { $regex: search ?? "", $options: "i" } }, { policyNo: { $regex: search ?? "", $options: "i" } }, { giaOr: { $regex: search ?? "", $options: "i" } }, { insuranceOrNo: { $regex: search ?? "", $options: "i" } }],
        },
      },
    ])
      .limit(toInteger(limit))
      .skip(toInteger(page))
      .sort({ createdAt: -1 });
  } catch (e) {}
};

export const updatePolicy = async (insurancePolicy: InsurancePolicy | InsurancePolicy[], agentDetails: Partial<User>) => {
  //const mongoSession = await session();
  console.log("POLICY SENT: ", insurancePolicy);
  try {
    const policy = (Array.isArray(insurancePolicy) ? insurancePolicy : [insurancePolicy]).map((e: InsurancePolicy) => {
      const { _id, ...rest } = e;
      const { username, _id: agentId } = agentDetails;
      return {
        updateOne: {
          filter: { _id: new Types.ObjectId(_id) },
          update: { ...rest, updatedByAgentName: username, updatedByAgent: new Types.ObjectId(agentId) },
        },
        upsert: true,
      };
    });
    // const response = await Policy.bulkWrite(policy, { session: mongoSession }); // use this for session
    const response = await Policy.bulkWrite(policy);
    console.log("response", response);
    return response;
  } catch (e) {
    console.log("error", e);
    //mongoSession.abortTransaction();
    return null;
  }
};

export const deletePolicy = async (_id: string) => {
  const mongoSession = await session();
  try {
    const response = await Policy.deleteOne({ _id: new Types.ObjectId(_id) });
    console.log("response", response);
    return response;
  } catch (e) {
    console.log("error", e);
    mongoSession.abortTransaction();
    return null;
  }
};
