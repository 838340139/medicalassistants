package com.hnu.blockchainlab.medicalassistants.libcommon.util;

import com.hnu.blockchainlab.medicalassistants.libbean.constant.AuthConstant;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Authorization;

import java.time.LocalDateTime;

public class AuthUtil {

    public static boolean checkAuthOverdue(Authorization authorization) {
        if (authorization == null || authorization.getAuHandleTime() == null) {
            return false;
        }
        return LocalDateTime.now().isAfter(
                authorization.getAuHandleTime()
                        .plusSeconds(AuthConstant.OVERDUE_TIME));
    }

}
