import network from './network';

// 登录
export function loginUser(data) {
  return network({
    url: `/rest/auth/login`,
    method: "post",
    data
  });
}

// 注册
export function registerUser(data) {
  return network({
    url: `/rest/auth/register`,
    method: "post",
    data
  })
}

// 密码重置
export function resetPwd(data) {
  return network({
    url: `/rest/auth/resetPwd`,
    method: "post",
    data
  })
}

// 分页查询列表
export function demoPage(data) {
  return network({
    url: `/rest/demo/page`,
    method: "post",
    data
  })
}

// 上传病历
export function uploadRecord(data) {
  return network({
    url: `/rest/medi/ownSubmit`,
    method: "post",
    data
  })
}

// 分页查询病历
export function patientRecordPage(data) {
  return network({
    url: `/rest/medi/patientMedi`,
    method: "post",
    data
  })
}

// 患者查询自己的病历分页查询
export function ownRecordPage(data) {
  return network({
    url: `/rest/medi/ownMediPage`,
    method: "post",
    data
  })
}

// 患者查询自己的一份病历
export function ownOneRecord(data) {
  return network({
    url: `/rest/medi/ownOneMedi`,
    method: "post",
    data
  })
}


// 患者查询处方单分页
export function ownPrescritionPage(data) {
  return network({
    url: `/rest/prescri/ownPage`,
    method: "post",
    data
  })
}


//医生查询患者的病历
export function doctorQueryReecord(data){
  return network({
    url:`/rest/medi/patientMediPage`,
    method:"post",
    data
  })
}

// 医生查询患者的病历
export function patientMedi(data) {
  return network({
    url: `/rest/medi/patientMedi`,
    method: "post",
    data
  })
}

// 患者查询处方单详情
export function prescritionDetail(data) {
  return network({
    url: `/rest/prescri/presDetail`,
    method: "post",
    data
  })
}

// 药房查询处方单分页
export function queryPresPage(data) {
  return network({
    url: `/rest/prescri/patientPresPage`,
    method: "post",
    data
  })
}

// 药房查询处方单
export function queryPres(data) {
  return network({
    url: `/rest/prescri/patientPres`,
    method: "post",
    data
  })
}

// 患者查询授权记录分页
export function grantPage(data) {
  return network({
    url: `/rest/authrization/grantPage`,
    method: "post",
    data
  })
}

// 患者查询授权
export function grant(data) {
  return network({
    url: `/rest/authrization/grant`,
    method: "post",
    data
  })
}

// 医生，药房申请授权
export function applyPres(data) {
  return network({
    url: `/rest/authrization/submitApply`,
    method: "post",
    data
  })
}

// 保存医生信息
export function savePhyInfo(data) {
  return network({
    url: `/rest/physi/saveInfo`,
    method: "post",
    data
  })
}

// 保存药店信息
export function saveDrugStoreInfo(data) {
  return network({
    url: `/rest/drugStore/saveInfo`,
    method: "post",
    data
  })
}
// 医生列表查询、关键字搜索查询医生
export function queryDoctorPage(data) {
  return network({
    url: `/rest/physi/page`,
    method: "post",
    data
  })
}


// 查询问题
export function queryQue(data) {
  return network({
    url: `/rest/consult/quePage`,
    method: "post",
    data
  })
}

// 获取医生信息
export function phyDetail(data) {
  return network({
    url: `/rest/physi/detail`,
    method: "post",
    data
  })
}

// 患者提问
export function sendQue(data) {
  return network({
    url: `/rest/consult/sendQue`,
    method: "post",
    data
  })
}
//医师上传处方单
export function sendPrescription(data) {
  return network({
    url: `/rest/prescri/patientPresSubmit`,
    method: "post",
    data
  })
}

// 医生回答
export function sendAns(data) {
  return network({
    url: `/rest/consult/sendAns`,
    method: "post",
    data
  })
}





