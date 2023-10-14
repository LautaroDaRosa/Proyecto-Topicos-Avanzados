FROM maven:3.8.4-openjdk-17-slim AS builder

WORKDIR /app

COPY . .

RUN mvn clean install

FROM openjdk:17-slim

WORKDIR /app

COPY --from=builder /app/target/*.jar tu-aplicacion.jar

EXPOSE 8080

CMD ["java", "-jar", "backend.jar"]
