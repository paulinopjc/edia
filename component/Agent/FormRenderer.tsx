import { InsurancePolicy, PolicyTypes } from "@typedefs/policy";
import MotorForm from "./MotorForm";
import { DynamicForm } from "./DynamicForm";
import { FC } from "react";

interface IFormRenderer {
  type: PolicyTypes;
  data: Partial<InsurancePolicy>;
  setData: any;
  totalPrem: any;
  setTotalPrem: any;
}
const FormRenderer: FC<IFormRenderer> = ({ type, data, setData, totalPrem, setTotalPrem }) => {
  switch (type) {
    case PolicyTypes.MOTOR: {
      return <MotorForm data={data} setData={setData} totalPrem={totalPrem} setTotalPrem={setTotalPrem} />;
    }
    case null: {
      return null;
    }
    case undefined: {
      return null;
    }
    default: {
      return <DynamicForm data={data} setData={setData} totalPrem={totalPrem} setTotalPrem={setTotalPrem} />;
    }
  }
};

export default FormRenderer;
