import { InsurancePolicy } from "./policy";

export interface Notification {
  policyId: string;
  agentId: string;
  updaterAgentId: string;
  read: boolean;
  createdAt: Date;
  _id?: string;
  policyData: InsurancePolicy;
}

export interface ExpiringPolicies {
  _id: string;
  creator: string;
  updatedByAgent: string;
}
