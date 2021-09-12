package com.hnu.blockchainlab.medicalassistants.servicerest.component;

import com.hnu.blockchainlab.medicalassistants.libcommon.util.CacheUtil;
import com.hnu.blockchainlab.medicalassistants.libcommon.util.JwtBaseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Component
public class UserComponent {

    @Autowired
    private JwtBaseUtil jwtBaseUtil;

    private Map<String, Object> getCache(ServletRequest request) {
        HttpServletRequest req = (HttpServletRequest) request;
        String token = req.getHeader("Authorization");

        // 解析token内容
        Map<String, Object> jwtInfo = JwtBaseUtil.validateToken(token);
        String tokenId = (String) jwtInfo.get("tokenId");

        Map<String, Object> cache = CacheUtil.LOGIN_CACHE.get(tokenId);

        return cache;
    }

    public Long getCurrentUserId(ServletRequest request) {
        Map<String, Object> cache = getCache(request);
        if (cache == null)
            return null;

        return (Long) cache.get("id");
    }

    public String getCurrentUsername(ServletRequest request) {
        Map<String, Object> cache = getCache(request);
        if (cache == null)
            return null;

        return (String) cache.get("username");
    }

}
