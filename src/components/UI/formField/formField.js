import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
});

const FormField = (
  {name, type, label, onChange, autoComplete, value,
    required, autoFocus, margin, multiline}
) => {

  const classes = useStyles();

  let field = (
    <TextField
      type={type}
      variant="outlined"
      margin={margin ? margin : "normal"}
      required={required}
      defaultValue={value}
      fullWidth
      id={name}
      label={label}
      name={name}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      onChange={onChange}
      multiline={multiline}
    />
  );

  if(type === 'file') {
    field = (
      <>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          name={name}
          onChange={onChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="outlined" color="primary" component="span" startIcon={<PhotoCameraIcon/>}>
            {label}
          </Button>
        </label>
      </>
    )
  }

  return field
};

export default FormField;