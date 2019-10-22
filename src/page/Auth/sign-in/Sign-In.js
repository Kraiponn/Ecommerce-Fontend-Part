import React from 'react';

// import './sing-in.scss';

import Layout from '../../../components/Layout/Layout';
import SignInForm from '../../../components/Auth/SignIn/SignInForm';


const SignIn = () => {

  return (
    <Layout 
      title="Signin Page"
      description="Signin to Stack - Ecommerce" >
      <SignInForm />
    </Layout>
  );
};

export default SignIn;