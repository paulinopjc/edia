import { FC } from "react";
import { Container, Grid } from "@mui/material";
import UserEdit from "@components/UserEdit";
import { User } from "@typedefs/user";

export interface IUserSetting {
  data: User;
}

const UserSetting: FC<IUserSetting> = ({ data }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          <UserEdit data={data} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserSetting;
