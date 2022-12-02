FROM node:16.16.0-alpine3.16 AS build

ENV NODE_ENV production

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . .

RUN yarn build

FROM nginx:1.23.2-alpine

ENV NODE_ENV production

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
