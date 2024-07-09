# Using node 14 allows us to be more flexible, preventing dependency errors (especially with something like Tailwind).
FROM node:14

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

# Install ngrok using curl
RUN curl -o ngrok-stable-linux-amd64.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip && \
    unzip ngrok-stable-linux-amd64.zip && \
    mv ngrok /usr/local/bin/ && \
    rm ngrok-stable-linux-amd64.zip

COPY . ./

EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
