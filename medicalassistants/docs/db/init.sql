/*
 Navicat MySQL Data Transfer

 Source Server         : 天璇医疗202.197.99.46
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : 202.197.99.46:3306
 Source Schema         : medicalassistants

 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 12/09/2021 16:55:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for answer
-- ----------------------------
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer`  (
  `an_id` bigint(0) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `q_id` bigint(0) NULL DEFAULT NULL,
  `ph_id` bigint(0) NULL DEFAULT NULL,
  `q_sender` bigint(0) NULL DEFAULT NULL,
  PRIMARY KEY (`an_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for authorization
-- ----------------------------
DROP TABLE IF EXISTS `authorization`;
CREATE TABLE `authorization`  (
  `au_id` bigint(0) NOT NULL AUTO_INCREMENT,
  `au_date` datetime(0) NULL DEFAULT NULL COMMENT '申请时间',
  `au_applicant` bigint(0) NULL DEFAULT NULL COMMENT '申请人',
  `au_applicant_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '申请人姓名',
  `au_applicant_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '申请人身份类型（yisheng,huanzhe,yaofang)',
  `au_state` int(0) NULL DEFAULT NULL COMMENT '申请状态(0待审核，1通过且未查看，2不通过，3通过已过期， 4未申请)',
  `au_tag` int(0) NULL DEFAULT NULL COMMENT '标签（0电子病历，1处方单）',
  `au_reciver` bigint(0) NULL DEFAULT NULL COMMENT '被申请人',
  `au_record` bigint(0) NULL DEFAULT NULL COMMENT '病历或者处方单的id',
  `au_record_keyword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '病例或处方单的关键字',
  `au_handle_time` datetime(0) NULL DEFAULT NULL COMMENT '处理时间',
  PRIMARY KEY (`au_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for consult_record
-- ----------------------------
DROP TABLE IF EXISTS `consult_record`;
CREATE TABLE `consult_record`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `from` bigint(0) NULL DEFAULT NULL,
  `to` bigint(0) NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for demo
-- ----------------------------
DROP TABLE IF EXISTS `demo`;
CREATE TABLE `demo`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '内容',
  `status` tinyint(0) NULL DEFAULT 2 COMMENT '状态:1-已禁用,2-正常',
  `deleted` tinyint(0) NULL DEFAULT 0 COMMENT '是否删除：0否1是',
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建者',
  `create_by_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建者名字',
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '修改者',
  `update_by_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '修改者名字',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'demo' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for drug_store
-- ----------------------------
DROP TABLE IF EXISTS `drug_store`;
CREATE TABLE `drug_store`  (
  `d_id` bigint(0) NOT NULL,
  `d_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `d_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `d_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `d_license` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`d_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for experience_sharing
-- ----------------------------
DROP TABLE IF EXISTS `experience_sharing`;
CREATE TABLE `experience_sharing`  (
  `id` bigint(0) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `syndrome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `maintext` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for medical_history
-- ----------------------------
DROP TABLE IF EXISTS `medical_history`;
CREATE TABLE `medical_history`  (
  `mid` bigint(0) NOT NULL AUTO_INCREMENT,
  `mname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '患者姓名',
  `mIDNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '身份证号',
  `msex` int(0) NULL DEFAULT NULL COMMENT '性别：0未知1男2女3其他',
  `mage` int(0) NULL DEFAULT NULL,
  `msickness` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '所患疾病',
  `msyndrome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '症状',
  `mhistory` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '病史',
  `mcheck` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医学检查',
  `mtreatment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '治疗方案',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_time` datetime(0) NULL DEFAULT NULL,
  `patient_id` bigint(0) NULL DEFAULT NULL COMMENT '患者id',
  PRIMARY KEY (`mid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for physician
-- ----------------------------
DROP TABLE IF EXISTS `physician`;
CREATE TABLE `physician`  (
  `ph_id` bigint(0) NOT NULL,
  `ph_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医生姓名',
  `ph_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医生职称',
  `ph_intro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医生简介',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  PRIMARY KEY (`ph_id`) USING BTREE,
  INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for prescription
-- ----------------------------
DROP TABLE IF EXISTS `prescription`;
CREATE TABLE `prescription`  (
  `pid` bigint(0) NOT NULL AUTO_INCREMENT,
  `IDnumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '身份证号',
  `pname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `psex` int(0) NULL DEFAULT NULL COMMENT '性别：0未知1男2女3其他',
  `page` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '年龄',
  `pdiagnosis` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '临床诊断',
  `physician` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医师',
  `pstate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '处方单状态',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_time` datetime(0) NULL DEFAULT NULL,
  `physician_id` bigint(0) NULL DEFAULT NULL COMMENT '医生id',
  `patient_id` bigint(0) NULL DEFAULT NULL COMMENT '病人Id',
  `medicines` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '药品',
  `medical_advice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医嘱',
  PRIMARY KEY (`pid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question`  (
  `q_id` bigint(0) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sender` bigint(0) NULL DEFAULT NULL,
  `ph_id` bigint(0) NULL DEFAULT NULL,
  `sender_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`q_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'sys' COMMENT '用户类型: huanzhe 患者,yisheng 医生,yaodian药房',
  `username` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名',
  `fd_pwd` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'pwd',
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '真实姓名',
  `sex` tinyint(0) NULL DEFAULT NULL COMMENT '性别：0未知1男2女3其他',
  `id_card` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '身份证',
  `mobile` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机',
  `telephone` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电话',
  `email` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `face_photo_uri` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像uri',
  `position_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '岗位编码',
  `address` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '地址',
  `status` tinyint(0) NULL DEFAULT 2 COMMENT '状态:1-已禁用,2-正常',
  `deleted` tinyint(0) NULL DEFAULT 0 COMMENT '是否删除：0否1是',
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建者',
  `create_by_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建者名字',
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '修改者',
  `update_by_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '修改者名字',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_user_name`(`username`) USING BTREE,
  INDEX `idx_real_name`(`name`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 102 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统用户' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for token_record
-- ----------------------------
DROP TABLE IF EXISTS `token_record`;
CREATE TABLE `token_record`  (
  `token_id` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'tokenId',
  `info` json NULL COMMENT 'token',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  PRIMARY KEY (`token_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'token记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for upchaindata
-- ----------------------------
DROP TABLE IF EXISTS `upchaindata`;
CREATE TABLE `upchaindata`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `data` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT NULL,
  `uploader` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `TxHash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
