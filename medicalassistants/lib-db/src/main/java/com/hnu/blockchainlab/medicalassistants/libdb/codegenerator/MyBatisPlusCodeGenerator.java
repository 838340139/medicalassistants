package com.hnu.blockchainlab.medicalassistants.libdb.codegenerator;


import com.baomidou.mybatisplus.core.toolkit.StringPool;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.InjectionConfig;
import com.baomidou.mybatisplus.generator.config.*;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.VelocityTemplateEngine;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Sasuke
 * @Description: MyBatis-Plus代码生产
 * @ProjectName common
 * @date 2020/1/16 15:18
 */
public class MyBatisPlusCodeGenerator {

    /**
     * @param url
     * @param username
     * @param fdPwd
     * @param app
     * @param moduleName
     * @param tables
     */
    private static void codeGenerator(String url, String username, String fdPwd, String app, String dir, String moduleName, String[] tables) {
        // 参数校验
        if (StringUtils.isAnyBlank(moduleName)) {
            System.out.println("参数校验不通过");
            return;
        }
        // 代码生成器
        AutoGenerator mpg = new AutoGenerator();

        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        String projectPath = System.getProperty("user.dir");
        gc.setOutputDir(projectPath + "/" + app + "/src/main/java");
        gc.setAuthor("Sasuke");//TODO
        gc.setOpen(false);
        // gc.setSwagger2(true); 实体属性 Swagger2 注解
        mpg.setGlobalConfig(gc);

        // 数据源配置
        //TODO
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl(url);
        // dsc.setSchemaName("public");
        dsc.setDriverName("com.mysql.jdbc.Driver");
        dsc.setUsername(username);
        dsc.setPassword(fdPwd);
        mpg.setDataSource(dsc);

        // 包配置
        //TODO
        PackageConfig pc = new PackageConfig();
        //pc.setModuleName(moduleName);//模块名
        pc.setParent(dir);
        pc.setMapper("mapper." + moduleName);
        pc.setEntity("entity." + moduleName);
        pc.setController("controller." + moduleName);
        pc.setService("service." + moduleName);
        pc.setServiceImpl("service.impl." + moduleName);
        mpg.setPackageInfo(pc);

        // 自定义配置
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                // to do nothing
            }
        };

        // 如果模板引擎是 velocity
        String templatePath = "/templates/mapper.xml.vm";
        // 如果模板引擎是 freemarker
        //String templatePath = "/templates/mybatis.mapper.xml.ftl";

        // 自定义输出配置
        List<FileOutConfig> focList = new ArrayList<>();
        // 自定义配置会被优先输出
        //TODO
        focList.add(new FileOutConfig(templatePath) {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // 自定义输出文件名 ， 如果你 Entity 设置了前后缀、此处注意 xml 的名称会跟着发生变化！！
                return projectPath + "/" + app + "/src/main/resources/mapper/" + moduleName + "/" + tableInfo.getEntityName() + "Mapper" + StringPool.DOT_XML;
            }
        });

        cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);

        // 配置模板
        TemplateConfig templateConfig = new TemplateConfig();

        // 配置自定义输出模板
        //指定自定义模板路径，注意不要带上.ftl/.vm, 会根据使用的模板引擎自动识别
        templateConfig.setEntity("mybatis/template/entity.java.vm");
        // templateConfig.setService();
        // templateConfig.setController();

        templateConfig.setXml(null);
        mpg.setTemplate(templateConfig);

        // 策略配置
        StrategyConfig strategy = new StrategyConfig();
        strategy.setNaming(NamingStrategy.underline_to_camel);
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        // strategy.setSuperEntityClass("你自己的父类实体,没有就不用设置!");
        strategy.setEntityLombokModel(true);
        strategy.setRestControllerStyle(true);
        // 公共父类
        // strategy.setSuperControllerClass("你自己的父类控制器,没有就不用设置!");
        // 写于父类中的公共字段
        // strategy.setSuperEntityColumns("id");
        // 逻辑删除
        // strategy.setLogicDeleteFieldName("status");
        //TODO
        strategy.setInclude(tables);//TODO 表名
        strategy.setControllerMappingHyphenStyle(true);
        strategy.setTablePrefix(pc.getModuleName() + "_");
        mpg.setStrategy(strategy);
        mpg.setTemplateEngine(new VelocityTemplateEngine());
        mpg.execute();
    }

    public static void main(String[] args) {
        // 目录
        String app = "lib-db";
        // 模块名//mapper/service/controller生成到code,拷贝过去
        String dir = "com.hnu.blockchainlab.medicalassistants.libdb";
        // 模块名
        String moduleName = "sys";
        // 数据库连接
        String url = "jdbc:mysql://202.197.99.46:3306/medicalassistants?useUnicode=true&useSSL=false&characterEncoding=utf8&allowPublicKeyRetrieval=true";
        String username = "medicalassistants";
        String fdPwd = "x123456";

        // TODO
        String[] tables = new String[]{"question","answer","sys_user","authorization","consult_record","drug_store","medical_history","physician","prescription","upchaindata"};
        codeGenerator(url, username, fdPwd, app, dir, moduleName, tables);
    }

}
