import {useEffect, useState} from 'react';
import calRewards from './utils';

function RewardsTable (props) {
    const {userTransactions} = props;
    const [userMontlyRewards, setUserMontlyRewards] =  useState([]);

    useEffect(() => {
        let monthRewards = {};

        userTransactions?.forEach(trans => {
            let transactionDate = new Date(trans['date']);
            let currentDate = new Date(new Date());
            if(transactionDate.getMonth() - currentDate.getMonth() < 3) {
                if(monthRewards[transactionDate.getMonth()+1]) {
                    monthRewards[transactionDate.getMonth()+1]['amounts'].push(trans['amount'])
                } 
               else {
                monthRewards[transactionDate.getMonth()+1] = {
                    amounts : [trans['amount']]
                }
               }
            }
        
        });
        console.log(userTransactions);

        for (let key in monthRewards) {
            let total_month_rewards = 0;
            for (let i = 0; i < monthRewards[key]['amounts'].length; i++) {
              let price = monthRewards[key]['amounts'][i];
      
              total_month_rewards = total_month_rewards + calRewards(price);
            }
            monthRewards[key]['rewards'] = total_month_rewards;
          }
          setUserMontlyRewards(monthRewards);
    },[userTransactions]) 

    return (
        <>
       
        {
            userMontlyRewards && 
            <table className="customers">
            <thead>
              <tr>
                <th>Month</th>
                <th>Rewards</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First Month</td>
                <td>{userMontlyRewards[4]?.rewards}</td>
              </tr>
              <tr>
                <td>Second Month</td>
                <td>{userMontlyRewards[5]?.rewards}</td>
              </tr>
              <tr>
                <td>Third Month</td>
                <td>{userMontlyRewards[6]?.rewards}</td>
              </tr>
              <tr>
                <td>Total Reward</td>
                <td>{userMontlyRewards[4]?.rewards + userMontlyRewards[5]?.rewards + userMontlyRewards[6]?.rewards}</td>
              </tr>
            </tbody>
          </table>

        }
        
        </>
    )
}

export default RewardsTable;