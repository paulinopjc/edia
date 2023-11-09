import { Query } from "@typedefs/query";
import Notification from "@models/notification.model";
import Policy from "@models/policy.model";
import { ExpiringPolicies, Notification as INotifications } from "@typedefs/notifications";
import { Types } from "mongoose";

const today = new Date();
// argument example: today.getTime() + 30 * 24 * 60 * 60 * 1000 this calculate the date 30 days from now
export const getExpiringPolicies = async (daysBeforeExpiry: Date) => {
  return Policy.aggregate([
    {
      $match: {
        expiryDate: {
          $gte: today.toISOString(), // policies that will expire from today
          $lte: daysBeforeExpiry.toISOString(), // policies that will expire within the next 30 days
        },
      },
    },
    {
      $project: {
        _id: 1,
        creator: 1,
        updatedByAgent: 1,
      },
    },
  ]);
};

export const createExpiringPoliciesNotification = async () => {
  try {
    const expiryDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // equal to 30 days
    const expiringPolicies = await getExpiringPolicies(expiryDate);
    const notifications = expiringPolicies.map((e: ExpiringPolicies) => {
      return {
        updateOne: {
          filter: { policyId: { $eq: new Types.ObjectId(e._id) }, agentId: new Types.ObjectId(e.creator) },
          update: {
            policyId: new Types.ObjectId(e._id),
            agentId: new Types.ObjectId(e.creator),
            updaterAgentId: new Types.ObjectId(e.updatedByAgent),
          },
        },
      };
    });
    await Notification.bulkWrite(notifications);
    return;
  } catch (e) {
    console.log("error in creating notifs: ", e);
  }
};

export const getNotifications = async (query: Query) => {
  const { search, limit, page } = query;
  return await Notification.aggregate([
    {
      $match: {
        agentId: new Types.ObjectId(search),
      },
    },
    {
      $lookup: {
        from: "policies",
        localField: "policyId",
        foreignField: "_id",
        as: "policyData",
      },
    },
    { $unwind: { path: "$policyData" } },
  ])
    .limit(+limit)
    .skip(+page);
};

export const updateNotifications = async (query: Partial<INotifications>) => {
  const { agentId, policyId } = query;
  const res = await Notification.findOneAndUpdate({ agentId: new Types.ObjectId(agentId), policyId: new Types.ObjectId(policyId) }, { read: true });
  console.log("response: ", res);
  return res;
};
