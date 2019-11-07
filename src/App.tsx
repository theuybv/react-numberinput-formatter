import React, { useCallback, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Box, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import numeral from 'numeral';
import 'numeral/locales/nl-nl.js';

numeral.locale('nl-nl');

const NumericInput: React.FC<any> = ({ inputRef, onChange, onBlur, onFocus, decimalScale, showThousandSeparator, format, ...props }) => {
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
    value !== '' && setValue(numeral(value).format((showThousandSeparator ? '0,' : '') + '0.[' + '0'.repeat(decimalScale) + ']'));
    onBlur(e);
  }, [onBlur, value, decimalScale, showThousandSeparator]);

  const handleFocus = useCallback((e: FormEvent<HTMLInputElement>) => {
    value !== '' && setValue(numeral(value).format('0.[' + '0'.repeat(decimalScale) + ']'));
    onFocus(e);
  }, [onFocus, value, decimalScale]);

  return <input {...props} value={value || ''} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} ref={inputRef} />
};

NumericInput.defaultProps = {
  decimalScale: 2,
  showThousandSeparator: false
}

const NumericTextField: React.FC<Omit<TextFieldProps, 'variant' | 'onChange' | 'value'> & { decimalScale?: number, showThousandSeparator?: boolean, value?: number, onChange?: (e: ChangeEvent<HTMLInputElement> & { target: { value: string, floatValue?: number } }) => void }> = ({ decimalScale, showThousandSeparator, InputProps, ...props }) => {
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
          showThousandSeparator,
          pattern: '\\d*',
          ...InputProps ? InputProps.inputProps : {}
        }
      }}
    />
  )
}

const App: React.FC = () => {
  return (
    <Box height="100%" width="100%" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
      <NumericTextField
        label="Nummers!"
        onChange={e => console.log(e.target.floatValue)}
        decimalScale={3}
        showThousandSeparator={true}
      />
    </Box>
  );
}

export default App;
