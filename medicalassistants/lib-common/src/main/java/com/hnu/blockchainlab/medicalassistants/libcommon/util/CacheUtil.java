package com.hnu.blockchainlab.medicalassistants.libcommon.util;

import com.google.common.collect.Maps;

import java.util.Map;

/**
 * 缓存工具
 */
public class CacheUtil {

    // 超时时间
    public static final Long OVERTIME = 30L;//30MINUTES
    // 重设超时时间
    public static final Long RESET_OVERTIME = 10L;//30MINUTES
    // 登陆_缓存对象
    public static final Map<String, Map<String, Object>> LOGIN_CACHE = Maps.newHashMap();

}
