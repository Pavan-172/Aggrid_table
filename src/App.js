
import React,{ Component, useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import "ag-grid-community";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { GridApi } from 'ag-grid-community';

const cellClassRules = {
  "cell-empty": params => params.value ==='',
}

const genderComponent =props=>{
  const { value }=props;
  return(
    <div>
     {value}
    </div>
  );
};

class genderEditor extends Component{
  state={ value:this.props.value};
  afterGuiAttached=()=> this.refs.input.focus();
  getValue=()=>this.state.value;
  destroy=()=>{ };

  render(){
    const options=['Male','Female'];
    return(
      <select
      defaultValue={this.state.value || undefined}
      style={{ height:'100%',width:'100%'}}
      onChange={event=>this.setState({value:event.target.value})}
      ref="input"
      placeholder={`Select ${'Gender'|| 'Option'}`}
      showAction={['focus']}
      >
        {options.map((item)=>(
          <option style={{ height:'100%',width:'100%'}} key={item} id={item} value={item}>
          {item}
          </option>
        ))}
      </select>
    )
  };
};

const countryComponent =props=>{
  const { value }=props;
  return(
    <div>
     {value}
    </div>
  );
};

class countryEditor extends Component{
  state={ value:this.props.value};
  afterGuiAttached=()=> this.refs.input.focus();
  getValue=()=>this.state.value;
  destroy=()=>{ };

  render(){
    const options=['Ukraine','India','USA','Russia'];
    return(
      <select
      defaultValue={this.state.value || undefined}
      style={{ height:'100%',width:'100%'}}
      onChange={event=>this.setState({value:event.target.value})}
      ref="input"
      placeholder={`Select ${'Country'|| 'Option'}`}
      showAction={['focus']}
      >
        {options.map((item)=>(
          <option style={{ height:'100%',width:'100%'}} key={item} id={item} value={item}>
          {item}
          </option>
        ))}
      </select>
    )
  };
};


const cityComponent =props=>{
  const { value }=props;
  return(
    <div>
     {value}
    </div>
  );
};

class cityEditor extends Component{
  state={ value:this.props.value};
  afterGuiAttached=()=> this.refs.input.focus();
  getValue=()=>this.state.value;
  destroy=()=>{ };

  render(){
    const options=['New York','washington','Bangalore','Moscow'];
    return(
      <select
      defaultValue={this.state.value || undefined}
      style={{ height:'100%',width:'100%'}}
      onChange={event=>this.setState({value:event.target.value})}
      ref="input"
      placeholder={`Select ${'City'|| 'Option'}`}
      showAction={['focus']}
      >
        {options.map((item)=>(
          <option style={{ height:'100%',width:'100%'}} key={item} id={item} value={item}>
          {item}
          </option>
        ))}
      </select>
    )
  };
};

const rowData = [
  {"Id":1,"Name":"John","Email":"john@gmail.com","Gender":"Male","DOB":"03-05-1998","Country":"India","City":"kolar"},
  {"Id":2,"Name":"aohn","Email":"john@gmail.com","Gender":"Male","DOB":"03-05-1998","Country":"India","City":"kolar"},
  {"Id":3,"Name":"pohn","Email":"john@gmail.com","Gender":"Male","DOB":"03-05-1998","Country":"India","City":"kolar"},
   ];


 const columnDefs=[
   {
     headerName:'',
    checkboxSelection:true,
    headerCheckboxSelection:true,
    webkitConvertPointFromNodeToPage:'left',
    width:50,
    field:'checkboxBtn',
},
   {
     headerName:"Id",
   field:"Id",
   width:140,
   editable:true,
   cellClassRules: cellClassRules,
  },
   {
     headerName:"Name",
     field:"Name",
     width:140,sortable:true,
     sortingOrder:["desc"],
     editable:true,
     cellClassRules: cellClassRules,
    },
   {
     headerName:"Email",
     field:"Email",
     width:200,
     editable:true,
     cellClassRules: cellClassRules,
    //  cellStyle:(params)=>(params.value.length<2?{ backgroundColor:"yellow"}:{backgroundColor:"White"})
    },
   {
     headerName:"Gender",
     field:"Gender",
     width:140,
    editable:true,
    cellClassRules: cellClassRules,
    cellRenderer:'genderComponent',
    cellEditor:'genderEditor',
    cellEditorParams:{
    message:'This is custom cell editor'
  },
},
   {
     headerName:"DOB",
     field:"DOB",
     width:140,
     editable:true,
     cellClassRules: cellClassRules,
    },
   {
     headerName:"Country",
     field:"Country",
     width:140,
     editable:true,
     cellRenderer:'countryComponent',
     cellEditor:'countryEditor',
     cellClassRules: cellClassRules,
   },
   {
     headerName:"City",
     field:"City",
     width:140,
     editable:true,
     cellRenderer:'cityComponent',
     cellEditor:'cityEditor',
     cellClassRules: cellClassRules,
    },
 ]

 

const App = (data) => {

  const [gridApi, setGridApi]=useState(null);
  const [columnApi, setColumnApi] =useState(null);
  
  const handleGridReady=params=>{
    setGridApi(params.api);
    setColumnApi(params.columnApi);
    params.api.sizeColumnsToFit()
  }
   return (
     <div style ={{ minHeight:'100vh',display:'flex',justifyContent:'center'}}>

     
       <div className="ag-theme-alpine" style={{height: 300, width: 1000}}>
          <button className="btn"
          onClick={()=>gridApi.applyTransaction({ add:[{ }]})}>
          Add a row
          </button>
          <button className="btn"
          onClick={_=> {
            const selectedRows = gridApi.getSelectedRows()
            gridApi.applyTransaction({ remove : selectedRows})
          }}
          >
          Delete selected Rows
          </button>
          <button className="btn"
          onClick={_=> { 
        
           }}
          >
          Submit
          </button>

           <AgGridReact 
              cellClassRules={cellClassRules}
                rowData={rowData}
               columnDefs={columnDefs}
               onGridReady={handleGridReady}
               frameworkComponents={{ genderComponent, genderEditor,countryComponent,countryEditor,cityComponent,cityEditor }}
               singleClickEdit
               enableSorting
               stopEditingWhenCellsLoseFocus
               rowSelection='multiple'
           />
       </div>
       </div>
   );
};

export default App;
