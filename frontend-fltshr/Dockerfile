FROM nginx:1.17.4-alpine
EXPOSE 80
RUN apk add inotify-tools certbot openssl ca-certificates
WORKDIR /opt
COPY certfiles/entrypoint.sh entrypoint.sh
COPY certfiles/certbot.sh certbot.sh
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY certfiles/ssl-options/ /etc/ssl-options
COPY  build/ /usr/share/nginx/html
RUN chmod +x entrypoint.sh && \
    chmod +x certbot.sh
ENTRYPOINT ["./entrypoint.sh"]