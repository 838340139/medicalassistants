package com.hnu.blockchainlab.medicalassistants.libdb.service.impl.sys;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.SysUser;
import com.hnu.blockchainlab.medicalassistants.libdb.mapper.sys.SysUserMapper;
import com.hnu.blockchainlab.medicalassistants.libdb.service.sys.ISysUserService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 系统用户 服务实现类
 * </p>
 *
 * @author Sasuke
 * @since 2021-07-22
 */
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements ISysUserService {

}
