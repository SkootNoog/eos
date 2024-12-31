## Dev Backend
FROM node:22

## make the 'srv/app' folder the current working directory
WORKDIR /srv/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

#ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start:dev"]