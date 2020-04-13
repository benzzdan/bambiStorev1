FROM node:12.10.0

WORKDIR /usr/app
COPY yarn.lock ./
COPY package.json ./

RUN yarn install


COPY . .

EXPOSE 5000

CMD ["yarn", "start"]