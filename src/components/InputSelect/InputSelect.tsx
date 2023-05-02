import { FC } from 'react';
import Select, { StylesConfig, Props } from 'react-select';

const selectStyles: StylesConfig = {
  control: styles => ({
    ...styles,
    width: 200,
    borderColor: 'transparent',
    borderWidth: 1,
    borderLeftColor: '#696868',
    height: '100%',
    backgroundColor: 'transparent',
  }),
  placeholder: styles => ({
    ...styles,
    fontSize: '1rem',
    margin: '0.5rem',
  }),
  option: styles => ({
    ...styles,
    backgroundColor: '#242424',
  }),
  singleValue: styles => ({
    ...styles,
    color: 'white',
  }),
  input: styles => ({
    ...styles,
    border: 'transparent',
  }),
};

export const InputSelect: FC<
  Pick<Props, 'options' | 'onChange' | 'defaultInputValue'>
> = props => {
  return <Select {...props} styles={selectStyles} />;
};
