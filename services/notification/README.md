# Table of Contents

1. [Generating a Model File with TypeScript Compiler (tsc)](#generating-a-model-file-with-typescript-compiler-tsc)
   - Summary
   - Steps to Generate a Model File
   - Modifying the Default Export
2. [Notification System Documentation](#notification-system-documentation)
   - Overview
   - Files
     - `notification.js`
     - `notification.model.js`
     - `index.js`
   - Customization



---


## Generating a Model File with TypeScript Compiler (tsc)

### Summary

The `model.js` file is generated using the TypeScript Compiler (`tsc`) command. It involves specifying the input TypeScript file and the output directory where the generated JavaScript file should be placed.

### Steps to Generate a Model File
If you have a `model.ts` file and want to generate the corresponding JavaScript model file using the TypeScript compiler (`tsc`), follow these steps:

1. Open your terminal or command prompt.
2. Navigate to the root directory of your project.
3. Run the `tsc` command followed by the path to your `model.ts` file and the `--outDir` option with the desired output directory. 

   Example:
   ```shell
   tsc /Users/xsephtion/RTSP/giavault/models/policy.model.ts --outDir /Users/xsephtion/RTSP/giavault/services/notification
   ```

   Replace `/Users/xsephtion/RTSP/giavault/models/policy.model.ts` with the actual path to your `model.ts` file, and `/Users/xsephtion/RTSP/giavault/services/notification` with the desired output directory path.

4. The TypeScript compiler will transpile the `model.ts` file and generate the corresponding JavaScript file in the specified output directory.

### Modifying the Default Export

After generating the JavaScript model file, you need to update the default export in the file to match the updated export syntax.

1. Open the generated JavaScript model file (`policy.model.js`) in a text editor.
2. Locate the line that contains the default export statement, which may look similar to this:

   From:
   ```javascript
   var Policy = mongoose_1.models.Policy || (0, mongoose_1.model)("Policy", PolicySchema);
   exports.default = Policy;
   ```

3. Update the export statement to use a named export instead of the default export. Modify the line as follows:

   From:
   ```javascript
   exports.Policy = mongoose_1.models.Policy || (0, mongoose_1.model)("Policy", PolicySchema);
   ```

4. Save the changes to the file.

By updating the export statement, you are now exporting the `Policy` model as a named export instead of the default export. This allows you to import the model correctly using the named import syntax in other files.

Remember to update your imports in other files accordingly to use the named import syntax when referencing the `Policy` model.

That's it! You have now generated the model file using the TypeScript compiler and updated the export statement to use a named export.



# Notification System Documentation

## Overview

The notification system is responsible for generating notifications for expiring policies. It utilizes the `notification.js` and `notification.model.js` files to perform the necessary operations.

## Files

### `notification.js`

This file contains the main logic for creating expiring policies notifications.

#### `getExpiringPolicies(daysBeforeExpiry: number)`

This function retrieves the expiring policies based on the specified number of days before expiry. It uses the `Policy` model to query the database and returns a list of policies that will expire within the given timeframe.

- Parameters:
  - `daysBeforeExpiry`: The number of days before the policy expiry date to consider.

#### `createExpiringPoliciesNotification()`

This function creates the expiring policies notifications. It fetches the expiring policies using the `getExpiringPolicies` function, processes the data, and generates notifications based on the retrieved policies. The notifications are then stored in the `Notification` model.

#### Usage:

```javascript
const createExpiringPoliciesNotification = require("./notification").createExpiringPoliciesNotification;

createExpiringPoliciesNotification();
```

### `notification.model.js`

This file defines the `Notification` model used to store the generated notifications.

#### `Notification` Model

The `Notification` model represents a notification for an expiring policy. It contains the following properties:

- `policyId`: The ID of the policy associated with the notification.
- `agentId`: The ID of the agent to whom the notification is sent.
- `updaterAgentId`: The ID of the agent who last updated the policy.

### `index.js`

This file exports the `createNotifs` function, which is responsible for scheduling the notification creation job.

#### `createNotifs()`

This function sets up a cron job using the `CronJob` library. It schedules the `createExpiringPoliciesNotification` function to run every 24 hours, triggering the generation of expiring policies notifications.

- Usage:
  
  ```javascript
  const createNotifs = require("./index").createNotifs;

  createNotifs();
  ```

## Customization

To customize the behavior of the notification system, you can modify certain aspects of the code.

### Cron Job Schedule

You can adjust the schedule of the cron job by modifying the cron expression passed to the `CronJob` constructor. Currently, it is set to run every 24 hours using the expression `"0 0 * * *"`. You can update this expression according to your desired schedule.

### Expiry Date Calculation

The calculation of the expiry date in `createExpiringPoliciesNotification` is currently set to 30 days from the current date:

```javascript
const expiryDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // equal to 30 days
```

If you want to change the number of days or the calculation method, you can modify this line to suit your requirements.

## Conclusion

The notification system provides an automated way to generate notifications for expiring policies. By running the `createNotifs` function, a cron job is set up to regularly check for expiring policies and generate corresponding notifications. The system can be customized by adjusting the cron job schedule and modifying the expiry date calculation as needed.