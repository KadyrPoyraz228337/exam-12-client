import React from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const Picture = (
  {image, title, isCurrentUser, author, onClick, deletePicture, id}
) => {

  return (
    <Card>
      <CardActionArea onClick={() => onClick(image)}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="230"
          image={image}
        />
        <CardContent>
          <Typography variant="h5">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {author && (
          <>
            <Typography variant='h6'>By: </Typography>
            <Typography variant='h6' component={NavLink} to={`/users/${author._id}`} exact>
              {author.displayName}
            </Typography>
          </>
        )}
        {isCurrentUser && (
          <Button color="secondary" variant='contained' onClick={() => deletePicture(id)}>
            delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Picture;