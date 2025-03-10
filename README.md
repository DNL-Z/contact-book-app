# Contact Book App

This a [Vite.js](https://vitejs.dev/) project bootstrapped with [create-vite](https://vite.dev/guide/) with template
`react-ts`.

The project is a simple contact book app that allows users to add, edit, and delete contacts.

- [React](https://reactjs.org/) (v19.0.0): A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) (v5.7.2): A typed superset of JavaScript that compiles to plain
  JavaScript.
- [Vite](https://vitejs.dev/) (v6.1.0): A build tool that aims to provide a faster and leaner development experience for
  modern web projects.
- [JSON-Server](https://github.com/typicode/json-server) (v0.17.0): A full fake REST API that allows you to create a
  CRUD API with zero coding.
- [Tailwind CSS](https://tailwindcss.com/) (v4.0.6): A utility-first CSS framework for rapidly building custom designs.

---

## Prerequisites

- Node.js
- npm

## Project setup

1. Clone the repository:
    ```
    git clone https://github.com/DNL-Z/contact-book-app.git
    ```

2. Navigate into the project directory:
    ```
    cd contact-book-app
    ```

3. Install the dependencies:
    ```
    npm install
    ```

4. Install JSON-Server:
    ```
    npm i -g json-server
    ```

## Run server and app

1. Start JSON-Server (in 1st window):
    ```
    json-server --watch db.json --port 3004
    ```
2. Start the app (in 2nd window):
    ```
    npm run dev
    ```

Open [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

---

## Available Scripts

- `npm run dev`: Runs the app in development mode with hot-reloading enabled.
- `npm run build`: Compiles TypeScript files and builds the app for production to the `dist` folder.
- `npm run lint`: Lints and checks the code for any syntax errors.
- `npm run preview`: Starts a local server for previewing the production build.
