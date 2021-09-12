import * as React from 'react';
import '@/styles/home.less';
import "antd/dist/antd.css";
import "@/css/home.css";
import '@/styles/sider.less';


class HomeContent extends React.Component<any> {
    render() {
        return (
            <div className="content clearfix">
                <div>
                    <div className="content-bt">项目简介</div>
                    <div id="vsb_content_5801_u131">
                        <div id="vsb_content">
                            <p style={{textIndent: "2em",marginLeft:"2%",marginRight:"2%"}}>基于conflux的医疗助手平台将患者的医疗数据经过处理后上传至区块链，实现医疗数据的去中心化、可溯源、不可篡改。</p>
                            <p style={{textIndent: "2em",marginLeft:"2%",marginRight:"2%"}}>该平台的主要目的旨在实现医疗机构之间的数据互通，为医疗机构提供可验证，可追溯的跨机构数据保障；同时也方便患者进行转院与居家看护等操作，社区医院或转入医院可从链上直接提取患者数据，避免了中途繁琐的手续，解决了医疗数据孤岛问题。</p>
                            <p style={{textIndent: "2em"}}>此外，患者也可通过医疗助手平台的健康画像功能对自身的健康状况有一个清楚且直观的认识，并可以根据自身情况进行线上问诊，实现线上线下医护结合。</p>
                        </div>
                    </div>
                    <div className="content-bt">解决痛点</div>
                    <div id="vsb_content_5801_u131">
                        <div id="vsb_content">
                            <p style={{textIndent: "2em",marginLeft:"2%",marginRight:"2%"}}>数据孤单：当下的众多医疗机构之间医疗数据不互通，患者在办理转院手续或在新的医院就诊时需要自己提供过往的医疗记录，而医院则需要验证数据的真实性，这对于双方而言都是一项艰巨而耗时的任务。</p>
                            <p style={{textIndent: "2em",marginLeft:"2%",marginRight:"2%"}}>线下问诊：当前无论病情的大小，患者都需要前往医院做线下问诊，这无形中增加了医院线下问诊的压力，同时也增加了患者就诊的成本。对于一些情况轻微可快速诊断的疾病，远程诊断能够帮助患者缩短诊断周期和成本。</p>
                            <p style={{textIndent: "2em",marginLeft:"2%",marginRight:"2%"}}>隐私问题：医疗记录与患者的身体状况密切相关，于患者而言，他们更倾向于只展示对当前诊断有帮助的部分医疗记录而非全部数据，另外当数据上传至网络中时需要考虑数据的隐私安全，数据应仅向授权的单位展示。</p>
                        </div>
                    </div>
                    <div className="content-bt">项目特征</div>
                    <div id="vsb_content_5801_u131">
                        <div id="vsb_content">
                            <p style={{textIndent: "2em",marginLeft:"2%",marginRight:"2%"}}>数据共享：实现医疗机构之间的数据连通，提供一个安全，真实，高效的医疗数据共享平台。</p>
                            <p style={{textIndent: "2em",marginLeft:"2%",marginRight:"2%"}}>隐私保护：患者可以选择性地提供有利于当前诊断的关键信息，其他人无法在未授权的情况下获取患者的医疗记录。</p>
                            <p style={{textIndent: "2em",marginLeft:"2%",marginRight:"2%"}}>线上问诊：患者可以通过在线挂号问诊，医生通过患者提供的医疗记录对患者病情做出初步判断，并且医生可以通过流转处方单的方式为患者提供药店购药的凭据。</p>
                            <p style={{textIndent: "2em",marginLeft:"2%",marginRight:"2%"}}>健康医疗画像：平台通过分析用户的过往记录推测出用户当前的身体状况，能够帮助用户预知可能出现的身体疾病。</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeContent