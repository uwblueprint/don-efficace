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
* ✨ [Linting & Formatting](#linting--formatting)
* 💻 [The Team](#the-team)

## Documentation

[Starter Code](https://uwblueprint.github.io/starter-code-v2)</br>
[Don Efficace Notion](https://www.notion.so/uwblueprintexecs/Engineering-bd1b37e6e8b64f6ca496a0cedfa76cdb)

## Getting Started

### Prerequisites

* Install Docker Desktop ([MacOS](https://docs.docker.com/docker-for-mac/install/) | [Windows (Home)](https://docs.docker.com/docker-for-windows/install-windows-home/) | [Windows (Pro, Enterprise, Education)](https://docs.docker.com/docker-for-windows/install/) | [Linux](https://docs.docker.com/engine/install/#server)) and ensure that it is running
* Ask the current PL to receive access to ENV Variables

### Setup

1. Clone this repository and `cd` into the project folder
```bash
git clone https://github.com/uwblueprint/don-efficace.git
cd don-efficace
```
2. Ensure that environment variables have been added to the following directories:
```
/.env
/frontend/.env
```
3. Run the application
```bash
docker compose up --build
```

## Linting & Formatting
### Mac
```bash
docker exec -it scv2-backend /bin/bash -c "yarn fix"
```
```bash
docker exec -it scv2-frontend /bin/bash -c "yarn fix"
```


### Windows
```bash
docker exec -it scv2-backend bash -c "yarn fix"
```
```bash
docker exec -it scv2-frontend bash -c "yarn fix"
```

## Database/Prisma Information

### Note: Manual Database Setup

If for some reason docker container is not syncing with your prisma models in backend/typescript/prisma/schema

Update .env file in /backend/typescript to be
(Use different username for Mac)

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/scv2
```

Try running (when the docker container is up):

```
npx prisma migrate dev
```

This may require you to upgrade your node version locally so try (only if it tells you the node version is insufficient)
(https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) If you don't have nvm

```
nvm install 18.18.2
nvm use 18.18.2
```

### Creating Prisma Migration

Go to `backend/typescript` and run

npx prisma migrate dev

### Useful Prisma Commands
"npx prisma db push" to push
"npx prisma studio" to run prisma


***Need to change scv2 to don-efficace at some point***

## The Team
### Term 1 (W24):
**Project Lead:** N/A<br>
**Product Managers:** Jacqueline Fung & Zafir Raeid<br>
**Developers:** Jessica Ding, Nandini Mehrotra, Shushawn Saha<br>
**Designers:** Hillary Heung, Sunny Zhang, David Stirling<br>

Huge shoutout to the Internal Tools team for creating StarterCode v2!<br>