package com.hnu.blockchainlab.medicalassistants.servicerest.task;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.google.common.collect.Lists;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.TokenRecord;
import com.hnu.blockchainlab.medicalassistants.libcommon.util.CacheUtil;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.ITokenRecordService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * springboot启动时执行
 */
@Slf4j
@Component
public class MyApplicationRunner implements ApplicationRunner {

    @Autowired
    private ITokenRecordService tokenRecordService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("通过实现ApplicationRunner接口,在spring-boot项目启动后运行");

        // 启动参数
        //String[] sourceArgs = args.getSourceArgs();

        // 删除超时token
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.lt("create_time", new Date(System.currentTimeMillis() - CacheUtil.OVERTIME * 60 * 1000));
        tokenRecordService.remove(queryWrapper);

        // 加载token到缓存
        List<TokenRecord> tokenRecords = tokenRecordService.list();
        for (TokenRecord tokenRecord : tokenRecords) {
            CacheUtil.LOGIN_CACHE.put(tokenRecord.getTokenId(), tokenRecord.getInfo());
        }
        // 清除全部列表
        tokenRecordService.remove(new QueryWrapper<>());

        // 监听
        // 正常关闭spring-boot应用前执行
        // kill -9 xxx //不支持
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            log.info("正常关闭spring-boot应用前执行===========");
            // 添加列表
            if (!CacheUtil.LOGIN_CACHE.isEmpty()) {
                Set<Map.Entry<String, Map<String, Object>>> entries = CacheUtil.LOGIN_CACHE.entrySet();
                List<TokenRecord> entities = Lists.newArrayList();
                for (Map.Entry<String, Map<String, Object>> entry : entries) {
                    TokenRecord entity = new TokenRecord();
                    entity.setTokenId(entry.getKey());
                    entity.setInfo(entry.getValue());
                    entities.add(entity);
                }
                tokenRecordService.saveBatch(entities);
            }
        }));

        log.info("spring-boot启动完毕");
    }

    public static void main(String[] args) {
        System.out.println(new Date(System.currentTimeMillis() - CacheUtil.OVERTIME * 60 * 1000));
    }
}