import React from 'react';

import Layout from '../../../components/Layout/Layout';
import SignUpForm from '../../../components/Auth/SignUp/SignUpForm';


const SignUp = () => {
  return(
    <Layout
      title="Welcome to E-commerce"
      description="Are you new?. Please signup for join us."
    >
      <SignUpForm />
    </Layout>
  )
}

export default SignUp;