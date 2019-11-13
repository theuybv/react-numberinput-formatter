import React from 'react';
import { storiesOf } from '@storybook/react';
const welcomeStory = require('./welcomeStory.md').default;
import App from '../src/App';

storiesOf('react-numberinput-formatter', module)
  .addParameters({
    readme: {
      // Show readme before story
      // content: welcomeStory,
      // Show readme at the addons panel
      sidebar: welcomeStory,
    },
    options: {
      showPanel: true
    }
  })
  .add('README.md', () => {
    return (
      <App />
    )
  }, { info: { disable: true } })
