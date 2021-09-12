package com.hnu.blockchainlab.medicalassistants.servicerest;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableCaching//开启spring缓存
@EnableSwagger2//开启swagger
@EnableTransactionManagement//开启spring事务管理
//@EnableAspectJAutoProxy//开启AOP
@MapperScan(basePackages = "com.hnu.blockchainlab.medicalassistants.*.mapper")
@SpringBootApplication(scanBasePackages = {"com.hnu.blockchainlab.medicalassistants.*"})
public class RestApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestApplication.class, args);
    }

}
