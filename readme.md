# PDF Text Extractor Application

This project is designed to demonstrate a full-stack application with a React frontend and a NestJS backend. It allows users to upload PDF files, extracts the text from those files on the server-side, and then displays the extracted text to the user.

## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js v18.14.2 or later version
- npm v9.5.0 or later version

### Installation

#### Cloning the Repository

First, clone the project repository from GitHub to your local machine

#### Backend Setup (NestJS)

- Navigate to the backend directory and install the necessary dependencies:

```sh
cd backend
npm install
```

- Start the NestJS server from the backend directory:

```sh
npm run start
```

- To run tests you can run the following command in backend directory:

```sh
npm test
```

#### Frontend Setup (React)

- Ensure you are in the project root directory, then navigate to the client directory and install the necessary dependencies:

```sh
cd client
npm install
```

- To run this project, you will need to add the following to a `.env` file in the `client` directory:

```plaintext
REACT_APP_API_URL=http://localhost:3001
```

- Start the React development server by executing the following command:

```sh
npm start
```

## Built With

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [axios](https://github.com/axios/axios) - Promise-based HTTP client for the browser and Node.js.
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) - Library for parsing PDF data.
