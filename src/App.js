import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './page/Home/home';
import SignIn from './page/sign-in/sing-in';
import SignUp from './page/sign-up/sing-up';
import Layout from './hoc/layout/layout';


const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Layout>
  );
}

export default App;
