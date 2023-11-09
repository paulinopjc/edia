import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, List, ListItem, Popover, Typography } from "@mui/material";
import NotificationList from "./NotiifcationList";
import { IconButton, Badge } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import { Notification as INotiifcation} from '@typedefs/notifications'

export default function Notification({ data }: any) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const id = open ? "notifications" : undefined;
  
  return (
    <>
      <IconButton aria-label="notifications" aria-describedby={id} onClick={handleClick}>
        <Badge badgeContent={data.filter((e: INotiifcation)=> !e.read).length} color="error">
          <Notifications />
        </Badge>
      </IconButton>
      {/* <Dialog open={open} onClose={handleClick}>
        <DialogTitle>Notifications</DialogTitle>
        <DialogContent></DialogContent>
      </Dialog> */}

      <Popover id={id} anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }}>
        <NotificationList notifications={data} />
      </Popover>
    </>
  );
}
