# Build Stage
FROM node:18 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the app
RUN npm run build

# Runtime Stage
FROM nginx:stable-alpine as production-stage

# Copy the built assets from the build stage to the default nginx html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access the NGINX server
EXPOSE 80

# Start Nginx and keep the process from backgrounding and the container from quitting
CMD ["nginx", "-g", "daemon off;"]