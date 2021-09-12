package com.hnu.blockchainlab.medicalassistants.libbean.dto.response;

import com.hnu.blockchainlab.medicalassistants.libbean.constant.AuthConstant;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Authorization;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.MedicalHistory;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MedicalHistoryAuthItem {

    public MedicalHistoryAuthItem(MedicalHistory medicalHistory, Authorization authorization) {
        this.createTime = medicalHistory.getCreateTime();
        this.mname = medicalHistory.getMname();
        this.mId = medicalHistory.getMid();
        this.msickness = medicalHistory.getMsickness();
        if (authorization != null) {
            this.auState = authorization.getAuState();
            this.auId = authorization.getAuId();
        } else this.auState = AuthConstant.STATE_NO_APPLY;
    }

    private LocalDateTime createTime;

    private String msickness;

    private String mname;

    private int auState;

    private Long auId;

    private Long mId;
}
