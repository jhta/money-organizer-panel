import { FC, useState, useCallback } from 'react';
import { LedgerTransaction, Transaction } from '~/types';
import { formatAmountToEuro, formatDate } from '~/utils';
import './styles.css';
import firebaseService from '~/services/firebase/firebaseService';
import Modal from 'react-modal';
import { useAlert } from 'react-alert';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Routes } from '~/routing/Routes';

interface SelectableListProps {
  transactions: LedgerTransaction[];
  onSelectTransaction: (transactionId: string) => void;
}

interface SelectableListItemProps {
  transaction: LedgerTransaction;

  onSelectTransaction: (transactionId: string) => void;
}

export const SelectableListItem: FC<SelectableListItemProps> = ({
  transaction,
  onSelectTransaction,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const onClick = () => {
    onSelectTransaction(transaction.id);
    setIsSelected(!isSelected);
  };

  return (
    <li
      onClick={onClick}
      className={`selectable-transaction ${isSelected ? 'selected' : ''}`}
      key={transaction.to}
    >
      <p>{formatDate(transaction.from)}</p>
      <p>{formatDate(transaction.to)}</p>
      <p>{transaction.description}</p>
      <p>{transaction.category}</p>
      <p>{formatAmountToEuro(transaction.total)}</p>
    </li>
  );
};

export const SelectableList: FC<SelectableListProps> = ({
  transactions,
  onSelectTransaction,
}) => {
  return (
    <ul className="transactionList">
      {transactions.map(transaction => (
        <SelectableListItem
          key={transaction.id}
          transaction={transaction}
          onSelectTransaction={onSelectTransaction}
        />
      ))}
    </ul>
  );
};

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#242424',
    opacity: 1,
    minWidth: '40%',
    border: 0,
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.8)',
  },
};

const getFrom = (transactions: LedgerTransaction[]) =>
  !transactions.length
    ? ''
    : Number(transactions.sort((a, b) => a.from - b.from)[0].from) + '';

const getTo = (transactions: LedgerTransaction[]) => {
  if (!transactions.length) {
    return '';
  }

  const newestTo = Number(transactions.sort((a, b) => b.to - a.to)[0].to) + '';
  const newestFrom = transactions.sort((a, b) => b.from - a.from)[0].from + '';

  return newestFrom > newestTo ? newestFrom : newestTo;
};

export const LedgerPage: FC = () => {
  const { data: ledgerTransactions = [] } = useQuery('ledger', () =>
    firebaseService.getLedgerTransactions()
  );

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSelectedTransactions, setCurrentSelectedTransactions] =
    useState<LedgerTransaction[]>([]);
  const [total, setTotal] = useState(0);
  const alert = useAlert();

  const [incomePollito, setIncomePollito] = useState(0);
  const [incomePolluelo, setIncomePolluelo] = useState(0);

  const incomeTotal = incomePollito + incomePolluelo;

  const incomePercentagePollito = (incomePollito * 100) / incomeTotal;

  const onSelectTransaction = useCallback(
    (transactionId: string) => {
      const transaction = ledgerTransactions.find(t => t.id === transactionId);
      if (transaction) {
        setCurrentSelectedTransactions(t => [...t, transaction]);
        setTotal(total + transaction.total);
      }
    },
    [ledgerTransactions, total]
  );

  const from = getFrom(currentSelectedTransactions);
  const to = getTo(currentSelectedTransactions);

  console.log('from', from);
  console.log('to', to);
  const onCreateInvoice = useCallback(async () => {
    await firebaseService.addInvoice({
      ledgerTransactionIds: currentSelectedTransactions.map(t => t.id),
      from,
      to,
      total,
      payment: {
        paid: false,
        percentages: {
          carolina: incomePercentagePollito,
          jeison: 100 - incomePercentagePollito,
        },
        income: {
          carolina: incomePollito,
          jeison: incomePolluelo,
        },
      },
    });

    alert.success('Invoice created');
  }, []);

  return (
    <div>
      <Modal
        shouldCloseOnOverlayClick
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyles}
        isOpen={isModalOpen}
      >
        <h3 className="center">Create invoice</h3>

        <div className="modal-input-group">
          <p>Pollito income:</p>
          <input
            value={incomePollito}
            onChange={e => setIncomePollito(Number(e.target.value))}
            type="number"
            id="pollito-income"
          />
        </div>
        <div className="modal-input-group">
          <p>Polluelo income:</p>
          <input
            value={incomePolluelo}
            onChange={e => setIncomePolluelo(Number(e.target.value))}
            type="number"
            id="polluelo-income"
          />
          <p>{`Total income: ${formatAmountToEuro(incomeTotal)}`}</p>
          <p>{`Total to pay: ${formatAmountToEuro(total)}`}</p>
          <p>{`To pay pollito (${incomePercentagePollito.toFixed(
            1
          )}%):  ${formatAmountToEuro(
            total * (incomePercentagePollito / 100)
          )}`}</p>
          <p>{`To pay polluelo (${(100 - incomePercentagePollito).toFixed(
            1
          )}%):  ${formatAmountToEuro(
            total * ((100 - incomePercentagePollito) / 100)
          )}`}</p>
          <p>{`from ${formatDate(Number(from))} to ${formatDate(
            Number(to)
          )}`}</p>
        </div>
        <div className="center">
          <button onClick={() => onCreateInvoice()}>Create invoice</button>
        </div>
      </Modal>
      <h1>ledger</h1>
      <button onClick={() => navigate(Routes.CreateLedger)}>
        Go to create ledger
      </button>
      <SelectableList
        transactions={ledgerTransactions}
        onSelectTransaction={onSelectTransaction}
      />

      {Boolean(currentSelectedTransactions.length) && (
        <div className="fixed-bar">
          <h2>{`Total: ${formatAmountToEuro(total)}`}</h2>

          <button onClick={() => setIsModalOpen(true)}>create invoice</button>
        </div>
      )}
    </div>
  );
};
