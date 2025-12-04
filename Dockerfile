FROM node:20

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .

# Build React app
RUN npm run build

# Install serve globally to serve static files
RUN npm install -g serve

EXPOSE 5173

# Serve the build folder
CMD ["serve", "-s", "dist", "-l", "5173"]
