package com.hnu.blockchainlab.medicalassistants.libbean.constant;

public class AuthConstant {

    // 授权未处理
    public static final Integer STATE_NOT_HANDLE = 0;

    // 拒绝授权
    public static final Integer STATE_REFUSE = 2;

    // 授权通过
    public static final Integer STATE_PASS = 1;

    // 授权过期
    public static final Integer STATE_OVERDUE = 3;

    // 未申请
    public static final Integer STATE_NO_APPLY = 4;

    // 授权类型-病历
    public static final Integer TAG_MEDI = 0;

    // 授权类型-处方单
    public static final Integer TAG_PRES = 1;

    // 授权过期时间（s）
    public static final Integer OVERDUE_TIME = 3600 * 12;


}
