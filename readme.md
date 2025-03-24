# AEW CI/MI Project

This project is designed to manage CI (Customer Installation) and MI (Meter Installation) workflows. It includes a server-side API and a client-side mobile application built with React Native and Expo.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Server Setup](#server-setup)
  - [Client Setup](#client-setup)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## Features

- User roles: Admin, CI, MI
- CI request creation and management
- MI request tracking and completion
- Admin dashboard for user and request management
- Secure authentication with JWT
- Responsive UI for mobile devices

---

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- MongoDB (local or cloud instance)

---

## Setup Instructions

### Server Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add the following:
   ```
   PORT=5000
   DATABASE_URL=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will run at `http://localhost:5000`.

---

### Client Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

4. Use the Expo Go app or an emulator to run the application.

---

## Usage

- **Admin**: Create new CI requests and manage users.
- **CI**: View and manage customer installation requests.
- **MI**: Track and complete meter installation requests.

---

## Folder Structure

```
aew_ci_mi/
├── client/                # React Native client application
│   ├── app/               # Screens and navigation
│   ├── components/        # Reusable UI components
│   ├── constants/         # App-wide constants
│   ├── context/           # Context API for state management
│   ├── hooks/             # Custom hooks
│   ├── service/           # API service functions
│   ├── utils/             # Utility functions
│   └── scripts/           # Helper scripts
├── server/                # Express.js server
│   ├── controller/        # API controllers
│   ├── database/          # Database connection
│   ├── model/             # Mongoose models
│   ├── routes/            # API routes
│   └── src/               # Entry point
└── readme.md              # Project documentation
```

---

## License

This project is licensed under the MIT License.
