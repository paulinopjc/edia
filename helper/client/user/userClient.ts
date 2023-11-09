import { API } from "@libs/api";
import { User as IUser } from "@typedefs/user";

export const RegisterClient = async (data: IUser) => {
  try {
    const res = await API.post("/api/login", data);
    if (res.status === 201) return { isOpen: true, message: "Success", isError: false };
  } catch (e: any) {
    const {
      response: {
        data: { error },
      },
    } = e;
    return { isOpen: true, message: error, isError: true };
  }
};

// function below is unsupported api. isn't used anymore. moved to next-auth
export const LoginClient = async (data: Partial<IUser>) => {
  try {
    const res = await API.get("/api/login", {
      params: {
        username: data.username,
        password: data.password,
      },
    });

    return { isOpen: false, message: res, isError: false };
  } catch (e: any) {
    const {
      response: {
        data: { error },
      },
    } = e;
    return { isOpen: true, message: error, isError: true };
  }
};

export const CheckForResetClient = async (userData: Partial<IUser>, setUserData: (data: any) => void, setIsValid: (isValid: boolean) => void, setIsLoading?: (isLoading: boolean) => void) => {
  try {
    const res = await API.get("/api/reset", {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
      params: {
        username: userData.username,
      },
    });

    if (res.status == 200) {
      const { data } = res.data;
      setUserData({ ...userData, securityQuestions: data });
      return setIsValid(true);
    }

    return setIsValid(false);
  } catch (e: any) {
    const {
      response: {
        data: { error },
      },
    } = e;
    alert("Error! Account not found");
    return setIsValid(false);
  }
};

export const ResetClient = async (userData: Partial<IUser>, router: any) => {
  try {
    const res = await API.post("/api/reset", userData, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
      params: {
        username: userData.username,
      },
    });

    if (res.status == 200) {
      alert("Success! Redirecting you to login page");
      return router.push("/");
    }
  } catch (e: any) {
    const {
      response: {
        data: { error },
      },
    } = e;
    alert("Error!");
    return false;
  }
};

export const refetchUsers = async (accessToken: string, setData: (data: any) => void) => {
  try {
    const {
      data: { data },
    } = await API.get("/api/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { limit: 100, page: 0, search: "" },
    });
    console.log("refetch data", data);
    return setData(data);
  } catch (e) {
    console.log("error refetching: ", e);
    return null;
  }
};

export const searchUsersClient = async (input: string, accessToken: string, setData: (data: any) => void) => {
  const { data } = await API.get("/api/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: { limit: 100, page: 0, search: input },
  });
  const { data: logs } = data;
  setData(logs);
};

export const UpdateClient = async (data: IUser) => {
  try {
    const res = await API.patch("/api/login", data);
    if (res.status === 201) return { isOpen: true, message: "Success. Please Logout for changes to take effect", isError: false };
  } catch (e: any) {
    const {
      response: {
        data: { error },
      },
    } = e;
    return { isOpen: true, message: error, isError: true };
  }
};

export const DeleteUserClient = async (_id: string, accessToken: string, callback: () => void) => {
  try {
    const res = await API.delete("/api/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { _id },
    });
    if (res.status === 200) {
      return callback();
    }
  } catch (e: any) {
    const {
      response: {
        data: { error },
      },
    } = e;
    return { isOpen: true, message: error, isError: true };
  }
};
