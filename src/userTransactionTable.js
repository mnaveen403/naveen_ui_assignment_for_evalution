import calRewards from './utils';

function UserTransactionTable (props) {
    const {userTransactions} = props;
    return (
        <>
         {userTransactions?.length > 0 ?
            <table className="customers">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Rewards</th>
                </tr>

              </thead>
              <tbody>
                {userTransactions?.map((item, index) => {
                  return <tr key={index}>
                    <td>{item["date"]}</td>
                    <td>{item["amount"]}</td>
                    <td>{calRewards(item["amount"])}</td>
                  </tr>
                })}
              </tbody>
            </table>
            : <div>No Transactions Found</div>}
        </>
    )
}

export default UserTransactionTable;