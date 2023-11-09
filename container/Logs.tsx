import { FC } from "react";
import TableContainer from "@containers/TableContainer";
import { Logs as LogType } from "@typedefs/logs";
import { TableTypes } from "@typedefs/components/Table.type";

interface ILogsContainer {
  data: LogType[];
}

export const LogsContainer: FC<ILogsContainer> = ({ data }) => {
  return <TableContainer placeholder="Search by username, role, ip, action, or method" data={data} type={TableTypes.LOGS} />;
};
