FROM node:16.3.0-buster-slim
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build
RUN npm cache clean --force
CMD [ "npm", "run", "dev" ]
EXPOSE 8000
