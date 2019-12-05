import React, { useCallback, useState, useEffect } from 'react';

let formatter: Intl.NumberFormat, thousandSeparatorRegex: RegExp, decimalSeparatorRegex: RegExp, decimalSeparator: string;

export const setLocale = (locale: any) => {
  formatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 1, useGrouping: true });
  const parts = formatter.formatToParts(1234.5);
  decimalSeparator = parts[3].value;
  thousandSeparatorRegex = new RegExp('\\' + parts[1].value, 'g');
  decimalSeparatorRegex = new RegExp('\\' + decimalSeparator, 'g');
}

setLocale('en-US');

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

export interface HTMLNumericInputElement extends Omit<React.HTMLAttributes<HTMLInputElement>, 'value'> {
  value?: number
}

export interface NumericInputProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onBlur' | 'onFocus'> {
  maximumFractionDigits?: number,
  minimumFractionDigits?: number,
  useGrouping?: boolean,
  value?: number,
  onChange?: (e: React.ChangeEvent<HTMLNumericInputElement>) => void,
  onBlur?: (e: React.FocusEvent<HTMLNumericInputElement>) => void,
  onFocus?: (e: React.FocusEvent<HTMLNumericInputElement>) => void,
  inputRef?: string | ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null | undefined
}

const NumericInput: React.FC<NumericInputProps> = ({ inputRef, onChange, onBlur, onFocus, maximumFractionDigits, minimumFractionDigits, useGrouping, ...props }) => {
  const [value, setValue] = useState(props.value ? format(props.value, { useGrouping, maximumFractionDigits, minimumFractionDigits }) : '');

  useEffect(() => {
    const floatValue = toFloat(value);
    if (((!isNaN(floatValue) && floatValue !== 0) || props.value) && floatValue !== props.value && props.value + '' !== '' && typeof props.value !== 'undefined') {
      setValue(format(props.value, { useGrouping, maximumFractionDigits, minimumFractionDigits }));
    } else if (typeof props.value !== 'undefined' && props.value + '' === '') {
      setValue('');
    }
  }, [props.value, value, useGrouping, maximumFractionDigits, minimumFractionDigits]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = e.target.value.replace('.', decimalSeparator);
    const isValid = testValidNumber(stringValue, maximumFractionDigits);
    if (isValid || stringValue === '') {
      setValue(stringValue);
      const numberValue = toFloat(e.target.value);
      if (typeof numberValue !== 'undefined' && (!isNaN(numberValue) || stringValue === '')) {
        const newEvent = { ...e, target: { ...e.target, value: !isNaN(numberValue) ? numberValue : undefined } };
        onChange && onChange(newEvent as unknown as React.ChangeEvent<HTMLNumericInputElement>);
      }
    }
  }, [onChange, maximumFractionDigits]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    value !== '' && setValue(format(toFloat(value), { useGrouping, maximumFractionDigits, minimumFractionDigits }));
    onBlur && onBlur(e as unknown as React.FocusEvent<HTMLNumericInputElement>);
  }, [onBlur, value, useGrouping, maximumFractionDigits, minimumFractionDigits]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    value !== '' && useGrouping && setValue(format(toFloat(value), { useGrouping: false, maximumFractionDigits, minimumFractionDigits }));
    onFocus && onFocus(e as unknown as React.FocusEvent<HTMLNumericInputElement>);
  }, [onFocus, value, useGrouping, maximumFractionDigits, minimumFractionDigits]);

  return <input pattern="\\d*" {...props} value={value} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} ref={inputRef} />
};

NumericInput.defaultProps = {
  useGrouping: false
}

export default NumericInput;
