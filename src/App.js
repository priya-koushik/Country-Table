import React, { Component, useState, useEffect } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function App() {
    const [countryData, setCountryData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
   const handleChange =(e)=>{
      setSearchTerm(e.target.value);
    }
    async function fetchApi() {
      const res= await fetch(`https://restcountries.eu/rest/v2/all`)
      const data = await res.json()
      setCountryData(data)
    }
    var rowdata =
Object.values(countryData).map(data=> [{
    country: data.name,
    capital: data.capital,
    region: data.region,
    population: data.population,
    area: data.area
  }]
)

var searchcountrydata = rowdata.filter((data)=>(data[0].country).toLowerCase().includes(searchTerm))
var searchcapitaldata = rowdata.filter((data)=>(data[0].capital).toLowerCase().includes(searchTerm))
var searchregiondata = rowdata.filter((data)=>(data[0].region).toLowerCase().includes(searchTerm))

var searchdata =()=> {
  if(searchcountrydata.length !== 0){
    return searchcountrydata.map(data=>data[0])
  }if(searchcountrydata.length === 0 && searchcapitaldata.length !== 0){
    return searchcapitaldata.map(data=>data[0])
  }if(searchcountrydata.length === 0 && searchcapitaldata.length === 0 && searchregiondata.length !== 0){
    return searchregiondata.map(data=>data[0])
  }
}
var info ={
  columnDefs: [{
        headerName: "Country", field: "country"
      }, {
        headerName: "Capital", field: "capital"
      }, {
        headerName: "Region", field: "region"
      }, {
        headerName: "Population", field: "population"
      }, {
        headerName: "Area", field: "area"
      }],
    
} 

    useEffect(()=>{fetchApi()}, []);
    return (
      <div
        className="ag-theme-alpine"
        style={{
        height: '500px',
        width: '1000px',
      marginLeft:'10px' }}
      >
        <h1>Table MockUp</h1>
        <input type='search' value={searchTerm} onChange={handleChange}></input>
        <AgGridReact
          columnDefs={info.columnDefs}
          rowData={searchTerm? searchdata() : rowdata.map(data=>data[0])}>
        </AgGridReact>
      </div>
    );
  }

export default App;