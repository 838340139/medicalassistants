import React, { Component } from 'react'
import DocumentTitle from 'react-document-title';
import { doctorQueryReecord, applyPres } from '@/utils/api';
// import * as $ from 'jquery';
import {
    Card,
    message,
    Input,
    Button,
    Space,
    Table,
    Form,
    Tag,
    Pagination,
    Spin
} from 'antd'
import {
    SearchOutlined,
    RedoOutlined,
} from "@ant-design/icons";
interface Item {
    id:number,
    //cardId:string,
    name:string,
    date:string,
    disease:string,
    acessStatus:string,
}
interface IState {
    inputValue:string,
    data:any,
    btnValue:any,
    hasData:boolean,
    pageSize:number,
    current:number,
    total:number,
    spinning:boolean

}
export default class ShowRecordDoctor extends React.Component< any,IState> {
    constructor(props: any) {
        super(props);
        //假数据
        const tableData=[]
        const btnV=[]
        for (let i = 0; i < 23; i++) {
            if(i==1){
                tableData.push({
                    id:i,
                    cardId:'411024200012300729',
                    name:`张三`,
                    date:"2021-09-07",
                    disease:`疾病${i}`,
                    accessStatus:"已授权",});
            }else{
                tableData.push({
                id:i,
                cardId:'411024200012300729',
                name:`张三`,
                date:"2021-09-07",
                disease:`疾病${i}`,
                accessStatus:"未授权",
        });
    }
            if(i==1){
                btnV.push("授权请求已发送")
            }else{
                btnV.push("申请授权")
            }

        }
        // this.state={
        //     data:tableData,
        //     inputValue:'',
        //     btnValue:btnV,
        //     hasData:false,
        // }
        this.state={
            data:[],
            inputValue:'',
            btnValue:btnV,
            hasData:false,
            pageSize:7,
            current:1,
            total:0,
            spinning:false,
        }

       // console.log("here",this.state.data[3],this.state.btnValue[3])
    }
    componentDidMount(){

    }
    loadPage(page:any,params:any){
        this.setState({
            spinning:true
        })
        doctorQueryReecord({
            current:page,
            size:this.state.pageSize,
            param: {
                midnumber:params.IDnumber,
                // idList: {},
                // keyword: ""
            }
        }).then((res:any)=>{
            if(res.code == 200){
                let keyId = 0;
                res.data.records.forEach((record:any)=>{
                    record.createTime=record.createTime.replace("T","   ")
                    record.keyId = keyId++
                })
                console.log(res.data.records)
                this.setState({
                    total: res.data.total,
                    data: res.data.records,
                    current: res.data.current
                })
            }
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
    }
    clickSearch=()=>{
        const {inputValue,hasData}=this.state
        if (!inputValue) {
            message.error('请输入用户身份证号！');
            return false;
        }
        // 身份证格式检查
        let _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        let _IDre15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
        if (_IDRe18.test(inputValue) || _IDre15.test(inputValue)) {
            console.log(' 验证通过 ')
            console.log("inputValue",inputValue)
            //请求数据
            let params = {
                current:'1',
                size:'10',
                IDnumber:inputValue,
            }
            console.log("查询")
            this.loadPage(1, params)
            // doctorQueryReecord(params)
            //     .then((res:any)=>{
            //         if (res.success){
            //             console.log("成功：",res.data)
            //             this.setState({hasData:true,data:res.data})
            //         }else{
            //             console.log("错误")
            //         }
            //     })
            // if (inputValue == "411024200012300729") {
            //     message.success('查询成功')
            //     this.setState({hasData:true})

            // } else {
            //     message.error('用户不存在！');
            // }
        } else {
            message.error('身份证格式错误，请重新输入！');
        }

    }
    // 申请授权
    ApplyForAuthorization = (record: any) => {
        applyPres({
            auRecord:record.mid,
            auTag:0
        }).then((res:any)=>{
            if(res.code==200){
                message.success('已成功发送授权申请！')
                this.loadPage(
                    this.state.current, {IDnumber:this.state.inputValue}
                )
            }
        })
        // 根据返回值改变授权状态
    }
    // 查看处方单
    viewpdp = (record: any) => {
        console.log('传id',record)
        this.props.history.push({
            pathname:`/medicalRecord/RecordDetail/${record.mid}`,
           })
    }
    //向后端请求身份证号为IDnumber的患者病历
    handleChange=(event:any)=>{
        this.setState({inputValue: event.target.value});


    }
    reSet=()=>{
        this.setState({inputValue:''});
    }
    requestAccess=(item:any)=>{
        const {data,btnValue}=this.state
        //console.log("request:",btnValue[item],data[item].accessStatus)
        if(btnValue[item]==="申请授权"  && data[item].accessStatus==="未授权"){
            //向后台发送授权请求
            message.success('已成功发送授权申请！')
            btnValue[item]="授权请求已发送"
            this.setState({btnValue:btnValue})
        }else if(btnValue[item]=="授权请求已发送" && data[item].accessStatus=="已授权"){
            btnValue[item]="通过授权，点击查看"
            this.setState({btnValue:btnValue})
        }else if(btnValue[item]=="通过授权，点击查看" && data[item].accessStatus=="已授权"){
            this.props.history.push({
                pathname:`/medicalRecord/RecordDetail/${item}`,
               })
        this.forceUpdate()
        }
    }
    render(){
        const {data,btnValue,hasData}=this.state
        console.log("render data:",data)
        const auStateToStateTag = (auState:number)=>{
            switch(auState){
                case 0:return {
                    color:'blue',
                    tag: '未审核',
                    action:{
                        name:'申请授权',
                        disabled:true,
                    }
                };
                case 1:return {
                    color:'green',
                    tag: '已授权',
                    action:{
                        name:"查看病历",
                        disabled:false,
                        fun:this.viewpdp.bind(this)
                    }
                };
                case 2:return {
                    color:'red',
                    tag: '已驳回',
                    action:{
                        name:'重新申请',
                        disabled:false,
                        fun:this.ApplyForAuthorization.bind(this)
                    }
                };
                case 3:return {
                    color:'gray',
                    tag: '授权已过期',
                    action:{
                        name:'重新申请',
                        disabled:false,
                        fun:this.ApplyForAuthorization.bind(this)
                    }
                };
                case 4:return {
                    color:'gray',
                    tag: '未申请',
                    action:{
                        name:'申请授权',
                        disabled:false,
                        fun:this.ApplyForAuthorization.bind(this)
                    }
                };
                default:return {
                    color:'yellow',
                    tag: '未知',
                    action:{
                        name:'???',
                        disabled:true
                    }
                };
            }
        }
        const columns = [
            {
                title: '上传时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '姓名',
                dataIndex: 'mname',
                key: 'mname',

            },
            // {
            //     title: '身份证',
            //     dataIndex: 'cardId',
            //     key: 'cardID',
            // },
            {
                title: '所患疾病',
                dataIndex: 'msickness',
                key: 'msickness',
            },
            {
                title: '授权',
                dataIndex: 'auState',
                key: 'address',
                render: (text: any, record: { pname: any, auId: string, auState: number, IDnumber: number}) => {
                    let state = auStateToStateTag(record.auState)
                    return <Space>
                        <Button style={{
                            margin: "auto auto",
                            color: '#ffffff',
                            backgroundColor: (state.color)
                        }}>
                            {state.tag}
                        </Button>
                    </Space>
                },
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text: any, record: { pname: any, auId: string, auState: number, IDnumber: number}) => {
                    let state = auStateToStateTag(record.auState)
                    let fun = state.action.fun?state.action.fun:()=>{}
                    return <Space>
                        <Button disabled={state.action.disabled}
                                style={{margin: "auto auto"}} onClick={() => {fun(record)}}>
                            {state.action.name}
                        </Button>
                    </Space>
                },
            }
        ];
        const title=(
            <Space>
            <Input placeholder="输入患者身份证号" onChange={this.handleChange} value={this.state.inputValue} style={{width:250,margin:'0 15px'}}></Input>
            <Button type="primary" icon={<SearchOutlined />} onClick={()=>this.clickSearch()}>搜索</Button>
            <Button type="primary" icon={<RedoOutlined />}  onClick={()=>this.reSet()} style={{ backgroundColor: '#EAC100' }}>重置</Button>
            </Space>
            )

        return (
            <Card title="查询条件">
                <Card title={title}>
                        <Spin tip="Loading..." spinning={this.state.spinning}>
                            <Table
                                columns={columns}
                                dataSource={data}
                                rowKey="keyId"
                                pagination={false}
                                style={{marginLeft:"5%",marginRight:"5%"}}/>
                        </Spin>
                        <Pagination
                            defaultCurrent={1}
                            total={this.state.total}
                            current={this.state.current}
                            pageSize={this.state.pageSize}
                            style={{marginTop:"2%",marginRight:"5%"}}
                            hideOnSinglePage={false}
                            className="pagination"
                            onChange={(page)=>{this.loadPage(page, {IDnumber:this.state.inputValue})}}
                        />
                    </Card>

            </Card>
        )

    }

}
