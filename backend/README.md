# Back-End of Travelight
## Usage

1. Build image
```
docker build -t springio/gs-spring-boot-docker . \
    --build-arg SECRET_PASSPHRASE=[our secret passphrase]
```

2. Deployment
```
docker run -p 8080:8080 springio/gs-spring-boot-docker
```

## Development Envrionment

* JDK 11
* Spring Boot 2.7.5

## Reference

1. Google map java document: [link](https://www.javadoc.io/doc/com.google.maps/google-maps-services/latest/index.html)
2. Spring boot: [link](https://spring.io/)
