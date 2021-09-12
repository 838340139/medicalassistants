package com.hnu.blockchainlab.medicalassistants.libbean.entity.demo;

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
 * demo
 * </p>
 *
 * @author Sasuke
 * @since 2021-07-23
 */
@Data
@ApiModel(value = "Demo(demo)")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Demo implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    @ApiModelProperty(value = "主键")
    private Long id;

    /**
     * 名称
     */
    @ApiModelProperty(value = "名称")
    private String name;

    /**
     * 内容
     */
    @ApiModelProperty(value = "内容")
    private String content;

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
