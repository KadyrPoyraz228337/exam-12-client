import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPictures} from "../../store/actions/pictures";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Picture from "../Picture/Picture";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
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

const Pictures = () => {

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

  const pictures = useSelector(state => state.pictures.pictures);

  useEffect(() => {
    dispatch(getPictures())
  }, [dispatch]);

  return pictures && (
    <>
      <Box mt={1}>
        <Grid container spacing={1}>
          {pictures.map(picture => (
            <Grid item xs={3} key={picture._id}>
              <Picture
                image={'http://localhost:8000/uploads/' + picture.image}
                title={picture.title}
                author={picture.user}
                onClick={handleOpen}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
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
    </>
  );
};

export default Pictures;