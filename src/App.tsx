import React, { useCallback, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Box, TextField, InputAdornment } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';

let formatter: Intl.NumberFormat, thousandSeparatorRegex: RegExp, decimalSeparatorRegex: RegExp, decimalSeparator: string;

export const setLocale = (locale: any) => {
  formatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 1, useGrouping: true });
  const parts = formatter.formatToParts(1234.5);
  decimalSeparator = parts[3].value;
  thousandSeparatorRegex = new RegExp('\\' + parts[1].value, 'g');
  decimalSeparatorRegex = new RegExp('\\' + decimalSeparator, 'g');
}

setLocale('nl');

export function format(value: number, options?: Intl.NumberFormatOptions) {
  const { locale, ...oldOptions } = formatter.resolvedOptions();
  const maximumFractionDigits = (options && options.maximumFractionDigits) ? options.maximumFractionDigits : 20;
  return new Intl.NumberFormat(locale, { ...oldOptions, ...options, maximumFractionDigits }).format(value);
}

function toFloat(value: string) {
  return parseFloat(value.replace(thousandSeparatorRegex, '').replace(decimalSeparatorRegex, '.'));
}

function testValidNumber(value: string, decimalScale?: number) {
  return new RegExp('^-?\\d*[' + decimalSeparator + ']?\\d' + (decimalScale ? '{0,' + decimalScale + '}' : '*') + '$').test(value);
}

const NumericInput: React.FC<any> = ({ inputRef, onChange, onBlur, onFocus, maximumFractionDigits, useGrouping, ...props }) => {
  const [value, setValue] = useState(props.value ? format(props.value, { useGrouping, maximumFractionDigits }) : '');

  useEffect(() => {
    if (props.value !== '' && typeof props.value !== 'undefined') {
      setValue(format(props.value, { useGrouping, maximumFractionDigits }));
    }
  }, [props.value, useGrouping, maximumFractionDigits]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const isValid = testValidNumber(e.target.value, maximumFractionDigits);
    if (isValid || e.target.value === '') {
      setValue(e.target.value);
      const numberValue = toFloat(e.target.value);
      const newEvent = { ...e, target: { ...e.target, value: !isNaN(numberValue) ? numberValue : undefined } };
      onChange(newEvent);
    }
  }, [onChange, maximumFractionDigits]);

  const handleBlur = useCallback((e: FormEvent<HTMLInputElement>) => {
    value !== '' && setValue(format(toFloat(value), { useGrouping, maximumFractionDigits }));
    onBlur(e);
  }, [onBlur, value, useGrouping, maximumFractionDigits]);

  const handleFocus = useCallback((e: FormEvent<HTMLInputElement>) => {
    value !== '' && useGrouping && setValue(format(toFloat(value), { useGrouping: false, maximumFractionDigits }));
    onFocus(e);
  }, [onFocus, value, useGrouping, maximumFractionDigits]);

  return <input {...props} value={value || ''} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} ref={inputRef} />
};

NumericInput.defaultProps = {
  useGrouping: false
}

type NumericTextFieldProps = Omit<TextFieldProps, 'variant' | 'onChange' | 'value'> & {
  maximumFractionDigits?: number,
  useGrouping?: boolean,
  value?: number | string,
  onChange?: (e: ChangeEvent<HTMLInputElement> & { target: { value?: number } }) => void
}

const NumericTextField: React.FC<NumericTextFieldProps> = ({ maximumFractionDigits, useGrouping, InputProps, ...props }) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      {...props}
      InputProps={{
        ...InputProps,
        inputComponent: NumericInput,
        inputProps: {
          maximumFractionDigits,
          useGrouping,
          pattern: '\\d*',
          ...InputProps ? InputProps.inputProps : {}
        }
      }}
    />
  )
}

type CurrencyTextFieldProps = Omit<NumericTextFieldProps, 'maximumFractionDigits' | 'useGrouping'>

const CurrencyTextField: React.FC<CurrencyTextFieldProps> = ({ InputProps, ...props }) => {
  return (
    <NumericTextField
      {...props}
      useGrouping={true}
      maximumFractionDigits={2}
      InputProps={{
        startAdornment: <InputAdornment position="start">&euro;</InputAdornment>,
        ...InputProps
      }}
    />
  )
}

const App: React.FC = () => {
  const [value, setValue] = useState(10);
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
    </Box>
  );
}

export default App;
