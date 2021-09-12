package com.hnu.blockchainlab.medicalassistants.libdb.service.impl.demo;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.demo.Demo;
import com.hnu.blockchainlab.medicalassistants.libdb.mapper.demo.DemoMapper;
import com.hnu.blockchainlab.medicalassistants.libdb.service.demo.IDemoService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * demo 服务实现类
 * </p>
 *
 * @author Sasuke
 * @since 2021-07-23
 */
@Service
public class DemoServiceImpl extends ServiceImpl<DemoMapper, Demo> implements IDemoService {

}
