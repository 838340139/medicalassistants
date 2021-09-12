package com.hnu.blockchainlab.medicalassistants.libbean.constant;

/**
 * 通用常量信息
 *
 * @author sasuke
 */
public class Constants {

    /**
     * UTF-8 字符集
     */
    public static final String UTF8 = "UTF-8";

    /**
     * ISO8859-1 字符集
     */
    public static final String ISO8859_1 = "ISO8859-1";

    /**
     * GBK 字符集
     */
    public static final String GBK = "GBK";

    /**
     * http请求
     */
    public static final String HTTP = "http://";

    /**
     * https请求
     */
    public static final String HTTPS = "https://";

    /**
     * {@code 500 Server Error} (HTTP/1.0 - RFC 1945)
     */
    public static final Integer SC_INTERNAL_SERVER_ERROR_500 = 500;
    /**
     * {@code 200 OK} (HTTP/1.0 - RFC 1945)
     */
    public static final Integer SC_OK_200 = 200;
    /**
     * 秘钥规则
     * 密码至少为8位数字、字母、符号( !@#$%^&*)三种组合
     */
    public static final String PW_REGEX = "^(?![0-9]+$)(?![A-z]+$)(?![ !@#$%^&*]+$)(?![0-9A-z]+$)(?![0-9 !@#$%^&*]+$)(?![A-z !@#$%^&*]+$)[0-9A-z !@#$%^&*]{8,}$";


    public static final String DEFAULT_DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
    public static final String YEAR_MONTH_FORMAT = "yyyy-MM";
    public static final String SMALL_DATE_FORMAT = "yyyyMMdd";
    public static final String MONTH_DAY_FORMAT = "MM-dd";
    public static final String DEFAULT_TIME_FORMAT = "HH:mm:ss";

    public static final String SQL_Y_M_D = "%Y-%m-%d";
    public static final String SQL_Y_M = "%Y-%m";

    public static final String CONTENT_TYPE_JSON = "application/json";
    public static final String CONTENT_TYPE_TEXT = "application/text";

    /**
     * 是否删除：0否1是
     */
    public enum Delete {
        NO(0, "否"), YES(1, "是");

        private Integer code;
        private String name;

        Delete(Integer code, String name) {
            this.code = code;
            this.name = name;
        }

        public Integer getCode() {
            return code;
        }
    }

    /**
     * 状态 0初始,1未启用,2正常/成功,3已删除/失败
     */
    public enum Status {
        INITIAL(0, "未启用"),
        DISABLE(1, "已禁用"),
        NORMAL(2, "正常"),
        DELETED(3, "已删除");

        private Integer code;
        private String name;

        Status(Integer code, String name) {
            this.code = code;
            this.name = name;
        }

        public Integer getCode() {
            return code;
        }
    }

    /**
     * 状态 0初始,1未启用,2正常/成功,3已删除/失败
     */
    public enum PermissionType {
        MENU("menu", "菜单"),
        API("api", "接口"),
        BUTTON("button", "按钮"),
        COMPANY("company", "公司"),
        ;

        private String code;
        private String name;

        PermissionType(String code, String name) {
            this.code = code;
            this.name = name;
        }

        public String getCode() {
            return code;
        }
    }


    /**
     * 状态 0初始,1未启用,2正常/成功,3已删除/失败
     */
    public static class Service {
        public static final String SERVICE_AUTH = "medicalassistants-service-rest";
    }

}
