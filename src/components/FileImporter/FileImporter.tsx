import React, { FC } from 'react';

interface FileImporterProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'csv' | 'txt';
}

export const FileImporter: FC<FileImporterProps> = ({
  onChange,
  type = 'csv',
}) => {
  return (
    <input
      type="file"
      name="file"
      accept={`.${type}`}
      onChange={onChange}
      style={{ display: 'block', margin: '10px auto' }}
    />
  );
};
