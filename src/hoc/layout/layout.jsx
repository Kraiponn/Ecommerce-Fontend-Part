import React from 'react';
import Aux from '../auxed/auxed';

import './layout.scss';

const Layout = props => {

  return (
    <Aux>
      <main>
        {props.children}
      </main>
    </Aux>
  );
}

export default Layout;