package com.hnu.blockchainlab.medicalassistants.libcommon.exception;


/**
 * 响应结果异常
 */
public class ResultInfoException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public ResultInfoException(String msg) {
        super(msg);
    }

}
