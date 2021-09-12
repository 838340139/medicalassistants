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
@ApiModel(value = "DrugStore()")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DrugStore implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "")
    private Long dId;

    @ApiModelProperty(value = "")
    private String dName;

    @ApiModelProperty(value = "")
    private String dAddress;

    @ApiModelProperty(value = "")
    private String dPhone;

    @ApiModelProperty(value = "")
    private String dLicense;


}
