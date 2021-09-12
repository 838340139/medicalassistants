package com.hnu.blockchainlab.medicalassistants.libdb.service.impl.sys;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.TokenRecord;
import com.hnu.blockchainlab.medicalassistants.libdb.mapper.sys.TokenRecordMapper;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.ITokenRecordService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * token记录 服务实现类
 * </p>
 *
 * @author Sasuke
 * @since 2021-07-24
 */
@Service
public class TokenRecordServiceImpl extends ServiceImpl<TokenRecordMapper, TokenRecord> implements ITokenRecordService {

}
