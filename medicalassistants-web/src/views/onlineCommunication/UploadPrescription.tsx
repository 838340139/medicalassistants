import * as React from "react"
import DocumentTitle from 'react-document-title';

import {Card, Form, Input, InputNumber, Button, Space ,Typography,Tooltip,Modal} from 'antd';
import {LeftCircleTwoTone,SnippetsTwoTone, MinusCircleOutlined, PlusOutlined,CheckCircleTwoTone } from "@ant-design/icons";
import {sendPrescription} from '@/utils/api'
const {Text}=Typography

interface IState{
    pname:string,
    IDnumber:string,
    psex:string,
    createTime:string,
}
export default class UploadPrescription extends React.Component<any,IState>{
    constructor(props:any){
        super(props);
        console.log("props: 咨询医师Id:",props);
        const dateRes=this.getNowFormatDate()
        let dateNow:string;
        this.state={
            pname:"小李",
            IDnumber:"41108519981112089X",
            psex:"男",
            createTime:dateRes,
            //experienceObj:findResult,
        }
      
    }
    componentDidMount() { 
      }
    goBack=()=>{
        this.props.history.goBack()
        //console.log(this.props.history)
    }
    getNowFormatDate=()=> {
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let month_str:string;
        let Date_str:string;
        let year_str=""+year;
        if (month >= 1 && month <= 9) {
            month_str = "0" + month;
        }else{
            month_str=""+month;
        }
        if (strDate >= 0 && strDate <= 9) {
            Date_str = "0" + strDate;
        }else{
            Date_str=""+strDate
        }
        let currentdate = year_str + seperator1 + month_str + seperator1 + Date_str;
        return currentdate;
    }

    
    render(){
        const {id}=this.props.match.params
        
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
          };
        const validateMessages = {
            required: '请输入${label}信息',
            
          };
        const IconAndText = (obj:{ icon:any, text:string }) => (
            <div>
              {React.createElement(obj.icon)}&nbsp;&nbsp;
              {obj.text}
            </div>
          );

        const onFinish = (values: any) => {
            if (values!=undefined){
                console.log("输入的信息：",values);
                const date=this.getNowFormatDate();
                console.log(date);
                let medicinesStr=''
                for (let i=0;i<values.medicines.length;i++){
                    medicinesStr=values.medicines[i]['first']+'-'+values.medicines[i]['second']+values.medicines[i]['third']+values.medicines[i]['fourth']
                    medicinesStr+='\n'
                    
                }
                let Prescription={
                    patientId:id,
                    medicalAdvice: values.prescriptionInfo.medicalAdvice,
                    page: values.prescriptionInfo.page,
                    pdiagnosis: values.prescriptionInfo.pdiagnosis,
                    medicines:medicinesStr
                }
                sendPrescription(Prescription)
                    .then((res:any)=>{
                        if(res.success){
                            //alert("上传成功！");
                            Modal.success({
                                title:'提示：',
                                content: '您已成功提交处方单！',
                              });
                        }else{
                            alert("上传失败！");
                        }
                    })
                
            }
            };
        const {pname,IDnumber,psex,createTime}=this.state
        console.log("1",createTime);
        const extra=(
                <Tooltip title="更多经验详情">
                  <Button shape="circle" icon={<LeftCircleTwoTone />} onClick={()=>this.goBack()}/>
                </Tooltip>
              
            )
        return(
            <DocumentTitle title={'开具处方单'}>
                <Card title={<IconAndText icon={SnippetsTwoTone} text="开具处方单"/>} style={{padding:"0px 40px"}} extra={extra}>
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        {/* <Form.Item name={['prescriptionInfo', 'pname']} label="患者姓名" >
                            <Input defaultValue={pname} style={{ width: '20%' }} disabled/>
                        </Form.Item>
                        <Form.Item name={['prescriptionInfo', 'idnumber']} label="身份证号" >
                            <Input defaultValue={IDnumber} style={{ width: '30%' }} disabled/>
                        </Form.Item>
                        <Form.Item name={['prescriptionInfo', 'psex']} label="性别" >
                            <Input defaultValue={psex} style={{ width: '20%' }} disabled/>
                        </Form.Item> */}
                        <Form.Item name={['prescriptionInfo', 'page']} label="年龄" >
                            <Input style={{ width: '30%' }} placeholder="请输入患者年龄"/>
                        </Form.Item>
                        <Form.Item name={['prescriptionInfo', 'pdiagnosis']} label="临床诊断" rules={[{ required: true }]}>
                            <Input.TextArea placeholder="请输入对患者的诊断结果" autoSize={{ minRows: 2, maxRows: 4 }}/>
                        </Form.Item>
                        <Form.Item name={['prescriptionInfo', 'medicalAdvice']} label="医嘱" >
                            <Input.TextArea placeholder="请输入医嘱" autoSize={{ minRows: 2, maxRows: 4 }}/>
                        </Form.Item>
                        <Text strong style={{marginLeft:"14%"}}>Rp:</Text>&nbsp;&nbsp;
                        {/* <Form.Item name={['prescriptionInfo', 'medicines']} label="Rp" > */}
                            <Space size={140}>
                                <Text strong>药品名称</Text>
                                <Text strong>剂量</Text>
                                <Text strong>用药频次</Text>
                                <Text strong>药品总量</Text>
                            </Space>
                        {/* </Form.Item> */}
                        <Form.List name="medicines">
                            {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} size={2} style={{ display: 'flex', marginBottom: 8,marginLeft:"15%" }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'first']}
                                        fieldKey={[fieldKey, 'first']}
                                        //rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                    <Input placeholder="请输入药品名称" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'second']}
                                        fieldKey={[fieldKey, 'second']}
                                       // rules={[{ required: true, message: 'Missing second name' }]}
                                    >
                                    <Input placeholder="请输入使用剂量" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'third']}
                                        fieldKey={[fieldKey, 'third']}
                                        //rules={[{ required: true, message: 'Missing third name' }]}
                                    >
                                    <Input placeholder="请输入用药频次" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'fourth']}
                                        fieldKey={[fieldKey, 'fourth']}
                                        //rules={[{ required: true, message: 'Missing fourth name' }]}
                                    >
                                    <Input placeholder="请输入药品数量" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                                ))}
                                <Form.Item style={{marginLeft:"15%"}}>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        添加
                                    </Button>
                                </Form.Item>
                            </>
                            )}
                        </Form.List>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: "10" }}>
                            <Button type="primary" htmlType="submit" style={{backgroundColor:"rgb(100, 184, 165)"}} >
                                开具处方单
                            </Button>
                            
                        </Form.Item>

                    </Form>
                </Card>
            </DocumentTitle>
        )
    }
}


