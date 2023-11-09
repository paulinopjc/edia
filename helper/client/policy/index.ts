import { API } from "@libs/api";
import { Query } from "@typedefs/query";
import { InsurancePolicy } from "@typedefs/policy";

export const AddPolicy = async (policy: Partial<InsurancePolicy>, accessToken: string, setSnackbar: (snackbar: any) => void) => {
  try {
    const res = await API.post("/api/policy", policy, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status == 200) {
      const { data } = res;
      return setSnackbar({ isOpen: true, message: data?.message, isError: false });
    }

    return { isOpen: true, message: res?.data?.message, isError: true };
  } catch (e: any) {
    console.log(e);
    const {
      response: {
        data: { error },
      },
    } = e;
    return { isOpen: true, message: error, isError: true };
  }
};

export const DeletePolicy = async (_id: string, accessToken: string, setSnackbar: (snackbar: any) => void) => {
  try {
    const res = await API.delete("/api/policy", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { _id },
    });

    if (res.status == 200) {
      const { data } = res;
      return setSnackbar({ isOpen: true, message: data?.message, isError: false });
    }

    return { isOpen: true, message: res?.data?.message, isError: true };
  } catch (e: any) {
    const {
      response: {
        data: { error },
      },
    } = e;
    return { isOpen: true, message: error, isError: true };
  }
};

export const GetPolicies = async (query: Query, accessToken: string) => {
  const {
    data: { data },
  } = await API.get("/api/policy", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: query,
  });

  if (data) return data;
  else return null;
};

export const refetchPolicies = async (accessToken: string, setData: (data: any) => void) => {
  const data = await GetPolicies({ limit: 100, page: 0, search: "" }, accessToken);
  console.log("data returned", data);
  return setData(data);
};

export const UpdatePolicy = async (policy: Partial<InsurancePolicy>, accessToken: string, setSnackbar: (snackbar: any) => void) => {
  try {
    console.log("Updating... ", policy);
    const res = await API.patch("/api/policy", policy, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status == 200) {
      const { data } = res;
      return setSnackbar({ isOpen: true, message: data?.message, isError: false });
    }

    return { isOpen: true, message: res?.data?.message, isError: true };
  } catch (e: any) {
    const {
      response: {
        data: { error },
      },
    } = e;
    return { isOpen: true, message: error, isError: true };
  }
};

export const searchPolicyClient = async (input: string, accessToken: string, setData: (data: any) => void) => {
  const { data } = await API.get("/api/policy", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: { limit: 100, page: 0, search: input },
  });
  const { data: logs } = data;
  setData(logs);
};
