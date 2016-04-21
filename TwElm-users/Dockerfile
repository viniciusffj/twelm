FROM node:4.4.1

COPY package.json /app/package.json
WORKDIR /app
RUN npm install

ADD . /app/

CMD npm start
