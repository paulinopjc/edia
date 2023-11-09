import { toInteger } from "lodash";
import Logs from "@models/logs.model";
import { Logs as LogType } from "@typedefs/logs";
import { Query } from "@typedefs/query";

export const LogAction = async (data: LogType) => {
  const res = await Logs.create(data);
  return res;
};

export const getLogs = async (query: Query) => {
  const { limit, page } = query;
  return await Logs.find({}).sort({ createdAt: -1 }).limit(limit).skip(page);
};

export const searchLogs = async (query: Query) => {
  const { limit, page, search } = query;
  return await Logs.aggregate([
    {
      $match: {
        $or: [{ username: { $regex: search ?? "", $options: "i" } }, { IP: { $regex: search ?? "", $options: "i" } }, { method: { $regex: search ?? "", $options: "i" } }, { action: { $regex: search ?? "", $options: "i" } }, { role: { $regex: search ?? "", $options: "i" } }],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "username",
        foreignField: "username",
        pipeline: [
          {
            $project: {
              role: 1,
              _id: 0,
            },
          },
        ],
        as: "role",
      },
    },
    {
      $unwind: { path: "$role", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        role: "$role.role",
        username: 1,
        IP: 1,
        method: 1,
        action: 1,
        createdAt: 1,
      },
    },
  ])
    .limit(toInteger(limit))
    .skip(toInteger(page))
    .sort({ createdAt: -1 });
};
