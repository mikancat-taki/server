# Node.js 18 ベース（Render推奨）
FROM node:18-alpine AS build

# 作業ディレクトリ
WORKDIR /app

# まずフロントエンドをビルド
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install --no-audit --silent
COPY frontend ./frontend
RUN cd frontend && npm run build

# バックエンド
COPY node/package*.json ./node/
RUN cd node && npm install --no-audit --silent
COPY node ./node

# build済みフロントをバックエンドにコピー（例: Express静的配信）
RUN cp -r frontend/dist node/public

WORKDIR /app/node
EXPOSE 3000

CMD ["npm", "start"]
