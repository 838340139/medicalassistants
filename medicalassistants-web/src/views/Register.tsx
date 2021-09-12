import React, { Component } from 'react'
import DocumentTitle from 'react-document-title';
import { Input, Button, Checkbox, message, Space, Form, Modal, Radio, Select, Upload,Card,Spin } from 'antd';
import { FormInstance } from 'antd/es/form';
import { validPass } from '@/utils/valid';
import {logout, register} from '@/store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '@/store';
import {
    UploadOutlined
} from "@ant-design/icons";
import '@/styles/login.less';
import user from '@/store/reducers/user';
import {saveDrugStoreInfo, savePhyInfo} from "@/utils/api";
const { Option } = Select;
interface IProps {
    //login: any,
    register: any,
    history: any
}

interface IState {
    formPhysician: {
        physicianName: string,
        physicianTitle: string,
        physicianItro: string,

    },
    formPharmacy: {
        pharmacyName?: string,
        pharmacyAddress?: string,
        pharmacyPhone?: string,

    },
}
class Register extends Component<any, IState>  {
    formRef = React.createRef<FormInstance>();
    constructor(props: any) {
        super(props);
        this.state = {
            formPhysician: {
                physicianName: '',
                physicianTitle: '',
                physicianItro: '',
            },
            formPharmacy: {
                pharmacyName: '',
                pharmacyAddress: '',
                pharmacyPhone: '',

            },
        }
    }
    clearInput = () => {
        this.setState({
            formPhysician: {
                physicianName: '',
                physicianTitle: '',
                physicianItro: '',
            },
            formPharmacy: {
                pharmacyName: '',
                pharmacyAddress: '',
                pharmacyPhone: '',

            },
        })
    }
    // 监听医生输入注册信息
    handleChangeRegisterPhysician = (e: any, type: number) => {
        const { formPhysician } = this.state;
        this.setState({
            formPhysician: {
                physicianName: type === 1 ? e.target.value : formPhysician.physicianName,
                physicianTitle: type === 2 ? e.target.value : formPhysician.physicianTitle,
                physicianItro: type === 3 ? e.target.value : formPhysician.physicianItro,

            }

        })
        console.log("handleChangeformPhysician",this.state.formPhysician)
    }
    // 监听医生输入注册信息
    handleChangeRegisterPharmacy = (e: any, type: number) => {
        const { formPharmacy } = this.state;
        this.setState({
            formPharmacy: {
                pharmacyName: type === 1 ? e.target.value : formPharmacy.pharmacyName,
                pharmacyAddress: type === 2 ? e.target.value : formPharmacy.pharmacyAddress,
                pharmacyPhone: type === 3 ? e.target.value : formPharmacy.pharmacyPhone,

            }
        })
        console.log("handleChangeformPharmacy",this.state.formPhysician)
    }

    handleRegisterPhysician=(value:any)=>{
        console.log(value)
    }

    render() {
        // //用户类型: huanzhe 患者,yisheng 医生,yaodian 药店
        const userType = (store.getState() as any).user.data.userType;
        const isLogin = (store.getState() as any).user.data.token;
        console.log("Register isLogin:",isLogin)
        //console.log("register userData:",userData)
        // const {id}=this.props.params.match
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        };
        const handleRegisterPhysician=(value:any)=>{

            const userType = (store.getState() as any).user.data.userType;
             savePhyInfo({
                 phName:value.yisheng['ph_name'],
                 phIntro:value.yisheng['ph_intro'],
                 phTitle:value.yisheng['ph_title']
             }).then((res:any)=>{
                 console.log(value)
                 //向后台传数据 value
                 if(res.success){
                     this.props.history.push('/')
                 }
                 else message.error("保存失败")
             })

        }
        const handleRegisterPhrmacy=(value:any)=>{
            console.log(value)
            const userType = (store.getState() as any).user.data.userType;
            saveDrugStoreInfo({
                dname:value.yaodian['d_name'],
                daddress:value.yaodian['d_address'],
                dphone:value.yaodian['d_phone']
            }).then((res:any)=>{
                console.log(value)
                //向后台传数据 value
                if(res.success){
                    this.props.history.push('/')
                }
                else message.error("保存失败")
            })
            //向后台传数据 value
            this.props.history.push('/')
        }
        const validateMessages = {
            required: '请输入${label}信息',

        };
        return (
            <DocumentTitle title={'完善信息'}>
            <div style={{ marginTop: "100px" }}>
            <Card title="完善信息"
                  bordered={true}
                  extra={<Button type="ghost"
                                 danger
                                 onClick={()=>
                                 {
                                    store.dispatch(logout())
                                 }}>
                      退出登录
                  </Button>}
                  style={{ width: "60%",marginTop:"",marginLeft:"20%",marginRight:"10%",marginBottom:"100"}}>
                {userType === "yisheng" ?
                        <div>
                            <Form {...layout} onFinish={handleRegisterPhysician}>
                                <Form.Item name={['yisheng', 'ph_name']} label="真实姓名" rules={[{ required: true }]}>
                                    <Input style={{ width: '30%' }} placeholder="请输入医师姓名" />
                                </Form.Item>
                                <Form.Item name={['yisheng', 'ph_title']} label="头衔证书" rules={[{ required: true }]}>
                                    <Input.TextArea placeholder="请输入头衔证书..." autoSize={{ minRows: 3, maxRows: 5 }}/>
                                </Form.Item>
                                <Form.Item name={['yisheng', 'ph_intro']} label="医生简介" rules={[{ required: true }]}>
                                    <Input.TextArea placeholder="请输入医生简介..." autoSize={{ minRows: 5, maxRows: 7 }}/>
                                </Form.Item>
                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: "10" }}>
                                    <Button type="primary" htmlType="submit" style={{backgroundColor:"rgb(100, 184, 165)"}} >
                                        填写完成
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        :
                    userType === "yaodian" ?
                        <div>
                            <Form {...layout} onFinish={handleRegisterPhrmacy}>
                                <Form.Item name={['yaodian', 'd_name']} label="药店名称" rules={[{ required: true }]}>
                                    <Input style={{ width: '50%' }} placeholder="请输入药店名称" />
                                </Form.Item>
                                <Form.Item name={['yaodian', 'd_address']} label="地址" rules={[{ required: true }]}>
                                    <Input style={{ width: '50%' }} placeholder="请输入药店地址" />
                                </Form.Item>
                                <Form.Item name={['yaodian', 'd_phone']} label="电话" rules={[{ required: true }]}>
                                    <Input style={{ width: '50%' }} placeholder="请输入药店电话" />
                                </Form.Item>
                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: "10" }}>
                                    <Button type="primary" htmlType="submit" style={{backgroundColor:"rgb(100, 184, 165)"}} >
                                        填写完成
                                    </Button>

                                </Form.Item>
                            </Form>

                        </div>:
                        <Spin>
                            <div style={{height:'250px'}}></div>
                        </Spin>

                }

            </Card>


            </div>
        </DocumentTitle >
        )
    }
}
export default withRouter(connect((state: any) => state.user, { register })(Register))
