import React from 'react'

const FormComponent = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input placeholder={props.placeholder} type={'text'}  />
    </div>
  )
}

export default FormComponent;