FROM adoptopenjdk/maven-openjdk11:latest AS build

WORKDIR /root

ARG SECRET_PASSPHRASE

ENV SECRET_PASSPHRASE=$SECRET_PASSPHRASE

RUN apt-get update && apt-get -y install gnupg2 unzip

COPY . .

RUN mkdir /usr/share/or-tools

RUN /root/src/main/resources/decrypt_secret.sh

RUN mvn clean install -DskipTests

RUN unzip ./target/backend-0.0.1-SNAPSHOT.jar -d /tmp

RUN unzip /tmp/BOOT-INF/lib/ortools-linux-x86-64-9.0.9048.jar -d /usr/share/or-tools

FROM openjdk:11

ARG JAR_FILE=target/*.jar

RUN mkdir /usr/share/or-tools

COPY --from=build /usr/share/or-tools/* /usr/share/or-tools

COPY --from=build /root/${JAR_FILE} /app.jar

CMD ["java","-jar","/app.jar"]
