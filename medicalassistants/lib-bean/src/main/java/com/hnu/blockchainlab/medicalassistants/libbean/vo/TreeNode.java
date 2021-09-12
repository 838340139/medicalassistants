package com.hnu.blockchainlab.medicalassistants.libbean.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.TreeSet;


/**
 * 结构树
 *
 * @author sasuke
 * @since 2021-03-31
 */
@Data
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class TreeNode implements Serializable, Comparable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "主键")
    private Long id;

    /**
     * 编号
     */
    @ApiModelProperty(value = "编号")
    private String fdNo;

    /**
     * 组织机构名称
     */
    @ApiModelProperty(value = "名称")
    private String name;

    /**
     * 组织机构类型
     */
    @ApiModelProperty(value = "类型")
    private Integer typeNo;

    /**
     * 组织机构大类
     */
    @ApiModelProperty(value = "大类型")
    private Integer bigTypeNo;

    /**
     * 上级编号
     */
    @ApiModelProperty(value = "上级编号")
    private String parentNo;

    /**
     * 上级名称
     */
    @ApiModelProperty(value = "上级名称")
    private String parentName;

    /**
     * 序号
     */
    @ApiModelProperty(value = "序号")
    private Integer fdOrder;

    /**
     * 描述
     */
    @ApiModelProperty(value = "描述")
    private String description;

    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间")
    private LocalDateTime createTime;

    /**
     * 子节点
     */
    @ApiModelProperty(value = "子节点")
    private TreeSet<TreeNode> children;

    @Override
    public int hashCode() {
        return Objects.hash(id, fdNo);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TreeNode)) return false;
        TreeNode that = (TreeNode) o;
        return Objects.equals(this.id, that.id) && Objects.equals(this.fdNo, that.fdNo);
    }

    @Override
    public int compareTo(Object o) {
        TreeNode that = (TreeNode) o;
        if (!Objects.equals(this.typeNo, that.typeNo) && this.typeNo != null && that.typeNo != null) {
            return this.typeNo.compareTo(that.typeNo);
        } else if (!Objects.equals(this.fdOrder, that.fdOrder) && this.fdOrder != null && that.fdOrder != null) {
            return this.fdOrder.compareTo(that.fdOrder);
        } else if (!Objects.equals(this.id, that.id) && this.id != null && that.id != null) {
            return this.id.compareTo(that.id);
        }
        return 1;
    }

}
