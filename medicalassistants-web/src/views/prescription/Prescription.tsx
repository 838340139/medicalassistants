import React, { Component, useState } from 'react'
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
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
import {applyPres, grantPage, queryPresPage} from "@/utils/api";
interface DataDemo {
    auId: string,
    createTime: string,
    pname: string,
    IDnumber: number,
    auState: number,
}
interface IState {
    hasData: boolean,
    disabled: boolean,
    buttonValue: string,
    data: any,
    inputValue:string,
    pageSize:number,
    current:number,
    total:number,
    spinning:boolean
}
export default class Prescription extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: '',
            hasData: true,
            disabled: false,
            data: [
            ],
            buttonValue: '申请授权',
            pageSize:10,
            current:1,
            total:0,
            spinning:false,
        }
    }
    getInputValue = (event: any) => {
        if (event && event.target && event.target.value) {
            let inputValue = event.target.value
            this.setState({ inputValue: inputValue })
        }
    }
    // 点击重置输入框
    reset = () => {
        this.setState({ inputValue: '' })
    }
    // 点击刷新
    refresh = () => {
        this.loadPage(this.state.current, {IDnumber: this.state.inputValue})
        this.render()
    }
    // 点击搜索
    seacrh = () => {
        const { inputValue } = this.state
        if (!inputValue) {
            message.error('请输入用户身份证号！');
            return false;
        }
        // 身份证格式检查
        let _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        let _IDre15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
        if (_IDRe18.test(inputValue) || _IDre15.test(inputValue)) {
            this.setState({
                hasData: true,
                current:1
            })
            this.loadPage(1, {
                IDnumber:inputValue
            })
        } else {
            message.error('身份证格式错误，请重新输入！');
        }
    }
    loadPage(page:any,params:any){
        this.setState({
            spinning:true
        })
        queryPresPage({
            current:page,
            size:this.state.pageSize,
            param: {
                idnumber:params.IDnumber
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
    // 申请授权
    ApplyForAuthorization = (record: any) => {
        applyPres({
            auRecord:record.pid,
            auTag:1
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
            pathname:`/prescription/PrescriptionDetailPatient/${record.pid}/yaofang`,
           })
    }
    buttonAction = (record: any) => {
        this.ApplyForAuthorization(record)
    }
    render() {
        console.log("render!!!!")
        const { inputValue, hasData, data } = this.state
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
                        name:"查看处方单",
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
        const title = (
            <Space>
                查询条件
            </Space>
        )
        const extra = (
            <span>
                <Space>
                    <Input
                        type="text"
                        value={inputValue}
                        // style={{ width: '250px',left:'300px'}}
                        placeholder="请输入患者身份证号"
                        onChange={event => { this.getInputValue(event) }}
                    ></Input>
                    <Button type="primary" icon={<SearchOutlined />} onClick={() => { this.seacrh() }}>搜索</Button>
                    <Button type="primary" icon={<RedoOutlined />} onClick={() => { this.reset() }} style={{ backgroundColor: '#EAC100' }}>重置</Button>
                    <Button type="primary" icon={<RedoOutlined />} onClick={() => { this.refresh() }}>刷新状态</Button>
                </Space>
            </span>
        )
        const columns = [
            {
                title: '上传时间',
                dataIndex: 'createTime',
                key: 'createTime',

            },
            {
                title: '姓名',
                dataIndex: 'pname',
                key: 'pname',

            },
            {
                title: '授权状态',
                dataIndex: 'applicationStatus',
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
        return (
            <DocumentTitle title={'查看处方'}>
                <div>
                    <Card  bordered={false}
                           title={title}
                           extra={extra}>
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
                </div>
            </DocumentTitle>
        )
    }
}
