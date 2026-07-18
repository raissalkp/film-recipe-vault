FROM node:20-slim
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD ["node", "node_modules/vite/bin/vite.js", "--host"]