import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// import Menu from './components/menu/menu';
import Home from './page/Home/home';
import SignIn from './page/Auth/sign-in/Sign-In';
import SignUp from './page/Auth/sign-up/SignUp';
import SignOut from './components/Auth/Sign-Out';
import DashBoard from './page/DashBoard/DashBoard';
import PrivateRoute from './components/Auth/Routes/PrivateRoute';
import AdminRoute from './components/Auth/Routes/AdminRoute';

import AdminDashboard from './page/DashBoard/AdminDashboard';
import AddCategory from './page/Category/AddCategory';
import AddProduct from './page/Product/AddProduct/AddProduct';
// import Layout from './hoc/layout/layout';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signout" component={SignOut} />
        <PrivateRoute 
          path="/user/dashboard" 
          exact 
          component={DashBoard} 
        />
        <AdminRoute 
          path="/admin/dashboard" 
          exact 
          component={AdminDashboard} 
        />
        <AdminRoute 
          path="/create/category" 
          exact 
          component={AddCategory} 
        />
        <AdminRoute 
          path="/create/product" 
          exact 
          component={AddProduct} 
        />
      </Switch>
   </BrowserRouter>
  );
}

export default App;
