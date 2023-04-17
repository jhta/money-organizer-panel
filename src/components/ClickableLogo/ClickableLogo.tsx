import { FC, useRef } from 'react';
import { Banks } from '~/types';
import revolutLogo from '~/assets/revolut.png';
import abnAmroLogo from '~/assets/abn-amro-logo.png';
import { useActions } from '~/store/useActions';
import { useIsReportStarted, useReportBanks } from '~/store/useSelectors';
import { extractTransactionsFromFile } from '~/utils';
import './styles.css';

interface ClickableLogoProps {
  bank: Banks;
}

export const ClickableLogo: FC<ClickableLogoProps> = ({ bank }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setTransactions, startReport } = useActions();
  const isReportStarted = useIsReportStarted();

  const reportBanks = useReportBanks();
  const isSelected = reportBanks.includes(bank);

  const onClickInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files = [] } = event.target;

    if (!files?.length) return;

    const file = files[0];

    extractTransactionsFromFile(file, bank, transactions => {
      setTransactions(transactions);
    });
  };

  const onClickBank = () => {
    if (isReportStarted) {
      startReport();
    }

    fileInputRef.current?.click();
  };

  const fileType = bank === Banks.Revolut ? 'csv' : 'txt';

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        name="file"
        accept={`.${fileType}`}
        onChange={onClickInputFile}
        style={{ display: 'none' }}
      />
      <div
        onClick={onClickBank}
        className={`clickable-logo ${isSelected ? 'selected' : ''}`}
      >
        {bank === Banks.Revolut ? (
          <img src={revolutLogo} alt="revolut" className="revolutLogo" />
        ) : (
          <img
            src={abnAmroLogo}
            alt="abn-amro"
            width="200"
            className="abnAmroLogo"
          />
        )}
      </div>
    </>
  );
};
