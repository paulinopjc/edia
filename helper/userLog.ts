import { getSession } from "next-auth/react";
import { API } from "@libs/api";
import { Logs as LogType } from "@typedefs/logs";

export const searchLogsClient = async (input: string, accessToken: string, setData: (data: any) => void) => {
  const { data } = await API.get("/api/logs", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: { limit: 100, page: 0, search: input },
  });
  const { data: logs } = data;
  setData(logs);
};
