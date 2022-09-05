import React from "react";
import { connect } from "react-redux";
import { Column, H1, Header } from "../../components";
import "./transaction.scss";

const Transaction = ({ transactions }) => {
  return (
    <div className="transaction-page">
      <Header />

      <Column className="transaction">
        <H1 text="Transaction" />

        <table className="table">
          <tr className="tr-header">
            <th className="th-head">Transaction Number</th>
            <th className="th-head">Date & Time</th>
            <th className="th-head">ETH Sent</th>
            <th className="th-head">NLT Received</th>
            <th className="th-head">Status</th>
            <th className="th-head">Txn Hash</th>
          </tr>

          {transactions &&
            transactions.map((tx, index) => {
              return (
                <tr key={index} className="tr">
                  <th>{tx.number}</th>
                  <td>{tx.date}</td>
                  <td>{tx.ethSent}</td>
                  <td>{tx.nltReceived}</td>
                  <td>{tx.isSuccess ? "Success" : "Failed"}</td>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://rinkeby.etherscan.io/tx/${tx.txHash}`}
                    >{`${tx.txHash.slice(0, 12)}...`}</a>
                  </td>
                </tr>
              );
            })}
        </table>
      </Column>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    signerAddress: state.user.signerAddress,
    tokenBalance: state.user.tokenBalance,
    ethBalance: state.user.ethBalance,
    transactions: state.user.transactions,
  };
};

export default connect(mapStateToProps)(Transaction);
