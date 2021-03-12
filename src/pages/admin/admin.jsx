import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import storageUtils from '@/utils/storageUtils'

import './admin.scss'

import LeftNav from './left/index'
import Home from './home/home'
import Category from './shop/category'

import HeaderInfo from './header/index'


const style = {
  content: { },
  footer: { textAlign: 'center' }
}
export default class Admin extends PureComponent {
  render() {
    const token = storageUtils.getToken()
    console.log(token,'token');
    // if (!token) {
    //   return <Redirect to="/login" />
    // }
    return (
      <Layout>
        <Sider className="layout-sidebar">
          <LeftNav />
        </Sider>
        <Layout>
          <Header>
            <HeaderInfo/>
          </Header>
          <Content style={style.content}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category}/>
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={style.footer}>版权所有@kaeery</Footer>
        </Layout>
      </Layout>
    )
  }

}
