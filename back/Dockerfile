FROM node:lts as dev

WORKDIR /app
COPY ./.eslintrc.js /app
COPY .eslintignore /app
COPY .prettierignore /app
COPY .prettierrc /app
COPY package.json /app
COPY package-lock.json /app
COPY tsconfig.json /app
COPY src /app/src

RUN npm install

CMD ["npm", "run", "start.watch"]

FROM node:lts as build

WORKDIR /app
COPY --from=dev /app /app

RUN npm run build

FROM node:lts as prod

WORKDIR /app
COPY --from=build /app/lib /app/lib
COPY --from=build /app/package.json /app
COPY --from=build /app/package-lock.json /app
RUN npm install --only=production
WORKDIR /app/lib
CMD ["node", "worker.js"]
