import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

import './SigninForm.css';
import { updatedObject, checkValidity } from '../../../shares/utility';
import useAuth from '../../../store/hooks/auth';

import Input from '../../UI/Input/Input';
import Spinner from '../../../components/UI/spinner/spinner';
import Modal from '../../UI/Modal/Modal';

const SignInForm = () => {
  const [controls, setControls] = useState({
    signinForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Enter email here'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        label: 'E-mail:'
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Enter password here'
        },
        value: '',
        validation: {
          required: true,
          isAlphaNumeric: true,
          minLength: 6,
          maxLength: 18
        },
        valid: false,
        invalidMsg: null,
        touched: false,
        label: 'Password:'
      }
    },
    formIsValid: false
  });

  const { 
    reqSignin,
    isLoading,
    profile,
    error,
    isAuth,
    clear
  } = useAuth();

  // Submit Form 
  const handleForm = event => {
    event.preventDefault();
    const formData = {};
    for(var key in controls.signinForm){
      formData[key] = controls.signinForm[key].value;
    }

    // console.log(formData);
    reqSignin(formData);
  }

  const elementChangeHandle = (event, inputIdentifier) => {
    // console.log('On element change ', event.target.value, inputIdentifier);
    const {isValid, msg} = checkValidity(
      event.target.value,
      controls.signinForm[inputIdentifier].validation
    );

    const updatedFormElement = updatedObject(
      controls.signinForm[inputIdentifier], 
      {
        value: event.target.value,
        valid: isValid,
        invalidMsg: msg,
        touched: true
      }
    );

    const updatedForm = updatedObject(
      controls.signinForm,
      {
        [inputIdentifier]: updatedFormElement
      }
    );

    let formIsValid = true;
    for(var inputKey in updatedForm){
      formIsValid = updatedForm[inputKey].valid && formIsValid;
    }

    // console.log('formIsValid ', formIsValid);
    setControls({
      ...controls,
      signinForm: updatedForm,
      formIsValid: formIsValid
    });
  }

  
  /**
   * Render form
   */
  const initForm = () => {
    let formElementArray = [];
    for(var key in controls.signinForm){
      formElementArray.push({
        id: key,
        config: controls.signinForm[key]
      });
    }

    return (
      <form 
        onSubmit={handleForm} 
        className="form-signin border rounded p-3"
      >
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            invalid={!formElement.config.valid}
            shouldValidation={formElement.config.validation}
            touched={formElement.config.touched}
            value={formElement.config.value}  
            invalidMsg={formElement.config.invalidMsg}
            label={formElement.config.label}
            changed={(event) => elementChangeHandle(event, formElement.id)}
          />
        ))}
  
        <div className="text-center">
          <button 
            className="btn btn-success"
            type="submit"
            disabled={!controls.formIsValid}
          >
            {isLoading ? (
              <Spinner />
            ) : 'SUBMIT'}
          </button>
        </div>
      </form>
    );
  }


  let redirectToDashboard = null;
  if(isAuth){
    redirectToDashboard = isAuth && profile.role === 1 ? (
      <Redirect to="/admin/dashboard" /> 
    ): (
      <Redirect to="/user/dashboard" /> 
    );
  }
  // console.log('data ', auth.data)

  return(
    <div className="container col-7 p-2">
      <Modal 
        show={error}
        closedModal={() => clear()}
      >
        <h4 className="d-block text-center">Oops! something went wrong.</h4>
        <p className="text-danger font-weight-bold text-center">
          [Email or Password not match]
        </p>
      </Modal>

      {redirectToDashboard}
      <h2 className="text-center">SignIn to Join</h2>
      {initForm()}
    </div>
  )

}

export default SignInForm;