cd backend-fltshr
./gradlew bootJar
cd ..
docker-compose build backend-fltshr
#docker-compose up -d backend-fltshr