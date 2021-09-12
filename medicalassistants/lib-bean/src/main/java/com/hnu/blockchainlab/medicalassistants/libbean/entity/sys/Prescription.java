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

import com.baomidou.mybatisplus.annotation.TableField;

import java.io.Serializable;


/**
 * <p>
 *
 * </p>
 *
 * @author Sasuke
 * @since 2021-09-11
 */
@Data
@ApiModel(value = "Prescription()")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Prescription implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "pid", type = IdType.AUTO)
    @ApiModelProperty(value = "")
    private Long pid;

    /**
     * 身份证号
     */
    @TableField("IDnumber")
    @ApiModelProperty(value = "身份证号")
    private String idnumber;

    @ApiModelProperty(value = "")
    private String pname;

    /**
     * 性别：0未知1男2女3其他
     */
    @ApiModelProperty(value = "性别：0未知1男2女3其他")
    private Integer psex;

    /**
     * 年龄
     */
    @ApiModelProperty(value = "年龄")
    private String page;

    /**
     * 临床诊断
     */
    @ApiModelProperty(value = "临床诊断")
    private String pdiagnosis;

    /**
     * 医师
     */
    @ApiModelProperty(value = "医师")
    private String physician;

    /**
     * 处方单状态
     */
    @ApiModelProperty(value = "处方单状态")
    private String pstate;

    @ApiModelProperty(value = "")
    private LocalDateTime createTime;

    @ApiModelProperty(value = "")
    private LocalDateTime updateTime;

    /**
     * 医生id
     */
    @ApiModelProperty(value = "医生id")
    private Long physicianId;

    /**
     * 病人Id
     */
    @ApiModelProperty(value = "病人Id")
    private Long patientId;

    /**
     * 药品
     */
    @ApiModelProperty(value = "药品")
    private String medicines;

    /**
     * 医嘱
     */
    @ApiModelProperty(value = "医嘱")
    private String medicalAdvice;


}
