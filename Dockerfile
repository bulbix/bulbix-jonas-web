# builder image
FROM node:12.18.3 as builder

# ARG BUILD_ENV=dev
WORKDIR /usr/src

COPY ["package.json", "/usr/src/"]
COPY [".npmrc", "/usr/src/"]

RUN npm install --only=production

RUN npm install --only=development

COPY [".", "/usr/src/"]
# RUN npm run build:$BUILD_ENV
RUN npm run build

EXPOSE 8080

ENTRYPOINT [ "npx", "next", "start", "-p", "8080" ]