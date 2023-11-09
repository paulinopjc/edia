import { createExpiringPoliciesNotification } from "../notification/index";
import { CronJob } from "cron";

export const createNotifs = () => {
  return new CronJob("*/10 * * * *", () => {
    createExpiringPoliciesNotification();
  }).start();
};
