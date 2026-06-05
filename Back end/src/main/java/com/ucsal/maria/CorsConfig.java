
package com.ucsal.maria;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Libera as permissões para todas as rotas do seu backend
                .allowedOrigins("*") // Permite que qualquer porta (como a 5173 do seu frontend) acesse
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS"); // Libera todos os tipos de requisição
    }
}