FROM node:latest
MAINTAINER Ignacio Velazquez <ivelazquez85@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install --silent -g phantomjs-prebuilt resume-cli gulp -unsafe-perm

COPY package.json /usr/src/app
RUN npm install --silent
COPY . /usr/src/app

COPY src/fonts/MavenPro-Regular.ttf /usr/share/fonts/truetype/mavenpro
RUN fc-cache -fv

ENV NODE_ENV development

EXPOSE 4000 4001 3001
CMD npm run start
