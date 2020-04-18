import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../../store/actions/users";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import {NavLink} from "react-router-dom";

const AuthUserToolBar = () => {


  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  const imageLink = user.facebookId ? user.avatarImage : `http://localhost:8000/uploads/${user.avatarImage}`;

  const logout = async () => {
    await dispatch(logoutUser());
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar alt={user.displayName} src={imageLink}/>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <ListItem disabled>Привет, {user.displayName}!</ListItem>
        <Divider/>
        <Divider/>
        <MenuItem component={NavLink} to={`/users/${user._id}`} exact>Профиль</MenuItem>
        <MenuItem onClick={logout}>Выйти</MenuItem>
      </Menu>
    </>
  );
};

export default AuthUserToolBar;