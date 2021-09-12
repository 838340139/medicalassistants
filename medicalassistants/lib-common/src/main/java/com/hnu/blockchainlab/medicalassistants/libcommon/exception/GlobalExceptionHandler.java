package com.hnu.blockchainlab.medicalassistants.libcommon.exception;

import com.hnu.blockchainlab.medicalassistants.libbean.enums.ResultMsg;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;


@Slf4j
@ResponseBody
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Result handlerException(Exception e) {
        log.error(e.getMessage(), e);
        return Result.error(ResultMsg.ERROR.getCode(), e.getMessage());
    }

}
