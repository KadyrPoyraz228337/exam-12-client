import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserPictures, removePicture} from "../../store/actions/pictures";
import {useParams} from "react-router";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import Picture from "../Picture/Picture";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const UserPage = () => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const handleOpen = image => {
    setOpen(true);
    setImage(image)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const params = useParams();

  const user = useSelector(state => state.pictures.user);
  let currentUser = useSelector(state => state.users.user);

  if(currentUser === null) currentUser = {_id: null};

  const deletePicture = async id => {
    await dispatch(removePicture(id));
    dispatch(getUserPictures(params.id))
  };

  useEffect(() => {
    dispatch(getUserPictures(params.id))
  }, [dispatch, params]);

  return user && (
    <Box mt={2}>
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography variant='h3' paragraph>
            {user.user.displayName}
          </Typography>
        </Grid>
        {currentUser._id === user.user._id && <Grid item>
          <Button
            variant='contained'
            color='primary'
            component={NavLink}
            to='/pictures/new'
            exact
          >Добавить картинку</Button>
        </Grid>}
      </Grid>
      <Grid container alignItems='center' spacing={1}>
        {user.pictures.map(picture => (
          <Grid item xs={3} key={picture._id}>
            <Picture
              id={picture._id}
              image={'http://localhost:8000/uploads/'+picture.image}
              title={picture.title}
              isCurrentUser={currentUser._id === user.user._id}
              onClick={handleOpen}
              deletePicture={deletePicture}
            />
          </Grid>
        ))}
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img src={image} alt=""/>
          </div>
        </Fade>
      </Modal>
    </Box>
  );
};

export default UserPage;