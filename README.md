# React Numeric Input
#### A react input field with locale number formatting using  [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)


![Input Example](https://snipboard.io/nyeJE3.jpg)

### Code Example

```typescript
import React from 'react';
import { InputAdornment } from '@material-ui/core';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import NumericInput, { NumericProps, setLocale } from 'react-numeric-input';

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
```


