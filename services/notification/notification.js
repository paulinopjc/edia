const { Notification } = require("./notification.model");
const { Policy } = require("./policy.model");
const { Types } = require("mongoose");

const today = new Date();

// argument example: today.getTime() + 30 * 24 * 60 * 60 * 1000 this calculate the date 30 days from now
const getExpiringPolicies = async (daysBeforeExpiry) => {
  return Policy.aggregate([
    {
      $match: {
        expiry: {
          $gte: today, // policies that will expire from today
          $lte: daysBeforeExpiry, // policies that will expire within the next 30 days
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

const createExpiringPoliciesNotification = async () => {
  try {
    const expiryDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // equal to 30 days
    const expiringPolicies = await getExpiringPolicies(expiryDate);
    console.log("expiringPolicies", expiringPolicies.length);
    const notifications = expiringPolicies.map((e) => {
      return {
        updateOne: {
          filter: { policyId: { $eq: new Types.ObjectId(e._id) }, agentId: new Types.ObjectId(e.creator) },
          update: {
            policyId: new Types.ObjectId(e._id),
            agentId: new Types.ObjectId(e.creator),
            updaterAgentId: new Types.ObjectId(e.updatedByAgent),
          },
          upsert: true,
        },
      };
    });
    console.log("notificationsnotificationsnotifications: ", JSON.stringify(notifications));
    const response = await Notification.bulkWrite(notifications);
    console.log("response", response);
    return response;
  } catch (e) {
    console.log("error in creating notifs: ", e);
  }
};

module.exports = {
  createExpiringPoliciesNotification,
  getExpiringPolicies,
};
