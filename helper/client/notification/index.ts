import { API } from "@libs/api";

export const getNotificationsClient = async (userId: string, accessToken: string, setNotification: (notification: any) => void) => {
  try {
    const res = await API.get("/api/notification", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { search: userId, limit: 100, page: 0 },
    });

    if (res.status == 200) {
      const { data } = res;

      data?.data.sort((a: any, b: any) => (a.read === b.read ? 0 : a.read ? 1 : -1));
      return setNotification(data?.data);
    }
  } catch (e: any) {
    console.log("error", e);
  }
};

export const readNotificationClient = async (userId: string, policyId: string, accessToken: string) => {
  try {
    console.log("passing ", userId, " fasfa ", policyId, " access ", accessToken);
    const res = await API.patch(
      "/api/notification",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { policyId, agentId: userId },
      }
    );
    return;
  } catch (e: any) {
    console.log("error reading notif", e);
    return;
  }
};
