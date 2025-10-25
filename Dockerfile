# Node.js LTS
FROM node:18-alpine AS build

WORKDIR /app

# フロントエンドビルド
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install --no-audit --silent
COPY frontend ./frontend
RUN cd frontend && npm run build

# バックエンド
COPY node/package*.json ./node/
RUN cd node && npm install --no-audit --silent
COPY node ./node

# フロントをバックエンドへコピー（Vite出力済み）
RUN cp -r frontend/dist node/public

WORKDIR /app/node
EXPOSE 3000
CMD ["npm", "start"]
