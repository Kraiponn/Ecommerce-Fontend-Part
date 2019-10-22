import React, {useState} from 'react';
import { Link } from 'react-router-dom';

// import './sign-up.scss';
import Layout from '../../../components/Layout/Layout';
import Spinner from '../../../components/UI/spinner/spinner';

import useAuth from '../../../hooks/useAuth';

const SignUp = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    // error: null,
    // success: false
  });

  const {
    error,
    loading,
    success,
    data,
    requestSignup
    // clear
  } = useAuth();

  const { name, email, password } = values;
  // const {name, email, password, error, success} = values;

  // const handleChange = name => event => {
  //   setValues({
  //     ...values,
  //     error: false,
  //     [name]: event.target.value
  //   });
  // }

  const handleChange = event => {
    const target = event.target;
    const value = target.type === 'checked' ? target.checked : target.value;
    const name = target.name;
    setValues({
      ...values,
      [name]: value
    });
  }


  const showError = () => (
    <div
      style={{ display: error ? '' : 'none' }}
      className="alert alert-danger">
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      style={{ display: success ? '' : 'none' }}
      className="alert alert-info"
    >
      {/* New account created. Please <Link to="/signin">signin</Link> */}
      {data.msg} Please <Link to="/signin">signin</Link>
    </div>
  );

  const clickedSubmit = event => {
    event.preventDefault();
    requestSignup({name, email, password});
  }

  const formSignup = () => (
    <form>
      <div className="form-group">
        <label htmlFor="name" className="text-muted">Name</label>
        <input 
          type="text" 
          name="name" 
          value={values.name}
          onChange={handleChange}
          className="form-control"/>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="text-muted">Email</label>
        <input 
          type="email" 
          name="email" 
          value={values.email}
          onChange={handleChange}
          className="form-control"/>
      </div>

      <div className="form-group">
        <label htmlFor="password" className="text-muted">Password</label>
        <input 
          type="password" 
          name="password" 
          value={values.password}
          onChange={handleChange}
          className="form-control"/>
      </div>

      <button 
        onClick={clickedSubmit}
        className="btn btn-primary">
        Submit
      </button>
    </form>
  )

  return (
    <Layout 
      title="Signup Page"
      description="Signup to Stack - Ecommerce"
      className="container col-md-8 offset-md-2"
    >
      {loading && (<Spinner />)}
      {success && showSuccess()}
      {error && showError()}
      {formSignup()}
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
};

export default SignUp;




// const signup = user => {
//   // console.log(user);

//   return axios.post(api + '/auth/signup', user)
//     .then(resp => {
//       console.log(resp.data);
//       setValues({
//         ...values,
//         name: '',
//         email: '',
//         password: '',
//         error: null,
//         success: true
//       });
//     })
//     .catch(err => {
//       const { errors } = err.response.data;
//       console.log(err.response, errors);

//       setValues({
//         ...values,
//         error: errors.data,
//         success: false
//       });
//     });

  // fetch(`${api}/auth/signup`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     'Content-Type': "application/json"
  //   },
  //   body: JSON.stringify(user)
  // })
  // .then(res => {
  //   console.log(res.json());
  // })
  // .catch(error => {
  //   console.log(error);
  // });
// }