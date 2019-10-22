import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { updatedObject, checkValidity } from '../../../shares/utility';

import Modal from '../../../components/UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import Spinner from '../../UI/spinner/spinner';

import useAuth from '../../../store/hooks/auth';

import './SignUpForm.scss';


const SignUpForm = () => {
  const [controls, setControls] = useState({
    form: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'name',
          placeholder: 'Enter name here'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        invalidMsg: null,
        touched: false,
        label: 'Your Name:'
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'Enter email here'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        invalidMsg: null,
        valid: false,
        touched: false,
        label: 'E-mail:'
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          name: 'password',
          placeholder: 'Enter password here'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 24
        },
        invalidMsg: null,
        valid: false,
        touched: false,
        label: 'Password:'
      }
    },
    formIsValid: false
  });

  /**
   * Get custom hooks
   */
  const {
    isLoading,
    error,
    success,
    reqSignup,
    clear
  } = useAuth();


  /**
   * Handle input change
   */
  const handleInputChange = (event, inputId) => {
    const { isValid, msg } = checkValidity(
      event.target.value,
      controls.form[inputId].validation
    );

    const updatedFormElement = updatedObject(
      controls.form[inputId],
      {
        value: event.target.value,
        valid: isValid,
        invalidMsg: msg,
        touched: true
      }
    );

    const updatedForm = updatedObject(
      controls.form,
      { [inputId]: updatedFormElement }
    );

    let formIsValid = true;
    for(var key in updatedForm){
      formIsValid = updatedForm[key].valid && formIsValid;
    }

    setControls({
      form: updatedForm,
      formIsValid: formIsValid
    });
  } 


  /**
   * Submit form to API 
   */
  const handleSubmit = event => {
    event.preventDefault();
    
    const formData = {};
    for(var key in controls.form){
      formData[key] = controls.form[key].value;
    }
    console.log('Form data ', formData);
    reqSignup(formData);
  }

  
  /**
   * RENDER FORM
   */
  let formElementArray = [];
  for(var key in controls.form){
    formElementArray.push({
      id: key,
      config: controls.form[key]
    });
  }

  let form = !isLoading ? (
    <form
      onSubmit={handleSubmit}
      className="form border rounded p-4"
    >
      <h4 className="text-center">Signup Form</h4>
      {formElementArray.map(item => (
        <Input 
          key={item.id}
          value={item.config.value}
          elementType={item.config.elementType}
          elementConfig={item.config.elementConfig}
          invalid={!item.config.valid}
          shouldValidation={item.config.validation}
          invalidMsg={item.config.invalidMsg}
          touched={item.config.touched}
          label={item.config.label}
          changed={event => handleInputChange(event, item.id)}
        />

      ))}

      <div className="text-center">
        <button 
          className="button"
          disabled={!controls.formIsValid}
        >
          SUBMIT
        </button>
      </div>

    </form>
  ) : (
    <div className="text-center" >
      <Spinner />
    </div>
  );

  let isSignupSuccess = success ? (
    <div className="bg-success p-5 rounded text-center">
      <p className="font-weight-bold mb-2">Signup finished.</p> 
      <h3> 
        <Link  
          onClick={() => clear()}
          className="text-white font-weight-bold" 
          to='/signin'>Clicked here to signin.
        </Link>
      </h3>
    </div>
  ) : null;


  let isError = error ? (
    <div>
      <h4>Oops! Invalid email or password.</h4>
      <p className="text-danger text-center">{error}</p>
    </div>
  ) : null;

  return(
    <div className="container col-7 p-2 mb-3">
      {isSignupSuccess}
      <Modal
        show={error}
        closedModal={() => clear()}
      >
        {isError}
      </Modal>
      {!success && form}
    </div>
  )
}

export default SignUpForm;