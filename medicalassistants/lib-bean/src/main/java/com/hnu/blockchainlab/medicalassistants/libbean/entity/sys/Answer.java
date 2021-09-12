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
@ApiModel(value = "Answer()")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Answer implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "an_id", type = IdType.AUTO)
    @ApiModelProperty(value = "")
    private Long anId;

    @ApiModelProperty(value = "")
    private LocalDateTime createTime;

    @ApiModelProperty(value = "")
    private String content;

    @ApiModelProperty(value = "")
    private Long qId;

    @ApiModelProperty(value = "")
    private Long phId;

    @ApiModelProperty(value = "")
    private Long qSender;


}
