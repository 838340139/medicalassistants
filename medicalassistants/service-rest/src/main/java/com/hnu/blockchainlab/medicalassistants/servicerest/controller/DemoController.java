package com.hnu.blockchainlab.medicalassistants.servicerest.controller;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.demo.Demo;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.QueryParam;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.Result;
import com.hnu.blockchainlab.medicalassistants.libcommon.util.JwtBaseUtil;
import com.hnu.blockchainlab.medicalassistants.libdb.service.demo.IDemoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * <p>
 * Demo 前端控制器
 * </p>
 *
 * @author Sasuke
 * @since 2021-07-22
 */
@Slf4j
@Api(value = "Demo", tags = "Demo")
@RestController
@RequestMapping("/demo")
public class DemoController {

    @Autowired
    private IDemoService service;
    @Autowired
    private JwtBaseUtil jwtBaseUtil;

    @ApiOperation(value = "分页查询列表", tags = "Demo")
    @PostMapping("/page")
    public Result<Page<Demo>> page(@RequestBody QueryParam<Map<String, Object>> queryParam) {
        return Result.ok(service.page(new Page(queryParam.getCurrent(), queryParam.getSize())));
    }


}

