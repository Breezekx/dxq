import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Modal, Input } from 'antd'
import moment from 'moment'

export default function Index() {

    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false)
    const [rindex, setRindex] = useState(0)

    useEffect(() => {
        fetch('http://localhost:3002/dxq/projectByStudent?sid=1').then(response => response.json())
            .then(data => setData(data.data))
    }, [])



    const handleOk = () => {
        setVisible(false)
        let newData = [...data]
        newData[rindex].sp_type = 1
        newData[rindex].sp_content = inputEL.current.state.value
        setData(newData)
    }

    const handle = (e, key) => {
        setVisible(true)
        setRindex(key)
    }

    const inputEL = useRef('输入框');

    const columns = [
        {
            title: '项目名称',
            dataIndex: 'p_name',

        },
        {
            title: '公司名称',
            dataIndex: 'c_name',

        },
        {
            title: '项目奖金',
            dataIndex: 'p_money',

        },
        {
            title: '项目发布时间',
            dataIndex: 'p_time',
            render: (t) => moment(t).format('YYYY-MM-DD HH:mm:ss')

        },
        {
            title: '任务接取时间',
            dataIndex: 'sp_time',
            render: (t,record) =>record.pid===1?moment().format('YYYY-MM-DD HH:mm:ss'):moment(t).format('YYYY-MM-DD HH:mm:ss')

        },
        {
            title: '任务状态',
            dataIndex: 'sp_type',
            render: t => {
                if (t === 0) return '待提交'
                else if (t === 1) return '已提交'
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record, index) => {
                if (record.sp_type === 0) return (
                    <Button type="link" onClick={(e) => handle(e, index)}>
                        提交
                    </Button>
                )
                else return (
                    <Button type="link" onClick={(e) => handle(e, index)}>
                        查看
                    </Button>)
            }
        }
    ];

    return (
        <div style={{ marginTop: '50px' }} >
            <Table dataSource={data} columns={columns} />

            <Modal
                width='600px'
                visible={visible}
                title="任务详情"
                onOk={handleOk}
                onCancel={handleOk}
                footer={data.length ? data[rindex].sp_type ? [
                    <Button
                        type="primary"
                        onClick={handleOk}
                    >
                        确定
            </Button>,
                ] : [<Button
                    type="primary"
                    onClick={handleOk}
                >
                    提交
          </Button>,] : ''}
            >
                <div style={{ marginBottom: '30px' }} >项目名称:{data.length ? data[rindex].p_name : ''}</div>
                <div style={{ marginBottom: '30px' }}>公司名称:{data.length ? data[rindex].c_name : ''}</div>
                <div style={{ marginBottom: '30px' }}>提交git仓库地址:
         {data.length ? data[rindex].sp_type ?
                        <Input placeholder="输入网址" disabled value={data.length ? data[rindex].sp_content : ''} ref={inputEL} size='small' style={{ width: '300px', marginLeft: '20px' }} />
                        :
                        <Input placeholder="输入网址" ref={inputEL} size='small' style={{ width: '300px', marginLeft: '20px' }} /> : ''
                    }


                </div>
            </Modal>
        </div>
    )
}
