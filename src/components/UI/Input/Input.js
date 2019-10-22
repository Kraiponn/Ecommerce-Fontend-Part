import React from 'react';
import './Input.scss';

const Input = props => {
  
  let inputElement = null;
  let inputClass = ['Input', 'form-control'];

  if(props.invalid && props.shouldValidation && props.touched){
    inputClass.push('border-danger');
  }

  // console.log(inputClass)
  switch(props.elementType){
    case ('input'):
      inputElement = (
        <input 
          className={inputClass.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
    break;
    case ('textarea'):
      inputElement = (
        <textarea 
          className={inputClass.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
    break;
    case ('select'):
      inputElement = (
        <select
            className={inputClass.join(' ')}
            // value={props.value}
            onChange={props.changed}
          >
            {props.elementConfig.options.map(option => (
              <option 
                key={option.value}
                value={option.value}
              >
                {option.displayValue}
              </option>
            ))}
          </select>
      );
    break;
    default:
      inputElement = (
        <input 
          className={inputClass.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className="form-group p-1">
      <label className="font-weight-bold text-muted">{props.label}</label>
      {inputElement}
      {props.invalidMsg && (
        <p className="text-danger">{props.invalidMsg}</p>
      )}
    </div>
  );

}

export default Input;