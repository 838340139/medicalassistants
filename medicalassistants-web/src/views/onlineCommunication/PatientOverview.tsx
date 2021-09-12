import React, { Component } from 'react'
import DocumentTitle from 'react-document-title';
import {
    Card,
    Input,
    Avatar,
    Button,
    Skeleton,
    List,
    Space,
    Comment,
    Form,
    Collapse,
    Pagination,
    Spin,
    message
} from 'antd'
import {
    UserOutlined,
    EditOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import store from '@/store';
import {queryQue, sendAns, sendQue} from "@/utils/api";
interface DataDemo {
    id: number,
    patientName: string,
    avatar: string,
    content: string,
}
interface IState {
    initLoading: boolean,
    loading: boolean,
    data: any,
    list: any,
    counter: number,
    value: string,
    submitting: boolean,
    comments: any,
    listcomments: any,
    pageSize:number,
    current:number,
    total:number,
    spinning:boolean,
}

export default class PatientOverview extends Component<any, IState> {
    constructor(props: any) {
        super(props);
        const listData = [];
        const listcomments = []
        for (let i = 0; i < 10; i++) {
            listData.push({
                id: i,
                patientName: `患者姓名 ${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: '',
            });
            const listcomment = [{
                author: '测试' + `${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: <p>{'测试用'}</p>
            }];
            listcomments.push(
                listcomment
            )
        }

        this.state = {
            initLoading: true,
            loading: false,
            data: listData,
            list: [],
            listcomments: listcomments,
            counter: 0,
            value: '',
            submitting: false,
            comments: [],
            pageSize:3,
            current:0,
            total:0,
            spinning:false,
        }
    }
    componentDidMount() {
        const { data, list } = this.state
        this.onLoadMore()
        // this.setState({
        //     initLoading: false,
        //     list: res,
        // });
    }
    onLoadMore(){
        this.setState({
            initLoading:true
        })
        queryQue({
            current:this.state.current+1,
            size:this.state.pageSize,
            param: {}
        }).then((res:any)=>{
            if(res.code == 200){
                let keyId = 0;
                if(res.data.records.length==0){
                    message.info("没有更多了");
                    return
                }
                res.data.records.forEach((record:any)=>{
                    record.question.createTime = record.question.createTime.replace("T","   ")
                    record.avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                    record.answers.forEach((answer:any)=>{
                        answer.createTime=answer.createTime.replace("T","   ")
                    })
                })
                console.log(res.data.records)
                this.setState({
                    total: res.data.total,
                    list: this.state.list.concat(res.data.records),
                    current: this.state.current+1
                })
            }
        }).finally(()=>{
            this.setState({
                initLoading:false
            })
        })
    }
    handleChange = (e: any) => {
        this.setState({
            value: e.target.value,
        });
    };
    handleSubmit = (id: any) => {
        if (!this.state.value) {
            return;
        }
        this.setState({
            submitting: true,
        });
        sendAns({
            content:this.state.value,
            qid:id
        }).then((res:any)=>{
            let list = this.state.list
            list.forEach((item:any)=>{
                if(item.question.qid == id){
                    item.answers.push(res.data)
                }
            })
            this.setState({
                submitting: false,
                list:list,
                value:""
            });
        })
    };
    // onLoadMore = () => {
    //     const res = this.getMoreData()
    //     const three_list = this.state.list.concat(res);
    //     this.setState(
    //         {
    //             list: three_list,
    //             loading: false,
    //         },
    //     //     () => {
    //     //         // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //     //         // In real scene, you can using public method of react-virtualized:
    //     //         // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    //     //         window.dispatchEvent(new Event('resize'));
    //     //     },
    //     );
    //
    // };
    // onLoadMore = () => {
    //     const res = this.getData()
    //     const three_list = this.state.list.concat(res);
    //     this.setState(
    //         {
    //             list: three_list,
    //             loading: false,
    //         },
    //         () => {
    //             // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //             // In real scene, you can using public method of react-virtualized:
    //             // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    //             window.dispatchEvent(new Event('resize'));
    //         },
    //     );
    //
    // };
    routerTo=(item:any)=>{
        console.log(item.id)
        this.props.history.push({
          pathname:`/onlineCommunication/UploadPrescription/${item.question.sender}`,
          //state:{data:item}
        })
      }
    render() {
        const { list, value, submitting, comments, listcomments } = this.state;
        const { initLoading, loading } = this.state;
        const username = (store.getState() as any).user.data.username
        console.log("111", (store.getState() as any).user.data);
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
                    <Button onClick={this.onLoadMore.bind(this)}>查看更多</Button>
                </div>
            ) : null;
        const { TextArea } = Input
        const { Panel } = Collapse;
        return (
            <DocumentTitle title={'线上问诊'}>
                <div id="patient-wrapper">
                    <Card title='问诊列表'>
                        <List
                            className="demo-loadmore-list"
                            loading={initLoading}
                            itemLayout="vertical"
                            loadMore={loadMore}
                            dataSource={list}
                            renderItem={(item: any) => {
                                let {question,answers} = item
                                return <div className={'listitem' + `${question.qid}`}>
                                    <List.Item key={question.qid} style={{ marginLeft: "150px", width: "80%" }} >
                                        <Skeleton avatar title={false} loading={question.loading} active >
                                            <Collapse accordion>
                                                <Panel header={question.senderName} key="1"
                                                       extra={<Button type="primary" onClick={()=>this.routerTo(item)}><LogoutOutlined />开具处方</Button>}>
                                                    <Comment
                                                        author={<a>{question.senderName}</a>}
                                                        avatar={
                                                            <Avatar
                                                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                                                alt="Han Solo" />
                                                        }
                                                        content={<p>{question.content}</p>}
                                                    >
                                                    </Comment>
                                                    {
                                                        <List
                                                            dataSource={answers}
                                                            header={`${answers.length} ${answers.length > 1 ? 'replies' : 'reply'}`}
                                                            itemLayout="horizontal"
                                                            key="anId"
                                                            renderItem={(prop: any) => (
                                                                <List.Item title={value} style={{ marginLeft: '50px' }}>
                                                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                                                    <div style={{ display: "block", fontSize: '14px', width: '1000px',paddingLeft: "10px"}}>
                                                                        {username+':   '}
                                                                        {prop['content']}
                                                                    </div>
                                                                </List.Item>
                                                            )}
                                                        />}
                                                    <Comment
                                                        avatar={
                                                            <Avatar style={{ backgroundColor: '#87d068', marginLeft: '50px' }} icon={<EditOutlined />} alt="医生" />
                                                        }
                                                        content={
                                                            <>
                                                                <Form.Item>
                                                                    <TextArea rows={4} style={{ width: '948px' }} placeholder={'请作出问诊回复'} onChange={(e) => this.handleChange(e)} value={value} />
                                                                </Form.Item>
                                                                <Form.Item>
                                                                    <Button htmlType="submit" loading={submitting} onClick={() => this.handleSubmit(question.qid)} type="primary">
                                                                        添加回复
                                                                    </Button>
                                                                </Form.Item>
                                                            </>
                                                        }
                                                    />
                                                </Panel>
                                            </Collapse>
                                        </Skeleton>
                                    </List.Item>
                                </div>
                            }}
                        />
                    </Card>
                </div>
            </DocumentTitle>
        )
    }
}
