import React, { useState } from 'react';
import NumericInput, { setLocale, NumericInputProps, format } from './NumericInput';
import { TextField, InputAdornment, Box, Button } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';

setLocale('nl');

type NumericTextFieldProps = Omit<TextFieldProps, 'variant' | 'onChange' | 'value'> & NumericInputProps

export const NumericTextField: React.FC<NumericTextFieldProps> = ({ maximumFractionDigits, minimumFractionDigits, useGrouping, InputProps, onChange, ...props }) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      onChange={onChange as any}
      {...props}
      InputProps={{
        ...InputProps,
        inputComponent: NumericInput as React.FC<InputBaseComponentProps>,
        inputProps: {
          maximumFractionDigits,
          minimumFractionDigits,
          useGrouping,
          pattern: '\\d*',
          ...InputProps ? InputProps.inputProps : {}
        }
      }}
    />
  )
}

type CurrencyTextFieldProps = Omit<NumericTextFieldProps, 'maximumFractionDigits' | 'minimumFractionDigits' | 'useGrouping'>

export const CurrencyTextField: React.FC<CurrencyTextFieldProps> = ({ InputProps, ...props }) => {
  return (
    <NumericTextField
      {...props}
      useGrouping={true}
      maximumFractionDigits={2}
      minimumFractionDigits={2}
      InputProps={{
        startAdornment: <InputAdornment position="start">&euro;</InputAdornment>,
        ...InputProps
      }}
    />
  )
}

export const FormattedNumber: React.FC<{ value: number, options?: Intl.NumberFormatOptions }> = ({ value, options }) => <span>{format(value, options)}</span>

const App: React.FC = () => {
  const [value, setValue] = useState(10 as number | '' | undefined);
  return (
    <Box height="100%" width="100%" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
      <FormattedNumber value={value || 0} options={{ maximumFractionDigits: 3, useGrouping: false }} />
      <NumericTextField
        label="Numbers"
        value={typeof value !== 'undefined' ? value : ''}
        onChange={e => { console.log(e.target.value); setValue(e.target.value) }}
      />
      <CurrencyTextField
        label="Currency"
        onChange={e => console.log(e.target.value)}
      />
      <Button onClick={() => setValue('')}>Leeg maken</Button>
    </Box>
  );
}

export default App;
