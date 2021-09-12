package com.hnu.blockchainlab.medicalassistants.servicerest.config;

import io.swagger.annotations.ApiOperation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @ClassName SwaggerConfig
 * @description: SwaggerConfig
 * @author: sasuke
 * @create: 2021-03-26
 **/
@Configuration
@EnableSwagger2 // 启用 Swagger
//@EnableWebMvc
public class SwaggerConfig {

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                // 为当前包路径
//                .apis(RequestHandlerSelectors.basePackage("com.crlink.smartcommunity.core.config"))
                //这里采用包含注解的方式来确定要显示的接口(建议使用这种)
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                .paths(PathSelectors.any())
                .build();
    }

    /**
     * 构建 api 文档的详细信息函数，注意这里的注解引用的是哪个
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                // 页面标题
                .title("SSM Application [iMoney] Swagger2 RESTFul API")
                // 创建人
                .contact(new Contact("medicalassistants", "http://www.medicalassistants.com", "xxx@123.com"))
                // 版本号
                .version("1.0")
                // 描述
                .description("This is [iMoney] API doc")
                .build();
    }
}

