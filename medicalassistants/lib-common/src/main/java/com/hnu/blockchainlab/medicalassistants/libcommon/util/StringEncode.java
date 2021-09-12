package com.hnu.blockchainlab.medicalassistants.libcommon.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.lang3.StringUtils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Slf4j
public class StringEncode {

    /***
     * 利用Apache的工具类实现SHA-256加密
     * @param str 加密后的报文
     * @return
     */
    public static String str2SHA256(String str) {
        MessageDigest messageDigest;
        String encodeStr = StringUtils.EMPTY;
        try {
            messageDigest = MessageDigest.getInstance("SHA-256");
            byte[] hash = messageDigest.digest(str.getBytes("UTF-8"));
            encodeStr = Hex.encodeHexString(hash);
        } catch (NoSuchAlgorithmException e) {
            log.error(e.getMessage(), e);
        } catch (UnsupportedEncodingException e) {
            log.error(e.getMessage(), e);
        }
        return encodeStr;

    }


}
