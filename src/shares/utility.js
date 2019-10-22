

export const updatedObject = (oldObject, objectProperties) => ({
  ...oldObject,
  ...objectProperties
});


export const checkValidity = (value, rules) => {
  let isValid = true;
  let msg = null;

  if(!rules){
    return true;
  }

  //Checked field required
  if(rules.required){
    isValid = value.trim() !== '' && isValid;
    if(!isValid){
      return {
        isValid,
        msg: 'This field is required.'
      }
    }
  }

  //Checked min length
  if(rules.minLength){
    isValid = value.length >= rules.minLength && isValid;
    if(!isValid){
      return {
        isValid,
        msg: `This field must be at least ${rules.minLength} char`
      }
    }
  }

  //Checked max length
  if(rules.maxLength){
    isValid = value.length <= rules.maxLength && isValid;
    if(!isValid){
      return {
        isValid,
        msg: `This field must not more than ${rules.minLength} chars`
      }
    }
  }

  //Checking a number
  if(rules.isNumeric){
    const NUMBER_PATTERN = /^[0-9]+$/;
    isValid = NUMBER_PATTERN.test(value) && isValid;

    if(!isValid){
      return {
        isValid,
        msg: `This field must only with a numbers.`
      }
    }
  }

  //Checking a letter must contain alphabet + number
  if(rules.isAlphaNumeric){
    const ALPHA_NUMERIC_PATTERN = /^[0-9a-zA-Z]+$/;
    isValid = ALPHA_NUMERIC_PATTERN.test(value) && isValid;

    // const regExp = new RegExp(/^[a-zA-Z0-9 ]*$/);
    // isValid = regExp.test(value.value) && isValid;
    // console.log('isAlphanumeric ', isValid);

    if(!isValid){
      return {
        isValid,
        msg: `This field must contain with number and text.`
      }
    }
  }

  // Checking value with email pattern
  if(rules.isEmail){
    const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = EMAIL_REGEX.test(value) && isValid;
    if(!isValid){
      return {
        isValid,
        msg: `Please fill a valid email`
      }
    }
  }

  // console.log('Checked validate: ', isValid);
  return {isValid, msg};
}




// export const checkValidity = (value, rules) => {
//   let isValid = true;
//   let msg = '';

//   if(!rules){
//     return true;
//   }

//   //Checked field required
//   if(rules.required){
//     isValid = value.trim() !== '' && isValid;
//   }

//   //Checked min length
//   if(rules.minLength){
//     isValid = value.length >= rules.minLength && isValid;
//   }

//   //Checked max length
//   if(rules.maxLength){
//     isValid = value.length <= rules.maxLength && isValid;
//   }

//   //Checking a number
//   if(rules.isNumeric){
//     const NUMBER_PATTERN = /^[0-9]+$/;
//     isValid = NUMBER_PATTERN.test(value) && isValid;
//   }

//   //Checking a letter must contain alphabet + number
//   if(rules.isAlphaNumeric){
//     const ALPHA_NUMERIC_PATTERN = /^[0-9a-zA-Z]+$/;
//     isValid = ALPHA_NUMERIC_PATTERN.test(value) && isValid;
//   }

//   // Checking value with email pattern
//   if(rules.isEmail){
//     const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//     isValid = EMAIL_REGEX.test(value) && isValid;
//   }

//   // console.log('Checked validate: ', isValid);
//   return isValid;
// }