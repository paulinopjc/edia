# GIAVault Documentation

This documentation provides an overview of the GIAVault application and guides you through its features and functionalities.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
4. [Microservices](#microservices)
5. [Usage](#usage)
6. [Configurations](#configurations)
7. [API Endpoints](#api-endpoints)
8. [Models](#models)
9. [Helpers](#helpers)
10. [Folder Structure](#folder-structure)

## Overview

GIAVault is a web application designed to manage insurance policies and provide a centralized platform for policy management tasks. It allows users to create, update, and track insurance policies based on various types such as motor, fire, CGL, bond, marine, personal accident, and endorsement.

## Installation

To install and run GIAVault locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/giavault.git
   ```

2. Install the dependencies:

   ```
   cd giavault
   npm install
   ```

3. Configure the environment variables by creating a `.env` file and specifying the required values. Refer to the [Configurations](#configurations) section for more details.

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to access the GIAVault application.

## Microservices

1. Notification Services: [Notification Service Documentation](services/notification/README.md)

## Usage

The GIAVault application provides a user-friendly interface for managing insurance policies. Here are some of the key features:

- **Policy Creation**: Create new insurance policies by filling in the necessary details such as insurer, line, GIA issued date, policy number, inception date, assured, expiry date, mailing address, and more.

- **Policy Management**: View, update, and delete existing insurance policies. Modify policy details, add remarks, and track important information related to each policy.

- **Dynamic Fields**: The application supports dynamic fields, allowing users to add custom fields to insurance policies as per their requirements.

- **Notifications**: Receive notifications for expiring policies and important policy updates.

- **Search and Filtering**: Easily search and filter insurance policies based on various criteria such as insurer, policy type, policy number, and more.

## Configurations

The GIAVault application requires certain configurations to run correctly. These configurations can be set using environment variables defined in the `.env` file. Below are the important variables to configure:

- `NEXT_PRIVATE_MONGODB_URL`: The URL of the MongoDB database.
- `NEXT_API_URL`: The URL of the API (yourIp:appPort)
- `NEXTAUTH_SECRET`: Secret key used for JSON Web Token (JWT) authentication.

Ensure that you set the appropriate values for these variables before running the application.

## API Endpoints

GIAVault exposes several API endpoints for managing insurance policies and related operations. Here are some of the main endpoints:

- `/api/auth/[...nextauth]`: Authentication-related endpoints for user authentication.
- `/api/login`: Endpoint for user login.
- `/api/logs`: Endpoint for retrieving logs.
- `/api/notification`: Endpoint for managing notifications.
- `/api/policy`: Endpoint for managing insurance policies.
- `/api/policy/upload`: Endpoint for uploading insurance policies.
- `/api/reset`: Endpoint for password reset.
- `/api/user`: Endpoint for managing users.

For detailed documentation on each API endpoint, refer to the API documentation.

## Pages

The GIAVault application includes the following pages:

- `/dashboard`: Dashboard page displaying an overview of insurance policies and notifications.
- `/insurance/form`: Form page for creating or editing insurance policies.
- `/insurance/list`: List page for viewing and managing insurance policies.
- `/insurance/upload`: Upload page for bulk uploading insurance policies.
- `/logs`: Logs page for viewing application logs.
- `/register`: Registration page for user registration.
- `/reset`: Password reset page for resetting user passwords.
- `/user/edit`: User profile edit page.
- `/users`: User management page for managing application users.

For more details on each page's functionalities and usage, refer to the corresponding page documentation.

## Models

The GIAVault application uses Mongoose models to define the structure and behavior of the data stored in the MongoDB database. The models are located in the `models/` directory and include schemas for insurance policies, notifications, users, and more.

## Helpers

The `helpers/` directory contains utility functions and helper modules used throughout the application. These helpers provide reusable functionality for tasks such as data manipulation, date formatting, error handling, and more.

## Folder Structure

The folder structure of the GIAVault application is organized as follows:

```
giavault
    ├── README.md
    ├── component
    │   ├── Agent
    │   │   ├── DynamicForm.tsx
    │   │   ├── FormRenderer.tsx
    │   │   ├── GiaForm.tsx
    │   │   ├── InsuranceForm.tsx
    │   │   └── MotorForm.tsx
    │   ├── Copyright.tsx
    │   ├── Drawer.tsx
    │   ├── Insurance
    │   │   ├── Table.tsx
    │   │   └── Upload.tsx
    │   ├── Loader.tsx
    │   ├── LogsTable.tsx
    │   ├── MenuList.tsx
    │   ├── Notification.tsx
    │   ├── NotiifcationList.tsx
    │   ├── Pagination.tsx
    │   ├── SecurityQuestion.tsx
    │   ├── Snackbar.tsx
    │   ├── TableSwitch.tsx
    │   ├── UserDropDown.tsx
    │   ├── UserEdit.tsx
    │   ├── UserRegister.tsx
    │   ├── UserTable.tsx
    │   └── ___tests___
    │       ├── Copyright.cy.tsx
    │       ├── LogsTable.cy.tsx
    │       └── SecurityQuestionSecurityQuestionList.cy.tsx
    ├── constants
    │   ├── securityQuestions.ts
    │   └── urls.ts
    ├── container
    │   ├── Admin
    │   │   └── UploadContainer.tsx
    │   ├── Agent
    │   │   └── Form.tsx
    │   ├── Dashboard.tsx
    │   ├── DrawerContainer.tsx
    │   ├── Login.tsx
    │   ├── Logs.tsx
    │   ├── PasswordReset.tsx
    │   ├── PolicyContainer.tsx
    │   ├── Register.tsx
    │   ├── TableContainer.tsx
    │   └── User
    │       ├── User.tsx
    │       └── UserEdit.tsx
    ├── cypress
    │   ├── downloads
    │   ├── fixtures
    │   │   └── example.json
    │   └── support
    │       ├── commands.ts
    │       ├── component-index.html
    │       └── component.ts
    ├── cypress.config.ts
    ├── helper
    │   ├── client
    │   │   ├── notification
    │   │   │   └── index.ts
    │   │   ├── policy
    │   │   │   └── index.ts
    │   │   ├── upload
    │   │   │   └── index.ts
    │   │   └── user
    │   │       └── userClient.ts
    │   ├── date.ts
    │   ├── file
    │   │   └── middleware.tsx
    │   ├── hooks
    │   │   └── memoization.ts
    │   ├── insurance.ts
    │   ├── objects
    │   │   ├── index.ts
    │   │   └── setter.ts
    │   ├── reset.ts
    │   ├── upload.ts
    │   ├── user.ts
    │   └── userLog.ts
    ├── jest.config.ts
    ├── lib
    │   ├── api
    │   │   └── index.ts
    │   ├── cookies
    │   │   └── index.ts
    │   ├── cron
    │   │   └── index.ts
    │   ├── database
    │   │   ├── index.ts
    │   │   └── transactional.ts
    │   ├── guard
    │   │   └── index.ts
    │   ├── jwt
    │   │   └── index.ts
    │   ├── logging
    │   │   └── index.ts
    │   ├── mongoose
    │   │   └── session.handler.ts
    │   └── notification
    │       └── index.ts
    ├── models
    │   ├── logs.model.ts
    │   ├── notification.model.ts
    │   ├── policy.model.js
    │   ├── policy.model.ts
    │   └── user.model.ts
    ├── next-env.d.ts
    ├── next.config.js
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── next.svg
    │   ├── static
    │   │   └── images
    │   │       └── avatars
    │   │           └── default.jpg
    │   ├── thirteen.svg
    │   ├── uploads
    │   │   └── new-test-gia.xlsx
    │   └── vercel.svg
    ├── server.js
    ├── services
    │   └── notification
    │       ├── README.md
    │       ├── index.js
    │       ├── notification.js
    │       ├── notification.model.js
    │       └── policy.model.js
    ├── src
    │   ├── pages
    │   │   ├── _app.tsx
    │   │   ├── _document.tsx
    │   │   ├── api
    │   │   │   ├── auth
    │   │   │   │   └── [...nextauth].ts
    │   │   │   ├── login.ts
    │   │   │   ├── logs.ts
    │   │   │   ├── notification.ts
    │   │   │   ├── policy
    │   │   │   │   ├── index.ts
    │   │   │   │   └── upload.ts
    │   │   │   ├── reset.ts
    │   │   │   └── user.ts
    │   │   ├── dashboard.tsx
    │   │   ├── index.tsx
    │   │   ├── insurance
    │   │   │   ├── form.tsx
    │   │   │   ├── list.tsx
    │   │   │   └── upload.tsx
    │   │   ├── logs.tsx
    │   │   ├── register.tsx
    │   │   ├── reset.tsx
    │   │   ├── user
    │   │   │   └── edit.tsx
    │   │   └── users.tsx
    │   └── styles
    │       ├── Home.module.css
    │       └── globals.css
    ├── test.csv
    ├── test.js
    ├── tsconfig.json
    ├── tsconfig.tsbuildinfo
    ├── typedefs
    │   ├── components
    │   │   └── Table.type.ts
    │   ├── errors.ts
    │   ├── logs.ts
    │   ├── notifications.ts
    │   ├── policy.ts
    │   ├── query.ts
    │   ├── roles.ts
    │   └── user.ts
    └── types
        └── next-auth.d.ts
```
