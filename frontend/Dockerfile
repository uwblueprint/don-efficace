# Using node 14 allows us to be more flexible, preventing dependency errors (especially with something like Tailwind).
FROM node:14

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
