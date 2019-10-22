// Email Prototype
const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// Alphabet (Letter)
const ALPHABETS = /^[A-Za-z]+$/;

// Number Prototype
const NUMBERS = /^[0-9]+$/;

// Alphabet and Number
const ALPHA_NUMERIC = /^[0-9a-zA-Z]+$/;



export const emailValidate = email => {
  return EMAIL_REGEX.test(email);
}

export const textValidate = text => {
  if(text.value.match(ALPHABETS)){
    return true;
  }else {
    return false;
  }
}

export const alphanumericValidate = text => {
  if(ALPHA_NUMERIC.test(text)){
    return true;
  }else{
    return false;
  }
}

export const numberValidate = number => {
  if(number.value.match(NUMBERS)){
    return true;
  }else{
    return false;
  }
}

export const minLengthValidate = (text, length) => {
  let field = text.value;

  if(field.length < length){
    return false;
  }else{
    return true;
  }
}

export const maxLengthValidate = (text, length) => {
  let field = text.value;

  if(field.length > length){
    return false;
  }else{
    return true;
  }
}

export const textLengthBetweenValidate = (text, min, max) => {
  if(text.length >= min && text.length <= max){
    return true;
  }else{
    return false;
  }
}