import React, { useCallback, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Box, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';

const ValidatedInput: React.FC<any> = ({ inputRef, onChange, onBlur, onFocus, ...props }) => {
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log('validate', e.target.value);
    onChange(e);
  }, [onChange]);
  const handleBlur = useCallback((e: FormEvent<HTMLInputElement>) => {
    console.log('blur validate');
    onBlur(e);
  }, [onBlur]);
  const handleFocus = useCallback((e: FormEvent<HTMLInputElement>) => {
    console.log('focus validate');
    onFocus(e);
  }, [onFocus]);
  return <input {...props} ref={inputRef} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} />
}

const decimalSeperator = ',';
const thousandSeparator = '.';
const thousandSeparatorRegex = new RegExp('\\' + thousandSeparator, 'g');
const decimalSeperatorRegex = new RegExp('\\' + decimalSeperator, 'g');

const NumericInput: React.FC<any> = ({ inputRef, onChange, onBlur, onFocus, ...props }) => {
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // TODO: locale parsing...
    const parsed = e.target.value.replace(thousandSeparatorRegex, '').replace(decimalSeperatorRegex, '.');
    console.log(parsed);
    const number = parseFloat(parsed);
    if (!isNaN(number) || e.target.value === '') {
      setValue(e.target.value);
      onChange({ ...e, target: { ...e.target, floatValue: isNaN(number) ? '' : number } });
    }
  }, [onChange]);
  const handleBlur = useCallback((e: FormEvent<HTMLInputElement>) => {
    console.log('blur numeric', value);
    const parsed = value.replace(thousandSeparatorRegex, '').replace(decimalSeperatorRegex, '.');
    console.log(parsed);
    const number = parseFloat(parsed);
    console.log(number);
    setValue(number.toLocaleString());
    onBlur(e);
  }, [onBlur, value]);
  const handleFocus = useCallback((e: FormEvent<HTMLInputElement>) => {
    console.log('focus numeric');
    onFocus(e);
  }, [onFocus]);
  return <input {...props} value={value || ''} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} ref={inputRef} />
};

const CustomTextField: React.FC<Omit<TextFieldProps, 'variant'>> = (props) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      {...props}
      InputProps={{
        inputComponent: ValidatedInput,
        ...props.InputProps
      }}
    />
  )
}

const NumericTextField: React.FC<Omit<TextFieldProps, 'variant'>> = (props) => {
  return (
    <CustomTextField
      {...props}
      InputProps={{
        inputComponent: NumericInput,
        inputProps: {
          pattern: '\\d*'
        },
        ...props.InputProps
      }}

    />
  )
}

const App: React.FC = () => {
  const [number, setNumber] = useState(15 as number | string);
  return (
    <Box height="100%" width="100%" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
      <CustomTextField
        label="Letters!"
        onChange={e => console.log('chain', e.target.value)}
      />
      <NumericTextField
        label="Nummers!"
        onChange={e => setNumber(e.target.value)}
        value={number}
      />
    </Box>
  );
}

export default App;
