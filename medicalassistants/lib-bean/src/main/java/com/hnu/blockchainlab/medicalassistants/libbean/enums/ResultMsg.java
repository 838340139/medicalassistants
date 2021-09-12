package com.hnu.blockchainlab.medicalassistants.libbean.enums;


/**
 * 结果信息
 */
public enum ResultMsg {
    SUCCESS(200, "success", "操作成功", "success"),
    ERROR(1000, "error", "操作失败", "error"),
    接口认证失败(1001, "接口认证失败"),
    授权过期(1002, "授权过期"),
    缺失参数(1003, "缺失参数"),
    添加失败(1004, "添加失败"),
    身份证信息已存在(1005, "身份证信息已存在"),
    用户名或密码错误(1006, "用户名或密码错误"),
    无接口访问权限(1007, "无接口访问权限"),
    无效用户Token(1008, "无效用户Token"),
    PW_CHECK(1009, "密码至少为8位数字、字母、符号( !@#$%^&*)三种组合"),
    访问权限认证未通过(1010, "访问权限认证未通过"),
    PW_ERROR(1011, "原密码输入错误"),
    REPEAT_SUBMIT(1012, "重复提交"),
    REPEAT_SUBMIT_EXCEP(1013, "重复提交处理异常"),
    MYSQL_UNIQUE(1014, "违反唯一键约束"),
    USER_IS_DISABLED(1015, "用户已冻结，请联系管理员"),
    PARAM_ERROR(1016, "参数错误"),
    ON_BLACKLIST(1017, "此人员为%s项目黑名单人员，不支持当前操作"),
    DATA_EXISTS(1018, "记录已存在，不能重复添加"),
    DATA_NOT_EXISTS(1019, "记录不已存在"),
    AUTHORIZATION_EXPIRED(1020, "账号到期失效，请及时续费"),
    验证码校验失败(1020, "验证码校验失败"),
    登陆已超时(1021, "登陆已超时"),
    ;

    private Integer code;
    private String state;
    private String msg;
    private String msgEn;

    ResultMsg(Integer code, String msg) {
        this.code = code;
        this.state = "error";
        this.msg = msg;
    }

    ResultMsg(Integer code, String state, String msg) {
        this.code = code;
        this.state = state;
        this.msg = msg;
    }

    ResultMsg(Integer code, String state, String msg, String msgEn) {
        this.code = code;
        this.state = state;
        this.msg = msg;
        this.msgEn = msgEn;
    }

    public Integer getCode() {
        return code;
    }

    public String getState() {
        return state;
    }

    public String getMsg() {
        return msg;
    }

    public String getMsgEn() {
        return msgEn;
    }

}
