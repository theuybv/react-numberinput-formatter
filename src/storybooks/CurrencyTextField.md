
```typescript
setLocale('nl');

type NumericTextFieldProps = Omit<TextFieldProps, 'variant' | 'onChange' | 'value'> & NumericProps

export const NumericTextField: React.FC<NumericTextFieldProps> = ({ maximumFractionDigits, minimumFractionDigits, useGrouping, InputProps, ...props }) => {
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
```
