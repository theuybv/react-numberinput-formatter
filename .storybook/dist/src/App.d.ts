import React from 'react';
import { NumericProps } from './NumericInput';
import { TextFieldProps } from '@material-ui/core/TextField';
declare type NumericTextFieldProps = Omit<TextFieldProps, 'variant' | 'onChange' | 'value'> & NumericProps;
export declare const NumericTextField: React.FC<NumericTextFieldProps>;
declare type CurrencyTextFieldProps = Omit<NumericTextFieldProps, 'maximumFractionDigits' | 'minimumFractionDigits' | 'useGrouping'>;
export declare const CurrencyTextField: React.FC<CurrencyTextFieldProps>;
export declare const FormattedNumber: React.FC<{
    value: number;
    options?: Intl.NumberFormatOptions;
}>;
declare const App: React.FC;
export default App;
