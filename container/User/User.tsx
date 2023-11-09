import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { RegistrationAdmin } from "@components/UserRegister";
import { refetchUsers } from "@helper/client/user/userClient";
import { TableTypes } from "@typedefs/components/Table.type";
import { User } from "@typedefs/user";
import TableContainer from "@containers/TableContainer";
import MemoizedComponent from "@helper/hooks/memoization";

interface IUserContainer {
  data: User[];
}

export const UserContainer: FC<IUserContainer> = ({ data }) => {
  const { data: session } = useSession({ required: true });
  const [userData, setUserData] = useState<any>(data);
  const refetch = () => refetchUsers(session?.user.accessToken!, setUserData);

  return (
    <MemoizedComponent dependency={[userData, refetch]}>
      <TableContainer
        placeholder="Search by username, first name, or last name"
        data={userData}
        type={TableTypes.USER}
        hasButton={true}
        buttonText={"Add User"}
        modalChildren={<RegistrationAdmin />}
        refetch={refetch}
      />
    </MemoizedComponent>
  );
};
