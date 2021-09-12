package com.hnu.blockchainlab.medicalassistants.libbean.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * @author Sasuke
 * @Description: 查询参数
 * @ProjectName wisdomsite
 * @date 2020/5/30 17:22
 */
@Data
@ApiModel(value = "查询参数")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class QueryParam<T> implements Cloneable {

    /**
     * 当前页
     */
    @ApiModelProperty(value = "当前页", example = "1")
    private Integer current = 1;

    /**
     * 每页数量
     */
    @ApiModelProperty(value = "每页数量", example = "10")
    private Integer size = 10;

    /**
     * 参数
     */
    @ApiModelProperty(value = "参数")
    private T param;

    @Override
    public Object clone() {
        try {
            QueryParam obj = (QueryParam) super.clone();
            return obj;
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }
}
