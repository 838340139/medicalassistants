package com.hnu.blockchainlab.medicalassistants.servicerest.controller;


import cn.hutool.core.util.IdUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.google.common.collect.Maps;
import com.hnu.blockchainlab.medicalassistants.libbean.constant.Constants;
import com.hnu.blockchainlab.medicalassistants.libbean.constant.UserType;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.DrugStore;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Physician;
import com.hnu.blockchainlab.medicalassistants.libbean.enums.ResultMsg;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.SysUser;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.Result;
import com.hnu.blockchainlab.medicalassistants.libcommon.exception.ResultInfoException;
import com.hnu.blockchainlab.medicalassistants.libcommon.util.CacheUtil;
import com.hnu.blockchainlab.medicalassistants.libcommon.util.JwtBaseUtil;
import com.hnu.blockchainlab.medicalassistants.libcommon.util.StringEncode;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.IDrugStoreService;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.IPhysicianService;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.ISysUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 权限管理 前端控制器
 * </p>
 *
 * @author Sasuke
 * @since 2021-07-22
 */
@Slf4j
@Api(value = "权限管理", tags = "权限管理")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private ISysUserService service;
    @Autowired
    private IPhysicianService physicianService;
    @Autowired
    private IDrugStoreService drugStoreService;

    @Autowired
    private JwtBaseUtil jwtBaseUtil;

    @ApiOperation(value = "查询用户列表", tags = "用户管理")
    @GetMapping("/list")
    public List<SysUser> list() {
        return service.list();
    }

    @ApiOperation(value = "登陆", tags = "用户管理")
    @PostMapping("/login")
    public Result login(@RequestBody Map<String, Object> map) {
        String username = (String) map.get("username");
        String fdPwd = (String) map.get("password");

        // 明文密码加密
        String encodeFdPwd = StringEncode.str2SHA256(fdPwd);
        Result<SysUser> result = this.checkLogin(username, encodeFdPwd);
        if (!result.isSuccess()) {
            return result;
        }

        SysUser sysUser = result.getData();
        // 校验权限
        // xxx

        // 生成token
        Map<String, Object> webParam = new HashMap<>();
        webParam.put("id", sysUser.getId());
        webParam.put("userType", sysUser.getUserType());
        webParam.put("username", sysUser.getUsername());
        webParam.put("name", sysUser.getName());
        String tokenId = IdUtil.simpleUUID();
        webParam.put("tokenId", tokenId);
        // 时间戳
        long timestamp = Instant.now().getEpochSecond();
        webParam.put("ts", timestamp);
        String token = jwtBaseUtil.generateUserToken(webParam);
        webParam.put("token", token);

        //判断用户信息是否完善
        webParam.put("ifInfoFilled", checkInfoFilled(sysUser));

        // 设置缓存
        Map<String, Object> cache = Maps.newHashMap();
        // 不需要缓存和返回前端tokenId
        webParam.remove("tokenId");
        cache.putAll(webParam);
        // 超时时间戳
        cache.put("ots", timestamp);
        // 存入缓存
        CacheUtil.LOGIN_CACHE.put(tokenId, cache);

        return Result.ok(webParam);
    }

    //检查医生或者药店的信息是否完善了
    private Boolean checkInfoFilled(SysUser sysUser) {
        if (sysUser.getUserType().equals(UserType.physician)) {
            QueryWrapper<Physician> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("ph_id", sysUser.getId());
            Physician physician = physicianService.getOne(queryWrapper);
            return !StringUtils.isBlank(physician.getPhName())
                    && !StringUtils.isBlank(physician.getPhIntro());
        } else if (sysUser.getUserType().equals(UserType.drugStore)) {
            QueryWrapper<DrugStore> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("d_id", sysUser.getId());
            DrugStore drugStore = drugStoreService.getOne(queryWrapper);
            return !StringUtils.isBlank(drugStore.getDName())
                    && !StringUtils.isBlank(drugStore.getDPhone());
        } else return true;
    }

    @ApiOperation(value = "注册", tags = "用户管理")
    @PostMapping("/register")
    public Result register(@RequestBody SysUser sysUser) {
        String username = sysUser.getUsername();
        String fdPwd = sysUser.getFdPwd();

        if (StringUtils.isBlank(fdPwd) || !fdPwd.matches(Constants.PW_REGEX)) {
            return Result.error("密码至少为8位数字、字母、符号( !@#$%^&*)三种组合");
        }

        if (!sysUser.getUserType().equals(UserType.drugStore)
                && !sysUser.getUserType().equals(UserType.physician)
                && !sysUser.getUserType().equals(UserType.patient)) {
            throw new ResultInfoException("参数错误");
        }

        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("username", username);
        if (service.count(queryWrapper) > 0) {
            return Result.error("用户名已存在");
        }
        sysUser.setId(null);
        sysUser.setName(username);
        sysUser.setCreateTime(LocalDateTime.now());
        sysUser.setCreateBy(null);
        sysUser.setUpdateTime(LocalDateTime.now());
        sysUser.setUpdateBy(null);
        sysUser.setStatus(2);

        // 明文密码加密
        sysUser.setFdPwd(StringEncode.str2SHA256(fdPwd));
        if (!service.save(sysUser)) {
            return Result.error("保存失败");
        }

        if (sysUser.getUserType().equals(UserType.drugStore)) {
            DrugStore drugStore = new DrugStore();
            drugStore.setDId(sysUser.getId());
            //drugStore.setDName(sysUser.getUsername());
            drugStoreService.save(drugStore);
        } else if (sysUser.getUserType().equals(UserType.physician)) {
            Physician physician = new Physician();
            physician.setPhId(sysUser.getId());
            physician.setUsername(sysUser.getUsername());
            physicianService.save(physician);
        }

        // 注册成功即登陆成功
        // 生成token
        Map<String, Object> webParam = new HashMap<>();
        webParam.put("id", sysUser.getId());
        webParam.put("username", sysUser.getUsername());
        webParam.put("userType", sysUser.getUserType());
        webParam.put("name", sysUser.getName());
        // 时间戳
        long timestamp = Instant.now().getEpochSecond();
        webParam.put("ts", timestamp);
        String token = jwtBaseUtil.generateUserToken(webParam);

        //String tokenId = IdUtil.simpleUUID();
        String tokenId = token;

        // 设置缓存
        Map<String, Object> cache = Maps.newHashMap();
        cache.putAll(webParam);
        // 超时时间戳
        cache.put("ots", timestamp);
        // 存入缓存
        CacheUtil.LOGIN_CACHE.put(tokenId, cache);

        webParam.put("token", token);
        return Result.ok(webParam);
    }

    private Result<SysUser> checkLogin(String username, String fdPwd) {
        QueryWrapper query = new QueryWrapper<>();
        query.eq("username", username);
        query.eq("fd_pwd", fdPwd);
        // 查询
        SysUser sysUser = service.getOne(query);
        // 校验User
        if (sysUser == null) {
            return Result.error(ResultMsg.用户名或密码错误.getCode(), ResultMsg.用户名或密码错误.getMsg());
        }
        if (!Constants.Status.NORMAL.getCode().equals(sysUser.getStatus())) {
            return Result.error(ResultMsg.USER_IS_DISABLED.getCode(), ResultMsg.USER_IS_DISABLED.getMsg());
        }

        // 校验Role

        return Result.ok(sysUser);
    }

}

