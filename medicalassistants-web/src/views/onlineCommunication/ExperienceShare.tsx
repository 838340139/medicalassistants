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
    IdcardTwoTone,
    MedicineBoxTwoTone,
    PlusOutlined,
    } from "@ant-design/icons";
interface DataDemo{
  id:number,
  title: string,
  introduce:string,
  description: string,
  content: string,
 
}
interface IState{
    initLoading: boolean,
    loading: boolean,
    data1: DataDemo[],
    data2: DataDemo[],
    list1: DataDemo[],
    list2:DataDemo[],
    counter:number,
    key: string,
    
}
const tabList = [
  {
    key: 'tab1',
    tab: '经验分享',
  },
  {
    key: 'tab2',
    tab: '我的分享',
  },
];

export default class ExperienceShare extends React.Component<any,IState>{
    constructor(props:any){
        super(props);
        const listData1 = [];
        for (let i = 0; i < 23; i++) {
        listData1.push({
        id:i,
        title: `病症 ${i}`,
        introduce:
          '这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介。',
        description:'这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述。',
        content:
          '这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容。',
      });
    }
        const listData2 = [];
        for (let i = 0; i < 6; i++) {
        listData2.push({
        id:i,
        title: `病症 ${i}(我分享的数据...)`,
        introduce:
          '这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介。',
        description:'这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述。',
        content:
          '这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容。',
      });
    }
    
        this.state={
            initLoading: true,
            loading: false,
            data1: listData1,
            data2: listData2,
            list1: [],
            list2: [],
            counter:0,
            key:'tab1',
            
        }
        console.log(listData1);
        console.log(listData2);
    }
    
    componentDidMount() {
      const {data1,data2,list1,list2}=this.state
      const res1=this.getData1()
      const res2=this.getData2()
        this.setState({
          initLoading: false,
          list1: res1,
          list2:res2,
        });
        
      }
    
    getData1 = () => {
      let {counter,data1}=this.state;
      const raw_counter=counter;
      let three_data:any=[];
      let cnt=0;
      for(let i=counter;i<data1.length;i++){
        three_data.push(data1[i]);
        cnt+=1;
        if(cnt===3){
          cnt=0;
          break;
        }
        }
      this.setState({counter:counter+3})
      //counter=counter+3;
      console.log(`getData1 ${raw_counter}-${counter} three_data:`,three_data);
      return three_data;
      };
    getData2 = () => {
        let {counter,data2}=this.state;
        const raw_counter=counter;
        let three_data:any=[];
        let cnt=0;
        for(let i=counter;i<data2.length;i++){
          three_data.push(data2[i]);
          cnt+=1;
          if(cnt===3){
            cnt=0;
            break;
          }
          }
        this.setState({counter:counter+3})
        //counter=counter+3;
        console.log(`getData2 ${raw_counter}-${counter} three_data:`,three_data);
        return three_data;
        };
    onLoadMore1 = () => {
      const {list1}=this.state
      const res=this.getData1()
      const three_list= this.state.list1.concat(res);
      this.setState(
            {
              list1: three_list,
              loading: false,
            },
            () => {
              window.dispatchEvent(new Event('resize'));
            },
          );
        
      };
    onLoadMore2 = () => {
        const {list2}=this.state
        const res=this.getData2()
        const three_list= this.state.list2.concat(res);
        this.setState(
              {
                list2: three_list,
                loading: false,
              },
              () => {
                window.dispatchEvent(new Event('resize'));
              },
            );
          
        };
    addExperience=()=>{
        this.props.history.push({
            pathname:`/onlineCommunication/UploadExperience`,
          })
    }
    routerTo=(item:DataDemo)=>{
      this.props.history.push({
        pathname:`/onlineCommunication/ExperienceDetail/${item.id}`,
        //state:{data:item}
      })
    }
    onTabChange = (key1:any) => {
      console.log(key1)
      let {key}=this.state;
      this.setState({ key: key1 });
      console.log(this.state.key,key1);
    };
    render(){
        const { initLoading, loading, list1,list2,key} = this.state;
        
        const loadMore1 =
              !initLoading && !loading ? (
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                  }}
                >
                  <Button onClick={this.onLoadMore1}>查看更多</Button>
                </div>
              ) : null;
        const loadMore2 =
              !initLoading && !loading ? (
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                  }}
                >
                  <Button onClick={this.onLoadMore2}>查看更多</Button>
                </div>
              ) : null;
        const title=(
            <Space>
                经典案例
            </Space>
        )
        const extra=(
            <span>
            <Button type="primary" onClick={()=>this.addExperience()}><PlusOutlined />分享经验</Button>
            </span>
            )
        const IconAndText = (obj:{ icon:any, text:string }) => (
          <div>
            {React.createElement(obj.icon)}&nbsp;&nbsp;
            {obj.text}
          </div>
        );
        let contentList:any;
        contentList = {
          tab1: <List
                    className="demo-loadmore-list"
                    loading={initLoading}
                    itemLayout="vertical"
                    loadMore={loadMore1}
                    dataSource={list1}
                    renderItem={(item:any) => (
                      <List.Item
                      key={item.id}
                      extra={
                        <Tooltip title="更多经验详情">
                          <Button shape="circle" icon={<RightCircleTwoTone />} onClick={()=>this.routerTo(item)}/>
                        </Tooltip>
                      }
                    >
                      <Skeleton avatar title={false} loading={item.loading} active>
                      <List.Item.Meta
                        title={item.title}
                        description={<IconAndText icon={IdcardTwoTone} text={item.introduce} key={item.id} />}
                      />
                      <IconAndText icon={MedicineBoxTwoTone} text={item.description} key={item.id}/>
                      </Skeleton>
                    </List.Item>
                    )}
                />,
          tab2: <List
                    className="demo-loadmore-list"
                    loading={initLoading}
                    itemLayout="vertical"
                    loadMore={loadMore2}
                    dataSource={list2}
                    renderItem={(item:any) => (
                      <List.Item
                      key={item.id}
                      extra={
                        <Tooltip title="更多经验详情">
                          <Button shape="circle" icon={<RightCircleTwoTone />} onClick={()=>this.routerTo(item)}/>
                        </Tooltip>
                      }
                    >
                      <Skeleton avatar title={false} loading={item.loading} active>
                      <List.Item.Meta
                        title={item.title}
                        description={<IconAndText icon={IdcardTwoTone} text={item.introduce} key={item.id} />}
                      />
                      <IconAndText icon={MedicineBoxTwoTone} text={item.description} key={item.id}/>
                      </Skeleton>
                    </List.Item>
                    )}
                />,
        };
        return(
          <DocumentTitle title={'经验分享'}>
            <div>
            <Card
                
                title={title} 
                extra={extra}
                tabList={tabList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                  this.onTabChange(key);
                }}
              >
                {console.log("valueof of this.state.key:",this.state.key)}
              {
                contentList[this.state.key]
              }
                </Card>
            </div>
            </DocumentTitle>
        )
    }
}