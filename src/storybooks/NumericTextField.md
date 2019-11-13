```typescript
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
```
