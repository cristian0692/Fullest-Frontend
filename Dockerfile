ARG NODE_VERSION=22.23.2

FROM node:${NODE_VERSION}-alpine

# Use a clean root directory for the app
WORKDIR /app

# Copy package management and config files first for caching
COPY package.json deno.lock* tsconfig*.json ./
RUN npm install

# Copy the rest of your source code (including the src/ folder)
COPY . .

# Now run the build
RUN npm run build