#!/bin/sh

# Prepare Deploying
npm install
npm run build
cp .env.example .env

# Set up a Docker registry
docker swarm init
docker service create --name registry --publish published=5000,target=5000 registry:2
docker service ls

# Make Docker secrets
echo "db_password" | docker secret create db_password -
echo "jwt_secret" | docker secret create jwt_secret -

# Push the generated image to the registry
docker-compose -f docker-compose-prod.yml build
docker-compose -f docker-compose-prod.yml push

# Deploy the stack to the swarm
docker stack deploy -c docker-compose-prod.yml azordev-backend
docker stack services azordev-backend
docker service logs azordev-backend_api

# Migrate DB schemas
docker stack ps azordev-backend
docker exec -it $(docker ps -lq -f "name=azordev-backend_web") sh -c "npm run typeorm migration:run"

# Remove unused Data
docker system prune -f
