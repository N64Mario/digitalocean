FROM node:14.16.0-alpine3.13
WORKDIR /app
COPY package*.json /app/
COPY . /app/
RUN npm install
# Install Redis
RUN apk add --no-cache redis

# Expose the ports (Node.js and Redis)
EXPOSE 8080
EXPOSE 6379

# Copy the rest of your application code to the container
COPY . /app/

# Start Redis and your Node.js application
CMD ["sh", "-c", "redis-server & npm start"]

