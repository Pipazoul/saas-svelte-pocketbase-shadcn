# Development stage
FROM node:lts-alpine AS dev

WORKDIR /app

COPY src/ /app/src
COPY static/ /app/static
COPY .eslintignore /app/.eslintignore
COPY .eslintrc.cjs /app/.eslintrc.cjs
COPY package.json /app/package.json
COPY postcss.config.js /app/postcss.config.js
COPY svelte.config.js /app/svelte.config.js
COPY tailwind.config.ts /app/tailwind.config.ts
COPY tsconfig.json /app/tsconfig.json
COPY vite.config.ts /app/vite.config.ts

RUN npm install

EXPOSE 5173

ENTRYPOINT [ "npm", "run", "dev"]

# Build stage
FROM node:lts-alpine AS build
ARG PUBLIC_FRONT_URL

WORKDIR /app

# Copy node modules and build artifacts from dev stage
COPY --from=dev /app/ /app/

ENV PUBLIC_FRONT_URL=$PUBLIC_FRONT_URL

RUN npm run build

# Production stage
FROM nginx:alpine AS prod

WORKDIR /app

COPY --from=build /app/build/ /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
