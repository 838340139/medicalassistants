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
 *
 * </p>
 *
 * @author Sasuke
 * @since 2021-09-11
 */
@Data
@ApiModel(value = "Authorization()")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Authorization implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "au_id", type = IdType.AUTO)
    @ApiModelProperty(value = "")
    private Long auId;

    /**
     * 申请时间
     */
    @ApiModelProperty(value = "申请时间")
    private LocalDateTime auDate;

    /**
     * 申请人
     */
    @ApiModelProperty(value = "申请人")
    private Long auApplicant;

    /**
     * 申请人姓名
     */
    @ApiModelProperty(value = "申请人姓名")
    private String auApplicantName;

    /**
     * 申请人身份类型（yisheng,huanzhe,yaofang)
     */
    @ApiModelProperty(value = "申请人身份类型（yisheng,huanzhe,yaofang)")
    private String auApplicantType;

    /**
     * 申请状态(0待审核，1通过且未查看，2不通过，3通过已过期， 4未申请)
     */
    @ApiModelProperty(value = "申请状态(0待审核，1通过且未查看，2不通过，3通过已过期， 4未申请)")
    private Integer auState;

    /**
     * 标签（0电子病历，1处方单）
     */
    @ApiModelProperty(value = "标签（0电子病历，1处方单）")
    private Integer auTag;

    /**
     * 被申请人
     */
    @ApiModelProperty(value = "被申请人")
    private Long auReciver;

    /**
     * 病历或者处方单的id
     */
    @ApiModelProperty(value = "病历或者处方单的id")
    private Long auRecord;

    /**
     * 病例或处方单的关键字
     */
    @ApiModelProperty(value = "病例或处方单的关键字")
    private String auRecordKeyword;

    /**
     * 处理时间
     */
    @ApiModelProperty(value = "处理时间")
    private LocalDateTime auHandleTime;


}
