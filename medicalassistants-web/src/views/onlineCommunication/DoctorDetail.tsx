import * as React from "react"
import DocumentTitle from 'react-document-title';
import {Card,
    Avatar,
    Space, 
    Typography,
    Divider,
    Tooltip,
    Button,

    } from 'antd'
import {
    CommentOutlined,
    PhoneOutlined,
    } from "@ant-design/icons";
import "../../styles/doctorDetail.less"
const { Meta } = Card;
const { Text,Title ,Paragraph} = Typography;
interface DataDemo{
    id:number,
    // href: string,
    title: string,
    avatar: string,
    description: string,
    content: string,
    price:number,
    consultNumber:number,
    experience:number,
    specialtys:string,
    phoneNumber:string,
  }
interface IState{
    doctorList:any,
}
export default class DoctorDetail extends React.Component<any,IState>{
    constructor(props:any){
        super(props);
        console.log("props: ",props);
        //模拟后台数据
        const listData = [];
        for (let i = 0; i < 23; i++) {
            listData.push({
                id:i,
                // href: 'https://ant.design',
                title: `医生姓名 ${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description:
                '头衔证书1 头衔证书2 头衔证书3 头衔证书4 头衔证书5 头衔证书6 头衔证书7',
                content:
                '个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述  个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述s',
                price:10,
                consultNumber:200,
                experience:5,
                specialtys:'领域1 领域2 领域3 最多四个',
                phoneNumber:'18638762382',
            });
        }
        //根据路由传来的id匹配doctorList
        const {id}=this.props.match.params
        const findResult=listData.find((doctorObj:any)=>{
            return doctorObj.id==id
        })
        this.state={
            doctorList:findResult,
        }
    }
    componentDidMount() {
      //console.log("componentDidMount");
      }
    
    render(){
        const {doctorList}=this.state;
        const deacriptionList=doctorList.description.split(" ");
        const specialtyList=doctorList.specialtys.split(" ");

        return(
            <DocumentTitle title={'线上问诊'}>
            <div>
                <Card
                    style={{padding:"0px 40px"}}
                >
                    <div style={{textAlign:"center"}}>
                        <Avatar size={90} src={doctorList.avatar} />
                    </div>
                    <div style={{textAlign:"center"}}>
                    <Meta
                    //avatar={<Avatar size="large" src={doctorList.avatar}  />}
                    title={doctorList.title}
                    description="接诊时间 8:00-12:00 14:00-20:00"
                    />
                    <br/>
                    <div style={{textAlign:"center"}}>
                    <Space direction="horizontal" >
                        <Space direction="vertical" size={1}>
                        <Text strong>{`${doctorList.consultNumber}人`}</Text>
                        <Text >咨询人数</Text>
                        </Space>
                        <Divider type="vertical" style={{color:"black" }}/>
                        <Space direction="vertical" size={1}>
                        <Text strong>{deacriptionList[0]}</Text>
                        <Text >首要资质</Text>
                        </Space>
                        
                        <Divider type="vertical" />
                        <Space direction="vertical" size={1}>
                        <Text strong>{doctorList.experience}</Text>
                        <Text >从业年限</Text>
                        </Space>
                        
                    </Space>
                    </div>
                    </div>
                    <br/>
                    <div style={{backgroundColor:"rgb(100, 184, 165)",padding:"10px 10px"}}>
                        <Paragraph style={{color:"white"}}>{doctorList.content}</Paragraph>
                    
                    </div>
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <div style={{width:"30%",margin:"10px 20px 10px 0px" }}>
                            <Text strong>平台认证资质</Text>
                            <Paragraph>
                                <ul>
                                {
                                    deacriptionList.map((description:any,index:any)=>{
                                        return (
                                            <li key={index} style={{listStyle:"disc",color:"rgb(100, 184, 165)"}}><span style={{color:"black"}}>{description}</span></li>
                                        )
                                        
                                    })
                                }
                                </ul>
                            </Paragraph>
                        </div>
                        <div style={{width:"30%",margin:"10px 20px 10px 0px" }}>
                                <Text strong>擅长领域</Text>
                            <div className="space-align-container">
                                    {
                                        specialtyList.map((specialty:any,index:any)=>{
                                            return(
                                                <div key={index} className="space-align-block">
                                                    <Space style={{color:"white"}}>
                                                        {specialty}
                                                    </Space>
                                                </div>
                                            )
                                        })
                                    }
                            </div>
                        </div>
                        <div style={{width:"40%",margin:"10px 0px 10px 20px"}}>
                            <Space direction="vertical" size={15}>
                            <Text strong>收费标准</Text>
                            <div style={{width:"90%",padding:"10px 10px 10px 80px",textAlign:"center"}}>
                                <Space direction="horizontal" size={100}>
                                    <Space direction="vertical" size={4}>
                                        <Space direction="vertical" size={1}>
                                        <Button shape="circle" style={{width: "60px",height: "60px",backgroundColor:"rgb(100, 184, 165)"}} icon={<CommentOutlined style={{fontSize:"25px",color:"white"}}/>} />
                                        <Text strong>文字咨询</Text>
                                        <Text type="warning">{`￥${doctorList.price}元`}</Text>
                                        </Space>
                                        <Button shape="round" style={{backgroundColor:"rgb(100, 184, 165)",color:"white"}}>预约</Button>
                                    </Space>
                                    <Space direction="vertical" size={4}>
                                        <Space direction="vertical" size={1}>
                                        <Button shape="circle" style={{width: "60px",height: "60px",backgroundColor:"rgb(100, 184, 165)"}} icon={<PhoneOutlined  style={{fontSize:"25px",color:"white"}}/>} />
                                        <Text strong>语音咨询</Text>
                                        <Text type="warning">{`￥${doctorList.price}元`}</Text>
                                        </Space>
                                        {/*可做成页面，显示电话*/}
                                        <Tooltip title={`联系方式: ${doctorList.phoneNumber}`}>
                                        <Button shape="round" style={{backgroundColor:"rgb(100, 184, 165)",color:"white"}}>预约</Button>
                                        </Tooltip>
                                    </Space>
                                </Space>
                            </div>
                            </Space>
                        </div>
                    
                    </div>
                    <br/>
                    <br/>
                    <Paragraph>
                        <div style={{textAlign:"center"}}>
                        <Space direction="horizontal" size={230} >
                            <li style={{listStyle:"disc",color:"rgb(100, 184, 165)",float:"left"}}><span style={{color:"black"}}>医师资料100%真实</span></li>
                            <li style={{listStyle:"disc",color:"rgb(100, 184, 165)",float:"left"}}><span style={{color:"black"}}>来访者隐私安全</span></li>
                            <li style={{listStyle:"disc",color:"rgb(100, 184, 165)",float:"left"}}><span style={{color:"black"}}>支持退款</span></li>
                            <li style={{listStyle:"disc",color:"rgb(100, 184, 165)",float:"left"}}><span style={{color:"black"}}>医心平台严格审核</span></li>
                        </Space>
                        </div>
                    </Paragraph>
                    <Typography>
                        <Text strong>预约须知</Text>
                        <br/>
                        <br/>
                        <Paragraph>
                        <Text strong>可预约时间</Text>
                        <br></br>
                        <Text>
                        北京时间周一到周日8：00--19：00可以安排咨询
                        </Text>
                        <br/>
                        <Text strong>若变更预约</Text>
                        <br/>
                        <Text>
                        为了保证对咨询认真的态度与效果，咨询需要按时到场。如果因为不可抗力需要变更或取消已协商好的咨询预约，请务必提前24小时联络；否则咨询将如期开始，费用不退。
                        </Text>
                        <br/>
                        <Text strong>爽约/迟到</Text>
                        <br/>
                        <Text>
                        为了保证对咨询的认真态度和咨询效果，咨询需要按时到场，如有迟到，按事先约定的时间默认开始，并扣费，不予补时。
                        </Text>
                        </Paragraph>
                    </Typography>
                </Card>
            </div>
            </DocumentTitle>
        )
    }
}