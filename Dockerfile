ARG NODE_VERSION=22.23.2

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

# Copy package management and config files first for caching
COPY package.json deno.lock* tsconfig*.json ./
RUN npm install

# Copy the rest of your source code
COPY . .

# Build the static assets (Vite outputs to 'dist' by default)
RUN npm run build

# Install a lightweight static file server globally
RUN npm install -g serve

# Expose the port the server will run on
EXPOSE 3000

# Run the server and keep the container alive
CMD ["serve", "-s", "dist", "-l", "3000"]