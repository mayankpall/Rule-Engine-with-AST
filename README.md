
# Rule Engine with AST

A **dynamic rule engine application** that allows for the creation, combination, and evaluation of rules based on user attributes like age, department, income, spend, etc. The system uses an **Abstract Syntax Tree (AST)** to represent these conditional rules and provides an API for managing rules and evaluating them with user data.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
  - [Docker Setup](#docker-setup)
  - [Manual Setup](#manual-setup)
- [Testing](#testing)
- [Design Decisions](#design-decisions)
- [Troubleshooting](#troubleshooting)
- [Photos](#photos)

---

## Introduction

The **Rule Engine with AST** project dynamically creates, combines, and evaluates rules to determine user eligibility based on attributes such as age, department, salary, experience, etc. This project can be used for scenarios where business logic needs to be expressed as rules that can be dynamically modified and evaluated in real-time.

## Features

- **Dynamic Rule Creation**: Create complex rules based on multiple user attributes using an Abstract Syntax Tree (AST).
- **Rule Combination**: Merge existing rules using logical operators.
- **Rule Evaluation**: Evaluate rules against user-provided data to determine eligibility or status.
- **API-Based System**: A simple API to create, combine, update, and evaluate rules.
- **Copy to Clipboard**: Easily copy the generated Rule ID after rule creation for evaluation.
- **Containerized Setup**: Dockerized services for backend and frontend for easy deployment.

---

## Technologies Used

### Backend
- **Node.js** with **Express.js** for the API.
- **MongoDB** (via **Mongoose**) for rule persistence.
- **Jest** for unit testing and integration testing.

### Frontend
- **React** for the user interface to manage rules and trigger evaluations.
- **Axios** for making API requests.

### DevOps & Deployment
- **Docker** for containerizing both frontend and backend.
- **Docker Compose** for orchestrating services.

---

## System Architecture

The **Rule Engine with AST** is composed of two main services:
1. **Backend**: A REST API built with Node.js and Express that allows for creating, combining, and evaluating rules, and storing them in MongoDB.
2. **Frontend**: A React-based interface that allows users to create rules, combine them, evaluate user data against rules, and copy Rule IDs for evaluation.

Both services are containerized using Docker and can be run independently or together using Docker Compose.

---

## Setup Instructions

### Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.
- MongoDB instance or cluster (you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free-tier cloud database).



---

## Running the Application

### Docker Setup

To run the application using Docker, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/mayankpall/Rule-Engine-with-AST
    cd rule-engine-ast
    ```

2. Ensure that both the **backend** and **frontend** have `.env` files as mentioned in the [Environment Variables](#environment-variables) section.

3. Run the application using Docker Compose:
    ```bash
    docker-compose up --build
    ```

4. The frontend will be available at `http://localhost:3001`, and the backend API will run at `http://localhost:4000`.

---

## Copy to Clipboard Feature

After creating a rule, the **Rule ID** is generated, which can be used for rule evaluation. The frontend includes a **Copy to Clipboard** option to make it easy for users to copy the generated Rule ID.

- **How it works**:
  - When a rule is created, the **Rule ID** is displayed, and a "Copy to Clipboard" button is available next to it.
  - Users can click the button to copy the Rule ID and use it for evaluating rules with user data.

---

## Testing

The backend has unit and integration tests using **Jest**. Tests cover:
- Rule creation, combination, and evaluation.
- Error handling for invalid rule strings.

Run the tests from the `backend` directory:
```bash
npm test
```

---

## Design Decisions

1. **AST for Rule Representation**: AST was chosen for representing rules as it provides a flexible way to modify and evaluate rules based on operators and operands.
2. **MongoDB for Storage**: MongoDB's flexibility in storing JSON-like data makes it ideal for storing complex rule structures.
3. **Containerized Setup**: Docker ensures the system can run consistently across different environments.
4. **API-Driven Architecture**: The REST API provides flexibility for the frontend to interact with the rule engine.
5. **Copy to Clipboard**: This feature improves user experience by making it easy to work with Rule IDs.

---
### Environment Variables

You need to create `.env` files in both the **frontend** and **backend** directories.

#### Backend `.env`:
```bash
PORT=4000
MONGODB_URI=mongodb://mongo:27017/ruleEngineDB
```

#### Frontend `.env`:
```bash
REACT_APP_BACKEND_URL=http://localhost:4000
```
---
## Troubleshooting

- **Backend not starting?** Ensure that your MongoDB is running and that the correct `MONGODB_URI` is set in the `.env` file.

- **Port conflicts?** Ensure that no other processes are using ports **4000** and **3001**. If they are, either stop those processes or modify the ports in the `.env` and `docker-compose.yml` files.

---

## Photos

Here are a few screenshots of the application:

1.**Existing Rule**  
   <img width="510" alt="image" src="https://github.com/user-attachments/assets/d1b08d1c-e58d-47fb-981d-27dc2501e450">
   
2.  **Rule Creation Page**  
  <img width="510" alt="image" src="https://github.com/user-attachments/assets/fe590ede-ca5e-4522-9b7e-43dfbfb25249">
  
3. **Rule Evaluation Page**  
  <img width="524" alt="image" src="https://github.com/user-attachments/assets/4c77a357-d4b8-4ca5-ba5e-5e53578a2f61">
  <img width="524" alt="image" src="https://github.com/user-attachments/assets/18e6bba6-f5dc-4aa5-bcec-4e617bf0f65e">





---
