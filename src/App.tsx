import React, { useState } from 'react';
import { Box, TextField, InputAdornment, Button } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { NumericInput, NumericProps, setLocale } from './NumberFormat';

setLocale('nl');

type NumericTextFieldProps = Omit<TextFieldProps, 'variant' | 'onChange' | 'value'> & NumericProps

const NumericTextField: React.FC<NumericTextFieldProps> = ({ maximumFractionDigits, minimumFractionDigits, useGrouping, InputProps, ...props }) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      {...props}
      InputProps={{
        ...InputProps,
        inputComponent: NumericInput as any,
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

const CurrencyTextField: React.FC<CurrencyTextFieldProps> = ({ InputProps, ...props }) => {
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

const App: React.FC = () => {
  const [value, setValue] = useState(10 as number | undefined);
  return (
    <Box height="100%" width="100%" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
      <NumericTextField
        label="Nummers!"
        value={value || ''}
        onChange={e => setValue(e.target.value)}
      />
      <CurrencyTextField
        label="Bedrag!"
        onChange={e => console.log(e.target.value)}
      />
      <Button onClick={() => setValue(undefined)}>Leeg maken!</Button>
    </Box>
  );
}

export default App;
