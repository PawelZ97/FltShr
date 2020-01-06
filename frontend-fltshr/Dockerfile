FROM nginx:1.17.4-alpine
EXPOSE 80
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY react/build/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]