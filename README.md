# don-efficace

Welcome to the don-efficace platform repository!

## Stack Choices
**Backend Language:** TypeScript (Express.js on Node.js)<br>
**Backend API:** REST<br>
**Database:** PostgreSQL<br>
**User Auth:** Yes<br>
**File Storage:** Yes<br>

## Table of Contents
* 📝 [Documentation](#documentation)
* 👷 [Getting Started](#getting-started)
  * ✔️ [Prerequisites](#prerequisites)
  * ⚙️ [Setup](#setup)
* ✨ [Linter](#linter)
* 📊 [Prisma](#Prisma)
* 💻 [The Team](#the-team)

## Documentation

[Starter Code](https://uwblueprint.github.io/starter-code-v2)</br>
[Don Efficace Notion](https://www.notion.so/uwblueprintexecs/Engineering-bd1b37e6e8b64f6ca496a0cedfa76cdb)

## Getting Started

### Prerequisites

* Install [node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
* Install Docker Desktop ([MacOS](https://docs.docker.com/docker-for-mac/install/) | [Windows](https://docs.docker.com/desktop/install/windows-install/) | [Linux](https://docs.docker.com/engine/install/#server)) and ensure that it is running
* Install nvm ([MacOS](https://medium.com/@priscillashamin/how-to-install-and-configure-nvm-on-mac-os-43e3366c75a6) | [Windows](https://github.com/coreybutler/nvm-windows#readme))

### Setup

1. This repo uses Node v18.18.2:
```bash
nvm install 18.18.2
nvm use 18.18.2
```

2. Clone this repository and `cd` into the project folder:
```bash
git clone https://github.com/uwblueprint/don-efficace.git
cd don-efficace
```

3. Add environment variables to the following files (ask PL for env variables):
```
/.env
/backend/typescript/.env
/frontend/.env
```

4. Install dependencies:
```bash
cd backend/typescript
yarn install

cd frontend
yarn install
```

5. Run the application:
```bash
docker compose up --build
```

## Linter
### Mac
```bash
docker exec -it de_ts_backend /bin/bash -c "yarn fix"
```
```bash
docker exec -it de_frontend /bin/bash -c "yarn fix"
```

### Windows
```bash
docker exec -it de_ts_backend bash -c "yarn fix"
```
```bash
docker exec -it de_frontend bash -c "yarn fix"
```

## Prisma
Generate Prisma client:
```bash
cd backend/typescript
npx prisma generate
```

Synchronize Prisma schema with database schema:
```bash
npx prisma db push
```

Generate and apply migrations:
```bash
npx prisma migrate dev
```

Open Prisma studio:
```bash
npx prisma studio
```

## Ngrok
### Set-up
1. Create an [ngrok](https://dashboard.ngrok.com/signup) account

2. Store your personal ngrok authentication token as an environment variable in the .env file of the root directory:
```bash
NGROK_AUTHTOKEN=${authtoken}
```

3. Run the application:
```bash
docker compose up --build
```

### Troubleshooting

If another service is occupying port 5001, identify the PID of the service:
```bash
sudo lsof -i :5001
```

Kill the occupying service:
```bash
sudo kill <PID>
```

Run the application again:
```bash
docker compose up --build
```

## The Team
### Term 1 (W24):
**Project Lead:** N/A<br>
**Product Managers:** Jacqueline Fung & Zafir Raeid<br>
**Developers:** Jessica Ding, Nandini Mehrotra, Shushawn Saha<br>
**Designers:** Hillary Huang, Sunny Zhang, David Stirling<br>

### Term 2 (S24):
**Project Lead:** Matthew Ng<br>
**Product Managers:** Jacqueline Fung<br>
**Developers:** Dev 1, Dev 2, Dev 3, Dev 4, Dev 5, Dev 6, Dev 7, Dev 8<br>
**Designers:** Sunny Zhang, David Stirling, Jane Al-Shihabi<br>


Huge shoutout to the Internal Tools team for creating StarterCode v2!<br>
