package com.hnu.blockchainlab.medicalassistants.libbean.dto.response;

import com.hnu.blockchainlab.medicalassistants.libbean.constant.AuthConstant;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Authorization;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.MedicalHistory;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Prescription;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PresAuthItem {

    public PresAuthItem(Prescription prescription, Authorization authorization) {
        this.createTime = prescription.getCreateTime();
        this.pname = prescription.getPname();
        this.pId = prescription.getPid();
        if (authorization != null) {
            this.auState = authorization.getAuState();
            this.auId = authorization.getAuId();
        } else this.auState = AuthConstant.STATE_NO_APPLY;
    }

    private LocalDateTime createTime;

    private String pname;

    private int auState;

    private Long auId;

    private Long pId;
}
