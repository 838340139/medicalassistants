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
@ApiModel(value = "Upchaindata()")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Upchaindata implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    @ApiModelProperty(value = "")
    private Long id;

    @ApiModelProperty(value = "")
    private String data;

    @ApiModelProperty(value = "")
    private LocalDateTime time;

    @ApiModelProperty(value = "")
    private String uploader;

    @TableField("TxHash")
    @ApiModelProperty(value = "")
    private String txhash;


}
