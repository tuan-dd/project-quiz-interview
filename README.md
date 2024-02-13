---

# Project Quiz interview

## Introduction

This project aims to provide information interview

## Usage

To access the information, follow the steps below:

1. Clone the repository.
2. Navigate to the directory.

## Additional Information

For the database diagram, you can view it [here](https://dbdiagram.io/d/quiz-Diagram-65c648a8ac844320aed26066).

To access the information, follow the steps below:

1. Clone the repository.
2. Navigate to the directory server or client and run follow guild below

## Description

[Nest](https://github.com/nestjs/nest)

### Installation

```bash
$ cd server && yarn install
```

### Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Description

[React](https://github.com/facebook/react)

### Installation

```bash
$ cd client && yarn install or bun install
```

### Running the app

```bash
# development
$ yarn dev

# preview
$ yarn run preview

# production mode
$ yarn build
```

---

## System Design Overview:

- **Frontend**: Deployed on Amazon S3.
- **Backend**: Hosted on Amazon ECS.
- **Workflow**:
  1. Users access domain Frontend via Amazon S3 URL .
  2. Frontend communicates with Backend on ECS.
  3. Backend processes get DB RDS requests and returns data to Frontend.

### Notes:

- Security configurations for both S3 and EC2 are essential.
- Firewall rules and Security Groups should allow communication between S3 and ECS.
- Secure storage and management of access keys and authentication details are crucial.

This README now includes the provided content. Let me know if you need further assistance!

Mock account
"phone" : "1234567",
"password":"123456"
