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
@ApiModel(value = "MedicalHistory()")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class MedicalHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "mid", type = IdType.AUTO)
    @ApiModelProperty(value = "")
    private Long mid;

    /**
     * 患者姓名
     */
    @ApiModelProperty(value = "患者姓名")
    private String mname;

    /**
     * 身份证号
     */
    @TableField("mIDNumber")
    @ApiModelProperty(value = "身份证号")
    private String midnumber;

    /**
     * 性别：0未知1男2女3其他
     */
    @ApiModelProperty(value = "性别：0未知1男2女3其他")
    private Integer msex;

    @ApiModelProperty(value = "")
    private Integer mage;

    /**
     * 所患疾病
     */
    @ApiModelProperty(value = "所患疾病")
    private String msickness;

    /**
     * 症状
     */
    @ApiModelProperty(value = "症状")
    private String msyndrome;

    /**
     * 病史
     */
    @ApiModelProperty(value = "病史")
    private String mhistory;

    /**
     * 医学检查
     */
    @ApiModelProperty(value = "医学检查")
    private String mcheck;

    /**
     * 治疗方案
     */
    @ApiModelProperty(value = "治疗方案")
    private String mtreatment;

    @ApiModelProperty(value = "")
    private LocalDateTime createTime;

    @ApiModelProperty(value = "")
    private LocalDateTime updateTime;

    /**
     * 患者id
     */
    @ApiModelProperty(value = "患者id")
    private Long patientId;


}
