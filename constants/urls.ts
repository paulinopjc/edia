export const URLList: { [x: string]: string } = {
  "/api/auth/callback/credentials?": "Login",
  "/api/logs?": "View Logs",
};

export const getAction = (method: string, endpoint: string): string => {
  switch (endpoint) {
    case "/api/notification": {
      if (method === "POST") {
        return "Read Notification";
      } else if (method === "GET") {
        return "View Notifications";
      } else if (method === "PATCH") {
        return "Accessed A Method That Is Not Supported Yet";
      } else if (method === "DELETE") {
        return "Deleted User";
      }
      break;
    }
    case "/api/user": {
      if (method === "POST") {
        return "Accessed A Method That Is Not Supported Yet";
      } else if (method === "GET") {
        return "View Users";
      } else if (method === "PATCH") {
        return "Accessed A Method That Is Not Supported Yet";
      } else if (method === "DELETE") {
        return "Deleted User";
      }
      break;
    }
    case "/api/auth/callback/credentials?": {
      if (method === "POST") {
        return "Login";
      } else if (method === "GET") {
        return "Accessed A Method That Is Not Supported Yet";
      }
      break;
    }
    case "/api/login": {
      if (method === "POST") {
        return "Registration";
      } else if (method === "GET") {
        return "Login";
      } else if (method === "PATCH") {
        return "Update Account";
      }
      break;
    }
    case "/api/logs": {
      if (method === "GET") {
        return "View Logs";
      }
      break;
    }
    case "/api/reset": {
      if (method === "POST") {
        return "Reset Account";
      } else if (method === "GET") {
        return "Find Username";
      }
      break;
    }
    default:
      return "Accessed A Method That Is Not Supported Yet";
  }
  return "Accessed A Method That Is Not Supported Yet";
};
