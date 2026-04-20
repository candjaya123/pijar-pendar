# Stage 1: Build the Vite (React) Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Set empty VITE_API_URL during build so API calls use relative paths
ENV VITE_API_URL=""
RUN npm run build

# Stage 2: Build the Node (Express) Backend and integrate both
FROM node:20-alpine
WORKDIR /app

# Copy backend source fully first
COPY backend ./backend
# Remove any locally copied node_modules and then install Linux dependencies
RUN rm -rf backend/node_modules && cd backend && npm install --production

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/dist ./dist

# Provide an environment variable for the SQLite database path
# Usually mounted from outside via a volume
ENV DB_PATH=/app/data/database.db
ENV PORT=5000

EXPOSE 5000

# Ensure the data directory exists so SQLite doesn't fail
RUN mkdir -p /app/data

# Run the backend server
WORKDIR /app/backend
CMD ["node", "server.js"]
