FROM adoptopenjdk/maven-openjdk11:latest AS build

WORKDIR /root

RUN mkdir /or-tools

ARG SECRET_PASSPHRASE

ENV SECRET_PASSPHRASE=$SECRET_PASSPHRASE

RUN apt-get update && apt-get -y install gnupg2 unzip

COPY . .

RUN /root/src/main/resources/decrypt_secret.sh

RUN mvn clean install

# Extract .jar file for OR-tools

RUN unzip ./target/backend-0.0.1-SNAPSHOT.jar -d /tmp

RUN ls /tmp/BOOT-INF

RUN unzip /tmp/BOOT-INF/lib/ortools-linux-x86-64-9.0.9048.jar -d /or-tools

RUN ls /or-tools

FROM openjdk:11

ARG JAR_FILE=target/*.jar

RUN mkdir /usr/share/or-tools

COPY --from=build /or-tools/linux-x86-64/* /usr/share/or-tools

COPY --from=build /root/${JAR_FILE} /app.jar

CMD ["java","-jar","/app.jar"]
