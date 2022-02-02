# Database Clean
(
docker-compose -f deploy-compose.yml down
docker volume rm fltshr_postgres_data
docker-compose -f deploy-compose.yml up -d
psql -h 172.17.0.3 -p 5432 -U postgres -d postgres -a -f data.sql # IP of database container
)