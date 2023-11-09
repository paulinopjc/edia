import { FC, useState } from "react";
import TableContainer from "@containers/TableContainer";
import { TableTypes } from "@typedefs/components/Table.type";
import { InsurancePolicy } from "@typedefs/policy";
import { useSession } from "next-auth/react";
import { refetchPolicies } from "@helper/client/policy";
import MemoizedComponent from "@helper/hooks/memoization";
import InsuranceForm from "@components/Agent/InsuranceForm";

interface IPolicyContainer {
  data: InsurancePolicy[];
}

export const PolicyContainer: FC<IPolicyContainer> = ({ data }) => {
  const { data: session } = useSession({ required: true });
  const [policyData, setPolicyData] = useState<any>(data);

  const refetch = () => refetchPolicies(session?.user.accessToken!, setPolicyData);

  return (
    <MemoizedComponent dependency={[policyData, refetch]}>
      <TableContainer placeholder="Search by Insurer, Policy Number, GIA OR, Insurance OR No." data={policyData} type={TableTypes.POLICY} refetch={refetch} hasButton={true} buttonText="Add Policy" modalChildren={<InsuranceForm open={false} />} />
    </MemoizedComponent>
  );
};
