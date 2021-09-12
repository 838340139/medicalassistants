package com.hnu.blockchainlab.medicalassistants.libbean.entity.sys;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

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
@ApiModel(value = "Physician()")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Physician implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "")
    private Long phId;

    /**
     * 医生姓名
     */
    @ApiModelProperty(value = "医生姓名")
    private String phName;

    /**
     * 医生职称
     */
    @ApiModelProperty(value = "医生职称")
    private String phTitle;

    /**
     * 医生简介
     */
    @ApiModelProperty(value = "医生简介")
    private String phIntro;

    /**
     * 用户名
     */
    @ApiModelProperty(value = "用户名")
    private String username;


}
