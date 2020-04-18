import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormField from "../UI/formField/formField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {addNewPicture} from "../../store/actions/pictures";

const AddNewPicture = () => {

  const [picture, setPicture] = useState({title: '', image: null});

  const dispatch = useDispatch();

  const inputChangeHandler = e => setPicture({...picture, [e.target.name]: e.target.value});
  const fileChangeHandler = e => setPicture({...picture, [e.target.name]: e.target.files[0]});

  const onSubmit = e => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(picture).forEach(key => {
      data.append(key, picture[key])
    });

    dispatch(addNewPicture(data))
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Grid container direction='column' spacing={1}>
          <Grid item>
            <Typography variant='h3'>
              Новая картинка
            </Typography>
          </Grid>
          <Grid item>
            <FormField
              type='text' required
              label='Заголовок'
              name='title'
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item>
            <FormField
              type='file' required
              label='Выберете картинку'
              name='image'
              onChange={fileChangeHandler}
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              type='submit'
            >
              Создать
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddNewPicture;