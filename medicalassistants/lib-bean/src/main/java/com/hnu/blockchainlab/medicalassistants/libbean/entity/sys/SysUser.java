package com.hnu.blockchainlab.medicalassistants.libbean.entity.sys;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;

import java.time.LocalDateTime;
import java.io.Serializable;


/**
 * <p>
 * 系统用户
 * </p>
 *
 * @author Sasuke
 * @since 2021-09-11
 */
@Data
@ApiModel(value = "SysUser(系统用户)")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SysUser implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    @ApiModelProperty(value = "主键")
    private Long id;

    /**
     * 用户类型: huanzhe 患者,yisheng 医生,yaodian药房
     */
    @ApiModelProperty(value = "用户类型: huanzhe 患者,yisheng 医生,yaodian药房")
    private String userType;

    /**
     * 用户名
     */
    @ApiModelProperty(value = "用户名")
    private String username;

    /**
     * pwd
     */
    @ApiModelProperty(value = "pwd")
    private String fdPwd;

    /**
     * 真实姓名
     */
    @ApiModelProperty(value = "真实姓名")
    private String name;

    /**
     * 性别：0未知1男2女3其他
     */
    @ApiModelProperty(value = "性别：0未知1男2女3其他")
    private Integer sex;

    /**
     * 身份证
     */
    @ApiModelProperty(value = "身份证")
    private String idCard;

    /**
     * 手机
     */
    @ApiModelProperty(value = "手机")
    private String mobile;

    /**
     * 电话
     */
    @ApiModelProperty(value = "电话")
    private String telephone;

    /**
     * 邮箱
     */
    @ApiModelProperty(value = "邮箱")
    private String email;

    /**
     * 头像uri
     */
    @ApiModelProperty(value = "头像uri")
    private String facePhotoUri;

    /**
     * 岗位编码
     */
    @ApiModelProperty(value = "岗位编码")
    private String positionNo;

    /**
     * 地址
     */
    @ApiModelProperty(value = "地址")
    private String address;

    /**
     * 状态:1-已禁用,2-正常
     */
    @ApiModelProperty(value = "状态:1-已禁用,2-正常")
    private Integer status;

    /**
     * 是否删除：0否1是
     */
    @ApiModelProperty(value = "是否删除：0否1是")
    private Integer deleted;

    /**
     * 创建者
     */
    @ApiModelProperty(value = "创建者")
    private String createBy;

    /**
     * 创建者名字
     */
    @ApiModelProperty(value = "创建者名字")
    private String createByName;

    /**
     * 修改者
     */
    @ApiModelProperty(value = "修改者")
    private String updateBy;

    /**
     * 修改者名字
     */
    @ApiModelProperty(value = "修改者名字")
    private String updateByName;

    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间")
    private LocalDateTime createTime;

    /**
     * 修改时间
     */
    @ApiModelProperty(value = "修改时间")
    private LocalDateTime updateTime;


}
