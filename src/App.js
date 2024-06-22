import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import UserTransactionTable from './userTransactionTable';
import RewardsTable from './rewardsTable';
function App() {
  const [selectedCustomer, setSelectedCustomner] = useState("");
  const [userTransactionList, setuserTransactionList] = useState({});
  const [selectedUserTrans, setselectedUserTrans] = useState([]);
  const userSelect = (user) => {
    console.log(userTransactionList[user]);
    setselectedUserTrans(userTransactionList[user]);
    setSelectedCustomner(user);
  }
 
  useEffect(() => {
    axios.get('userTransactionList.json').then(transactionList => {
      setuserTransactionList(transactionList.data);
    })
  },[])

  return (
    <div className="App">
      <h4 className="header">Rewards Dashboard</h4>
      <div className="select-style">
        <select onChange={e => userSelect(e.target.value)} value={selectedCustomer} >
          <option value="">Select User</option>
          {Object.keys(userTransactionList).map((item, index) => {
            return (
              <option key={index} value={item}> {item.toUpperCase()} </option>
            );
          })}
        </select>
      </div>

      <UserTransactionTable userTransactions = {selectedUserTrans}/>

      <RewardsTable userTransactions = {selectedUserTrans} selectedUser={selectedCustomer}/>
    </div>
  );
}

export default App;
