package com.lovetocode.springbootlibrary.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        //disable cross site forgery
        http.csrf((csrf) -> csrf.disable());

        //protect endpoints at /api/<type>/secure
        http.authorizeHttpRequests((authorizeHttpRequests) ->
                authorizeHttpRequests
                    .requestMatchers("/api/books/secure/**").authenticated()
                    .requestMatchers("/api/reviews/secure/**").authenticated()
                    .requestMatchers("/api/messages/secure/**").authenticated()
                    .anyRequest().permitAll())
                .oauth2ResourceServer((oauth2ResourceServer) -> oauth2ResourceServer.jwt(Customizer.withDefaults()));

        //add cors filter
        http.cors(Customizer.withDefaults());
        //add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());
        Okta.configureResourceServer401ResponseBody(http);

        return http.build();
    }
}
