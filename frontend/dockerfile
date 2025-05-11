FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./

# Development image, everything needed for development mode
FROM base AS development
ENV NODE_ENV=development

# Install all dependencies including devDependencies
RUN npm install

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the Next.js dev server with host flag to allow connections from other Docker containers
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]

# Production image, copy all the files and run next build
FROM base AS builder
ENV NODE_ENV=production

# Install production dependencies only
RUN npm ci --only=production
# Install development dependencies for building
RUN npm ci --also=development

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Build the Next.js application
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port 3000
EXPOSE 3000

# Set host to be 0.0.0.0 to allow connections from outside the container
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Start the Next.js server
CMD ["node", "server.js"] 