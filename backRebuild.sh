cd backend-fltshr
./gradlew bootJar
cd ..
docker-compose build
docker-compose up -d backend-fltshr