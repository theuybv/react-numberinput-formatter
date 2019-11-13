import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';
import { addReadme, withReadme } from 'storybook-readme';

addDecorator(withKnobs);
addDecorator(withInfo({ header: false, inline: true, source: false, propTypes: false }));
addDecorator(addReadme);
// // Option defaults:
addParameters({
  options: {
    /**
     * show story component as full screen
     * @type {Boolean}
     */
    isFullscreen: false,
    /**
     * display panel that shows a list of stories
     * @type {Boolean}
     */
    showNav: true,
    /**
     * display panel that shows addon configurations
     * @type {Boolean}
     */
    showPanel: true,
  }
});

const req = require.context('../src/storybooks', true, /.stories.tsx$/);
function loadStories() {
  require('./welcomeStory.tsx');
  req.keys().forEach(req);
}
configure(loadStories, module);
