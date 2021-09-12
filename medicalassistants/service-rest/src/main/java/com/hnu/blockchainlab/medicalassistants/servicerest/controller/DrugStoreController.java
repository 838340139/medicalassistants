package com.hnu.blockchainlab.medicalassistants.servicerest.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hnu.blockchainlab.medicalassistants.libbean.constant.UserType;
import com.hnu.blockchainlab.medicalassistants.libbean.dto.request.QueryPhysicianPage;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.*;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.QueryParam;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.Result;
import com.hnu.blockchainlab.medicalassistants.libcommon.exception.ResultInfoException;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.IDrugStoreService;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.ISysUserService;
import com.hnu.blockchainlab.medicalassistants.servicerest.component.UserComponent;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletRequest;

/**
 * <p>
 * Demo 前端控制器
 * </p>
 *
 * @author Sasuke
 * @since 2021-07-22
 */
@Slf4j
@Api(value = "drugStore")
@RestController
@RequestMapping("/drugStore")
public class DrugStoreController {

    @Autowired
    private UserComponent userComponent;

    @Autowired
    private ISysUserService userService;

    @Autowired
    private ISysUserService sysUserService;

    @Autowired
    private IDrugStoreService drugStoreService;


    @ApiOperation(value = "查询药店")
    @PostMapping("/page")
    public Result<Page<Prescription>> page(ServletRequest request, @RequestBody QueryParam<QueryPhysicianPage> queryParam) {
        Integer current = queryParam.getCurrent();
        Integer size = queryParam.getSize();
        String keyword = queryParam.getParam().getKeyword();

        QueryWrapper<DrugStore> query = new QueryWrapper<DrugStore>();

        if (keyword != null && keyword != "") {
            keyword = keyword.trim();
            query.like("d_name", keyword)
                    .or()
                    .like("d_address", keyword)
                    .or()
                    .like("d_phone", keyword);
        }

        return Result.ok(drugStoreService.page(new Page(current, size), query));
    }

    @ApiOperation(value = "存储药店信息")
    @PostMapping("/saveInfo")
    public Result<String> drugSave(ServletRequest request, @RequestBody DrugStore drugStore) throws Exception {
        Long userId = userComponent.getCurrentUserId(request);
        SysUser user = sysUserService.getById(userId);

        if (!user.getUserType().equals(UserType.drugStore))
            throw new ResultInfoException("保存失败");
        System.out.println(drugStore);
        drugStore.setDId(userId);
        QueryWrapper<DrugStore> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("d_id", userId);
        drugStoreService.saveOrUpdate(drugStore, queryWrapper);
        return Result.ok("成功");
    }


}

