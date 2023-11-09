import { Roles } from "./roles";

export type SecurityQuestionType = {
  question: string;
  answer: string;
};

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: Roles;
  password: string;
  securityQuestions: SecurityQuestionType[];
  createdAt: string;
  lastLogin: string;
}

export interface InsurancePolicy {
  sa: string;
  insurer: string;
  assured: string;
  address: string;
  policy: string;
  issueDate: string;
  inception: string;
  expiry: string;
  modelMakeRisk: string;
  plate: string;
  sumInsured: string;
  totalPrem: string;
  grossPrem: string;
  deductible: string;
  serial: string;
  motor: string;
  mvFile: string;
  od: string;
  theft: string;
  vbi: string;
  vpd: string;
  autoPa: string;
  aog: string;
  lossOfUse: string;
  odPrem: string;
  theftPrem: string;
  vBiOrPrem: string;
  vPdOrPrem: string;
  autoPaOrPrem: string;
  aogOrPrem: string;
  lossOfUseOrPrem: string;
  deductibles: string;
  _id?: string;
  updatedAt?: string;
  creator?: string;
  updatedByAgent?: string;
  updatedByAgentName?: string;
}
