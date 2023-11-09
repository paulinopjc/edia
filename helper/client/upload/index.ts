import { API } from "@libs/api";

export const ClientUpload = async (file: File, accessToken: string, setSnackbar: (snackbar: any) => void, setFiles: (files: any) => void) => {
  try {
    const formdata = new FormData();
    formdata.append("file", file);
    const res = await API.post("/api/policy/upload", formdata, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status == 200) {
      const { data } = res;
      setFiles([]);
      return setSnackbar({ isOpen: true, message: data?.message, isError: false });
    }

    return { isOpen: true, message: res?.data?.message, isError: true };
  } catch (e: any) {
    console.log("e", e);
    return { isOpen: true, message: "Error", isError: true };
  }
};

