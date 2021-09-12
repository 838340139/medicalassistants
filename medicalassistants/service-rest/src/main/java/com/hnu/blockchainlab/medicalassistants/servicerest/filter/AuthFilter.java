package com.hnu.blockchainlab.medicalassistants.servicerest.filter;

import cn.hutool.core.io.IoUtil;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.hnu.blockchainlab.medicalassistants.libbean.constant.Constants;
import com.hnu.blockchainlab.medicalassistants.libbean.enums.ResultMsg;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.Result;
import com.hnu.blockchainlab.medicalassistants.libcommon.exception.PermissionException;
import com.hnu.blockchainlab.medicalassistants.libcommon.util.CacheUtil;
import com.hnu.blockchainlab.medicalassistants.libcommon.util.JwtBaseUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * 权限拦截器
 * urlPatterns:拦截的url地址 filterName:拦截器名称
 */
@Slf4j
@Component
@WebFilter(urlPatterns = "/medicalassistants/*", filterName = "authFilter")
public class AuthFilter implements Filter {
    // uri白名单
    private final List<String> URI_WHITE_LIST;

    {
        // 添加白名单
        URI_WHITE_LIST = Lists.newArrayList();
        // 登陆
        URI_WHITE_LIST.add("/medicalassistants/rest/auth/login");
        // 注册
        URI_WHITE_LIST.add("/medicalassistants/rest/auth/register");
        //swagger
        URI_WHITE_LIST.add("/medicalassistants/rest/swagger-ui.html");
        URI_WHITE_LIST.add("/medicalassistants/rest/webjars/.*");
        URI_WHITE_LIST.add("/medicalassistants/rest/swagger-resources.*");
        URI_WHITE_LIST.add("/medicalassistants/rest/v2/api-docs");
        URI_WHITE_LIST.add("/medicalassistants/rest/csrf");
    }

    /*
     * 容器加载完成调用
     * */
    @Override
    public void init(FilterConfig filterConfig) {
        // TODO Auto-generated method stub
        log.info("filter init...");
    }

    /*
     *  请求被拦截的时候调用
     * */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException {
        // TODO Auto-generated method stub
        //log.info("doFilter...");
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;
        OutputStream os = resp.getOutputStream();
        try {
            String requestURI = req.getRequestURI();
            // 白名单放行
            for (String uriReg : URI_WHITE_LIST) {
                if (Pattern.matches(uriReg, requestURI)) {
                    chain.doFilter(request, response);
                    return;
                }
            }

            String token = req.getHeader("Authorization");
            if (StringUtils.isBlank(token)) {
                throw new PermissionException(ResultMsg.无效用户Token.getMsg());
            }
            // 解析token内容
            Map<String, Object> jwtInfo = JwtBaseUtil.validateToken(token);
            String tokenId = (String) jwtInfo.get("tokenId");

            // token不存在
            if (!CacheUtil.LOGIN_CACHE.containsKey(tokenId)) {
                CacheUtil.LOGIN_CACHE.remove(tokenId);
                throw new PermissionException(ResultMsg.无效用户Token.getMsg());
            }
            // 获取登陆信息
            Map<String, Object> info = CacheUtil.LOGIN_CACHE.get(tokenId);
            // 时间戳
            long ots = Long.parseLong(info.get("ts").toString());
            if ((Instant.now().getEpochSecond() - ots) / 60 > CacheUtil.OVERTIME) {
                CacheUtil.LOGIN_CACHE.remove(tokenId);
                throw new PermissionException(ResultMsg.登陆已超时.getMsg());
            } else if ((Instant.now().getEpochSecond() - ots) / 60 > CacheUtil.RESET_OVERTIME) {
                // 更新超时时间戳
                info.put("ots", Instant.now().getEpochSecond());
                CacheUtil.LOGIN_CACHE.put(tokenId, info);
            }

            chain.doFilter(request, response);
        } catch (Exception e) {
            String str = JSONObject.toJSONString(Result.noAuth(e.getMessage()));
            resp.setContentType(Constants.CONTENT_TYPE_JSON);
            os.write(StringUtils.getBytes(str, Constants.UTF8));
        } finally {
            IoUtil.close(os);
        }
    }

    /*
     * 容器被销毁的时候调用
     * */
    @Override
    public void destroy() {
        // TODO Auto-generated method stub
        log.info("filter destroy...");
    }

}
