package com.hnu.blockchainlab.medicalassistants.libbean.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hnu.blockchainlab.medicalassistants.libbean.constant.Constants;
import com.hnu.blockchainlab.medicalassistants.libbean.enums.ResultMsg;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;

/**
 * 接口返回对象
 *
 * @author sasuke
 * @since 2021-03-31
 */
@Data
@ApiModel(value = "接口返回对象", description = "接口返回对象")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Result<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 成功标志
     */
    @ApiModelProperty(value = "成功标志")
    private boolean success = true;

    /**
     * 返回处理消息
     */
    @ApiModelProperty(value = "返回处理消息")
    private String message = "操作成功！";

    /**
     * 返回代码
     */
    @ApiModelProperty(value = "返回代码")
    private Integer code = 0;

    /**
     * 返回数据对象 data
     */
    @ApiModelProperty(value = "返回数据对象")
    private T data;

    /**
     * 时间戳
     */
    @ApiModelProperty(value = "时间戳")
    private long timestamp = System.currentTimeMillis();


    public Result() {
    }

    public Result(T data) {
        this.data = data;
    }

    private Result(boolean success, int code, String message) {
        this.success = success;
        this.code = code;
        this.message = message;
    }

    private Result(T data, boolean success, int code, String message) {
        this.data = data;
        this.success = success;
        this.code = code;
        this.message = message;
    }


    /**
     * 返回默认失败
     */
    public static <T> Result<T> defaultFailure() {
        return new Result<T>(false, 500, "系统内部错误");
    }

    /**
     * 自定义失败一
     */
    public static <T> Result<T> failure(T data, int code, String message) {
        return new Result<T>(data, false, code, message);
    }

    /**
     * 自定义失败二
     */
    public static <T> Result<T> failure(int code, String message) {
        return new Result<T>(false, code, message);
    }

    public Result<T> success(String message) {
        this.message = message;
        this.code = Constants.SC_OK_200;
        this.success = true;
        return this;
    }

    public static <T> Result<T> ok() {
        return new Result<T>(true, 200, "返回成功");
    }

    public static <T> Result<T> ok(String msg) {
        return new Result<T>(true, 200, msg);
    }

    public static <T> Result<T> ok(T data) {
        return new Result<T>(data, true, 200, "返回成功");
    }

    public static Result<Object> error(String msg) {
        return error(Constants.SC_INTERNAL_SERVER_ERROR_500, msg);
    }

    public static <T> Result<T> error(int code, String msg) {
        return new Result<T>(false, code, msg);
    }

    public static <T> Result<T> error(int code, String msg, String defaultMsg) {
        if (StringUtils.isBlank(msg)) {
            msg = defaultMsg;
        }
        return new Result<T>(false, code, msg);
    }

    public Result<T> error500(String message) {
        this.message = message;
        this.code = Constants.SC_INTERNAL_SERVER_ERROR_500;
        this.success = false;
        return this;
    }

    /**
     * 无权限访问返回结果
     */
    public static Result<Object> noAuth(String msg) {
        return error(ResultMsg.访问权限认证未通过.getCode(), msg);
    }
}