import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FC, useEffect, useState } from "react";
import { formatDate } from "@helper/date";
import { User } from "@typedefs/user";
import { Roles } from "@typedefs/roles";
import Pagination from "./Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { DeleteUserClient } from "@helper/client/user/userClient";
import { useSession } from "next-auth/react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  height: 500,
};

interface IUserTable {
  data: User[];
  refetch?: () => void;
}

const UserTable: FC<IUserTable> = ({ data, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dataIndexed, setDataIndexed] = useState({
    data: data,
    page: 0,
    offset: 5,
  });

  useEffect(() => {
    setDataIndexed({ ...dataIndexed, data: data.slice(0, dataIndexed.offset) });
  }, [data]);

  useEffect(() => {
    if (selectedData) setIsModalOpen(!isModalOpen);
  }, [selectedData]);

  const handleClose = () => {
    refetch && refetch();
    setSelectedData(null);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Creation Date</TableCell>
            <TableCell align="right">Last Login Date</TableCell>
            <TableCell align="right">Delete User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataIndexed?.data?.map((row: User) => (
            <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row?.username}
              </TableCell>
              <TableCell align="right">{row?.firstName}</TableCell>
              <TableCell align="right">{row?.lastName}</TableCell>
              <TableCell align="right">{Roles[row?.role]}</TableCell>
              <TableCell align="right">{formatDate(row?.createdAt!)}</TableCell>
              <TableCell align="right">{row?.lastLogin ? formatDate(row?.lastLogin) : "User hasn't logged in yet"}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => setSelectedData(row as any)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination data={data} dataIndexed={dataIndexed} setDataIndexed={setDataIndexed} />
      <UserDeleteModal open={isModalOpen} onClose={handleClose} data={selectedData} onConfirm={DeleteUserClient} />
    </TableContainer>
  );
};

const UserDeleteModal = ({ open, onClose, onConfirm, data }: any) => {
  const { data: session } = useSession({ required: true });
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete user {data?.username}? This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={data?.username == session?.user.username ? true : false} onClick={() => onConfirm(data?._id, session?.user.accessToken, onClose)} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserTable;
