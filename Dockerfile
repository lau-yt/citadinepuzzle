# pull official base image
FROM node:12-alpine AS build

RUN mkdir -p /DEU2021
WORKDIR /DEU2021

COPY package.json package-lock.json ./

ENV PATH /DEU2021/node_modules/.bin:$PATH

# install app dependencies
RUN npm ci && npm cache clean --force

COPY ./ ./
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /DEU2021/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]