
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import 'typeface-roboto';
import 'material-design-icons/iconfont/material-icons.css';
import App, { NumericTextField, CurrencyTextField } from '../App';


storiesOf("A react input field with locale number formatting using Intl NumberFormat", module)
  .add("Application examples", () => <App />)
  .add("Extending Material UI TextField as a simple numeric input", () => (
    <NumericTextField
      label="Numbers"
    />
  ), {
    notes: `@todo nice description`
  })
  .add("Extending Material UI TextField as a currency input", () => (
    <CurrencyTextField
      label="Currency"
    />
  ), {
    notes: `@todo nice description`
  })
