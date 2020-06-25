import React from 'react';
import { LeftNavWrap, } from './style';
import { Link } from 'react-router-dom';
import Menu from 'antd/lib/menu';
import {
    HomeOutlined
} from '@ant-design/icons';


export default function LeftNav() {
    return (
        <LeftNavWrap>
            <Menu 
                defaultSelectedKeys={['0']}
                mode="inline"
                theme="dark"
            >
                <Menu.Item key="0">
                    <Link to='/home'>
                        <HomeOutlined />
                        <span>Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="1">
                    <Link to='/all'>
                        <span>Stocks</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </LeftNavWrap>
    )
}
