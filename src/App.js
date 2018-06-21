import React, { Component } from 'react';
import PropTypes from "prop-types";
import logo from './logo.svg';
import './App.css';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Download from "@material-ui/icons/FileDownload";
import { withStyles } from "@material-ui/core/styles";
import CustomPagination from "./CustomPagination.js";
import { exportTableToCSV } from'./export.js';
import { exportTableToJSON } from './export.js';
import  classes  from "classnames";
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import file from './testing.json';
import checkboxHOC from "react-table/lib/hoc/selectTable";
//import cloneDeep from "lodash.clonedeep";
import testData from "./testing.json";
//import cloneDeep from "lodash.clonedeep";
//import { ReactTableDefaults } from "react-table";
import Typography from "@material-ui/core/Typography";
// array of objects
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const data = [
  {
    name: 'Andrew Flintoff',
    age: 26,
    friend: {
        name: 'Jazzy B',
        age: 33},
    City: 'Boston',
    University:'Rutgers'
  },

  {   name: 'Lindsey Cruz',
      age: 22,
      friend: {
        name: 'Jeff Fitzpatrick',
        age: 49
              },
      City: 'Boston',
      University:'NYU'
    },
    {   name: 'Max Costa',
        age: 42,
        friend: {
          name: 'Andy Rhodes',
          age: 12
                },
        City: 'Boston',
        University:'Rutgers'

      },
      {   name: 'Anselem Spoerri',
          age: 54,
          friend: {
            name: 'Steve Waugh',
            age: 37
                  },
          City: 'NYC',
          University:'NEU'
        },
        {   name: 'Linda Hazel',
            age: 31,
            friend: {
              name: 'Jason Dameon',
              age: 24
            },
            City: 'NYC',
            University:'NEU'

          },
          {   name: 'Xiang Lin',
              age: 36,
              friend: {
                name: 'Johnathan Hartman',
                age: 61
              },
              City: 'NYC',
              University:'Rutgers'
            },
            {   name: 'Anderson Hazel',
                age: 36,
                friend: {
                  name: 'Dave Jhonson',
                  age: 92
                },
                City: 'NYC',
                University:'NEU'
              }
            ]

data.forEach((row, index) => {row.rowNo = index + 1});//adding a new data in data element
//console.log(data[0].University);

// for (var i=0;i<data_size;i++){
//
// uni_data.push(data[i].University);
//
// }
//console.log(uni_data);
var mostRecentUpdate=[];
var data2=[];
var t=new Date();
for(var i=0;i<data.length;i++){
data2.push(data[i].University);
}
console.log(data2);



const columns = [
  {
  Header: 'No.',
  id:'rno',
  accessor: d=>d.rowNo,
  show: true,
},
  {
  Header: 'Name',
  id:'name',
  accessor:d=>d.name // String-based value accessors!
  }, {
  Header: 'Age',
  id:'age',
  accessor: d=>d.age,
  show: true,
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
},

{
   // Required because our accessor is not a string
  Header: "Friends' Data",
  id:"freindsData",
  show: true,

  columns:[

    {
    Header:'Name',
    id: 'name',
    accessor: d => d.friend.name,
    show: true,
    }, // Custom value accessors!

   {
    Header: "Friend Age",
    id:"age_friend", // Custom header components!
    accessor: d => d.friend.age,
    show: true,
  }
  ]
  },
{
Header: 'City',
id:'city',
show: true,
accessor: d => d.City // String-based value accessors!
},
{
Header: 'College',
id:'college',
show: true,
accessor: d => d.University,// String-based value accessors!
filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    if (filter.value === "true") {
                      //console.log(row[filter.id]);
                      //var a=row[filter.id];

                      return row[filter.id]==='NEU';
                    }
                    return row[filter.id]==='NYU';
                  },
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">Show All</option>
                      <option value="true">only NEU</option>
                      <option value="false">only NYU</option>
                    </select>

}
]

var rowSize;

class App extends Component {

  constructor(props) {
          super(props)
          this.state = {
              row:"",
              filter:true,
              columns:columns
            //  data:data.University,
          }
          this.changeFilter = this.changeFilter.bind(this);
          this.handleRowChange =this.handleRowChange.bind(this);
          this.handleDownload =this.handleDownload.bind(this);
          this.handleDownloadToJson = this.handleDownloadToJson.bind(this);
      }

  handleRowChange = row => event => {
    if(event.target.value !== 0){
      this.setState({
        row: event.target.value,

      });
      console.log(this.state.data);
    }

    };
    // componentDidUpdate(prevProps, prevState) {
    //       const {data1} = this.state.data.University;
    //       console.log(data1);
    //       if(data1 !== prevState.data.University){
    //           console.log('update data!');
    //       }
    //
    //   }

  handleDownload() {
        const data = this.reactTable.getResolvedState().sortedData;
        exportTableToCSV(data,columns,"data.csv")
        //console.log(data);
  };
   handleDownloadToJson() {
         const data = this.reactTable.getResolvedState().sortedData;
         exportTableToJSON(data,"data.json")
       //console.log(data[0]._original);
   }
   handleRowClick(){
    rowSize=parseInt(this.state.row);

     //console.log(parseInt(rowSize)); console.log(typeof rowSize);
   }
   changeFilter() {
        this.setState({
            filter: !this.state.filter,
        })

      };

  toggleColumnChooser = (index) => {
           this.setState(
              prevState => {
                  const columns1 = [];
                  columns1.push(...columns);
                  console.log(columns1);
                  columns1[index].show = !columns1[index].show;
                  if (columns1[index].columns) {
                    columns1[index].columns.forEach(item => {
                      item.show = !item.show
                    })
                  }

                  return {
                      columns: columns1,
                  };
              }, () => {
                console.log(this.state.columns)
              }
          );
      };
      // const wrappedInstance = this.reactTable.getWrappedInstance();
            // the 'sortedData' property contains the currently accessible records based on the filter and sort

  render() {

    // const rowProps = {
    //   getTrProps: (state,rowInfo)=>{
    //     return {
    //                 onClick: () => {
    //                     /* eslint-disable no-underscore-dangle */
    //                     console.log(rowInfo)
    //                     /* eslint-enable */
    //               }
  //             };
    //          }
    //        }


    return (
      <div className="App">
          React Application
          <div align="right">
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
                  id="row"
                  label="enter rows value"
                  className={classes.textField}
                  value={this.state.row}
                  onChange={this.handleRowChange('x')}
                  margin="normal"
                />

              </form>
              </div>
  <ReactTable
  ref={r => this.reactTable = r}
    data={data}
    filterable={this.state.filter}
    changeFilter={this.changeFilter}
    handleDownloadToJson={this.handleDownloadToJson}
    handleDownload={this.handleDownload}
    columns={this.state.columns}
    onColumnUpdate={this.toggleColumnChooser}
    showPageSizeOptions={true}
    //defaultPageSize={3}
    showPaginationBottom={true}
    PaginationComponent={CustomPagination}
    pageSizeOptions={[10,20,this.state.row]}//since this prop is an array of numbers, you have to pass array
    //getTbodyProps={ (state, rowInfo, column, rtInstance) => { return { style: { overflow: 'scroll',height:'400px' ,} } } }

    style={{
            //backgroundColor:'pink',
            //backgroundImage:'url(image)',
            fontFamily:"serif",
            height: "300px" // This will force the table body to overflow and scroll, since there is not enough room
          }}
    getTheadGroupProps={(state, rowInfo, column, rtInstance) => {
        return {
            style:{
                    backgroundColor:'#B3E5FC'
                  // height:'20px'
                  }
          }
            }
    }
    //{...rowProps}
  />




   </div>
    );
//console.log(rowInfo);

  }
}

export default App;
// <Tooltip id="tooltip-icon" title="downloadinCSV">
//   <Button variant="fab"
//         size="small"
//         mini
//          onClick={() => {this.handleDownload()}}>
//   <Download className={classes.rightIcon} />
//   </Button>
// </Tooltip>
// <Button  size="small" variant="contained" style={{backgroundColor:'grey',padding:'1px',margin: '4px 2px'}} onClick={() => {this.handleDownloadToJson()}}>download grid in json
// <Download className={classes.rightIcon} />
//  </Button>
 // <Typography className={classes.typography} onClick={() => {this.handleDownloadToJson()}}>
 //   The content of the Popover.
 // </Typography>
