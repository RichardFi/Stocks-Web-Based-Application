import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
//import "./styles.css";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
//import { TabbedLayout } from "ag-grid-community";
import moment from 'moment';

import { Button, Form, DatePicker } from 'antd';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgChartsReact } from 'ag-charts-react';
import * as agCharts from 'ag-charts-community';

export default function History() {
    // store all history activity of the stock and never change
    const [rowData, setRowData] = useState([]);
    // store all stocks at first and change while searching
    const [searchData, setSearchData] = useState([]);
    const location = useLocation();
    // get stock symbol by url
    const pathName = "http://131.181.190.87:3001/history" + location.search;

    const columns = [
        { headerName: "Name", field: "name" },
        { headerName: "Timestamp", field: "timestamp" },
        { headerName: "Open", field: "open" },
        { headerName: "High", field: "high" },
        { headerName: "Low", field: "low" },
        { headerName: "Close", field: "close" },
        { headerName: "Volumes", field: "volumes" }
    ];
  
    // fetch history activities from api and store it to rowData and searchData
    useEffect(() => {
        fetch(pathName)
            .then(res => res.json())
            .then(data =>
                data.map(history => {
                    return {
                        name: history.name,
                        timestamp: new Date(history.timestamp.substring(0, 10)),
                        open: history.open,
                        high: history.high,
                        low: history.low,
                        close: history.close,
                        volumes: history.volumes
                    };
                })
            )
            .then(histories => setRowData(histories) & setSearchData(histories))
    }, [pathName]);

    const onFinish = values => {
        if (values["time"]) {
            // if the date is filled, show all history after the date
            const sResult = rowData.filter((stock) => {
                return stock.timestamp > values["time"]
            })
            setSearchData(sResult);
        }
        else{
            // if the date is empty, push alert
            alert("Please enter valid date!")
        }
    };

    function disabledDate(current) {
        // can not select days before today and today
        return current && current > moment().endOf('day');
      }

    
    const options = {
        data: searchData,
        title: {
            text: 'Closing Price',
            fontSize: 18,
        },
        series: [{
            xKey: 'timestamp',
            yKey: 'close',
        }],
        axes: [
            {
                // limit the line chart ticks to make it clear
                type: 'time',
                nice: false,
                position: 'bottom',
                tick: { count: agCharts.time.friday },
                label: { format: '%b-%d-%y' },
            },
            {
                type: 'number',
                position: 'left',
                label: {
                    formatter: function (params) {
                        return '$' + params.value;
                    },
                },
            },
        ],
        legend: {
            enabled: false
        }
    }

    return (
        <div>
            <Form
                layout="inline"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{ margin: "20px" }}
            >
                <Form.Item label='Date from' name="time" >
                    <DatePicker disabledDate={disabledDate} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ height: "30px", width: "150px" }}>Search</Button>
                </Form.Item>
            </Form>
            <div
                className="ag-theme-balham"
                style={{
                    height: "400px",
                    width: "100%"
                }}
            >

                <AgGridReact
                    columnDefs={columns}
                    rowData={searchData}
                    defaultColDef={{
                        flex: 1,
                        sortable: true,
                        filter: true,
                    }}
                    pagination={true}
                    paginationPageSize={20}
                    rowSelection={'single'}
                />
            </div>
            <AgChartsReact options={options} />
        </div>
    );
}