import { Layout, Menu } from 'antd';
import {
  SnippetsOutlined,
  AlignLeftOutlined,
  OrderedListOutlined,
  CoffeeOutlined,
  UserOutlined
} from '@ant-design/icons';
import React from 'react'
import logo from '../../assets/logo.jpeg'
import phone from '../../assets/phone.jpeg'
import { Route, useHistory } from "react-router-dom";
import Item from '../Item'
import Rask from '../Rask'
import Interview from '../Interview'
import Ground from '../Ground'
import Student from '../Student'


const { Header, Content, Sider } = Layout;

const SiderDemo = ()=> {
  
  let history = useHistory();

  const handleRoute = e =>{
     history.push('/menu/'+e.key)
  }

    return (
      <Layout> 
      <Header style={{backgroundColor:'white',padding:'0px'}}  >
          <img  alt='' src={logo}  style={{marginLeft:'50px'}} width='100px' height='50px' />
          <div style={{float:'right',display:'flex'}} >
            <span> 欢迎你，xxx </span>
            <img alt='' src={phone} width='50px' height='50px' style={{borderRadius:'50%',margin:'7px 30px 0px 10px'}}/>
          </div>
          
        </Header>
      <Layout style={{ minHeight: '100vh' ,boxShadow:'0px 5px 5px #888888 inset' }}>
       
        <Sider theme={'light'} >
          <Menu theme={'light'} defaultSelectedKeys={['item']} mode="inline" onClick={handleRoute}>
            <Menu.Item key="item" icon={<AlignLeftOutlined />}>
               项目列表
            </Menu.Item>
            <Menu.Item key="rask" icon={<OrderedListOutlined />}>
               任务列表
            </Menu.Item>
            <Menu.Item key="interview" icon={<SnippetsOutlined />}>
              面试列表
            </Menu.Item>
            <Menu.Item key="ground" icon={<CoffeeOutlined />}>
              广场
            </Menu.Item>
            <Menu.Item key="student" icon={<UserOutlined />}>
              学生信息
            </Menu.Item>
          </Menu>
        </Sider>
    
          <Content style={{ margin: '0 16px' }}>
             <Route path='/menu/item' component={Item} />
             <Route path='/menu/rask' component={Rask} />
             <Route path='/menu/interview' component={Interview} />
             <Route path='/menu/ground' component={Ground} />
             <Route path='/menu/student' component={Student} />
          </Content>
        
       
      </Layout>
        </Layout>
    );
  
}
export default SiderDemo
