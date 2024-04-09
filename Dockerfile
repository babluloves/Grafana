# Use the official Node.js image as the base image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app (assuming you have a build script in your package.json)
RUN npm run build

# Use Nginx to serve the built React app
FROM nginx:alpine

# Copy the built app from the previous stage to the Nginx web root directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Default command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
