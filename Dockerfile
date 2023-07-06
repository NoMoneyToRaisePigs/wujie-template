FROM node:16

WORKDIR /opt

ADD .  /opt

RUN npm install -g pnpm \
    && pnpm install \
    &&  pnpm run build:local:qa

FROM nginx:1.17.2-alpine

COPY --from=0 /opt/dist /opt/dist

ADD nginx.default.conf  /etc/nginx/conf.d/default.conf
