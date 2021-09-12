import React from 'react'
import { Layout } from 'antd';
import "antd/dist/antd.css";
import '@/styles/sider.less';
const {  Content } = Layout;
export default class StatusCertificate extends React.Component {
  render() {
    return (
      <div className="site-layout-background" style={{ padding: 24, minHeight: '100%', }}>
        状况证明...
      </div>
    );
  }
}