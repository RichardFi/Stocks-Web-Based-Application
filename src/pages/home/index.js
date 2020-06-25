import React from 'react';
import { Typography } from 'antd';
import {
    StockOutlined
  } from '@ant-design/icons';
const { Title } = Typography;
const { Text } = Typography;

export default function Home() {
    return (
        <div>
            <Title level={3} style={{margin: '30px 0'}}> Stock Prices <StockOutlined /></Title>
            <Text style={{margin: '30px 0'}}> You may click on stocks to view all the stocks then double click the stock to view the latest 100 days of activity.</Text>
        </div>
    )

}