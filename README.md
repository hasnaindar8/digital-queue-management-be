# Digital Queue Management

This is used to replace phone call queues to instead wait online to book an appointment.

### Description

This app uses Socket.io for real time communication between client and server. The API is built using **Node.js**, **Express**, and **PostgreSQL**, structured using the **MVC pattern**, and tested thoroughly with **Jest** and **Supertest**.

---

### Authors

- fariahasan
- lewr912
- jamiemarshfeay
- hasnaindar8
- aaronbogumil

---

### Minimum Versions Required

Before running the project locally, ensure you have the following installed:

- **Node.js:** v24.7.0
- **PostgreSQL:** v16.10

You can confirm your versions with:  
`node -v`  
`psql --version`

---

### Cloning the Repository

Run the following command in your terminal, then navigate into the project directory:  
`git clone https://github.com/hasnaindar8/digital-queue-management-be`  
`cd digital-queue-management-be`

---

### Installing Dependencies

Install all required packages by running:  
`npm install`

---

### Setting up Environment Variables

To connect to your local databases, you’ll need two environment files:

- Create `.env.development` and `.env.test` in the project’s root directory.
- Inside `.env.development`, add:  
  `PGDATABASE=digital_queue_management`
- Inside `.env.test`, add:  
  `PGDATABASE=digital_queue_management_test`
- These files ensure your local setup connects to the correct databases.
- The `.gitignore` file should already contain `.env.*` to ensure these files are not pushed to GitHub.  
  If it does not, add `.env.*` manually.

---

### Creating the Databases

Run: `npm run setup-dbs`

This command runs the SQL in `db/setup-dbs.sql`, creating both the development and test databases.

---

### Seeding the Development Database

Populate the development database with data by running:  
`npm run seed`

---

### Running the Test Suites

Run: `npm test`

This command executes all Jest test suites to verify that the API behaves as expected.

---

### Starting the Server

Start the server using:  
`npm start`

The server will listen on **port 8080** by default. You can test the endpoints in your browser or using a tool such as **Insomnia** or **Postman**.

---

### Project Structure

```text
.
├── README.md
├── Untitled.md
├── __test__
│   ├── app.test.js
│   ├── seed.test.js
│   └── utils.test.js
├── app.js
├── controllers
│   ├── auth.controller.js
│   ├── queue.controller.js
│   └── reason.controller.js
├── db
│   ├── connection.js
│   ├── data
│   │   ├── development-data
│   │   │   ├── index.js
│   │   │   ├── queue.js
│   │   │   ├── reasons.js
│   │   │   └── users.js
│   │   └── test-data
│   │       ├── index.js
│   │       ├── queue.js
│   │       ├── reasons.js
│   │       └── users.js
│   ├── seeds
│   │   ├── run-seed.js
│   │   ├── seed.js
│   │   └── utils.js
│   └── setup-dbs.sql
├── listen.js
├── middleware
│   ├── errorHandler.js
│   └── notFoundHandler.js
├── models
│   ├── auth.model.js
│   ├── queue.model.js
│   └── reason.model.js
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
└── routers
    ├── auth-router.js
    ├── queue-router.js
    └── reason-router.js
```

### Valid Endpoints

| Method | Endpoint             | Description                          |
| ------ | -------------------- | ------------------------------------ |
| POST   | /api/queue/join      | Adds a user to the queue             |
| POST   | /api/auth/signup     | Registers a user to the database     |
| POST   | /api/auth/login      | Adds a user to the local storage     |
| GET    | /api/reasons         | Returns all reasons                  |
| GET    | /api/queue           | Returns all the entries in the queue |
| DELETE | /api/queue/:entry_id | Deletes a user from the queue        |

---

Recommended OS: MacOS 26 Tahoe, Windows 10/11, Linux Ubuntu 24.04.3 LTS

Acknowledgments
Northcoders
