import React from 'react';
import { Redirect, Route, Switch} from 'react-router-dom';
import Layout from 'antd/lib/layout';
import LeftNav from '../common/leftNav';
import Home from '../home';
import Header from '../common/header'
import Stocks from '../stocks';
import History from '../history';

const { Footer, Sider, Content } = Layout;

export default function Admin() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <LeftNav />
      </Sider>

      <Layout>
        <Header></Header>
        <Content style={{ margin: 20, backgroundColor: '#fff' }}>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/all' component={Stocks}></Route>
            <Route path='/history' component={History}></Route>
            <Redirect to="/" />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center', color: '#ccc' }}>©2020 Created by Yongrui Pan for IFN666 </Footer>
      </Layout>
    </Layout>
  );
}