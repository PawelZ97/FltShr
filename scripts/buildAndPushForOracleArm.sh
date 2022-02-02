#Setup builder
#
#docker buildx create --name mybuilder
#docker buildx use mybuilder

docker buildx build  --platform linux/arm64 -t pawelzi/backend-fltshr --push ./backend-fltshr/
docker buildx build  --platform linux/arm64 -t pawelzi/frontend-fltshr --push ./frontend-fltshr/
docker buildx build  --platform linux/arm64 -t pawelzi/proxy-fltshr --push ./proxy-fltshr/