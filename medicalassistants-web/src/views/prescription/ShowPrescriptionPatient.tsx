import { Button, Card ,Table, Tag, Space, Pagination, Spin} from 'antd';
import { table } from 'console';
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title';
import {ProfileTwoTone} from "@ant-design/icons";
import {ownPrescritionPage, ownRecordPage} from "@/utils/api";
interface DataDemo{
    id:number,
    date:string,
    disease:string,
    usedState:string,
}
interface IState{
    data:any,
    pageSize:number,
    current:number,
    total:number,
    spinning:boolean
}

export default class ShowPrescriptionPatient extends React.Component<any,IState>{
    constructor(props:any){
        super(props)
        this.state={
            data:[],
            pageSize:10,
            current:1,
            total:0,
            spinning:false
        }
    }
    componentDidMount(){
        this.loadPage(this.state.current)
    }
    completeQuery=()=>{
        this.props.history.goBack()
    }
    viewRecord=(item:any)=>{
        this.props.history.push({
            pathname:`/prescription/PrescriptionDetailPatient/${item}/patient`,
           })
    }
    loadPage(page:any){
        this.setState({
            spinning:true
        })
        ownPrescritionPage({
            current:page,
            size:this.state.pageSize
        }).then((res:any)=>{
            res.data.records = res.data.records.map((record:any)=>{
                return {
                    createTime: record.createTime.replace("T","   "),
                    pid: record.pid,
                    pdiagnosis: record.pdiagnosis!=null?
                        (record.pdiagnosis.length > 35?
                            record.pdiagnosis.substring(0,35)+'...' : record.pdiagnosis):""
                }
            })
            this.setState({
                total: res.data.total,
                data: res.data.records,
                current: res.data.current
            })
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
    }
    render() {
        const {data}=this.state
        const columns = [
            {
              title: '????????????',
              dataIndex: 'createTime',
              key: 'createTime',
              AlignType:'center',
            },
            {
              title: '????????????',
              dataIndex: 'pdiagnosis',
              key: 'pdiagnosis',
              AlignType:'center',
            },
            {
              title: '??????',
              key: 'action',
              AlignType:'center',
              //text.id???0??????
              render: (text:any) => (<Button type="primary" danger onClick={()=>this.viewRecord(text.pid)} >??????</Button> ),
            },
          ];
          const IconAndText = (obj:{ icon:any, text:string }) => (
            <div>
              {React.createElement(obj.icon)}&nbsp;&nbsp;
              {obj.text}
            </div>
          );
        return (
            <DocumentTitle title={'???????????????'}>
                <Card title={<IconAndText icon={ProfileTwoTone } text="????????????"/>} >
                    <Spin tip="Loading..." spinning={this.state.spinning}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        rowKey="id"
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
        )
    }
}

