package com.lovetocode.springbootlibrary.config;

import com.lovetocode.springbootlibrary.entity.Book;
import com.lovetocode.springbootlibrary.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                     CorsRegistry cors) {
        HttpMethod [] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST,
                HttpMethod.DELETE, HttpMethod.PATCH};

        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);

        disableHTTPMethods(Book.class, config, theUnsupportedActions);
        disableHTTPMethods(Review.class, config, theUnsupportedActions);

        String theAllowedOrigins = "http://localhost:3000";
        cors.addMapping(config.getBasePath()+ "/**").allowedOrigins(theAllowedOrigins);
    }

    private void disableHTTPMethods(Class theClass, RepositoryRestConfiguration config,
                                    HttpMethod [] theUnsupportedActions) {
        config.getExposureConfiguration().forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
    }
}
