FROM node:lts-alpine3.19 AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /mychatbot
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci
# Copy app files
COPY . ./
# Expose port
EXPOSE 3000
# Start the app
CMD ["npm", "start"]

FROM development  AS builder
ENV NODE_ENV production
# # Add a work directory
# WORKDIR /mychatbot
# # Cache and Install dependencies
# COPY package*.json .
# RUN npm install --production
# # Copy app files
# COPY . ./
# Build the app
RUN npm run build

FROM development AS dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine AS production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /mychatbot/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
