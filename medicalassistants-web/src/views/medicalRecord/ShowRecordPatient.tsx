import { Button, Card ,Table, Tag, Space, Pagination, Spin} from 'antd';
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title';
import {ProfileTwoTone} from "@ant-design/icons";
import {ownRecordPage, patientRecordPage} from "@/utils/api";

interface DataDemo{
    mid:number,
    createTime:string,
    msickness:string,
}

export default class ShowRecordPatient extends React.Component<any, any>{
    constructor(props:any){
        super(props)
        this.state={
            pageSize:10,
            current:1,
            total:0,
            data:[],
            spinning:false
        }
    }
    componentDidMount(){
        this.loadPage(this.state.current)
    }
    loadPage(page:any){
        this.setState({
            spinning:true
        })
        ownRecordPage({
            current:page,
            size:this.state.pageSize
        }).then((res:any)=>{
            res.data.records = res.data.records.map((record:any)=>{
                return {
                    createTime: record.createTime.replace("T","   "),
                    mid: record.mid,
                    msickness: record.msickness!=null?
                        (record.msickness.length > 35?
                        record.msickness.substring(0,35)+'...' : record.msickness):""
                }
            })
            this.setState({
                total: res.data.total,
                data: res.data.records,
                current: res.data.current,
                spinning:false
            })
        }).catch(()=>{
            this.setState({
                spinning:false
            })
        })
    }
    completeQuery=()=>{
        this.props.history.goBack()
    }
    viewRecord=(item:any)=>{
        console.log(item);
        this.props.history.push({
            pathname:`/medicalRecord/RecordDetail/${item}`,
           })
    }
    render() {

        const {data}=this.state
        const columns = [
            {
              title: '上传日期',
              dataIndex: 'createTime',
              key: 'createTime',
              AlignType:'center',
            },
            {
              title: '病历内容',
              dataIndex: 'msickness',
              key: 'msickness',
              AlignType:'center',
            },
            {
              title: '操作',
              key: 'action',
              AlignType:'center',
              //text.id从0开始
              render: (text:any) => (<Button type="primary" danger onClick={()=>this.viewRecord(text.mid)}>查看</Button> ),
            },
          ];
          const IconAndText = (obj:{ icon:any, text:string }) => (
            <div>
              {React.createElement(obj.icon)}&nbsp;&nbsp;
              {obj.text}
            </div>
          );
        return (
            <DocumentTitle title={'查看病历'}>
                <Card title={<IconAndText icon={ProfileTwoTone } text="查看病历"/>} >
                    <Spin tip="Loading..." spinning={this.state.spinning}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey="mid"
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
        )
    }
}
