import React, { Component } from 'react'
// import * as $ from 'jquery';
import { Table, Tag, Radio, Space,Card,Select,Button,Form,Modal,Layout,Pagination,Spin} from 'antd';
import DocumentTitle from 'react-document-title';
import {ProfileTwoTone} from "@ant-design/icons";
import {LeftCircleTwoTone,SnippetsTwoTone, MinusCircleOutlined, PlusOutlined,CheckCircleTwoTone } from "@ant-design/icons";
import { FormInstance } from 'antd/es/form';
import {grant, grantPage, ownRecordPage} from "@/utils/api";

const { Option } = Select;
interface Item {
    id: number,
    date: string,
    proposer: string,
    Diseases: string,
    tags: string[],
}
interface IState {
    btnValue:any,
    transfer:any,
    disabledSelect:any,
    pageSize:number,
    current:number,
    total:number,
    spinning:boolean
    data:[]

}
export default class ShowAuthorization extends React.Component< any,IState> {
    constructor(props: any) {
        super(props);
        this.state={
            btnValue:{},
            transfer:{},
            disabledSelect:{},
            pageSize:5,
            current:1,
            total:0,
            spinning:false,
            data:[]
        }

    }

    handleChange=(textId:any,event:any)=>{
        let {transfer}=this.state
        transfer[textId]=event
        this.setState({transfer})
    }
    onclickConfirm=(textId:any)=>{
        const {transfer,btnValue,disabledSelect}=this.state
        this.setState({
            spinning:true
        })
        grant({
            auId: textId,
            state: transfer[textId]=="0"?2:(transfer[textId]=="1"?1:0)
        }).then((res:any)=>{
            if(res.code == 200){
                this.loadPage(this.state.current)
            }
            else{

            }
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
    }
    loadPage(page:any){
        this.setState({
            spinning:true
        })
        grantPage({
            current:page,
            size:this.state.pageSize
        }).then((res:any)=>{
            let {disabledSelect} = this.state
            if(res.code == 200){
                res.data.records.forEach((record:any)=>{
                    record.createTime=record.auDate.replace("T","   ")
                    record.auApplicantType = [record.auApplicantType]
                    record.auTag = [record.auTag]
                    disabledSelect[record.auId] = (record.auState==0?false:true)
                })
                this.setState({
                    total: res.data.total,
                    data: res.data.records,
                    current: res.data.current,
                    spinning:false,
                    disabledSelect:disabledSelect
                })
            }
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
    }
    componentDidMount(){
        this.loadPage(this.state.current)
    }
    render(){
        const {btnValue,disabledSelect}=this.state
        console.log("render data:",)
        const  appliTypeToTypeName = (type:any)=>{
            switch(type){
                case 'yisheng':return '??????';
                case 'haunzhe':return '??????';
                case 'yaodian':return '??????';
            }
        }
        const  recordTagToTagName = (tag:any)=>{
            switch(tag){
                case 0:return '??????';
                case 1:return '?????????';
            }
        }
        const  auStateToTagParam= (auState:any)=>{
            switch(auState){
                case 0:return {
                    color:'blue',
                    tag: '?????????'
                };
                case 1:return {
                    color:'green',
                    tag: '?????????'
                };
                case 2:return {
                    color:'red',
                    tag: '?????????'
                };
                case 3:return {
                    color:'gray',
                    tag: '???????????????'
                };
                case 4:return {
                    color:'white',
                    tag: '?????????'
                };
                default:return {
                    color:'yellow',
                    tag: '??????'
                };
            }
        }
        const columns = [
            {
                title: '??????',
                dataIndex: 'createTime',
                key: 'createTime',

                render: (text:any) => <a>{text}</a>,
            },
            {
                title: '?????????',
                dataIndex: 'auApplicantName',
                key: 'auApplicantName',

            },
            {
                title: '??????',
                key: 'auApplicantType',
                dataIndex: 'auApplicantType',
                render: (tagsType:any) => (
                    <span>
                {tagsType.map((tags:any) => {
                    console.log("tagsType:",tagsType)
                    console.log("tags:",tags)
                    let color = tags=='yisheng' ? 'geekblue' : 'green';
                    console.log("here tag color",tags.length)
                    return (
                        <Tag color={color} key={tagsType}>
                            {appliTypeToTypeName(tags)}
                        </Tag>
                    );
                }
                )}
              </span>
                ),
            },
            {
                title: '????????????/????????????',
                dataIndex: 'auRecordKeyword',
                key: 'auRecordKeyword',
                render: (auRecordKeyword:any) => (
                    <span>
                        {auRecordKeyword && auRecordKeyword.length>20?
                            auRecordKeyword.substring(0,20)+'...'
                            :auRecordKeyword}
                </span>
                ),
            },
            {
                title: '??????',
                key: 'auTag',

                dataIndex: 'auTag',
                render: (tags:any) => (
                    <span>
                {tags.map((tag:any) => {
                    let color = tag.length < 3 ? 'geekblue' : 'green';
                    console.log("here tag color2",tag.length)
                    return (
                        <Tag color={color} key={tag}>
                            {recordTagToTagName(tag)}
                        </Tag>
                    );
                }
                )}
              </span>
                ),
            },
            {
                title: '????????????',
                key: 'auState',

                dataIndex: 'auState',
                render: (auState:any) => {
                    let color = auState.length < 3 ? 'geekblue' : 'green';
                    let state = auStateToTagParam(auState)
                    return <span>
                            <Tag color={state.color}>
                                {state.tag}
                            </Tag>
                    </span>
                },
            },
            {
                title: '??????',
                key: 'action',
                width: 300,
                AlignType:'center',
                render: (text:any) => (
                    <div>
                        <Select defaultValue="?????????" style={{ width: 120}} id="Authorization" onChange={(event:any)=>this.handleChange(text.auId,event)} disabled={disabledSelect[text.auId]}>
                            <Option value="1">????????????</Option>
                            <Option value="0">????????????</Option>
                        </Select>
                        <Button type="primary" htmlType="submit" style={{marginLeft:10}} onClick={()=>this.onclickConfirm(text.auId)}  disabled={disabledSelect[text.auId]}>??????</Button>
                    </div>
                ),
            },
        ];
        const {data} = this.state;

        const IconAndText = (obj:{ icon:any, text:string }) => (
            <div>
                {React.createElement(obj.icon)}&nbsp;&nbsp;
                {obj.text}
            </div>
        );
        return (
            <div>
            <DocumentTitle title={'????????????'}>
                <Card title={<IconAndText icon={ProfileTwoTone } text="????????????"/>} >
                    <Spin tip="Loading..." spinning={this.state.spinning}>
                        <Table
                            columns={columns}
                            dataSource={data}
                            rowKey="auId"
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
                        onChange={this.loadPage.bind(this)}
                    />
                </Card>
            </DocumentTitle>
        </div>
        )

    }

}

