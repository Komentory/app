FROM node:lts-alpine AS builder

# Move to working directory (/build).
WORKDIR /build

# Copy package.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the code into the container.
COPY . .

# Run project build.
RUN npm run build

FROM nginx:stable-alpine AS production-stage

# Copy files from /build/dist to the default nginx folder.
COPY --from=builder /build/dist /usr/share/nginx/html

# Run nginx (without daemon).
CMD ["nginx", "-g", "daemon off;"]