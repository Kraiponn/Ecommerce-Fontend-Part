import React, { useState, useEffect } from 'react';

import Layout from '../../../components/Layout/Layout';
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/spinner/spinner';
import UploadFile from '../../../components/Product/Upload/upload-file';

import useProduct from '../../../store/hooks/proucts';
// import useCategory from '../../../store/hooks/category';
import { updatedObject, checkValidity } from '../../../shares/utility';

import ajax from '../../../shares/axios-ecomm';


const AddProduct = () => {
  const {
    profile,
    isLoading,
    error,
    clear,
    createdProduct
  } = useProduct();

  // const categories = useCategory();
  const [categories, setCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState('');

  const [photo, setPhoto] = useState({
    file: null,
    fileName: null,
    fileObject: null
  });

  const [controls, setControls] = useState({
    form: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter name here'
        },
        value: '',
        label: 'Product Name',
        validation: {
          required: true
        },
        valid: false,
        invalidMsg: '',
        touched: false
      },
      description: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter description'
        },
        value: '',
        label: 'Description',
        validation: {
          required: true
        },
        valid: false,
        invalidMsg: '',
        touched: false
      },
      price: {
        elementType: 'input',
        elementConfig: {
          type: 'number'
        },
        value: '',
        label: 'Price',
        validation: {
          required: true
        },
        valid: false,
        invalidMsg: '',
        touched: false
      },
      // cagegory: {
      //   elementType: 'select',
      //   elementConfig: {
      //     options: [
      //       {value: '', displayValue: 'Select category..'},
      //       {value: '5d814ffc0caa886964aebd9a', displayValue: 'Node.JS'},
      //       {value: '5d8522642065513e7c0a4bea', displayValue: 'React.JS'},
      //       {value: '5d8522892065513e7c0a4beb', displayValue: 'Flutter'}
      //     ]
      //   },
      //   value: 'select type',
      //   label: 'Category',
      //   validation: {
      //     required: true
      //   },
      //   valid: true,
      //   invalidMsg: '',
      //   touched: false
      // },
      shipping: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: '', displayValue: 'Select shipping..'},
            {value: '0', displayValue: 'No'},
            {value: '1', displayValue: 'Yes'}
          ]
        },
        value: 'select type',
        label: 'Shipping',
        validation: {
          required: true
        },
        valid: true,
        invalidMsg: '',
        touched: false
      },
      quantity: {
        elementType: 'input',
        elementConfig: {
          type: 'number'
        },
        value: '',
        label: 'Quantity',
        validation: {
          required: true
        },
        valid: false,
        invalidMsg: '',
        touched: false
      }
    },
    formIsValid: false
  });


  useEffect(() => {
    const initCategory = async () => {
      try {
        const resp = await ajax('/category');
        // console.log('setCategory ', resp.data);

        setCategories(resp.data.data);
      } catch(error) {
        console.log(error);
      }
    }

    initCategory();
  }, []);

    /**
   * Handle File Uploaded Change
   */
  const handleFileUpdaloadChange = event => {
    const { files } = event.target;
    setPhoto({ 
      ...photo,
      file: files[0],
      fileName: files[0].name,
      fileObject: URL.createObjectURL(files[0])
    });
  }


    /**
   * Handle Input Change
   */
  const handleElementChange = (e, inputId) => {
    const { msg, isValid } = checkValidity(
      e.target.value,
      controls.form[inputId].validation
    );

    const updatedElement = updatedObject(
      controls.form[inputId],
      {
        value: e.target.value,
        valid: isValid,
        invalidMsg: msg,
        touched: true
      }
    );

    const updatedForm = updatedObject(
      controls.form,
      { [inputId]: updatedElement }
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
   * Render form 
   */
  const renderForm = () => {
    let formElementArray = [];
    for(var key in controls.form){
      formElementArray.push({
        id: key,
        config: controls.form[key]
      });
    }

    // console.log('data ', categories.data)
    const formAddProduct = (
      <form 
        onSubmit={handleSubmitForm}
        className="form border rounded p-3 mb-5"
      >
        <h4 className="text-center mb-4">Added new Product</h4>

        <UploadFile 
          fileUploadChange={handleFileUpdaloadChange} 
          fileName={photo.fileName}
          fileObject={photo.fileObject}
        />

        <div className="form-group">
          <label className="text-muted font-weight-bold">Category</label>
          <select 
            name="category"
            className="form-control"
            value={categoryValue}
            onChange={(event) => setCategoryValue(event.target.value)}
          >
            <option>Select category</option>
            {categories && categories.map((option, i) => (
              <option key={i} value={option._id} >{option.name}</option>
            ))}
          </select>
        </div>        

          {formElementArray.map(item => (
            <Input 
              key={item.id}
              elementType={item.config.elementType}
              elementConfig={item.config.elementConfig}
              value={item.config.value}
              invalid={!item.config.valid}
              invalidMsg={item.config.invalidMsg}
              shouldValidation={item.config.validation}
              touched={item.config.touched}
              label={item.config.label}
              changed={e => handleElementChange(e, item.id)}
            />
          ))}

          <div className="text-center">
            <button
              className="button"
              disabled={!controls.formIsValid}
            >
              {isLoading ? (
                <Spinner />
              ) : 'SUBMIT'}
            </button>
          </div>

      </form>
    );

    return formAddProduct;
  }


  /**
   * Handle submit form
   */
  const handleSubmitForm = e => {
    e.preventDefault();
    // const formData = {};
    // for(var key in controls.form){
    //   formData[key] = controls.form[key].value
    // }
    
    const formData = new FormData();
    formData.set('image_path', photo.file)
    // for(var key in controls.form) {
    //   formData.set(controls.form[key], controls.form[key].value);
    // }
    formData.set('name', controls.form.name.value);
    formData.set('description', controls.form.description.value);
    formData.set('price', controls.form.price.value);
    formData.set('category', categoryValue);
    formData.set('shipping', controls.form.shipping.value);
    formData.set('quantity', controls.form.quantity.value);
    formData.set('sold', 0);

    // console.log('FormData: ', formData);
    const token = localStorage.getItem('token');
    createdProduct(formData, token);
  }

  // const processLoading = () => {
  //   return isLoading ? 
  //     (<Spinner />) :
  //     null;
  // }


  return(
    <Layout
      title="Add a new product"
      description={`G'day ${profile.name}, Ready to add a new product?`}
      className="container col-md-8"
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
      {isLoading ? (
        <Spinner />
      ) : renderForm()}
    </Layout>
  );
}

export default AddProduct;