## Dev Frontend
FROM node:22 AS fronted_dev

## make the 'app' folder the current working directory
WORKDIR /app

## Copy 'package.json'
COPY ./package.json .
COPY ./package-lock.json .

## install project dependencies
RUN npm install

### copy project files and folders to the current working directory (i.e. 'app' folder)
#COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev"]