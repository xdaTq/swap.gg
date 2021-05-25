# File unchanged for now, planing changes in future.
FROM node:13

WORKDIR /

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["node", "."]

