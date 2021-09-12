import * as React from "react"
import DocumentTitle from 'react-document-title';
import {Card,
    Avatar,
    Space, 
    Typography,

    } from 'antd'
import {
    MedicineBoxTwoTone,
    } from "@ant-design/icons";
import "../../styles/doctorDetail.less"
const { Meta } = Card;
const { Text,Title ,Paragraph} = Typography;
interface DataDemo{
    id:number,
    title: string,
    introduce:string,
    description: string,
    content: string,

  }
interface IState{
    experienceObj:any,
}
export default class DoctorDetail extends React.Component<any,IState>{
    constructor(props:any){
        super(props);
        //console.log("props: ",props);
        //模拟后台数据
        const listData = [];
        for (let i = 0; i < 23; i++) {
            listData.push({
            id:i,
            title: `病症 ${i}`,
            introduce:
              '这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介。',
            description:'这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述。',
            content:
              '这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容。',
          });
        }
        //根据路由传来的id匹配experienceList
        const {id}=this.props.match.params
        const findResult=listData.find((experienceObj:any)=>{
            return experienceObj.id==id
        })
        //console.log("findResult:",findResult);
        this.state={
            experienceObj:findResult,
        }
       // console.log("experienceObj:",this.state.experienceObj);
    }
    componentDidMount() {
      }
    
    render(){
        const {experienceObj}=this.state;
        const IconAndText = (obj:{ icon:any, text:string }) => (
            <div>
              {React.createElement(obj.icon)}&nbsp;&nbsp;
              {obj.text}
            </div>
          );
        return(
            <DocumentTitle title={'经验分享'}>
                <Card title={<IconAndText icon={MedicineBoxTwoTone} text={experienceObj.title}/>} style={{padding:"0px 40px"}}>
                    <Space direction="vertical" size={20}>

                        <Space direction="vertical" size={5}>
                            <Text strong>作者简介：</Text>
                            <div style={{backgroundColor:"rgb(100, 184, 165)",padding:"10px 10px"}}>
                                <Paragraph style={{color:"white"}}>{experienceObj.introduce}</Paragraph>
                            </div>
                        </Space>

                        <Space direction="vertical" size={5}>
                            <Text strong>分享经验：</Text>
                            <div style={{backgroundColor:"rgb(100, 184, 165)",padding:"10px 10px"}}>
                                <Paragraph style={{color:"white"}}>{experienceObj.content}</Paragraph>
                            </div>
                        </Space>

                    </Space>
                </Card>
            </DocumentTitle>
        )
    }
}
