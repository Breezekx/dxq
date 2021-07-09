import React, { useState, useEffect } from 'react'
import photo from '../../assets/phone.jpeg'

export default function Index() {


    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3002/dxq/student?phone=111`).then(response => response.json())
            .then(data => setData(data.data[0]))
    }, [])

    console.log(data)


    return (
        <div>
            <h2 style={{ marginTop: '20px', marginLeft: '20px' }}>学生信息</h2>
           <div style={{backgroundColor:'white',width:'1100px',height:'500px',marginLeft:'50px',display:'flex'}} >
              <div style={{width:'500px'}} >
                  <img  src={photo} width='350px' style={{margin:'100px 60px'}}/>
              </div>
              <div style={{display:'inline-flex',flexDirection:'column',marginTop:'90px',fontSize:'20px',marginLeft:'20px'}} >
                  <span style={{marginBottom:'20px'}} >姓名:{data===[]?'':data.s_name}</span>
                  <span style={{marginBottom:'20px'}} >年龄:{data===[]?'':data.s_age}</span>
                  <span style={{marginBottom:'20px'}} >性别:{data===[]?'':data.s_sex===1?'男':'女'}</span>
                  <span style={{marginBottom:'20px'}} >专业:{data===[]?'':data.s_profession}</span>
                  <span style={{marginBottom:'20px'}} >院校:{data===[]?'':data.s_school}</span>
                  <span style={{marginBottom:'20px'}} >年级:{data===[]?'':data.s_grade}</span>
              </div>
           </div>


        </div>
    )
}
