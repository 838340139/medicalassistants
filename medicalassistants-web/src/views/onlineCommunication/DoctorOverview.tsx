import * as React from "react"
import DocumentTitle from 'react-document-title';
import {Card,
    Tooltip,
    Input,
    Avatar,
    Button,
    Skeleton,
    List,
    Space} from 'antd'
import {
    RightCircleTwoTone,
    AccountBookTwoTone,
    IdcardTwoTone,
    MedicineBoxTwoTone,
    CalendarTwoTone,
    } from "@ant-design/icons";
import { queryDoctorPage } from '@/utils/api';
interface DataDemo{
  id:number,
  title: string,
  avatar: string,
  description: string,
  content: string,
  price:number,
  experience:number,
  //consultNumber:number,
  // specialtys:string,
  // phoneNumber:string,
   // href: string,
}
interface IState{
    initLoading: boolean,
    loading: boolean,
    data: DataDemo[],
    list: DataDemo[],
    counter:number,
    inputValue:string,

}
export default class DoctorOverview extends React.Component<any,IState>{
    constructor(props:any){
        super(props);
        const listData = [];
    //     for (let i = 0; i < 23; i++) {
    //     listData.push({
    //     id:i,
    //     // href: 'https://ant.design',
    //     title: `医生姓名 ${i}`,
    //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     description:
    //       '头衔证书1 头衔证书2 头衔证书3 头衔证书4 头衔证书5  头衔证书6 头衔证书7',
    //     content:
    //       '个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述  个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述 个人简介-概述s',

    //     price:10,
    //     experience:5,
    //     //consultNumber:200,
    //     // specialtys:'领域1 领域2 领域3 最多四个',
    //     // phoneNumber:'18638762382',
    //   });
    // }

        this.state={
            initLoading: true,
            loading: false,
            data: [],
            list: [],
            counter:0,
            inputValue:'',

        }
    }

    componentDidMount() {
      let {counter}=this.state;
      let params={
        current:counter,
        size:3,
        param:{}
      }
      counter+=2
      queryDoctorPage(params)
        .then((res:any)=>{
            if(res.success){
              this.setState({
                initLoading: false,
                list: res.data.records,
                counter:counter
              });
            }else {
              this.setState({
                list: [],
              })
          }

        })


      }

    // getData = () => {
    //   let {counter,data}=this.state;
    //   const raw_counter=counter;
    //   let three_data:any=[];
    //   let cnt=0;
    //   for(let i=counter;i<data.length;i++){
    //     three_data.push(data[i]);
    //     cnt+=2;
    //     if(cnt===3){
    //       cnt=0;
    //       break;
    //     }
    //     }
    //   this.setState({counter:counter+3})

    //   console.log(`getData ${raw_counter}-${counter} three_data:`,three_data);
    //   return three_data;
    //   };

    onLoadMore = () => {
      let {counter}=this.state;
      let params={
        current:counter,
        size:3,
        param:{}
      }
      counter+=2
      queryDoctorPage(params)
        .then((res:any)=>{
            if(res.success){
              const three_list= this.state.list.concat(res.data.records);
              this.setState(
                {
                list: three_list,
                loading: false,
                counter:counter
                },
                () => {
                  window.dispatchEvent(new Event('resize'));
                },
              );
            }else {
              this.setState({
                list: [],
              })
          }
        })
      };
    handleChange=(event:any)=>{
        this.setState({inputValue: event.target.value});
    }
    searchDoctor=()=>{
      //根据输入内容，向后台请求返回搜索的结果
      const {inputValue}=this.state
      let params={
        current:1,
        size:3,
        param:{keyword:inputValue}
      }
      queryDoctorPage(params)
        .then((res:any)=>{
            if(res.success){
              console.log("搜索关键字-res.data.records:",res.data.records)
              this.setState(
                {
                  initLoading: false,
                  list: res.data.records,
                },
                () => {
                  window.dispatchEvent(new Event('resize'));
                },
              );
            }else {
              this.setState({
                list: [],
              })
          }
        })
    }
    routerTo=(item:any)=>{
      this.props.history.push({
        pathname:`/onlineCommunication/OnlineQuery/${item.phId}`,
        //state:{data:item}
      })
    }

    render(){
        const { initLoading, loading, list,} = this.state;
        const loadMore =
              !initLoading && !loading ? (
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                  }}
                >
                  <Button onClick={this.onLoadMore}>查看更多</Button>
                </div>
              ) : null;
        const extra=(
            <span>
            <Input placeholder="输入关键字搜索" onChange={this.handleChange} style={{width:150,margin:'0 15px'}}></Input>
            <Button type="primary" onClick={()=>this.searchDoctor()}>搜索</Button>
            </span>
            )
        const IconText = (obj:{ icon:any, text:string }) => (
              <Space>
                {React.createElement(obj.icon)}
                {obj.text}
              </Space>
            );
        return(
          <DocumentTitle title={'线上问诊'}>
            <div>

                <Card title={<IconText icon={MedicineBoxTwoTone} text="医师概览"/>} extra={extra}>
                    <List
                        className="demo-loadmore-list"
                        loading={initLoading}
                        //itemLayout="horizontal"
                        itemLayout="vertical"
                        loadMore={loadMore}
                        dataSource={list}
                        renderItem={(item:any) => (
                          <List.Item
                          key={item.phId}
                          actions={[
                            <IconText icon={AccountBookTwoTone} text={`￥/h`} key="list-vertical-price" />,
                            // <IconText icon={IdcardTwoTone} text={`已有${item.consultNumber}人咨询`} key="list-vertical-consultNumber" />,
                            <IconText icon={MedicineBoxTwoTone} text={`从业5年以上`} key="list-vertical-message" />,
                            <IconText icon={CalendarTwoTone} text="接诊时间 8:00-12:00 14:00-20:00" key="list-vertical-schedule" />,
                          ]}
                          extra={
                              <Button type="primary" onClick={()=>this.routerTo(item)}><RightCircleTwoTone />点击咨询</Button>
                          }
                        >
                          <Skeleton avatar title={false} loading={item.loading} active>
                          <List.Item.Meta
                            avatar={<Avatar src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.fh21.com.cn%2Ffhfile1%2FM00%2F5C%2F47%2FoYYBAFoCbcOAKtdVAABoh_Ao7-c77.jpeg&refer=http%3A%2F%2Ffile.fh21.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633943683&t=4a5094865a5b98c189af557882d14de4' />}
                            //title={<a href={item.href}>{item.title}</a>}
                            title={item.phName}
                            description={item.phTitle}
                          />
                          {item.phIntro}
                          </Skeleton>
                        </List.Item>

                        )}
                    />
                </Card>
            </div>
            </DocumentTitle>
        )
    }
}
