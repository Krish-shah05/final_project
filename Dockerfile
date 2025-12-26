# Use Node.js official image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy root package.json
COPY package.json ./

# Copy backend and frontend
COPY backend ./backend
COPY frontend ./frontend

# Install dependencies for backend
WORKDIR /app/backend
RUN npm install

# Install dependencies and build frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Go back to backend to serve
WORKDIR /app/backend

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
