import React, { useState ,useEffect} from 'react'
import {Table,Button} from 'antd'
import moment from 'moment'

export default function Index() {

    const[data,setData]=useState([])

    useEffect(() => {
        fetch('http://localhost:3002/dxq/interviewByStudent?sid=1').then(response => response.json())
        .then(data => setData(data.data))
    }, [])

   console.log(data)



const handle= (e,key,type) =>{
    let newData=[...data]
    newData[key].i_result=type?1:2
    setData(newData)
}



    const columns = [
        {
          title: '公司名称',
          dataIndex: 'c_name',
         
        },
        {
            title:'面试时间',
            dataIndex:'i_time',
            render:(t)=>moment(t).format('YYYY-MM-DD HH:mm:ss')
            
        },
        {
            title:'面试职位',
            dataIndex:'i_position',
            
        },
        {
            title:'面试结果',
            dataIndex:'i_result',
            render: t =>{
                if(t===0)return '待处理'
                else if(t===1)return '接受面试'
                else if(t===2)return '拒绝面试'
            }
        },
        {
            title:'操作',
            key:'action',
            render:(text,record,index)=>{
                if(record.i_result===0)return(
                    <>
                    <Button type="link" onClick={(e)=>handle(e,index,true)}>
                      接受
                    </Button>
                    <Button type="link" onClick={(e)=>handle(e,index,false)}>
                      拒绝
                 </Button>
                 </>
                 )
                else return ''
            }
        },
      ]
      
    return (
        <div style={{marginTop:'50px'}} >
            <Table dataSource={data} columns={columns} />

           
        </div>
    )
}
