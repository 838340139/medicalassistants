import { Button, Card ,Table, Tag, Space,List,Typography,Spin} from 'antd';
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title';
import {FileTextTwoTone} from "@ant-design/icons";
import {ownOneRecord, patientMedi} from "@/utils/api";
import store from '@/store';

interface RecordDemo{
    id:number,
    date:string,
    name:string,
    gender:string,
    age:number,
    disease:string,
    symptom:string,
    caseHistory:string,
    medicalCheck:string,
    solution:string,
}
interface IState{
    data:any,
    spinning:boolean
}
const {Text}=Typography
export default class RecordDetail extends React.Component<any,IState>{
    constructor(props:any){
        super(props)
        let {id} = props.match.params
        this.state={
            data:{
                mid:id,
                mname:'',
                msex:'',
                mage:'',
                msickness:'',
                msyndrome:'',
                mhistory:'',
                mcheck:'',
                mtreatment:''
            },
            spinning:false
        }
    }
    componentDidMount(){
        this.loadData(this.state.data.mid)
    }
    loadData(mid:bigint){
        this.setState({
            spinning: true
        })
        let queryFun = (store.getState() as any).user.data.userType=='huanzhe'?ownOneRecord:patientMedi
        queryFun({
            mid:mid
        }).then((res:any)=>{
            if(res.code === 200){
                this.setState({
                    data: res.data
                })
            }
        }).finally(()=>{
            this.setState({
                spinning: false
            })
        })
    }
    goBack=()=>{
        this.props.history.goBack()
    }
    render() {
        const {data}=this.state
        const extra=(
            <Space size={30}>
            <Text>{data.date}</Text>
            <Button type="primary" onClick={()=>this.goBack()}>返回</Button>
            </Space>
            )
        const IconAndText = (obj:{ icon:any, text:string }) => (
                <div>
                  {React.createElement(obj.icon)}&nbsp;&nbsp;
                  {obj.text}
                </div>
              );

        return (
            <DocumentTitle title={'病历信息'}>
                <Card title={<IconAndText icon={FileTextTwoTone } text="病历信息"/>} extra={extra}>
                    <Spin tip="Loading..." spinning={this.state.spinning}>
                        <Card type="inner" >
                            <Card title="患者信息"><Space size={5}>{data.mname}{data.msex}{data.mage}</Space></Card>
                            <Card title="所患疾病">{data.msickness}</Card>
                            <Card title="主要症状">{data.msyndrome}</Card>
                            <Card title="现在病史">{data.mhistory}</Card>
                            <Card title="医学检查">{data.mcheck}</Card>
                            <Card title="治疗方案">{data.mtreatment}</Card>
                        </Card>
                    </Spin>

                </Card>

            </DocumentTitle>
        )
    }
}
