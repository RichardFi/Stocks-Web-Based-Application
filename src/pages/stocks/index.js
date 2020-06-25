import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom"
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Input , Button , Form , Select } from 'antd';
const { Option } = Select;

export default function Stocks() {
  // store all stocks and never change
  const [rowData, setRowData] = useState([]);
  // store all stocks at first and change while searching
  const [searchData, setSearchData] = useState([]);
  // store data when the industry limited
  const [industryData, setIndustryData] = useState([]);

  const history = useHistory();
  const location = useLocation();

  const columns = [
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Industry", field: "industry" }
  ];

  const DoubleClicked = (values) => {
    // use url to pass stock symbol to the history page
    history.push("/history?symbol=" + values["data"]["symbol"]);
  }

  // fetch all stocks from api and store it to rowData and searchData
  useEffect(() => {
    fetch("http://131.181.190.87:3001/all")
      .then(res => res.json())
      .then(data =>
        data.map(stock => {
          return {
            symbol: stock.symbol,
            name: stock.name,
            industry: stock.industry
          };
        })
      )
      .then(stocks => setRowData(stocks) & setSearchData(stocks));
  }, [location]);

  const handleOnChange = values => {
    if (values) {
      // fetch data from industry api to limit industry
      fetch("http://131.181.190.87:3001/industry?industry=" + values)
        .then(res => res.json())
        .then(data =>
          data.map(stock => {
            return {
              symbol: stock.symbol,
              name: stock.name,
              industry: stock.industry
            };
          })
        )
        .then(stocks => setSearchData(stocks) & setIndustryData(stocks))
    } else {
      // when industry reset, reset searchData and industryData
      setSearchData(rowData)
      setIndustryData(rowData)
    }
  }

  const onFinish = values => {
    if(values["symbol"] && values["industry"]){
      // when both symbol and industry are filled, search in industry limited stocks
      const sResult = industryData.filter((stock) => {
        return stock.symbol.toLowerCase().includes(values["symbol"].toLowerCase())
      })
      setSearchData(sResult);
    } else if(values["symbol"] && !values["industry"]){
      // when symbol filled but industry is empty, search in all stocks
      const sResult = rowData.filter((stock) => {
        return stock.symbol.toLowerCase().includes(values["symbol"].toLowerCase())
      })
      setSearchData(sResult);
    }else{
      handleOnChange(values["industry"])
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
        <Form.Item
          name="symbol"
          label="Stock Symbol"
        >
          <Input placeholder="Stock symbol" style={{ height: "30px", width: "150px" }} allowClear />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ height: "30px", width: "150px" }}>Search</Button>
        </Form.Item>
        <Form.Item name="industry" label="Industry">
          <Select
            placeholder="Please select a industry"
            onChange={handleOnChange}
            allowClear
          >
            <Option value="Consumer Discretionary">Consumer Discretionary</Option>
            <Option value="Consumer Staples">Consumer Staples</Option>
            <Option value="Energy">Energy</Option>
            <Option value="Financials">Financials</Option>
            <Option value="Health Care">Health Care</Option>
            <Option value="Industrials">Industrials</Option>
            <Option value="Information Technology">Information Technology</Option>
            <Option value="Materials">Materials</Option>
            <Option value="Real Estate">Real Estate</Option>
            <Option value="Telecommunication Services">Telecommunication Services</Option>
            <Option value="Utilities">Utilities</Option>
          </Select>
        </Form.Item>

      </Form>
      <div
        className="ag-theme-balham"
        style={{
          height: "700px",
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
          onCellDoubleClicked={DoubleClicked}
        />
      </div>
    </div>
  );
}