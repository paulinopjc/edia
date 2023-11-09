import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FC, useEffect, useState, useRef } from "react";
import { formatDate } from "@helper/date";
import { InsurancePolicy } from "@typedefs/policy";
import { Roles } from "@typedefs/roles";
import Pagination from "../Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsuranceForm from "@components/Agent/InsuranceForm";
import { DeletePolicy } from "@helper/client/policy";
import moment from "moment";
import { printPolicy } from "@helper/client/printing";
import { getNotificationsClient } from "@helper/client/notification";
import { useReactToPrint } from "react-to-print";

interface IPolicyTable {
  data: InsurancePolicy[];
  refetch?: () => void;
}
const PolicyTable: FC<IPolicyTable> = ({ data, refetch }) => {
  // to-do: range date
  const { data: session, status } = useSession({ required: true });
  const [componentRef, setComponentRef] = useState(useRef<HTMLDivElement | null>(null));
  const [currentImage, setCurrentImage] = useState("");
  const [policies, setPolicies] = useState([]);
  const [selectedData, setSelectedData] = useState<any>({
    selectedData: null,
    isUpdate: false,
    isDelete: false,
    isPrint: false,
  });

  const [dataIndexed, setDataIndexed] = useState({
    data: data,
    page: 0,
    offset: 5,
  });

  useEffect(() => {
    if (status == "authenticated") {
      getNotificationsClient(session?.user._id!, session?.user.accessToken!, setPolicies);
    }
  }, [status]);
  useEffect(() => {
    console.log("data changing", data);
    setDataIndexed({ ...dataIndexed, data: data.slice(0, dataIndexed.offset) });
  }, [data]);
  useEffect(() => {
    console.log("changinng: currentImage", currentImage);
  }, [currentImage, componentRef]);
  // useEffect(() => {
  //   if (selectedData.selectedData && selectedData.isView) setIsModalOpen({ ...isModalOpen, updateModal: !isModalOpen.updateModal });
  //   if (selectedData.selectedData && !selectedData.isView) setIsModalOpen({ ...isModalOpen, deleteModal: !isModalOpen.deleteModal });
  // }, [selectedData.selectedData]);

  const handleClose = () => {
    refetch && refetch();
    setSelectedData({ selectedData: null, isUpdate: false, isDelete: false, isPrint: false });
  };
  const handlePrintProceed = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = async () => {
    setSelectedData({ selectedData: selectedData.selectedData, isUpdate: false, isDelete: false, isPrint: true });

    await printPolicy(selectedData?.selectedData?._id ?? "", session?.user.accessToken!, setCurrentImage);

    console.log("Printing ", currentImage);
    //setSelectedData({ selectedData: selectedData, isUpdate: false, isDelete: false });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Assured</TableCell>
            <TableCell>Insurer</TableCell>
            <TableCell align="right">Policy Number</TableCell>
            <TableCell align="right">GIA OR</TableCell>
            <TableCell align="right">GIA Issue Date</TableCell>
            <TableCell align="right">Expiry</TableCell>
            <TableCell align="center">View</TableCell>
            {session?.user.role == Roles.ADMIN ? <TableCell align="center">Delete</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataIndexed?.data?.map((row: InsurancePolicy) => (
            <TableRow key={row?._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row?.assured ?? "Unknown"}
              </TableCell>
              <TableCell component="th" scope="row">
                {row?.insurer ?? "Unknown"}
              </TableCell>
              <TableCell align="right">{row?.policyNo ?? "Not Included"}</TableCell>
              <TableCell align="right">{row?.giaOr}</TableCell>
              <TableCell align="right">{String(moment(row?.giaIssuedDate).format("MMM DD, YYYY"))}</TableCell>
              <TableCell align="right">{String(moment(row?.expiry).format("MMM DD, YYYY"))}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => setSelectedData({ ...selectedData, selectedData: row as any, isUpdate: true })}>
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
              {session?.user.role == Roles.ADMIN ? (
                <TableCell align="center">
                  <IconButton onClick={() => setSelectedData({ ...selectedData, selectedData: row as any, isDelete: true })}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination data={data} dataIndexed={dataIndexed} setDataIndexed={setDataIndexed} />
      <InsuranceModal open={selectedData.isUpdate} onClose={handleClose} onPrint={handlePrint} data={selectedData} />
      <SoaModal open={selectedData.isPrint} onClose={handleClose} componentRef={componentRef} onPrint={handlePrintProceed} data={selectedData} currentImage={currentImage} />
      <InsuranceModalDelete open={selectedData.isDelete} onClose={handleClose} data={selectedData} onConfirm={DeletePolicy} />
    </TableContainer>
  );
};

export const InsuranceModal = ({ open, onClose, onPrint, data }: any) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Edit Policy</DialogTitle>
      <DialogContent>
        <InsuranceForm open={open} data={data?.selectedData} onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onPrint}>
          <LocalPrintshopIcon /> Print
        </Button>
        <Button onClick={onClose}>Cancel</Button>
        {data?.selectedData?.updatedByAgent ? (
          <Typography display="flex" alignItems="start" sx={{ textAlign: "left" }} mr={4}>
            Updated by {data?.selectedData?.updatedByAgentName} on {formatDate(data?.selectedData?.updatedAt!)}
          </Typography>
        ) : (
          <></>
        )}
      </DialogActions>
    </Dialog>
  );
};

export const SoaModal = ({ open, onClose, onPrint, componentRef, currentImage, data }: any) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
      <DialogTitle>Statement of Account</DialogTitle>
      <DialogContent>
        <img ref={componentRef} src={currentImage} style={{ alignSelf: "center", objectFit: "contain" }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onPrint}>Proceed</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

const InsuranceModalDelete = ({ open, onClose, onConfirm, data, session }: any) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Delete Policy</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete "{data?.selectedData?.serial}"? This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onConfirm(data?.selectedData?._id, session?.user.accessToken, onClose)} color="error" autoFocus>
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
export default PolicyTable;
