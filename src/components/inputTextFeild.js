import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function InputText(props) {
  return (

      <TextField 
      id={props.id}
      label={props.label} 
      variant={props.variant}
      fullWidth={props.fullWidth}
      margin={props.margin}
      required={props.required}
      autoFocus={props.autoFocus}
      name={props.name}
      type={props.type}
      autoComplete={props.autoComplete} 
      />
  );
}