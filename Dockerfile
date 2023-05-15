FROM node:18

WORKDIR /node-app

COPY package.json ./

RUN npm install

COPY . . 
EXPOSE 5001

CMD ["npm", "run", "start:dev"]