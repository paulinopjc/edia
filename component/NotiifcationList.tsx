import { ButtonBase, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Notification } from "@typedefs/notifications";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { formatDateWithoutHours, getDaysBetweenDates } from "@helper/date";
import { readNotificationClient } from "@helper/client/notification";
import { useSession } from "next-auth/react";
import { InsuranceModal } from "@components/Insurance/Table";

interface Props {
  notifications: Notification[];
}

const useStyles: any = makeStyles(() => ({
  list: {
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
}));

const NotificationList: React.FC<Props> = ({ notifications }) => {
  const { data: session } = useSession({ required: true });
  const classes = useStyles();
  const [data, setData] = useState<any>({
    selectedData: null,
    isOpen: false,
  });

  const handleClose = async () => {
    await readNotificationClient(session?.user._id!, (data.selectedData as any)?._id, session?.user.accessToken!);
    setData({ selectedData: null, isOpen: false });
  };

  const onClick = (notif: Notification) => {
    setData({ selectedData: notif.policyData, isOpen: true });
  };

  return (
    <>
      <List className={classes.list}>
        <ListItem>
          <Typography variant="subtitle1" component="div">
            Expiring Policies
          </Typography>
        </ListItem>
        <Divider className={classes.divider} />
        {notifications?.map((notification) => (
          <React.Fragment key={notification._id}>
            <Divider />
            <ButtonBase onClick={() => onClick(notification)} sx={{ width: "100%" }}>
              <ListItem sx={{ width: "100%", bgcolor: notification.read ? "white" : "red" }}>
                <ListItemText
                  primary={`A policy is expiring in ${getDaysBetweenDates(new Date(notification.policyData?.expiry))} - ${notification.read ? "Read" : "Unread"} `}
                  secondary={
                    <React.Fragment>
                      <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                        {notification?.policyData?.assured}
                      </Typography>
                      {`'s policy will expire on ${formatDateWithoutHours(String(notification?.policyData?.expiry))}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </ButtonBase>
          </React.Fragment>
        ))}
      </List>
      <InsuranceModal open={data.isOpen} data={data} onClose={handleClose} />
    </>
  );
};

export default NotificationList;
