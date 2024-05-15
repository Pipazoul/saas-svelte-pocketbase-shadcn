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

FROM node:lts-alpine AS build

WORKDIR /app

# copy node modules from dev stage
COPY --from=dev /app/ /app/

RUN npm run build

FROM node:lts-alpine AS prod

WORKDIR /app

COPY --from=build /app/ /app/

WORKDIR /app/build

ENTRYPOINT [ "node", "index.js" ]