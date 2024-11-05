# KanbanAuth

### Status: In Progress

![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Tools and Technologies](#tools-and-technologies)
6. [Dependencies and Installs](#dependencies-and-installs)
7. [License](#license)
8. [Contributing](#contributing)
9. [Tests](#tests)
10. [Questions](#questions)

## Description
KanbanAuth is a secure task management application where users can view, add, and organize tasks using a Kanban board layout. This application incorporates authentication using JSON Web Tokens (JWT), ensuring that only authorized users can access their tasks and perform actions. Users can log in with a username and password, and the application securely stores JWT tokens to manage sessions. Built with a full-stack React environment, this project is deployed on Render for ease of access.

To view the application, simply navigate to the live website at https://kanbanauth.onrender.com.

<img width="640" alt="KanbanAuth - Login Page" src="https://github.com/user-attachments/assets/bdad4c4f-9c7e-4e18-942a-745bf4cde078">

Example of Login Page

## Features
- Secure login page with JWT-based authentication for user verification.
- Access control to the Kanban board, ensuring only authenticated users can manage tasks.
- Store JWT tokens securely in localStorage for seamless session management.
- Auto-logout and token invalidation after a period of inactivity to enhance security.
- User-friendly interface with a Kanban board layout for sorting tasks by status.

<img width="640" alt="KanbanAuth - New Ticket Page" src="https://github.com/user-attachments/assets/ccfa9e5c-e044-4826-b3cb-fd02d4b8a955">

Example of New Ticket

<img width="640" alt="KanbanAuth - Ticket Board" src="https://github.com/user-attachments/assets/b00a46bb-d336-446d-8739-fc8755662df4">

Example of Kanban Board

## Installation
To use the application, follow these steps:

- Step 1: Clone the repository.
- Step 2: Navigate to the project directory by typing `cd kanban-auth`.
- Step 3: Install the required dependencies by running `npm install`.

## Usage
To start the application, run the following command: `npm start`.

When you execute this command, the application will launch in your web browser. You can then:
- Log in by entering your username and password on the login page.
- Access the main Kanban board if authenticated, allowing you to view, add, and manage tasks.
- Log out at any time, which will securely clear your session from localStorage.
- Get automatically logged out after a period of inactivity, with a prompt to re-authenticate.

## Tools and Technologies
**Programming Language**:
- TypeScript

**Libraries & Frameworks**:
- React
- Express
- JWT

**Development Environment**:
  - Node.js

## Dependencies and Installs

**NPM Packages**:
- `express` - Handles server-side routing and API requests.
- `jsonwebtoken` - Manages JSON Web Token creation and verification for authentication.
- `dotenv` - Loads environment variables from a .env file.
- `pg` - PostgreSQL client for Node.js, facilitating database interactions.

## License
This project is licensed under the MIT License, which allows you to freely use, modify, and distribute this software, provided proper attribution is given.

## Contributing
This project is part of a coding bootcamp assignment and is not open for contributions. To comply with the course requirements, I must complete this project individually without outside assistance. Therefore, pull requests, issues, or other contributions will not be accepted. Thank you for understanding!

## Tests
Currently, this project does not have any automated tests.

## Questions
If you have any questions about the repository, feel free to reach out by opening an issue or contacting me directly at cheyennaraelynn@gmail.com You can also find more of my work on GitHub at https://github.com/RaeOfChey.
