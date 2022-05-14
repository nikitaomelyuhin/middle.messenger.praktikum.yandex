FROM node:16.14.0
WORKDIR /var/www
COPY . .
RUN npm install && npm run build
EXPOSE 3000

CMD node server.js