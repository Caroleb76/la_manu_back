# Dockerfile
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app source
COPY . .

RUN npx prisma generate
# Expose port
EXPOSE 3000

# Start app
CMD ["node", "server.js"]