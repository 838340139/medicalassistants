package com.hnu.blockchainlab.medicalassistants.servicerest.controller;


import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hnu.blockchainlab.medicalassistants.libbean.constant.AuthConstant;
import com.hnu.blockchainlab.medicalassistants.libbean.dto.response.PresAuthItem;
import com.hnu.blockchainlab.medicalassistants.libbean.dto.request.QueryPresPage;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Authorization;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Prescription;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.SysUser;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.QueryParam;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.*;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.Result;
import com.hnu.blockchainlab.medicalassistants.libcommon.exception.ResultInfoException;
import com.hnu.blockchainlab.medicalassistants.libcommon.util.AuthUtil;
import com.hnu.blockchainlab.medicalassistants.libcommon.util.ContractTool;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.IAuthorizationService;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.IPrescriptionService;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.ISysUserService;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.IUpchaindataService;
import com.hnu.blockchainlab.medicalassistants.servicerest.component.UserComponent;
import conflux.web3j.Account;
import conflux.web3j.contract.ContractCall;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * Demo ???????????????
 * </p>
 *
 * @author Sasuke
 * @since 2021-07-22
 */
@Slf4j
@Api(value = "prescri", tags = "prescri")
@RestController
@RequestMapping("/prescri")
public class PrescriptionController {

    @Autowired
    private IPrescriptionService prescriptionService;

    @Autowired
    private UserComponent userComponent;

    @Autowired
    private ISysUserService sysUserService;

    @Autowired
    private IAuthorizationService authorizationService;

    @Autowired
    private IUpchaindataService iUpchaindataService;

    @ApiOperation(value = "????????????????????????????????????")
    @PostMapping("/ownPage")
    public Result<Page<Prescription>> ownPage(ServletRequest request, @RequestBody QueryParam<QueryPresPage> queryParam) {
        Integer current = queryParam.getCurrent();
        Integer size = queryParam.getSize();

        QueryWrapper<Prescription> query = new QueryWrapper<Prescription>();
        Long userId = userComponent.getCurrentUserId(request);
        query.eq("patient_id", userId)
                .orderByDesc("create_time");
        if (queryParam.getParam() != null && !queryParam.getParam().getIdList().isEmpty()) {
            query.in("pid", queryParam.getParam().getIdList());
        }
        return Result.ok(prescriptionService.page(new Page(current, size), query));
    }

    @ApiOperation(value = "????????????????????????????????????")
    @PostMapping("/presDetail")
    public Result<Prescription> presDetail(ServletRequest request, @RequestBody Map<String, Object> queryParam) {
        Long pid = Long.valueOf(String.valueOf(queryParam.get("pid")));

        Prescription prescription = prescriptionService.getById(pid);
        Long userId = userComponent.getCurrentUserId(request);
        if (userId != prescription.getPatientId())
            throw new ResultInfoException("????????????");

        return Result.ok(prescription);
    }

    @ApiOperation(value = "????????????????????????????????????")
    @PostMapping("/patientPresPage")
    public Result<Page<PresAuthItem>> patientPresPage
            (ServletRequest request, @RequestBody QueryParam<QueryPresPage> queryParam) {
        Integer current = queryParam.getCurrent();
        Integer size = queryParam.getSize();
        String IDCard = queryParam.getParam().getIDnumber();

        //??????????????????IDCard?????????????????????
        QueryWrapper<SysUser> queryUser = new QueryWrapper<SysUser>();
        queryUser.eq("id_card", IDCard);
        SysUser patient = sysUserService.getOne(queryUser);

        if (patient == null)
            throw new ResultInfoException("???????????????");

        Long patientId = patient.getId();
        QueryWrapper<Prescription> query = new QueryWrapper<Prescription>();
        query.eq("patient_id", patientId).orderByDesc("create_time");
        Page<Prescription> page = prescriptionService.page(new Page(current, size), query);

        //?????????????????????id
        List<Long> pidList = new ArrayList<>();
        page.getRecords().forEach(pres -> {
            pidList.add(pres.getPid());
        });

        //????????????????????????????????????
        Long userId = userComponent.getCurrentUserId(request);
        QueryWrapper<Authorization> queryAuth = new QueryWrapper<Authorization>();
        queryAuth.in("au_record", pidList)
                .eq("au_tag", AuthConstant.TAG_PRES)
                .eq("au_applicant", userId);
        List<Authorization> authorizationList = authorizationService.list(queryAuth);

        //???????????? pid -> auth
        Map<Long, Authorization> pidAuthMap = new HashMap<>();
        authorizationList.forEach(auth -> {
            pidAuthMap.put(auth.getAuRecord(), auth);
        });

        //????????????????????????????????????medicalHistoryAuthItemList
        List<PresAuthItem> presAuthItemList = new ArrayList<>();
        page.getRecords().forEach(pres -> {
            Authorization auth = pidAuthMap.get(pres.getPid());
            if (auth == null) {
                auth = new Authorization();
                auth.setAuState(AuthConstant.STATE_NO_APPLY);
            } else if (AuthUtil.checkAuthOverdue(auth)) {
                auth.setAuState(AuthConstant.STATE_OVERDUE);
            }
            presAuthItemList.add(new PresAuthItem(pres, auth));
        });

        //??????????????????
        authorizationService.updateBatchById(authorizationList);

        //?????????page
        Page<PresAuthItem> preAuthPage = new Page<>();
        preAuthPage.setRecords(presAuthItemList);
        preAuthPage.setCurrent(page.getCurrent());
        preAuthPage.setSize(page.getSize());
        preAuthPage.setTotal(page.getTotal());

        return Result.ok(preAuthPage);
    }

    @ApiOperation(value = "??????????????????????????????")
    @PostMapping("/patientPres")
    public Result<Prescription> patientPres(ServletRequest request, @RequestBody Map<String, Object> queryParam) {
        Long pid = Long.valueOf(String.valueOf(queryParam.get("pid")));

        // ?????????????????????????????????????????????
        Long userId = userComponent.getCurrentUserId(request);
        QueryWrapper<Authorization> query = new QueryWrapper<Authorization>();
        query.eq("au_record", pid)
                .eq("au_tag", AuthConstant.TAG_PRES)
                .eq("au_applicant", userId);
        Authorization authorization = authorizationService.getOne(query);

        if (authorization == null) {
            throw new ResultInfoException("?????????");
        }

        //????????????
        if (AuthUtil.checkAuthOverdue(authorization)) {
            authorization.setAuState(AuthConstant.STATE_OVERDUE);
            authorizationService.updateById(authorization);
            throw new ResultInfoException("???????????????");
        }


        // ???????????????????????????????????????????????????????????????
        int tag = 1;
        Long record = authorization.getAuRecord();
        Long applicant = authorization.getAuApplicant();
        String auID = tag + String.valueOf(record) + applicant;
        ContractCall cc = ContractTool.createContractCall();

        String audata = ContractTool.getAuData(auID, cc);

        if (audata.equals("") || audata == null)
            throw new ResultInfoException("???????????????");

        Prescription prescription = prescriptionService.getById(pid);
        if (prescription == null)
            throw new ResultInfoException("????????????");

        return Result.ok(prescription);
    }

    @ApiOperation(value = "??????????????????????????????")
    @PostMapping("/patientPresSubmit")
    public Result<String> patientPresSubmit(ServletRequest request, @RequestBody Prescription prescription) throws Exception {
        Long physicianId = userComponent.getCurrentUserId(request);
        if (prescription.getPatientId() == null)
            throw new ResultInfoException("????????????");
        SysUser patient = sysUserService.getById(prescription.getPatientId());

        System.out.println(prescription);

        prescription.setPhysicianId(physicianId);
        prescription.setPsex(patient.getSex());
        prescription.setPname(patient.getName());
        prescription.setIdnumber(patient.getIdCard());
        prescription.setCreateTime(LocalDateTime.now());
        prescription.setUpdateTime(LocalDateTime.now());

        // ???????????????
        String prescriptiondata = JSONObject.toJSONString(prescription);
        Long idNumber = prescription.getPatientId();
        Account account = ContractTool.createAccount();
        String txHash = ContractTool.addPrescriptionDataToStore(account, idNumber.toString(), prescriptiondata);

        //??????????????????
        Upchaindata upchaindata = new Upchaindata();
        upchaindata.setTxhash(txHash);
        upchaindata.setData(prescriptiondata);
        upchaindata.setTime(LocalDateTime.now());
        upchaindata.setUploader(userComponent.getCurrentUserId(request).toString());

        if (!(iUpchaindataService.save(upchaindata))) {
            throw new ResultInfoException("????????????");
        }

        if (!(prescriptionService.save(prescription))) {
            throw new ResultInfoException("????????????");
        }

        return Result.ok("??????");
    }


}

