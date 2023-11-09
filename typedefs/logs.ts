import { Roles } from "./roles";

export interface Logs {
  username: string;
  IP: string;
  method: string;
  action: string;
  _id?: string;
  role?: string | Roles;
  payload?: string;
  createdAt?: string;
}
