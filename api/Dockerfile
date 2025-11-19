# syntax=docker/dockerfile:1

# Stage 1: Base stage with Gradle wrapper
FROM eclipse-temurin:21-jdk-jammy AS base
WORKDIR /build
COPY gradlew gradlew
COPY gradle gradle
RUN chmod +x gradlew

# Stage 2: Download dependencies
FROM base AS deps
WORKDIR /build
COPY build.gradle settings.gradle ./
RUN --mount=type=cache,target=/root/.gradle \
    ./gradlew dependencies --no-daemon

# Stage 3: Build the application
FROM deps AS package
WORKDIR /build
COPY src src/
RUN --mount=type=cache,target=/root/.gradle \
    ./gradlew bootJar --no-daemon && \
    mv build/libs/*.jar build/libs/app.jar

# Stage 4: Extract layers for optimization
FROM package AS extract
WORKDIR /build
RUN java -Djarmode=layertools -jar build/libs/app.jar extract --destination build/extracted

# Stage 5: Development stage with debugging enabled
FROM extract AS development
WORKDIR /app
COPY --from=extract /build/build/extracted/dependencies/ ./
COPY --from=extract /build/build/extracted/spring-boot-loader/ ./
COPY --from=extract /build/build/extracted/snapshot-dependencies/ ./
COPY --from=extract /build/build/extracted/application/ ./
ENV JAVA_TOOL_OPTIONS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"
EXPOSE 8080 5005
ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]

# Stage 6: Production stage - optimized and secure
FROM eclipse-temurin:21-jre-jammy AS final
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser
WORKDIR /app
COPY --from=extract /build/build/extracted/dependencies/ ./
COPY --from=extract /build/build/extracted/spring-boot-loader/ ./
COPY --from=extract /build/build/extracted/snapshot-dependencies/ ./
COPY --from=extract /build/build/extracted/application/ ./
EXPOSE 8080
ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
