import React, { useCallback, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Box, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import numeral from 'numeral';
import 'numeral/locales/nl-nl.js';

numeral.locale('nl-nl');

const NumericInput: React.FC<any> = ({ inputRef, onChange, onBlur, onFocus, decimalScale, ...props }) => {
  const [value, setValue] = useState(props.value || '');

  useEffect(() => {
    props.value !== '' && typeof props.value !== 'undefined' && setValue(numeral(props.value).format('0.[' + '0'.repeat(decimalScale) + ']'));
  }, [props.value, decimalScale]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp('^-?\\d*[,.]?\\d{0,' + decimalScale + '}$');
    const isNumber = regex.test(e.target.value);
    if (isNumber || e.target.value === '') {
      setValue(e.target.value);
      const newEvent = { ...e, target: { ...e.target, floatValue: isNumber ? numeral(e.target.value).value() : undefined } };
      onChange(newEvent);
    }
  }, [onChange, decimalScale]);

  const handleBlur = useCallback((e: FormEvent<HTMLInputElement>) => {
    value !== '' && setValue(numeral(value).format('0,0.[' + '0'.repeat(decimalScale) + ']'));
    onBlur(e);
  }, [onBlur, value, decimalScale]);

  const handleFocus = useCallback((e: FormEvent<HTMLInputElement>) => {
    value !== '' && setValue(numeral(value).format('0.[' + '0'.repeat(decimalScale) + ']'));
    onFocus(e);
  }, [onFocus, value, decimalScale]);

  return <input {...props} value={value || ''} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} ref={inputRef} />
};

NumericInput.defaultProps = {
  decimalScale: 2
}

const NumericTextField: React.FC<Omit<TextFieldProps, 'variant' | 'onChange' | 'value'> & { decimalScale?: number, value?: number, onChange?: (e: ChangeEvent<HTMLInputElement> & { target: { value: string, floatValue?: number } }) => void }> = ({ decimalScale, InputProps, ...props }) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      {...props}
      InputProps={{
        ...InputProps,
        inputComponent: NumericInput,
        inputProps: {
          decimalScale,
          pattern: '\\d*',
          ...InputProps ? InputProps.inputProps : {}
        }
      }}
    />
  )
}

const App: React.FC = () => {
  const [number, setNumber] = useState(15 as number | undefined);
  useEffect(() => {
    console.log('number changed', number);
  }, [number]);
  return (
    <Box height="100%" width="100%" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
      <NumericTextField
        label="Nummers!"
        onChange={e => setNumber(e.target.floatValue || undefined)}
        value={number}
        decimalScale={3}
      />
    </Box>
  );
}

export default App;
