import React, { Fragment } from 'react';

// Components
import Button from './components/Button';
import { Panel } from './components/Panel';
import { VASTField } from './components/VastField';

const App = () => (
  <Fragment>
    <Panel name="Set VAST tag">
      <VASTField
        label="Preroll"
        fieldName="preroll"
      />
      <VASTField
        label="Sting"
        fieldName="sting"
      />
      <VASTField
        label="Postroll"
        fieldName="postroll"
      />
    </Panel>
  </Fragment>
)

export default App;
