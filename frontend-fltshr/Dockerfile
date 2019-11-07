FROM nginx:1.17.4-alpine
EXPOSE 80
COPY  build/ /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]