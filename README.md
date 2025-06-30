# Shopp E-commerce Platform - Admin Panel

This repository contains the source code for the Admin Panel of the Shopp E-commerce Platform. This application is used by administrators to manage products, view orders, handle user accounts, and oversee the general operations of the main e-commerce site.

This panel is a client-side application built with React and communicates with the **[Shopp E-commerce Platform Server]([Link to your server repository here])** via a RESTful API.

## 🔗 Project Ecosystem

This Admin Panel is one of three core components of the Shopp E-commerce Platform. To understand the full system, please see the other repositories:

* **🛍️ Shopp Client:** The main customer-facing storefront. **[Link to the client repository here]**
* **🗄️ Shopp Server:** The backend API that powers both the client and this admin panel. **[Link to the server repository here]**

## 🤝 We're Open to Contributions!

This project is open-source and we welcome developers to contribute! To get started, please follow these steps:

1.  **Fork** this repository to your own GitHub account.
2.  **Clone** your fork to your local machine.
3.  Create a new branch for your changes (`git checkout -b feature/my-new-feature`).
4.  Make your contributions.
5.  Submit a **Pull Request** back to our `main` branch.

## 🛠️ Tech Stack

This project is built using the same modern frontend stack as our main client application:

* **[Vite](https://vitejs.dev/):** Next-generation frontend tooling for a lightning-fast development experience.
* **[React](https://reactjs.org/):** A JavaScript library for building dynamic and responsive user interfaces.
* **[TypeScript](https://www.typescriptlang.org/):** For robust, scalable, and maintainable code with static type checking.
* **[Redux](https://redux-toolkit.js.org/) (with Redux Toolkit):** For predictable and centralized state management.
* **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.

## 🚀 Getting Started

To get a local copy of the admin panel up and running, follow these steps.

### Prerequisites

* [Node.js](https://nodejs.org/) (version 18 or higher is recommended).
* `npm` or `yarn` installed.
* **A running instance of the [Shopp E-commerce Platform Server]([Link to your server repository here])**. This admin panel will not function without the backend API.

### Installation & Setup

1.  Fork and clone this repository:
    ```sh
    git clone [https://github.com/YOUR-USERNAME/shopp-admin-panel.git](https://github.com/YOUR-USERNAME/shopp-admin-panel.git)
    cd shopp-admin-panel
    ```
    *(Remember to replace `YOUR-USERNAME` and use your actual repository name)*

2.  Install the required dependencies:
    ```sh
    npm install
    ```

3.  Create a local environment file by copying the example:
    ```sh
    cp .env.example .env
    ```

4.  Open the newly created `.env` file and set the `VITE_API_BASE_URL` to the address of your running local server.
    ```env
    VITE_API_BASE_URL=http://localhost:8000
    ```
    *(Adjust the port if your server runs on a different one.)*

5.  Run the development server for the admin panel:
    ```sh
    npm run dev
    ```

6.  Open your browser and navigate to the address shown in your terminal (usually `http://localhost:5173`) to see the admin panel.