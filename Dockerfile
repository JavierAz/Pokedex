# Base image
FROM nginx:1.17.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY /dist/poke-api /usr/share/nginx/html
