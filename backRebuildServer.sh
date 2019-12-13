cd backend-fltshr
./gradlew bootJar
scp -r build/libs/backend-fltshr-0.0.1.jar ubunut-google:/home/zychp/FltShrDeploy/backend-fltshr/build/libs/backend-fltshr-0.0.1.jar
