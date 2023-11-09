import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MessageIcon from "@mui/icons-material/Message";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Roles } from "@typedefs/roles";

export const MenuList = () => {
  const { data: session } = useSession({ required: true });
  console.log("Rendered User: ", session);
  switch (Number(session?.user.role)) {
    case Roles.ADMIN:
      return <Admin />;
    case Roles.AGENT:
      return <User />;
    default:
      return <Guest />;
  }
};

const User = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <ListItemButton onClick={() => router.push("/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={() => router.push("/chatbot")}>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="Chatbot" />
      </ListItemButton>
      <ListItemButton onClick={() => router.push("/clinic")}>
        <ListItemIcon>
          <TravelExploreIcon />
        </ListItemIcon>
        <ListItemText primary="Clinic Finder" />
      </ListItemButton>
    </React.Fragment>
  );
};

const Admin = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <ListItemButton onClick={() => router.push("/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={() => router.push("/chatbot")}>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="Chatbot" />
      </ListItemButton>
      <ListItemButton onClick={() => router.push("/clinic")}>
        <ListItemIcon>
          <TravelExploreIcon />
        </ListItemIcon>
        <ListItemText primary="Clinic Finder" />
      </ListItemButton>
    </React.Fragment>
  );
};

const Guest = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <ListItemButton onClick={() => router.push("/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </React.Fragment>
  );
};
