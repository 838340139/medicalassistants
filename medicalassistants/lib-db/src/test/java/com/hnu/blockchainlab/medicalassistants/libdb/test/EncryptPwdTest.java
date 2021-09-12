package com.hnu.blockchainlab.medicalassistants.libdb.test;

import com.baomidou.mybatisplus.core.toolkit.AES;

public class EncryptPwdTest {

    public static void main(String[] args) {
        encryptStr();
    }

    private static void encryptStr() {
        // 生成 16 位随机 AES 密钥
        //String randomKey = AES.generateRandomKey();
        // 随机秘钥
        // dev环境
        String devKey = "dev95fe8b0ee4da6";
        // sit环境
        //String sitKey = "dev95fe8b0ee4da6";
        // uat环境(保密)
        //String uatKey = "uatxxx";
        // prod环境(保密)
        //String prodKey = "prodxxx";
        String randomKey = devKey;
        // 随机密钥加密
        String url = AES.encrypt("jdbc:mysql://202.197.99.46:3306/medicalassistants?characterEncoding=utf8&useSSL=false&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai&noAccessToProcedureBodies=true&&autoReconnect=true&failOverReadOnly=false", devKey);
        String username = AES.encrypt("medicalassistants", devKey);
        String fdPwd = AES.encrypt("x123456", devKey);
        System.out.println(url);
        System.out.println(username);
        System.out.println(fdPwd);
    }

}
