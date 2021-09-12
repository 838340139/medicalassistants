package com.hnu.blockchainlab.medicalassistants.servicerest.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hnu.blockchainlab.medicalassistants.libbean.constant.UserType;
import com.hnu.blockchainlab.medicalassistants.libbean.dto.request.QueryPhysicianPage;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Physician;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Prescription;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.SysUser;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.QueryParam;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.Result;
import com.hnu.blockchainlab.medicalassistants.libcommon.exception.ResultInfoException;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.IPhysicianService;
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
@Api(value = "physi", tags = "physi")
@RestController
@RequestMapping("/physi")
public class PhysicianController {

    @Autowired
    private IPhysicianService physicianService;

    @Autowired
    private UserComponent userComponent;

    @Autowired
    private ISysUserService sysUserService;

    @ApiOperation(value = "查询医生")
    @PostMapping("/page")
    public Result<Page<Physician>> page(ServletRequest request, @RequestBody QueryParam<QueryPhysicianPage> queryParam) {
        Integer current = queryParam.getCurrent();
        Integer size = queryParam.getSize();
        String keyword = queryParam.getParam().getKeyword();

        QueryWrapper<Physician> query = new QueryWrapper<Physician>();

        if (keyword != null && keyword != "") {
            keyword = keyword.trim();
            query.like("ph_name", keyword)
                    .or()
                    .like("ph_title", keyword)
                    .or()
                    .like("ph_intro", keyword);
        }

        return Result.ok(physicianService.page(new Page(current, size), query));
    }

    @ApiOperation(value = "查询医生详情")
    @PostMapping("/detail")
    public Result<Physician> detail(ServletRequest request, @RequestBody Map<String, Object> queryParam) {
        String phId = (String) queryParam.get("phId");

        QueryWrapper<Physician> query = new QueryWrapper<Physician>();
        query.eq("ph_id", phId);
        return Result.ok(physicianService.getOne(query));
    }

    @ApiOperation(value = "医生保存个人信息")
    @PostMapping("/saveInfo")
    public Result<Physician> saveInfo(ServletRequest request, @RequestBody Physician physician) {
        Long userId = userComponent.getCurrentUserId(request);
        SysUser user = sysUserService.getById(userId);
        System.out.println(user);
        System.out.println(physician);
        if (!user.getUserType().equals(UserType.physician))
            throw new ResultInfoException("保存失败");
        physician.setPhId(userId);
        QueryWrapper<Physician> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("ph_id", userId);
        physicianService.saveOrUpdate(physician, queryWrapper);
        return Result.ok(physician);
    }


}

