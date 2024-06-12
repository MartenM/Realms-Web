FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG PUBLIC_API_URL=https://localhost:5049
ENV PUBLIC_API_URL=$PUBLIC_API_URL

COPY . .
RUN npm run build

CMD ["node", "-r", "dotenv/config", "build"]

EXPOSE 3000