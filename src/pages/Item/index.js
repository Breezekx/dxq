import React, { useState, useEffect } from 'react'
import { Card, Col, Row, Modal, Button, Input, Divider, Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import './index.css'
import titlePhoto from '../../assets/title.jpeg'
import companyPhoto from '../../assets/company.jpeg'

const Index = (props) => {



    useEffect(() => {
        fetch('http://localhost:3002/dxq/project').then(response => response.json())
            .then(data => setData(data.data))
    }, [])
    const { Meta } = Card;
    const { Search } = Input;
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])
    const [commit, setCommit] = useState([])
    const [company, setCompany] = useState(0)
    console.log(data)
    console.log(commit)
    const handleOk = () => {
        setVisible(false)
    }

    const handle = (e, key) => {
        setVisible(true)
        setCompany(key)
    }
    useEffect(() => {
        fetch(`http://localhost:3002/dxq/commentByCompany?cid=${data.length ? data[company].cid : 1}`).then(response => response.json())
            .then(data => setCommit(data.data))
    }, [company])
    return (
        <div className='item' >
            <div>
                <h2 style={{ display: 'inline-block' }} >项目列表</h2>
                <Search style={{ float: 'right', marginRight: '40px', width: '300px' }} placeholder="搜索企业或项目" allowClear />
            </div>
            <Row className='row'>

                {
                    data.map((item, key) => (
                        <Col span={6}>
                            <Card
                                key={key}
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={titlePhoto} />}
                            >
                                <Meta title={item.p_name} description={item.c_name} />
                                <br />
                                <span>文档链接：
                        <a href='/Users/wh-js/Dxq/short-term/src/2021-2022.doc' download>
                                        点击下载
                         </a>
                                </span>
                                <br />
                                <br />
                                <Button>接取任务</Button>
                                <Button onClick={e => handle(e, key)}>企业详情</Button>
                            </Card>
                        </Col>))
                }



            </Row>

            <Modal
                width='600px'
                visible={visible}
                title="企业详情"
                onOk={handleOk}
                onCancel={handleOk}
                footer={[
                    <Button
                        type="primary"
                        onClick={handleOk}
                    >
                        确定
            </Button>,
                ]}
            >
                <div className='modal' >
                    <div>
                        <img alt='' src={companyPhoto} width='200px' height='200px' />
                    </div>
                    <div style={{ marginLeft: '50px', display: 'inline-flex', flexDirection: 'column', width: '300px' }} >
                        <span>公司名称:{data.length ? data[company].c_name : ''}</span>
                        <span>公司所在地区:{data.length ? data[company].c_location : ''}</span>
                        <span>公司邮箱:{data.length ? data[company].c_emial : ''}</span>
                        <span>注册资本:{data.length ? data[company].c_money : ''}元</span>
                        <span>公司网址:<a href={data.length ? data[company].c_web : ''} >{data.length ? data[company].c_web : ''}</a></span>
                    </div>
                </div>
                <Divider />
                <div  >
                    <h3>网友评价</h3>
                    <div style={{ height: '200px', overflow: 'scroll' }}>
                        {
                            commit.length ? commit.map((item, key) => (
                                <Comment
                                    author={item.s_name}
                                    avatar={
                                        <Avatar
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                            alt="Han Solo"
                                        />
                                    }
                                    content={
                                        <p>
                                            {item.c_text}
                                        </p>
                                    }
                                    datetime={
                                        <Tooltip title={moment(item.c_time).format('YYYY-MM-DD HH:mm:ss')}>
                                            <span>{moment(item.c_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                                        </Tooltip>
                                    }
                                />
                            )
                            ) : ''
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default Index