# Usa una imagen de Gradle como base
FROM gradle:8.7-jdk17 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el código fuente a la imagen
COPY . .

## Ejecuta los tests de la aplicación
#RUN gradle test

# Construye la aplicación
RUN gradle build



# Usa una imagen base de Tomcat para la aplicación final
FROM openjdk:17-jdk

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

COPY --from=build /app/build/libs/*.war app.war

# Expone el puerto en el que la aplicación escucha
EXPOSE 8081

# Comando para ejecutar la aplicación al iniciar el contenedor
CMD ["java", "-jar", "app.war"]