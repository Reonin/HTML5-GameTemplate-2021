# Set the base image
FROM node:14

WORKDIR /client

RUN apt-get update && apt-get install -y npm

# Copy the file from your host to your current location.
COPY package*.json ./

# Run the command inside your image filesystem.
#RUN npm install

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 8081

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Run the specified command within the container.
CMD [ "npx", "http-server" ]
