# Development Env
(
./backRebuild.sh
./frontRebuild.sh
docker save  backend-fltshr:latest | gzip > backend-fltshr.tar.gz
docker save  frontend-fltshr:latest | gzip > frontend-fltshr.tar.gz
scp backend-fltshr.tar.gz OracleArm:/home/ubuntu/FltShr
scp frontend-fltshr.tar.gz OracleArm:/home/ubuntu/FltShr
)
(
docker save proxy-fltshr:latest | gzip > proxy-fltshr.tar.gz
scp proxy-fltshr.tar.gz OracleArm:/home/ubuntu/FltShr
)

# Deployment Env
(
docker-compose -f deploy-compose.yml down
gunzip -c frontend-fltshr.tar.gz | docker load
gunzip -c backend-fltshr.tar.gz | docker load
docker-compose -f deploy-compose.yml up -d
)
gunzip -c proxy-fltshr.tar.gz | docker load
