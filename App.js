//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const App = () => {
  const [incidents, setIncidents] = useState([]);
  const [incidentslessor, setIncidentsLessor] = useState([]);
  const [incidentsowner, setIncidentsOwner] = useState([]);

  useEffect(() => {
    axios.get('/api/now/table/x_nuvo_re_rem_lease_contract?sysparm_fields=name%2Cnumber%2Csys_id%2Clease_side%2Clease_state%2Cremaining&lease_side=Lessee', {
      withCredentials: true
    })
      .then(res => {
        setIncidents(res.data.result);
      })
      .catch(error => {
        console.error(error);
      });
  }, 
  
  []);
  useEffect(() => {
    axios.get('/api/now/table/x_nuvo_re_rem_lease_contract?sysparm_fields=name%2Cnumber%2Csys_id%2Clease_side%2Clease_state%2Cremaining&lease_side=Lessor', {
      withCredentials: true
    })
      .then(res => {
        setIncidentsLessor(res.data.result);
      })
      .catch(error => {
        console.error(error);
      });
  }, 
  
  []);
  useEffect(() => {
    axios.get('/api/now/table/x_nuvo_re_owned_asset?sysparm_fields=sys_id%2Cproperty_type%2Csize%2Cnumber%2Cproperty', {
      withCredentials: true
    })
      .then(res => {
        setIncidentsOwner(res.data.result);
      })
      .catch(error => {
        console.error(error);
      });
  }, 
  
  []);
 

  return (
    <div className="App">
      <div className="heading">
      <header className="App-header"> RE Management </header>
      
      <button onClick={sayHello}>New </button>
      </div>
      
      <div className="container">
      <Tabs>
        <TabList className="tablist-container">
            <Tab>Lessee</Tab>
            <Tab>Lessor</Tab>
            <Tab>Owner</Tab>
        </TabList>
        <TabPanel>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                      <th>Name</th>
                      <th>Number</th>
                      <th>Signing Party</th>
                      <th>State</th>
                      <th>Remaining</th>
                    </tr>
                </thead>
                <tbody>
                    {incidents.map(item => (
                    <tr key={item.sys_id}>
                      <td>{item.name}</td>
                      <td>{item.number}</td>
                      <td>{item.lease_side}</td>
                      <td>{item.lease_state}</td>
                      <td>{item.remaining}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
       </div>
        </TabPanel>
        <TabPanel>
        <div className="table-container1">
              <table>
                <thead>
                  <tr>
                      <th>Name</th>
                      <th>Number</th>
                      <th>Signing Party</th>
                      <th>State</th>
                      <th>Remaining</th>
                    </tr>
                </thead>
                <tbody>
                    {incidentslessor.map(item => (
                    <tr key={item.sys_id}>
                      <td>{item.name}</td>
                      <td>{item.number}</td>
                      <td>{item.lease_side}</td>
                      <td>{item.lease_state}</td>
                      <td>{item.remaining}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
       </div>
        </TabPanel>
        <TabPanel>
        <div className="table-container2">
              <table>
                <thead>
                  <tr>
                      <th>Number</th>
                      <th>Property Type</th>
                      <th>Size</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {incidentsowner.map(item => (
                    <tr key={item.sys_id}>
                      <td>{item.number}</td>
                      <td>{item.property_type}</td>
                      <td>{item.size}</td>
                      
                      
                    </tr>
                  ))}
                </tbody>
              </table>
       </div>
        </TabPanel>
      </Tabs>
      </div>
    </div>
    
  );
}

function sayHello() {
  alert('You clicked me!');
}
// Usage


export default App;

