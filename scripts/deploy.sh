#!/bin/bash

# Dokku deployment script for Einstein Labs Documentation

# Configuration
APP_NAME="project-name-docs"
DOKKU_HOST="your-dokku-host.com"
DOKKU_USER="dokku"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment of ${APP_NAME} to Dokku...${NC}"

# Check if the app exists on Dokku
echo -e "${YELLOW}Checking if app exists on Dokku...${NC}"
ssh ${DOKKU_USER}@${DOKKU_HOST} apps:list | grep ${APP_NAME} > /dev/null
if [ $? -ne 0 ]; then
  echo -e "${YELLOW}App does not exist. Creating...${NC}"
  ssh ${DOKKU_USER}@${DOKKU_HOST} apps:create ${APP_NAME}
  
  echo -e "${YELLOW}Setting up domain...${NC}"
  ssh ${DOKKU_USER}@${DOKKU_HOST} domains:add ${APP_NAME} docs.${APP_NAME}.einsteinlabs.com
  
  echo -e "${YELLOW}Enabling Let's Encrypt...${NC}"
  ssh ${DOKKU_USER}@${DOKKU_HOST} letsencrypt:enable ${APP_NAME}
else
  echo -e "${GREEN}App already exists.${NC}"
fi

# Set environment variables
echo -e "${YELLOW}Setting environment variables...${NC}"
ssh ${DOKKU_USER}@${DOKKU_HOST} config:set --no-restart ${APP_NAME} \
  NODE_ENV=production \
  SITE_NAME="Einstein Labs Documentation" \
  SITE_URL="https://docs.${APP_NAME}.einsteinlabs.com"

# Deploy the app
echo -e "${YELLOW}Deploying application...${NC}"
git remote remove dokku 2>/dev/null || true
git remote add dokku ${DOKKU_USER}@${DOKKU_HOST}:${APP_NAME}
git push dokku main

# Check deployment status
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Deployment successful!${NC}"
  echo -e "${GREEN}Your documentation is now available at: https://docs.${APP_NAME}.einsteinlabs.com${NC}"
else
  echo -e "${RED}Deployment failed. Please check the logs.${NC}"
  exit 1
fi

# Set up NGINX configuration
echo -e "${YELLOW}Setting up NGINX configuration...${NC}"
ssh ${DOKKU_USER}@${DOKKU_HOST} nginx:set ${APP_NAME} client-max-body-size 50m
ssh ${DOKKU_USER}@${DOKKU_HOST} nginx:set ${APP_NAME} gzip on
ssh ${DOKKU_USER}@${DOKKU_HOST} nginx:set ${APP_NAME} gzip-comp-level 6
ssh ${DOKKU_USER}@${DOKKU_HOST} nginx:set ${APP_NAME} gzip-min-length 1024
ssh ${DOKKU_USER}@${DOKKU_HOST} nginx:set ${APP_NAME} gzip-types "text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript"

# Reload NGINX
echo -e "${YELLOW}Reloading NGINX...${NC}"
ssh ${DOKKU_USER}@${DOKKU_HOST} nginx:build-config ${APP_NAME}

echo -e "${GREEN}Deployment process completed!${NC}"
