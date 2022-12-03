FROM adoptopenjdk/maven-openjdk11:latest AS build

WORKDIR /root

COPY . .

RUN mvn clean install

FROM openjdk:11

ARG JAR_FILE=target/*.jar

COPY --from=build /root/${JAR_FILE} /app.jar

CMD ["java","-jar","/app.jar"]