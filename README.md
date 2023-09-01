# java-springboot-react

## You need to create application.properties in the root folder for the backend with below properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
#spring.datasource.url=jdbc:mysql://localhost:3306/DATABASE_NAME?useSSL=false&useUnicode=yes&characterEncoding=UTF-8&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=MYSQL_USERNAME
spring.datasource.password=MYSQL_PASSWORD

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

spring.data.rest.base-path=/api

okta.oauth2.client-id=YOUR_OKTA_CLIENT_ID
okta.oauth2.issuer=YOUR_OKTA_ISSUER

stripe.key.secret=YOUR_STRIPE_KEY
server.port=5000

## Set environment variable
BASE_URL=http://localhost:3000 <-- this is your UI URL
