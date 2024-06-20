FROM node:18.18.2-slim
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Needed for running Docker container on MacOS
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN echo "deb http://archive.debian.org/debian stretch main" > /etc/apt/sources.list

# Install dependencies
RUN apt-get update && apt-get install -y libcurl4 curl unzip

# Install ngrok using curl
RUN curl -o ngrok-stable-linux-amd64.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip && \
    unzip ngrok-stable-linux-amd64.zip && \
    mv ngrok /usr/local/bin/ && \
    rm ngrok-stable-linux-amd64.zip

RUN yarn install

COPY . ./

RUN npx prisma generate

EXPOSE 5001
ENTRYPOINT ["yarn", "dev"]
