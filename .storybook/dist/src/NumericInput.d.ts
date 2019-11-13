import React from 'react';
export declare const setLocale: {
    (locale: any): void;
    displayName: string;
    __docgenInfo: {
        "description": string;
        "displayName": string;
        "props": {};
    };
};
export declare function format(value: number, options?: Intl.NumberFormatOptions): string;
export declare type NumericProps = {
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
    useGrouping?: boolean;
    value?: number | string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement> & {
        target: {
            value?: number;
        };
    }) => void;
};
export declare type NumericInputProps = {
    maximumFractionDigits: number;
    minimumFractionDigits: number;
    useGrouping: boolean;
    value: number;
    inputRef: string | ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null | undefined;
} & Omit<React.HTMLProps<HTMLInputElement>, 'value'>;
declare const NumericInput: React.FC<NumericInputProps>;
export default NumericInput;
