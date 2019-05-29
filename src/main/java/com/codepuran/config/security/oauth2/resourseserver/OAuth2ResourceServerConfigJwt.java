package com.codepuran.config.security.oauth2.resourseserver;

import com.codepuran.config.AuthExceptionEntryPoint;
import com.codepuran.config.security.oauth2.authorizationserver.AuthorizationServerConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableResourceServer
public class OAuth2ResourceServerConfigJwt extends ResourceServerConfigurerAdapter {

    @Value("${com.codepuran.oauth2.resource.id}")
    private String resourceId;

    @Autowired
    private CustomAccessTokenConverter customAccessTokenConverter;

    @Autowired
    private AuthorizationServerConfiguration authorizationServerConfiguration;

    @Override
    public void configure(final HttpSecurity http) throws Exception {
    // @formatter:off
    http.sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
        .and()
        .authorizeRequests()
        .antMatchers(HttpMethod.POST,"/oauth/token").permitAll()
        .antMatchers(HttpMethod.POST,"/api/user").permitAll()
        .anyRequest().authenticated()
        .and()
        .exceptionHandling()
        .authenticationEntryPoint(new AuthExceptionEntryPoint());
        // @formatter:on                
    }

    @Override
    public void configure(final ResourceServerSecurityConfigurer config) {
        config.tokenServices(tokenServices());
        config.resourceId(resourceId);
    }

    @Bean
    @Primary
    public DefaultTokenServices tokenServices() {
        final DefaultTokenServices defaultTokenServices = new DefaultTokenServices();
        defaultTokenServices.setTokenStore(authorizationServerConfiguration.tokenStore());
        return defaultTokenServices;
    }
}