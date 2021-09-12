import { Button, Space,Descriptions, Badge ,Typography,Card} from 'antd';
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title';
import {FileTextTwoTone,CalendarTwoTone} from "@ant-design/icons";
import {ownOneRecord, prescritionDetail, queryPres} from "@/utils/api";
const {Text}=Typography;
interface PrescriptionDemo{
    id:number,
    cardId:string,
    name:string,
    gender:string,
    age:number,
    disease:string,
    Rp:string,
}
interface IState{
    data:any,
    spinning:boolean,
    type:any
}

export default class RecordDetail extends React.Component<any,IState>{
    constructor(props:any){
        super(props)
        const listData=[]
        for (let i = 0; i < 23; i++) {
            listData.push({
                id:i,
                cardId:"41235645391212025X",
                name:`患者姓名${i}`,
                gender:"男",
                age:50,
                disease:"风湿性心脏病",
                Rp:"药物1-剂量-使用频次-药物数量 药物2-剂量-使用频次-药物数量 药物3-剂量-使用频次-药物数量 药物4-剂量-使用频次-药物数量",
          });
        }
        const {id, type}=this.props.match.params
        const findResult=listData.find((prescriptionObj:any)=>{
            return prescriptionObj.id==id
        })
        this.state={
            data:{
                pid:id,
                idnumber:'',
                pname:'',
                psex:'',
                page:'',
                pdiagnosis:'',
                createTime:'',
                medicines:'',
                medicalAdvice:'',
            },
            spinning:false,
            type:type
        }

    }
    componentDidMount(){
        this.loadData(this.state.data.pid)
    }
    loadData(pid:bigint){
        this.setState({
            spinning: true
        })
        let queryFun = this.state.type=='patient'?prescritionDetail:queryPres
        queryFun({
            pid:pid
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
        const {id}=this.props.match.params
        const extra=(
            <Button type="primary" onClick={()=>this.goBack()} style={{marginRight:"2%",float:"right"}}>返回</Button>
            )
        const IconAndText = (obj:{ icon:any, text:string }) => (
                <div>
                  {React.createElement(obj.icon)}&nbsp;&nbsp;
                  {obj.text}
                </div>
              );
        const {data}=this.state
        const Rp=data.medicalAdvice.split(" ")
        return (
            <DocumentTitle title={<IconAndText icon={FileTextTwoTone } text="处方单信息"/>} >
                <div>
                <Card extra={<IconAndText icon={CalendarTwoTone} text={data.createTime.replace("T", " ")} />}>
                <Descriptions title="处方单" bordered style={{textAlign:"center",marginTop:"2%",marginBottom:"2%",marginLeft:"2%",marginRight:"2%"}}>
                    <Descriptions.Item label="身份证号" span={3}>{data.idnumber}</Descriptions.Item>
                    <Descriptions.Item label="姓名">{data.pname}</Descriptions.Item>
                    <Descriptions.Item label="性别">{data.psex==1?'男':'女'}</Descriptions.Item>
                    <Descriptions.Item label="年龄">{data.page}</Descriptions.Item>
                    <Descriptions.Item label="临床诊断" span={3}>
                        {data.pdiagnosis}
                    </Descriptions.Item>
                    <Descriptions.Item label="医嘱" span={3}>
                        {data.medicalAdvice}
                    </Descriptions.Item>
                    <Descriptions.Item label="Rp" style={{height:"40%"}}>
                        <Space direction="vertical" >
                        {
                            // data.medicines.map((medicineItem:any,index:any)=>{
                            //     return(
                            //         <Text key={index}>{medicineItem}</Text>
                            //     )
                            // })
                            <Text>{data.medicines}</Text>
                        }
                        </Space>

                    </Descriptions.Item>
                </Descriptions>
                {extra}
                </Card>
                </div>
            </DocumentTitle>
        )
    }
}
