package com.hnu.blockchainlab.medicalassistants.servicerest.controller;


import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hnu.blockchainlab.medicalassistants.libbean.constant.AuthConstant;
import com.hnu.blockchainlab.medicalassistants.libbean.constant.UserType;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.*;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.QueryParam;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.Result;
import com.hnu.blockchainlab.medicalassistants.libcommon.exception.ResultInfoException;
import com.hnu.blockchainlab.medicalassistants.libcommon.util.ContractTool;
import com.hnu.blockchainlab.medicalassistants.libcommon.util.JwtBaseUtil;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.*;
import com.hnu.blockchainlab.medicalassistants.servicerest.component.UserComponent;
import conflux.web3j.Account;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletRequest;
import java.time.LocalDateTime;
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
@Api(value = "Authrization", tags = "Authrization")
@RestController
@RequestMapping("/authrization")
public class AuthorizationController {
    @Autowired
    private UserComponent userComponent;

    @Autowired
    private ISysUserService userService;

    @Autowired
    private IMedicalHistoryService medicalHistoryService;

    @Autowired
    private IPrescriptionService prescriptionService;

    @Autowired
    private IPhysicianService physicianService;

    @Autowired
    private IDrugStoreService drugStoreService;

    @Autowired
    private IAuthorizationService authorizationService;

    @Autowired
    private IUpchaindataService iUpchaindataService;

    @ApiOperation(value = "查询患者信息")
    @PostMapping("/queryUser")
    public Result<SysUser> queryUser(ServletRequest request, @RequestBody Map<String, Object> queryParam) {
        String IDnumber = (String) queryParam.get("IDnumber");

        Long physicianId = userComponent.getCurrentUserId(request);
        SysUser physicianUser = userService.getById(physicianId);
        if (physicianUser.getUserType() != UserType.physician && physicianUser.getUserType() != UserType.drugStore) {
            throw new ResultInfoException("没有权限查看");
        }

        QueryWrapper query = new QueryWrapper<SysUser>();
        query.eq("id_card", IDnumber);

        SysUser user = userService.getOne(query);
        if (user == null) throw new ResultInfoException("没有该用户");
        return Result.ok(user);
    }

    @ApiOperation(value = "用户处理授权")
    @PostMapping("/grant")
    public Result<String> grant(ServletRequest request, @RequestBody Map<String, Object> queryParam) throws Exception {

        Long auId = Long.valueOf(String.valueOf(queryParam.get("auId")));
        int state = (int) queryParam.get("state");

        Long userId = userComponent.getCurrentUserId(request);
        Authorization authorization = authorizationService.getById(auId);


        //检查当前用户身份
        if (authorization.getAuReciver() != userId) {
            throw new ResultInfoException("没有权限");
        }

        authorization.setAuState(state);
        authorization.setAuHandleTime(LocalDateTime.now());

        if (!authorizationService.updateById(authorization)) {
            throw new ResultInfoException("处理失败");
        }

        // 授权数据上链
        String audata = JSONObject.toJSONString(authorization);
        int tag = authorization.getAuTag();
        Long record = authorization.getAuRecord();
        Long applicant = authorization.getAuApplicant();
        String auID = tag + String.valueOf(record) + applicant;

        Account account = ContractTool.createAccount();
        String txHash = ContractTool.addAuthDataToStore(account, auID, audata);

        //上链记录存储
        Upchaindata upchaindata = new Upchaindata();
        upchaindata.setTxhash(txHash);
        upchaindata.setData(audata);
        upchaindata.setTime(LocalDateTime.now());
        upchaindata.setUploader(userComponent.getCurrentUserId(request).toString());

        if (!(iUpchaindataService.save(upchaindata))) {
            throw new ResultInfoException("存储失败");
        }


        return Result.ok("成功");
    }

    @ApiOperation(value = "用户查询授权列表")
    @PostMapping("/grantPage")
    public Result<Page<Authorization>> grantPage(ServletRequest request, @RequestBody QueryParam<Map<String, Object>> queryParam) {

        Integer current = queryParam.getCurrent();
        Integer size = queryParam.getSize();

        QueryWrapper<Authorization> query = new QueryWrapper<Authorization>();
        Long userId = userComponent.getCurrentUserId(request);
        query.eq("au_reciver", userId).orderByDesc("au_date");

        return Result.ok(authorizationService.page(new Page(current, size), query));
    }

    @ApiOperation(value = "查询申请列表")
    @PostMapping("/applyPage")
    public Result<Page<Authorization>> applyPage(ServletRequest request, @RequestBody Map<String, Object> queryParam) {
        //TODO
        return Result.ok();
    }

    @ApiOperation(value = "查询申请状态")
    @PostMapping("/queryApply")
    public Result<Authorization> applyState(ServletRequest request, @RequestBody Map<String, Object> queryParam) {
        Long auId = Long.valueOf(String.valueOf(queryParam.get("auId")));
        Authorization authorization = authorizationService.getById(auId);
        Long userId = userComponent.getCurrentUserId(request);
        if (userId != authorization.getAuApplicant() && userId != authorization.getAuReciver()) {
            throw new ResultInfoException("没有权限");
        }
        return Result.ok(authorization);
    }

    @ApiOperation(value = "提交申请")
    @PostMapping("/submitApply")
    public Result<String> apply(ServletRequest request, @RequestBody Map<String, Object> queryParam) {
        Long recordId = Long.valueOf(String.valueOf(queryParam.get("auRecord")));
        int tag = (Integer) queryParam.get("auTag");

        Long applicantId = userComponent.getCurrentUserId(request);
        SysUser sysUser = userService.getById(applicantId);

        Long recieverId = null;
        String auApplicantName = null;
        String auApplicantType = null;
        String auRecordKeyword = null;
        if (tag == AuthConstant.TAG_MEDI) {
            MedicalHistory medicalHistory = medicalHistoryService.getById(recordId);
            if (medicalHistory == null) throw new ResultInfoException("没有记录");
            recieverId = medicalHistory.getPatientId();
            auRecordKeyword = medicalHistory.getMsickness();
        } else if (tag == AuthConstant.TAG_PRES) {
            Prescription prescription = prescriptionService.getById(recordId);
            if (prescription == null) throw new ResultInfoException("没有记录");
            recieverId = prescription.getPatientId();
            auRecordKeyword = prescription.getPdiagnosis();
        } else {
            throw new ResultInfoException("参数错误");
        }

        //找出以前的申请记录
        QueryWrapper<Authorization> query = new QueryWrapper<Authorization>();
        query.eq("au_record", recordId)
                .eq("au_applicant", applicantId)
                .eq("au_tag", tag);
        Authorization oldAuthorization = authorizationService.getOne(query);
        if (oldAuthorization != null) {
            UpdateWrapper<Authorization> updateWrapper = new UpdateWrapper<>();
            updateWrapper.set("au_date", LocalDateTime.now())
                    .set("au_state", AuthConstant.STATE_NOT_HANDLE)
                    .set("au_handle_time", null)
                    .eq("au_id", oldAuthorization.getAuId());
            authorizationService.update(updateWrapper);
            return Result.ok("成功");
        }

        //之前没有申请记录就生成新的记录
        auApplicantType = sysUser.getUserType();
        if (auApplicantType.equals(UserType.drugStore)) {
            QueryWrapper<DrugStore> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("d_id", applicantId);
            DrugStore drugStore = drugStoreService.getOne(queryWrapper);
            auApplicantName = drugStore.getDName();
        } else if (auApplicantType.equals(UserType.physician)) {
            QueryWrapper<Physician> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("ph_id", applicantId);
            Physician physician = physicianService.getOne(queryWrapper);
            auApplicantName = physician.getPhName();
        } else {
            throw new ResultInfoException("没有权限");
        }

        Authorization authorization = new Authorization();
        authorization.setAuState(AuthConstant.STATE_NOT_HANDLE);
        authorization.setAuApplicant(applicantId);
        authorization.setAuApplicantType(auApplicantType);
        authorization.setAuApplicantName(auApplicantName);
        authorization.setAuReciver(recieverId);
        authorization.setAuTag(tag);
        authorization.setAuRecord(recordId);
        authorization.setAuRecordKeyword(auRecordKeyword);
        authorization.setAuDate(LocalDateTime.now());

        if (!authorizationService.save(authorization)) {
            throw new ResultInfoException("处理失败");
        }

        return Result.ok("成功");
    }
}

