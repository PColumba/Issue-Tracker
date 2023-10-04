# Use stages to reduce end image size by pruning non production dependencies before second stage

FROM node:18-alpine as stage1

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci

# Copy typescript config
COPY tsconfig*.json ./

# Copy the rest of the application source code to the container
COPY src ./src

RUN npm run build

RUN npm prune --production

FROM node:18-alpine as stage2

WORKDIR /app

COPY --from=stage1 /app/dist ./dist
COPY --from=stage1 /app/node_modules ./node_modules
COPY --from=stage1 /app/package*.json ./

# Define the command to start your Node.js app
CMD ["npm", "start"]