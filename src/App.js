import React from 'react';
import './App.css';
import Navigation from "./components/navigation/navigation";
import {Route, Switch} from "react-router";
import Container from "@material-ui/core/Container";
import Login from "./components/login/login";
import Register from "./components/register/register";
import UserPage from "./components/UserPage/UserPage";
import Pictures from "./components/Pictures/Pictures";
import AddNewPicture from "./components/AddNewPicture/AddNewPicture";

function App() {
  return (
    <div>
      <Navigation/>
      <Container>
        <Switch>
          <Route path='/' exact component={Pictures}/>
          <Route path='/login' exact component={Login}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/users/:id' exact component={UserPage}/>
          <Route path='/pictures/new' exact component={AddNewPicture}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
