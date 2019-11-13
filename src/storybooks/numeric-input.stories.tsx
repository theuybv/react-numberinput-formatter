
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import 'typeface-roboto';
import 'material-design-icons/iconfont/material-icons.css';
import { NumericTextField, CurrencyTextField } from '../App';

const NumericTextFieldReadme = require('./NumericTextField.md').default;
const CurrencyTextFieldReadme = require('./CurrencyTextField.md').default;

storiesOf("Interactive examples", module)
  .addParameters({
    readme: {
      sidebar: NumericTextFieldReadme
    }
  })
  .add("Extending Material UI TextField as a simple numeric input", () => (
    <NumericTextField
      label="Numbers"
    />
  ))
  .addParameters({
    readme: {
      sidebar: CurrencyTextFieldReadme
    }
  })
  .add("Extending Material UI TextField as a currency input", () => (
    <CurrencyTextField
      label="Currency"
    />
  ))
