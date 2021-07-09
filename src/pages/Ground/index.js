import React, { useState, useEffect,useRef } from 'react'
import moment from 'moment'
import { Comment, Avatar, Tooltip, Divider, Button, Modal, Menu, Dropdown ,Input} from 'antd'
import { DownOutlined } from '@ant-design/icons'

export default function Index() {


    const [commit, setCommit] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [company,setCompany]=useState('海康威视')
    const { TextArea } = Input;

    useEffect(() => {
        fetch(`http://localhost:3002/dxq/commit`).then(response => response.json())
            .then(data => setCommit(data.data))
    }, [])

    const handle = () => {
        setIsModalVisible(true)
    }
    const handleOk = () => {
        setIsModalVisible(false);
        let newCommit={
            sid:1,
            s_name:'小强',
            c_name:company,
            c_time:moment().format('YYYY-MM-DD HH:mm:ss'),
            c_text:inputEL.current.resizableTextArea.props.value
        }
        let newData = [newCommit,...commit]
        setCommit(newData)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const inputEL = useRef('输入框');

    const menu = (
        <Menu>
            <Menu.Item key='1' onClick={()=>setCompany("海康威视")}>
                海康威视
          </Menu.Item>
            <Menu.Item key='2' onClick={()=>setCompany("mihoyo")} >
                mihoyo
          </Menu.Item>
        </Menu>
    )

    return (
        <div>
            <div style={{ marginTop: '20px', marginLeft: '20px', display: 'flex', justifyContent: 'space-between' }} >
                <h2>网友评价</h2>
                <Button type="primary" style={{ width: '100px', marginRight: '20px' }} onClick={handle}>发表评论</Button>
            </div>
            <div style={{ height: '550px', overflow: 'scroll', padding: '50px', margin: '30px 50px 0px 50px', backgroundColor: 'white' }}>
                {
                    commit.length ? commit.map((item, key) => (
                        <div>
                            <Comment
                                author={<span style={{ fontSize: '16px' }} >{item.sid === 1 ? item.s_name + '(我)' : item.s_name}</span>}
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                        size='large'
                                    />

                                }
                                content={
                                    <div style={{ display: 'inline-flex', flexDirection: 'column' }} >
                                        <span><a>#{item.c_name}# </a></span>
                                        <span>{item.c_text}</span>
                                    </div>
                                }
                                datetime={
                                    <Tooltip title={moment(item.c_time).format('YYYY-MM-DD HH:mm:ss')}>
                                        <span>{moment(item.c_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                                    </Tooltip>
                                }
                            />
                            <Divider />
                        </div>
                    )
                    ) : ''
                }
            </div>
            <Modal
                title="新建评论"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button onClick={handleOk} type='primary' >提交</Button>,
                    <Button onClick={handleCancel}>取消</Button>
                ]}
            >
                <Dropdown overlay={menu} trigger={['click']}>
                    <a>
                        {company} <DownOutlined />
                    </a>
                </Dropdown>
                <br/>
                <br/>
                <TextArea rows={4} placeholder='请输入评论' ref={inputEL} />


            </Modal>
        </div>
    )
}
