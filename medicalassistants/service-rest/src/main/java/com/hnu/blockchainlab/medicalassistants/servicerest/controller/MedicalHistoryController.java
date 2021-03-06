package com.hnu.blockchainlab.medicalassistants.servicerest.controller;


import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hnu.blockchainlab.medicalassistants.libbean.constant.AuthConstant;
import com.hnu.blockchainlab.medicalassistants.libbean.dto.response.MedicalHistoryAuthItem;
import com.hnu.blockchainlab.medicalassistants.libbean.dto.request.QueryMediPage;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Authorization;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.MedicalHistory;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.SysUser;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.*;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.QueryParam;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.Result;
import com.hnu.blockchainlab.medicalassistants.libcommon.exception.ResultInfoException;
import com.hnu.blockchainlab.medicalassistants.libcommon.util.AuthUtil;
import com.hnu.blockchainlab.medicalassistants.libcommon.util.ContractTool;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.IAuthorizationService;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.IMedicalHistoryService;
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
@Api(value = "MedicalHistory", tags = "MedicalHistory")
@RestController
@RequestMapping("/medi")
public class MedicalHistoryController {

    @Autowired
    private IMedicalHistoryService medicalHistoryService;

    @Autowired
    private UserComponent userComponent;

    @Autowired
    private ISysUserService sysUserService;

    @Autowired
    private IAuthorizationService authorizationService;

    @Autowired
    private IUpchaindataService iUpchaindataService;

    @ApiOperation(value = "?????????????????????")
    @PostMapping("/ownMediPage")
    public Result<Page<MedicalHistory>> ownPage(ServletRequest request, @RequestBody QueryParam<QueryMediPage> queryParam) {
        Integer current = queryParam.getCurrent();
        Integer size = queryParam.getSize();

        QueryWrapper<MedicalHistory> query = new QueryWrapper<MedicalHistory>();
        Long userId = userComponent.getCurrentUserId(request);
        query.eq("patient_id", userId)
                .orderByDesc("create_time");
        if (queryParam.getParam() != null && !queryParam.getParam().getIdList().isEmpty()) {
            query.in("mid", queryParam.getParam().getIdList());
        }
        return Result.ok(medicalHistoryService.page(new Page(current, size), query));
    }

    @ApiOperation(value = "???????????????????????????")
    @PostMapping("/ownOneMedi")
    public Result<MedicalHistory> mediDetail(ServletRequest request, @RequestBody Map<String, Object> queryParam) {
        Long mid = Long.valueOf(String.valueOf(queryParam.get("mid")));

        MedicalHistory medicalHistory = medicalHistoryService.getById(mid);
        Long userId = userComponent.getCurrentUserId(request);
        if (userId != medicalHistory.getPatientId())
            throw new ResultInfoException("????????????");

        return Result.ok(medicalHistory);
    }

    @ApiOperation(value = "???????????????????????????")
    @PostMapping("/patientMediPage")
    public Result<Page<MedicalHistoryAuthItem>> patientMediPage
            (ServletRequest request, @RequestBody QueryParam<QueryMediPage> queryParam) {
        Integer current = queryParam.getCurrent();
        Integer size = queryParam.getSize();
        String IDCard = queryParam.getParam().getMIDNumber();

        //??????????????????IDCard????????????????????????
        QueryWrapper<SysUser> queryUser = new QueryWrapper<SysUser>();
        queryUser.eq("id_card", IDCard);
        SysUser patient = sysUserService.getOne(queryUser);

        if (patient == null)
            throw new ResultInfoException("???????????????");

        Long patientId = patient.getId();
        QueryWrapper<MedicalHistory> query = new QueryWrapper<MedicalHistory>();
        query.eq("patient_id", patientId).orderByDesc("create_time");
        Page<MedicalHistory> page = medicalHistoryService.page(new Page(current, size), query);

        //?????????????????????id
        List<Long> midList = new ArrayList<>();
        page.getRecords().forEach(medi -> {
            midList.add(medi.getMid());
        });

        //???????????????????????????????????????
        Long userId = userComponent.getCurrentUserId(request);
        QueryWrapper<Authorization> queryAuth = new QueryWrapper<Authorization>();
        queryAuth.in("au_record", midList)
                .eq("au_tag", AuthConstant.TAG_MEDI)
                .eq("au_applicant", userId);
        List<Authorization> authorizationList = authorizationService.list(queryAuth);

        //???????????? mid -> auth
        Map<Long, Authorization> midAuthMap = new HashMap<>();
        authorizationList.forEach(auth -> {
            midAuthMap.put(auth.getAuRecord(), auth);
        });

        //????????????????????????????????????medicalHistoryAuthItemList
        List<MedicalHistoryAuthItem> medicalHistoryAuthItemList = new ArrayList<>();
        page.getRecords().forEach(medi -> {
            Authorization auth = midAuthMap.get(medi.getMid());
            if (auth == null) {
                auth = new Authorization();
                auth.setAuState(AuthConstant.STATE_NO_APPLY);
            } else if (AuthUtil.checkAuthOverdue(auth)) {
                auth.setAuState(AuthConstant.STATE_OVERDUE);
            }
            medicalHistoryAuthItemList.add(new MedicalHistoryAuthItem(medi, auth));
        });

        //??????????????????
        authorizationService.updateBatchById(authorizationList);

        //?????????page
        Page<MedicalHistoryAuthItem> medicalHistoryAuthPage = new Page<>();
        medicalHistoryAuthPage.setRecords(medicalHistoryAuthItemList);
        medicalHistoryAuthPage.setCurrent(page.getCurrent());
        medicalHistoryAuthPage.setSize(page.getSize());
        medicalHistoryAuthPage.setTotal(page.getTotal());

        return Result.ok(medicalHistoryAuthPage);
    }

    @ApiOperation(value = "?????????????????????")
    @PostMapping("/patientMedi")
    public Result<MedicalHistory> page(ServletRequest request, @RequestBody Map<String, Object> queryParam) {
        Long mid = Long.valueOf(String.valueOf(queryParam.get("mid")));

        // ?????????????????????????????????????????????
        Long userId = userComponent.getCurrentUserId(request);
        QueryWrapper<Authorization> query = new QueryWrapper<Authorization>();
        query.eq("au_record", mid)
                .eq("au_tag", AuthConstant.TAG_MEDI)
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


        //????????????????????????????????????????????????????????????
        int tag = 0;
        Long record = authorization.getAuRecord();
        Long applicant = authorization.getAuApplicant();
        String auID = tag + String.valueOf(record) + applicant;
        ContractCall cc = ContractTool.createContractCall();

        String audata = ContractTool.getAuData(auID, cc);

        if (audata == "" || audata == null)
            throw new ResultInfoException("???????????????");

        MedicalHistory medicalHistory = medicalHistoryService.getById(mid);
        if (medicalHistory == null)
            throw new ResultInfoException("????????????");

        return Result.ok(medicalHistory);
    }

    @ApiOperation(value = "?????????????????????")
    @PostMapping("/ownSubmit")
    public Result<String> ownSubmit(ServletRequest request, @RequestBody MedicalHistory medicalHistory) throws Exception {
        Long patientId = userComponent.getCurrentUserId(request);
        SysUser user = sysUserService.getById(patientId);


        medicalHistory.setPatientId(patientId);
        medicalHistory.setMsex(user.getSex());
        medicalHistory.setMidnumber(user.getIdCard());
        medicalHistory.setCreateTime(LocalDateTime.now());
        medicalHistory.setUpdateTime(LocalDateTime.now());

        //  ????????????
        String medicdata = JSONObject.toJSONString(medicalHistory);
        Long pid = medicalHistory.getPatientId();
        Account account = ContractTool.createAccount();
        String txHash = ContractTool.addMedicDataToStore(account, pid.toString(), medicdata);

        //??????????????????
        Upchaindata upchaindata = new Upchaindata();
        upchaindata.setTxhash(txHash);
        upchaindata.setData(medicdata);
        upchaindata.setTime(LocalDateTime.now());
        upchaindata.setUploader(userComponent.getCurrentUserId(request).toString());

        if (!(iUpchaindataService.save(upchaindata))) {
            throw new ResultInfoException("????????????");
        }

        if (!(medicalHistoryService.save(medicalHistory))) {
            throw new ResultInfoException("????????????");
        }

        return Result.ok("??????");
    }


}

