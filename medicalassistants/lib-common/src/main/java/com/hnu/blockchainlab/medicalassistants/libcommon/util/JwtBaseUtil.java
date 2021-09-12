package com.hnu.blockchainlab.medicalassistants.libcommon.util;

import com.hnu.blockchainlab.medicalassistants.libcommon.exception.PermissionException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class JwtBaseUtil {

    private static final String SECRET = "A2OPJK3A%^&T4ED$%$#%#()*&& ascrswwi1WFSasdw**&";
    private static final String USER_SUBJECT = "user info";
    private static final String USER_TOKEN_PREFIX = "user ";

    /**
     * 生成用户token
     *
     * @param param
     * @return
     */
    public static String generateUserToken(Map<String, Object> param) {
        // 生成token
        return generateToken(USER_SUBJECT, SignatureAlgorithm.HS512, SECRET, USER_TOKEN_PREFIX, param);
    }

    /**
     * 解析token 解析JWT参数
     */
    public static Map<String, Object> validateToken(String token) {
        String prefix;
        Map<String, Object> map;
        if (StringUtils.isBlank(token)) {
            throw new PermissionException("token is error, please check");
        } else if (token.startsWith(prefix = USER_TOKEN_PREFIX)) {
            map = validateToken(SECRET, prefix, token);
            if (ObjectUtils.isEmpty(map.get("tokenId"))) {
                throw new PermissionException("user is error, please check");
            }
        } else {
            throw new PermissionException("token_prefix is error, please check");
        }

        return map;
    }

    // user token
    private static String generateToken(String subject, SignatureAlgorithm sa, String secret, String prefix, Map<String, Object> param) {
        String jwt = Jwts.builder()
                .setSubject(subject).setClaims(param)
                .signWith(sa, secret)
                .compact();
        if (StringUtils.isBlank(prefix)) {
            prefix = StringUtils.EMPTY;
        }
        String finalJwt = prefix + jwt;
        return finalJwt;
    }


    private static Map<String, Object> validateToken(String subject, String prefix, String token) {
        if (StringUtils.isBlank(token)) {
            throw new PermissionException("token is error, please check");
        }
        Map<String, Object> map = Jwts.parser()
                .setSigningKey(subject)
                .parseClaimsJws(token.replaceFirst(prefix, StringUtils.EMPTY))
                .getBody();
        return map;
    }

}
