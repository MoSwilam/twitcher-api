FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

# If you are building your code for production
# RUN npm ci --omit=dev
RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "start:dev" ]
