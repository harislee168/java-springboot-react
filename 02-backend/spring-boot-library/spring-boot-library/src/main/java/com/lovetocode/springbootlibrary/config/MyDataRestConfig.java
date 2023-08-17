package com.lovetocode.springbootlibrary.config;

import com.lovetocode.springbootlibrary.entity.Book;
import com.lovetocode.springbootlibrary.entity.History;
import com.lovetocode.springbootlibrary.entity.Message;
import com.lovetocode.springbootlibrary.entity.Review;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class MyDataRestConfig implements RepositoryRestConfigurer, WebMvcConfigurer {

    @Value("${BASE_URL}")
    private String baseUrl;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                     CorsRegistry cors) {
        HttpMethod [] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST,
                HttpMethod.DELETE, HttpMethod.PATCH};

        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(History.class);
        config.exposeIdsFor(Message.class);

        disableHTTPMethods(Book.class, config, theUnsupportedActions);
        disableHTTPMethods(Review.class, config, theUnsupportedActions);
        cors.addMapping(config.getBasePath()+ "/**").allowedOrigins(baseUrl);
    }

    @Override
    public void addCorsMappings(CorsRegistry cors) {
        cors.addMapping("/**").allowedOrigins(baseUrl)
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }

    private void disableHTTPMethods(Class theClass, RepositoryRestConfiguration config,
                                    HttpMethod [] theUnsupportedActions) {
        config.getExposureConfiguration().forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
    }
}
