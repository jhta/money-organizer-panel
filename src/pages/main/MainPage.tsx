import React, { useState } from 'react';
import chicken from '~/assets/chicken.svg';
import revolutLogo from '~/assets/revolut.png';
import abnAmroLogo from '~/assets/abn-amro-logo.png';
import { ExpensesReport, Transaction } from '~/types';
import { TransactionList } from '~/components/TransactionList';
import {
  extractRevolutReportFromCSV,
  formatRevolutTransactionsToGeneralTransactions,
} from '~/services/revolut';
import { useActions } from '~/store/useActions';
import './styles.css';
import { FileImporter } from '~/components/FileImporter/FileImporter';
import {
  extractDataFromTxt,
  formatAbnAmroTransactionsToGeneralTransactions,
} from '~/services/abm-amro/AbnAmroService';
import { Banks } from '~/types';

function Main() {
  // const [expensesReport, setExpensesReport] = useState<ExpensesReport>({
  //   total: 0,
  //   transactions: [],
  //   from: '',
  //   to: '',
  // } as ExpensesReport);
  const [selectedBank, setSelectedBank] = useState<Banks | undefined>(
    undefined
  );
  const [currentTransactions, setCurrentTransactions] = useState<Transaction[]>(
    []
  );

  const { setTransactions } = useActions();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files = [] } = event.target;

    if (!files?.length) return;

    const file = files[0];

    if (selectedBank === Banks.Revolut) {
      extractRevolutReportFromCSV(file, report => {
        console.log('newExpensesReport', report);
        // setExpensesReport(report);
        const transactions = formatRevolutTransactionsToGeneralTransactions(
          report.transactions
        );
        setCurrentTransactions(transactions);
        console.log('transactions', transactions);
        setTransactions(transactions);
      });
    } else {
      extractDataFromTxt(file, report => {
        console.log('report', report);
        const transactions =
          formatAbnAmroTransactionsToGeneralTransactions(report);
        setCurrentTransactions(transactions);
        setTransactions(transactions);
      });
    }
  };

  const createOnSelectBank = (bank: Banks) => () => {
    setSelectedBank(bank);
  };

  return (
    <div className="App">
      <img src={chicken} alt="chicken" className="chicken chickenSvg" />
      <h1>PolloDiario Panel</h1>
      <div className="card">
        {selectedBank ? (
          <FileImporter
            onChange={changeHandler}
            type={selectedBank === Banks.Revolut ? 'csv' : 'txt'}
          />
        ) : (
          <div className="clickable-list">
            <div
              onClick={createOnSelectBank(Banks.Revolut)}
              className="clickable-logo"
            >
              <img src={revolutLogo} alt="revolut" className="revolutLogo" />
            </div>
            <div
              onClick={createOnSelectBank(Banks.AbnAmro)}
              className="clickable-logo"
            >
              <img
                src={abnAmroLogo}
                width="200"
                alt="revolut"
                className="revolutLogo"
              />
            </div>
          </div>
        )}
        <TransactionList transactions={currentTransactions} />
      </div>
    </div>
  );
}

export default Main;
