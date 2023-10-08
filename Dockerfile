FROM node:slim
WORKDIR /collegegram
COPY package*.json ./
RUN npm i ts-node typescript
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "sh","-c" , "npm run typeorm:run && npm start" ]
