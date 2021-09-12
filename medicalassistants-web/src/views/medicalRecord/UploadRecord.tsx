import * as React from "react"
import "antd/dist/antd.css";
import '@/styles/sider.less';
import {DatePicker, Card, Form, Input, InputNumber, Button, Space ,Typography,Tooltip,Modal,Radio,Layout, Breadcrumb} from 'antd';
import {LeftCircleTwoTone,SnippetsTwoTone, MinusCircleOutlined, PlusOutlined,CheckCircleTwoTone } from "@ant-design/icons";
import DocumentTitle from 'react-document-title';
import { FormInstance } from 'antd/es/form';
import {uploadRecord} from "@/utils/api";

export default class UploadRecord extends React.Component<any> {
    formRef = React.createRef<FormInstance>();
    constructor(props:any){
        super(props);
        this.state={
            mname:'',
            msex:'',
            mage:'',
            msickness:'',
            msyndrome:'',
            mhistory:'',
            mcheck:'',
            mtreatment:''
        }
    }
    componentDidMount() {
    }


    goBack=()=>{
        this.props.history.goBack()
        //console.log(this.props.history)
    }

    render(){
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
                let params = values["prescriptionInfo"]
                uploadRecord(params).then(()=>{
                    Modal.success({
                        title:'提示：',
                        content: '您已成功上传病历！',
                    });
                })
            }

        };

        const extra=(
            <Tooltip title="返回首页">
                <Button shape="circle" icon={<LeftCircleTwoTone />} onClick={()=>this.goBack()}/>
            </Tooltip>

        )

        const onReset = () => {
            this.formRef.current!.resetFields();
        };

        return(
            <DocumentTitle title={'上传病历'}>
                <Card title={<IconAndText icon={SnippetsTwoTone} text="上传病历"/>} style={{padding:"0px 40px"}} extra={extra}>
                    <Form {...layout} ref={this.formRef} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name={['prescriptionInfo', 'mname']} label="姓名" rules={[{ required: true }]}>
                            <Input  style={{ width: '30%' }} placeholder="请输入姓名"/>
                        </Form.Item>
                        <Form.Item name={['prescriptionInfo', 'msex']} label="性别" rules={[{ required: true }]}>
                            <Radio.Group>
                                <Radio value="1">男</Radio>
                                <Radio value="2">女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name={['prescriptionInfo', 'mage']} label="年龄" rules={[{ required: true }]}>
                            <InputNumber min={0} style={{ width: '30%' }} placeholder="请输入年龄"/>
                        </Form.Item>
                        <Form.Item name={['prescriptionInfo', 'msickness']} label="所患疾病" rules={[{ required: true }]}>
                            <Input style={{ width: '30%' }} placeholder="请输入所患疾病"/>
                        </Form.Item>
                        <Form.Item name={['prescriptionInfo', 'msyndrome']} label="主要症状" rules={[{ required: true }]}>
                            <Input.TextArea placeholder="请输入主要症状" autoSize={{ minRows: 2, maxRows: 4 }}/>
                        </Form.Item>
                        <Form.Item name={['prescriptionInfo', 'mhistory']} label="现在病史" rules={[{ required: true }]}>
                            <Input.TextArea placeholder="请输入现在病史" autoSize={{ minRows: 2, maxRows: 4 }}/>
                        </Form.Item>
                        <Form.Item name={['prescriptionInfo', 'mcheck']} label="医学检查" rules={[{ required: true }]}>
                            <Input.TextArea placeholder="请输入医学检查结果" autoSize={{ minRows: 2, maxRows: 4 }}/>
                        </Form.Item>
                        <Form.Item name={['prescriptionInfo', 'mtreatment']} label="治疗方案" rules={[{ required: true }]}>
                            <Input.TextArea placeholder="请输入治疗方案" autoSize={{ minRows: 2, maxRows: 4 }}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: "10" }}>
                            <Button type="primary" htmlType="submit" style={{backgroundColor:"rgb(100, 184, 165)"}} >
                                上传病例
                            </Button>
                            <Button type="primary" htmlType="button" onClick={onReset} style={{backgroundColor:"rgb(100, 184, 165)",marginLeft:'30px'}} >
                                重置
                            </Button>
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: "10" }}>

                        </Form.Item>
                    </Form>
                </Card>
            </DocumentTitle>
        )
    }
}
