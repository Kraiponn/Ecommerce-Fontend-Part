import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

import './AddCategory.scss';

import useAuth from '../../store/hooks/category';
import { updatedObject, checkValidity } from '../../shares/utility';
import Layout from '../../components/Layout/Layout';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/spinner/spinner';
import Modal from '../../components/UI/Modal/Modal';


const AddCategory = (props) => {
  const [controls, setControls] = useState({
    form: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'name',
          placeholder: 'Enter category name here'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        invalidMsg: null,
        touched: false,
        label: 'Category Name'
      }
    },
    formIsValid: false
  });

  const { 
    profile, 
    error, 
    isLoading, 
    clear,
    addCategory,
    success
  } = useAuth();

  /**
   * Render Form
   */
  const renderCategoryForm = () => {
    let formElementArray = [];
    for(var key in controls.form){
      formElementArray.push({
        id: key,
        config: controls.form[key]
      });
    }

    return (
      <form
        onSubmit={handleSubmitForm}
        className="form border rounded p-4"
      >
        <h4 className='text-center'>Add Category</h4>
        {formElementArray.map(item => (
          <Input 
            key={item.id}
            elementType={item.config.elementType}
            elementConfig={item.config.elementConfig}
            value={item.config.value}
            touched={item.config.touched}
            invalid={!item.config.valid}
            invalidMsg={item.config.invalidMsg}
            shouldValidation={item.config.validation}
            // label={item.config.label}
            changed={(event) => handleElementChange(event, item.id)}
          />
        ))}

        <div className="text-center">
          <button 
            className="button"
            disabled={!controls.formIsValid}
            type="submit"
          >
            {isLoading ? (
              <Spinner />
            ): 'SUBMIT'}
          </button>
        </div>

        <hr />
        <span
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            color: 'blue',
            textDecoration: 'underline'
          }}
          onClick={() => props.history.goBack()}
        >
          Back to dashboard
        </span>
      </form>
    );
  }


  /**
   * Handle Input Element Change
   */
  const handleElementChange = (e, elementId) => {
    const { isValid, msg } = checkValidity(
      e.target.value,
      controls.form[elementId].validation
    );

    const updatedElement = updatedObject(
      controls.form[elementId],
      {
        value: e.target.value,
        valid: isValid,
        touched: true,
        invalidMsg: msg
      }
    );

    const updatedForm = updatedObject(
      controls.form, 
      {
        [elementId]: updatedElement
      }
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
   * Handle form submit
   */
  const handleSubmitForm = e => {
    e.preventDefault();
    // const value = controls.form.name.value;

    const data = { name: controls.form.name.value };
    const token = localStorage.getItem('token');
    // if(!token){
    //   return;
    // }

    // console.log(`name: ${data.name}, token: ${token}`);
    addCategory(data, token);
  }

  const isAddedCategorySuccess = () => {
    if(success){
      const updatedForm = {...controls};
      updatedForm.form.name.value = '';
      setControls({ form: updatedForm, formIsValid: false });
    }
  }


  let isCreateSuccess = success ? (
      <p 
        className="bg-success text-center text-white font-weight-bold p-2"
      >
        Added new category successfully.
      </p>
    ): null;

  //โกสต์อินเดอะเชลล์ 4K (Ghost in the Shell 4K ( 2017 ))
  return(
    <Layout
      title="Add a new category"
      description={`G'day ${profile.name}, Ready to add a new category?`}
      className="container"
    >
      <Modal 
        show={error}
        closedModal={() => clear()}
      >
        <h4 className="d-block text-center">Oops! something went wrong.</h4>
        <p className="text-danger font-weight-bold text-center">
          {error}
        </p>
      </Modal>
      {isCreateSuccess}
      {isAddedCategorySuccess()}
      
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {renderCategoryForm()}
        </div>
      </div>
    </Layout>
  )
}

export default AddCategory;