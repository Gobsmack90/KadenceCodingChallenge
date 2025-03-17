FROM node
WORKDIR /app
COPY ./backend/package.json /app
COPY ./client/build /app/build
RUN npm install
COPY ./backend/src /app/src
CMD ["node","./src/index.js"]