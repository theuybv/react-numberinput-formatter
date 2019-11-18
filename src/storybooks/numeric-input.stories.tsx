
import { storiesOf } from '@storybook/react';
import React from 'react';
import 'typeface-roboto';
import 'material-design-icons/iconfont/material-icons.css';
import { NumericTextField, CurrencyTextField } from '../App';
import NumericInput from '../NumericInput';

const NumericTextFieldReadme = require('./NumericTextField.md').default;
const CurrencyTextFieldReadme = require('./CurrencyTextField.md').default;

const ControlledExample: React.FC = ({ }) => {
  const [value, setValue] = React.useState(10 as number | undefined);
  return <NumericInput value={value} onChange={e => setValue(e.target.value)} />
}

storiesOf("Interactive examples", module)
  .addParameters({
    readme: {
      sidebar: 'TODO'
    }
  }).add("Numeric Input uncontrolled", () => (
    <NumericInput onChange={e => console.log(e.target.value)} />
  ))
  .addParameters({
    readme: {
      sidebar: 'TODO'
    }
  }).add("Numeric Input controlled", () => <ControlledExample />)
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
