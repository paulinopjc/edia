const { createExpiringPoliciesNotification } = require("./notification");
const { CronJob } = require("cron");

const createNotifs = () => {
  // createExpiringPoliciesNotification();
  return new CronJob("0 0 * * *", () => { // runs every 24 hours
    createExpiringPoliciesNotification();
  }).start();
};

module.exports = { createNotifs };
