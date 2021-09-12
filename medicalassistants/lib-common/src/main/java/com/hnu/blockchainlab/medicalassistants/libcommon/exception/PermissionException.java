package com.hnu.blockchainlab.medicalassistants.libcommon.exception;

public class PermissionException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public PermissionException(String msg) {
        super(msg);
    }
}
