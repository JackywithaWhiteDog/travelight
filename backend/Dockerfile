FROM adoptopenjdk/maven-openjdk11:latest AS build

WORKDIR /root

ARG SECRET_PASSPHRASE

ENV SECRET_PASSPHRASE=$SECRET_PASSPHRASE

RUN apt-get update && apt-get -y install gnupg2

COPY . .

RUN /root/src/main/resources/decrypt_secret.sh

RUN mvn clean install

FROM openjdk:11

ARG JAR_FILE=target/*.jar

COPY --from=build /root/${JAR_FILE} /app.jar

CMD ["java","-jar","/app.jar"]
