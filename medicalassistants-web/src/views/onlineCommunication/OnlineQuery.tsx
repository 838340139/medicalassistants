import { Button, Card, Input, Space,Pagination, Comment,Spin,Tooltip, List,Form,Typography } from 'antd';
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title';
import store from '@/store';
import {phyDetail, queryPresPage, queryQue, sendQue} from "@/utils/api";
const {Text}=Typography
interface PatientQuestionData{
    questionId:number,
    question:string,
    questionTime:string,
}
interface DoctorReplyData{
        questionId:number,
        reply:string,
        replyTime:string,

}
interface IState {
    selectedDoctor: any,
    PatientQuestionData:any,
    DoctorReplyData:any,
    qId:number,
    pageSize:number,
    current:number,
    total:number,
    spinning:boolean,
    phId:any
}

export default class OnlineQuery extends React.Component<any, IState>{
    constructor(props:any){
        super(props);
        const listData = [];

        for (let i = 0; i < 23; i++) {
        listData.push({
        id:i,
        // href: 'https://ant.design',
        title: `医生姓名 ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
          '头衔证书1 头衔证书2 头衔证书3 头衔证书4 头衔证书5  头衔证书6 头衔证书7',
        content:
          '个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述  个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述s',
        price:10,
        experience:5,
      });
    }
        //根据路由传来的id匹配doctorList
        const {id}=this.props.match.params
        const findResult=listData.find((doctorObj:any)=>{
            return doctorObj.id==id
        })
        this.state={
            selectedDoctor: {},
            PatientQuestionData:[],
            //医生对questionId的回复数据
            DoctorReplyData:[
                        {
                             questionId:0,
                             reply:`医生对的第0个问题的回复1`,
                             replyTime:'2021-09-11',
                         },
                        {
                            questionId:1,
                            reply:`医生对的第0个问题的回复1`,
                            replyTime:'2021-09-12',
                        },
                        {
                            questionId:1,
                            reply:`医生对的第0个问题的回复2`,
                            replyTime:'2021-09-12',
                        },
                        ],
            qId:0,
            pageSize:3,
            current:1,
            total:0,
            spinning:false,
            phId:id
        }
    }
    completeQuery = () => {
        this.props.history.goBack()
    }
    componentDidMount(){
        this.loadPage(this.state.current)
        this.loadDoctor()
    }
    loadDoctor(){
        phyDetail({
            phId: this.state.phId
        }).then((res:any)=>{
            let data = res.data
            this.setState({
                selectedDoctor:{
                    id:data.phId,
                    // href: 'https://ant.design',
                    title: data.phName,
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description: data.phTitle,
                    content:data.phIntro,
                }
            })
        })
    }
    loadPage(page:any){
        this.setState({
            spinning:true
        })
        queryQue({
            current:page,
            size:this.state.pageSize,
            param: {
                ph_id:Number.parseInt(this.state.phId)
            }
        }).then((res:any)=>{
            if(res.code == 200){
                let keyId = 0;
                res.data.records.forEach((record:any)=>{
                    record.question.createTime = record.question.createTime.replace("T","   ")
                    record.avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                    record.answers.forEach((answer:any)=>{
                        answer.createTime=answer.createTime.replace("T","   ")
                    })
                })
                console.log(res.data.records)
                this.setState({
                    total: res.data.total,
                    PatientQuestionData: res.data.records,
                    current: res.data.current
                })
            }
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
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


    // onReset = () => {
    //     this.props.form.resetFields();
    //   };
    render() {
        //获取当前用户信息（后台登录若返回身份证号，可以身份证号为标识，目前获取的是用户名）
            /*目前得到的用户数据格式userData
            {id: 8
            name: "xiaoming"
            token: "user eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbklkIjoiODBlYzUxMWU0ZTUyNDgwMThjMTc0Yjg5ZjlkYWY3OWIiLCJuYW1lIjoieGlhb21pbmciLCJpZCI6OCwidXNlclR5cGUiOiJodWFuemhlIiwidXNlcm5hbWUiOiJ4aWFvbWluZyIsInRzIjoxNjMxMjgwMTA3fQ.7XoW0-gflbPW-nxyjpt8PiUSN0L6fSM1c-xqVdqMatOVyvWxy6a1IoeNPWMKrVrmnVpwovAmO0L_UL3qYmoGfA"
            ts: 1631280107
            userType: "huanzhe"
            username: "xiaoming"}*/
        const userData = (store.getState() as any).user.data
        const extra = (
            <span>
                <Space>
                <Button type="primary" style={{ marginLeft: "900px", marginTop: "20px", backgroundColor: "rgb(100, 184, 165)" }} onClick={() => this.completeQuery()}>完成咨询</Button>
                </Space>
            </span>
        )
        const user=(
            <Text strong>{userData.username}:</Text>
        )
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
          };
        const dateTime=this.getNowFormatDate()
        const validateMessages = {
            required: '${label} is required!',
          };
        const onFinish = (values: any) => {
            sendQue({
                phId:this.state.selectedDoctor.id,
                content:values.user.question
            }).then((res:any)=>{
                if(res.success){
                    this.loadPage(this.state.current)
                }
            })
            // const {PatientQuestionData,qId}=this.state
            // PatientQuestionData.push({
            //     questionId:qId,
            //     question:values.user.question,
            //     questionTime:dateTime,
            // })
            // this.setState({PatientQuestionData:PatientQuestionData})
            // this.setState({qId:qId+1})
            //console.log(values.user.question);
            //console.log(this.state.PatientQuestionData)
          };

        const {selectedDoctor,PatientQuestionData,DoctorReplyData}=this.state
        return (
            <div>
                <Card title={"咨询列表"} extra={extra}>
                <Comment
                        //actions={action}
                        author={selectedDoctor.title}
                        avatar={selectedDoctor.avatar}
                        content={selectedDoctor.content}
                        datetime={dateTime}
                        />
            <Spin spinning={this.state.spinning}>
            {PatientQuestionData.map((value1:any,index1:any)=>(//双层循环---外层
                <Comment key={index1}
                    //actions={item.actions}
                    author={user}
                    avatar={value1.question.avatar}
                    content={value1.question.content}
                    datetime={value1.question.createTime}
                >
                {value1.answers.map((value2:any,index2:any) => (//双层循环--内层
                    <Comment key={index2}
                    author={selectedDoctor.title}
                    avatar={selectedDoctor.avatar}
                    content={value2.content}
                    datetime={value2.createTime}
                    />
                ))}
                </Comment>
            ))}
            </Spin>
                    <Pagination
                        defaultCurrent={1}
                        total={this.state.total}
                        current={this.state.current}
                        pageSize={this.state.pageSize}
                        style={{marginTop:"2%",marginRight:"5%"}}
                        hideOnSinglePage={true}
                        className="pagination"
                        onChange={(page)=>{this.loadPage(page)}}
                    />
                </Card>
                <Form {...layout} style={{marginTop:"2%",}} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} >
                    <Form.Item name={['user', 'question']} label="咨询问题">
                        <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} placeholder="输入你的疑问吧..."/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                        {/* <Button htmlType="button" onClick={this.onReset}>
                            Reset
                        </Button> */}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}


