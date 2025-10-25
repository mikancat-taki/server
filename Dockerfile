FROM node:18-alpine
WORKDIR /app
COPY node/package.json node/package-lock.json* ./node/
RUN cd node && npm ci --no-audit --silent
COPY node/ ./node
WORKDIR /app/node
EXPOSE 3000
CMD ["npm", "start"]
