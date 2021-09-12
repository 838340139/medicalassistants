package com.hnu.blockchainlab.medicalassistants.servicerest.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.conditions.query.QueryChainWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hnu.blockchainlab.medicalassistants.libbean.constant.UserType;
import com.hnu.blockchainlab.medicalassistants.libbean.dto.response.ConsultResult;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Answer;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.ConsultRecord;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Question;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.SysUser;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.QueryParam;
import com.hnu.blockchainlab.medicalassistants.libbean.vo.Result;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.IAnswerService;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.IConsultRecordService;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.IQuestionService;
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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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
@Api(value = "consult", tags = "Demo")
@RestController
@RequestMapping("/consult")
public class ConsultController {

    @Autowired
    private IConsultRecordService consultRecordService;

    @Autowired
    private UserComponent userComponent;

    @Autowired
    private IQuestionService questionService;

    @Autowired
    private IAnswerService answerService;

    @Autowired
    private ISysUserService sysUserService;

    @ApiOperation(value = "分页查询列表")
    @PostMapping("/page")
    public Result<Page<ConsultRecord>> page(ServletRequest request, @RequestBody Map<String, Object> queryParam) {
        Long current =  Long.valueOf(String.valueOf(queryParam.get("current")));
        Long size = Long.valueOf(String.valueOf(queryParam.get("size")));

        QueryWrapper<ConsultRecord> query = new QueryWrapper<ConsultRecord>();
        Long userId = userComponent.getCurrentUserId(request);
        query.eq("from", userId).or().eq("to", userId).orderByDesc("time");

        return Result.ok(consultRecordService.page(new Page(current,size), query));
    }

    @ApiOperation(value = "发消息")
    @PostMapping("/send")
    public Result<String> send(@RequestBody Map<String, Object> queryParam) {
        String content = (String) queryParam.get("content");
        Long from = Long.valueOf(String.valueOf(queryParam.get("from")));
        Long to = Long.valueOf(String.valueOf(queryParam.get("to")));

        ConsultRecord consultRecord = new ConsultRecord();
        consultRecord.setContent(content);
        consultRecord.setFrom(from);
        consultRecord.setTo(to);
        consultRecord.setTime(LocalDateTime.now());

        return Result.ok();
    }

    @ApiOperation(value = "患者提问")
    @PostMapping("/sendQue")
    public Result<Question> sendQue(ServletRequest request, @RequestBody Question question) {
        question.setSender(userComponent.getCurrentUserId(request));
        question.setCreateTime(LocalDateTime.now());
        question.setQId(null);
        question.setSenderName(userComponent.getCurrentUsername(request));
        questionService.save(question);
        return Result.ok(question);
    }

    @ApiOperation(value = "医生回答")
    @PostMapping("/sendAns")
    public Result<Answer> sendAns(ServletRequest request, @RequestBody Answer answer) {
        answer.setPhId(userComponent.getCurrentUserId(request));
        answer.setCreateTime(LocalDateTime.now());
        answer.setAnId(null);
        answer.setQSender(questionService.getById(answer.getQId()).getSender());
        answerService.save(answer);
        return Result.ok(answer);
    }

    @ApiOperation(value = "医生,患者查看问题分页")
    @PostMapping("/quePage")
    public Result<Page<ConsultResult>> quePage(ServletRequest request, @RequestBody QueryParam<Map<String,Object>> queryParam) {
        int current = queryParam.getCurrent();
        int size = queryParam.getSize();

        QueryWrapper<Question> query = new QueryWrapper<>();
        SysUser user = sysUserService.getById(userComponent.getCurrentUserId(request));
        String userType = user.getUserType();
        if (userType.equals(UserType.patient)){
            query.eq("sender", userComponent.getCurrentUserId(request))
                    .eq("ph_id", queryParam.getParam().get("ph_id"))
                    .orderByDesc("create_time");
        }else {
            query.eq("ph_id", userComponent.getCurrentUserId(request))
                    .orderByDesc("create_time");
        }

        Page page = questionService.page(new Page(current, size), query);
        List<Question> records = page.getRecords();

        List<ConsultResult> rst = new ArrayList<>();
        for (Question q:records){
            QueryWrapper<Answer> getAnswer = new QueryWrapper<>();
            getAnswer.eq("q_id", q.getQId());
            List<Answer> answers = answerService.list(getAnswer);
            rst.add(new ConsultResult(){{
                setQuestion(q);
                setAnswers(answers);
            }});
        }

        Page<ConsultResult> pages = new Page<>();
        pages.setRecords(rst);
        pages.setCurrent(current);
        pages.setSize(size);
        pages.setTotal(page.getTotal());
        return Result.ok(pages);
    }

    @ApiOperation(value = "患者查看自己提出的问题分页")
    @PostMapping("/ownQuePage")
    public Result<Page<Question>> ownQuePage(ServletRequest request, @RequestBody QueryParam<Map<String,Object>> queryParam) {
        int current = queryParam.getCurrent();
        int size = queryParam.getSize();
        Long phId = (Long) queryParam.getParam().get("phId");
        QueryWrapper<Question> query = new QueryWrapper<>();
        query.eq("ph_id", phId)
                .orderByDesc("create_time");
        return Result.ok(questionService.page(new Page(current,size), query));
    }



}

