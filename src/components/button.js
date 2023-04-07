import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons(props) {
  return (
      <Button 
      variant={props.variant}
      type={props.type}
      fullWidth={props.fullWidth}
      sx={{mt: 3, mb: 2}}
      >
      </Button>
  );
}