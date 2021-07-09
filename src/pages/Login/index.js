import React from 'react'
import { Link } from "react-router-dom";
import bg from '../../assets/bg.jpeg'
import {Form,Input,Button} from 'antd'

export default function Login() {
    return (
        <div style={{ backgroundImage: `url(${bg})`, height: '800px', backgroundRepeat: 'round' }} >
            <div style={{backgroundColor:'white',
            width:'500px',
            height:'350px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            border:'1px solid #888888',
            paddingRight:'100px',
            borderRadius:'10px',
            float:'right',
            marginTop:'200px',
            marginRight:'50px',
            opacity:'0.8'
            }}>
            <h3 style={{margin:'30px 0px 30px 60px'}} >学生登陆</h3> 
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input style={{width:'300px',marginBottom:'20px'}} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password style={{width:'300px',marginBottom:'20px'}} />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    
                       <Link to='/menu/item'><Button type="primary" htmlType="submit">登陆 </Button></Link>
       
                </Form.Item>
            </Form>
            </div>
            
        </div>
    )
}
