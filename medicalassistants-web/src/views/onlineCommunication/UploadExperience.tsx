import * as React from "react"
import DocumentTitle from 'react-document-title';

import {Card, Form, Input, InputNumber, Button } from 'antd';
import {MedicineBoxTwoTone,} from "@ant-design/icons";


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
export default class UploadExperience extends React.Component<any,IState>{
    constructor(props:any){
        super(props);
        //console.log("props: ",props);
        //模拟后台数据
        // const listData = [];
        // for (let i = 0; i < 23; i++) {
        //     listData.push({
        //     id:i,
        //     title: `病症 ${i}`,
        //     introduce:
        //       '这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介，这是一段作者简介。',
        //     description:'这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述，这是一段病症概述。',
        //     content:
        //       '这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容，这是一段有关病症经验帖的详细内容。',
        //   });
        // }
        //根据路由传来的id匹配experienceList
        // const {id}=this.props.match.params
        // const findResult=listData.find((experienceObj:any)=>{
        //     return experienceObj.id==id
        // })
        //console.log("findResult:",findResult);
        // this.state={
        //     experienceObj:findResult,
        // }
       // console.log("experienceObj:",this.state.experienceObj);
    }
    componentDidMount() {
      }
    
    render(){
        //const {experienceObj}=this.state;
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
          };
        const validateMessages = {
            required: '请输入${label}信息',
            
          };
          /* eslint-enable no-template-curly-in-string */
        const IconAndText = (obj:{ icon:any, text:string }) => (
            <div>
              {React.createElement(obj.icon)}&nbsp;&nbsp;
              {obj.text}
            </div>
          );
        const onFinish = (values: any) => {
              console.log("输入的信息：",values);
            };
        return(
            <DocumentTitle title={'分享经验'}>
                <Card title={<IconAndText icon={MedicineBoxTwoTone} text="分享经验"/>} style={{padding:"0px 40px"}}>
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name={['experience', 'title']} label="标题" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['experience', 'introduction']} label="作者简介" rules={[{ required: true }]}>
                            <Input.TextArea placeholder="介绍一下自己吧..." autoSize={{ minRows: 3, maxRows: 5 }}/>
                        </Form.Item>
                        <Form.Item name={['experience', 'description']} label="病症概述" rules={[{ required: true }]}>
                            <Input.TextArea placeholder="概述一下病症有哪些吧..." autoSize={{ minRows: 3, maxRows: 5 }}/>    
                        </Form.Item>
                        <Form.Item name={['experience', 'content']} label="正文" rules={[{ required: true }]}>
                            <Input.TextArea placeholder="传授一下经验吧..." autoSize={{ minRows: 5, maxRows: 7 }}/>
                        </Form.Item>
                        {/* <Form.Item name={['experience', 'email']} label="Email" rules={[{ type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['experience', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name={['experience', 'website']} label="Website">
                            <Input />
                        </Form.Item> */}
                        
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                            <Button type="primary" htmlType="submit">
                            分享
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </DocumentTitle>
        )
    }
}

