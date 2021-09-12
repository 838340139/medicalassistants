/* 描述: 首页模板
*  作者: Jack Chen
*  日期: 2020-08-09
*/

import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { Layout, Menu, Button, Table, Space, Pagination, Select } from 'antd';
import { IdcardOutlined, BankOutlined, FileOutlined, TeamOutlined, QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { HashRouter as Router, Route, Link } from "react-router-dom"
import '@/styles/home.less';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import "antd/dist/antd.css";
import '@/styles/sider.less';
import store from '@/store';
import UploadRecord from './medicalRecord/UploadRecord';
import StatusCertificate from './medicalRecord/StatusCertificate';
import TestContent from './medicalRecord/TestContent';
import ShowRecordPatient from './medicalRecord/ShowRecordPatient';
import HomeContent from './HomeContent';
import DoctorOverview from './onlineCommunication/DoctorOverview';
import DoctorDetail from './onlineCommunication/DoctorDetail';
import ExperienceShare from './onlineCommunication/ExperienceShare';
import ExperienceDetail from './onlineCommunication/ExperienceDetail';
import UploadExperience from './onlineCommunication/UploadExperience';
import HealthPortriat from './healthPortriat/HealthPortriat';
import Prescription from './prescription/Prescription';
import OnlineQuery from './onlineCommunication/OnlineQuery';
import UploadPrescription from './onlineCommunication/UploadPrescription';
import RecordDetail from './medicalRecord/RecordDetail';
import ShowPrescriptionPatient from './prescription/ShowPrescriptionPatient';
import ShowRecordDoctor from './medicalRecord/ShowRecordDoctor';
import ShowAuthorization from './medicalRecord/ShowAuthorization';
import PrescriptionDetailPatient from './prescription/PrescriptionDetailPatient';
import PatientOverview from './onlineCommunication/PatientOverview';
import Pic from "@/assets/Pic.png";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class Home extends React.Component<any> {
    // componentDidMount() {
    //     //console.log('componentDidMount===')
    // }

    // componentWillUnmount() {
    //     //console.log('componentWillUnmount===')
    // }


    render() {
        //用户类型: huanzhe 患者,yisheng 医生,yaodian 药店
        const userType = (store.getState() as any).user.data.userType;
        console.log('here userData: ', (store.getState() as any).user.data)

        {/* 页面，可以做成组件导入 */ }
        // const HomeContent

        return (
            <DocumentTitle title={'首页'}>
                <Layout style={{ minHeight: '100vh' }}>
                    {/* 菜单 */}
                    <Router>
                        <Sider>
                            <div className="logo"><img src={Pic} style={{width:"100%",height:"100%"}}/></div>

                            {/* 患者查看目录 */}
                            {
                                (userType === 'huanzhe') ? (
                                    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" >
                                        <Menu.Item key="1" icon={<BankOutlined />}>
                                            <Link to="/">首页</Link>
                                        </Menu.Item>
                                        {/* 患者 */}
                                        <SubMenu key="sub1" icon={<IdcardOutlined />} title="电子病历">
                                            <Menu.Item key="2">
                                                <Link to="/medicalRecord/UploadRecord">上传病历</Link>
                                            </Menu.Item>
                                            <Menu.Item key="3">
                                                <Link to="/medicalRecord/ShowRecordPatient">查看病历</Link>
                                            </Menu.Item>
                                            <Menu.Item key="9">
                                                <Link to="/medicalRecord/ShowAuthorization">查看授权</Link>
                                            </Menu.Item>
                                        </SubMenu>
                                        <Menu.Item key="4" icon={<TeamOutlined />}>
                                           <Link to="/healthPortrait/HealthPortrait">健康画像</Link>
                                        </Menu.Item>
                                        <SubMenu key="sub3" icon={<FileOutlined />} title="处方单">
                                            <Menu.Item key="6">
                                                <Link to="/prescription/ShowPrescriptionPatient">查看处方单</Link>
                                            </Menu.Item>
                                        </SubMenu>
                                        <SubMenu key="sub4" icon={<QuestionCircleOutlined />} title="线上咨询">
                                            <Menu.Item key="7">
                                                <Link to="/onlineCommunication/DoctorOverview">线上问诊</Link>
                                            </Menu.Item>
                                            {/*<Menu.Item key="8">*/}
                                            {/*    <Link to="/onlineCommunication/ExperienceShare">经验分享</Link>*/}
                                            {/*</Menu.Item>*/}
                                        </SubMenu>
                                    </Menu>
                                ) : null
                            }

                            {/* 医生查看目录 */}
                            {
                                (userType === 'yisheng') ? (
                                    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" >
                                        <Menu.Item key="1" icon={<BankOutlined />}>
                                            <Link to="/">首页</Link>
                                        </Menu.Item>
                                        <SubMenu key="sub1" icon={<IdcardOutlined />} title="电子病历">
                                            <Menu.Item key="3">
                                                <Link to="/medicalRecord/ShowRecordDoctor">查看病历</Link>
                                            </Menu.Item>
                                        </SubMenu>
                                        <SubMenu key="sub4" icon={<QuestionCircleOutlined />} title="线上咨询">
                                            <Menu.Item key="7">
                                                <Link to="/onlineCommunication/PatientOverview">线上问诊</Link>
                                            </Menu.Item>

                                            {/*<Menu.Item key="8">*/}
                                            {/*    <Link to="/onlineCommunication/ExperienceShare">经验分享</Link>*/}
                                            {/*</Menu.Item>*/}
                                        </SubMenu>
                                    </Menu>
                                ) : null
                            }

                            {/* 药店查看目录 */}
                            {
                                (userType === 'yaodian') ? (
                                    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" >
                                        <Menu.Item key="1" icon={<BankOutlined />}>
                                            <Link to="/">首页</Link>
                                        </Menu.Item>
                                        <SubMenu key="sub3" icon={<FileOutlined />} title="处方单">
                                            <Menu.Item key="3">
                                                <Link to="/prescription/Prescription">查看处方单</Link>
                                            </Menu.Item>
                                        </SubMenu>
                                    </Menu>
                                ) : null
                            }

                        </Sider>

                        <Layout className="site-layout">
                            <Header />
                            <Content style={{  backgroundColor: 'white' }}>
                                {/* 路由精确匹配 */}
                                <Route exact path='/' component={HomeContent}></Route>
                                <Route exact path='/medicalRecord/UploadRecord' component={UploadRecord}></Route>
                                <Route exact path='/medicalRecord/StatusCertificate' component={StatusCertificate}></Route>
                                <Route exact path='/medicalRecord/TestContent' component={TestContent}></Route>
                                <Route exact path='/medicalRecord/ShowRecordDoctor' component={ShowRecordDoctor}></Route>
                                <Route exact path='/medicalRecord/ShowAuthorization' component={ShowAuthorization}></Route>
                                <Route exact path='/medicalRecord/ShowRecordPatient' component={ShowRecordPatient}></Route>
                                <Route exact path='/onlineCommunication/DoctorOverview' component={DoctorOverview}></Route>
                                <Route exact path="/onlineCommunication/PatientOverview" component={PatientOverview} />
                                <Route exact path='/onlineCommunication/ExperienceShare' component={ExperienceShare}></Route>
                                <Route exact path='/onlineCommunication/UploadExperience' component={UploadExperience}></Route>
                                <Route exact path='/onlineCommunication/ExperienceDetail/:id' component={ExperienceDetail}></Route>
                                <Route exact path='/healthPortrait/HealthPortrait' component={HealthPortriat}></Route>
                                <Route exact path='/prescription/Prescription' component={Prescription}></Route>
                                <Route exact path='/onlineCommunication/OnlineQuery/:id' component={OnlineQuery}></Route>
                                <Route exact path='/onlineCommunication/UploadPrescription/:id' component={UploadPrescription}></Route>
                                <Route exact path='/medicalRecord/RecordDetail/:id' component={RecordDetail}></Route>
                                <Route exact path='/prescription/ShowPrescriptionPatient' component={ShowPrescriptionPatient}></Route>
                                <Route exact path='/prescription/PrescriptionDetailPatient/:id/:type' component={PrescriptionDetailPatient}></Route>

                            </Content>
                            <Footer />
                        </Layout>
                    </Router>
                </Layout>
            </DocumentTitle>
        )
    }
}

export default Home
