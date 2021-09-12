package com.hnu.blockchainlab.medicalassistants.libbean.entity.sys;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.FastjsonTypeHandler;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Map;


/**
 * <p>
 * token记录
 * </p>
 *
 * @author Sasuke
 * @since 2021-07-24
 */
@Data
@ApiModel(value = "TokenRecord(token记录)")
@Accessors(chain = true)
@TableName(autoResultMap = true)
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class TokenRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * tokenId
     */
    @ApiModelProperty(value = "tokenId")
    private String tokenId;

    /**
     * token
     */
    @ApiModelProperty(value = "token")
    @TableField(typeHandler = FastjsonTypeHandler.class)
    private Map<String, Object> info;

    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间")
    private LocalDateTime createTime;


}
