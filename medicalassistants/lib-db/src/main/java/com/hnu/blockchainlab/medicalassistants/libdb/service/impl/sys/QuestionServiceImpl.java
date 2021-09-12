package com.hnu.blockchainlab.medicalassistants.libdb.service.impl.sys;

import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Question;
import com.hnu.blockchainlab.medicalassistants.libdb.mapper.sys.QuestionMapper;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.IQuestionService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author Sasuke
 * @since 2021-09-11
 */
@Service
public class QuestionServiceImpl extends ServiceImpl<QuestionMapper, Question> implements IQuestionService {

}
