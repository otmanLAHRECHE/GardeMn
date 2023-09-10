import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import DashboardContent from "./components/app/Dashboard";
import PrivateRoute from "./components/common/private_route";
import SignInSide from "./components/accounts/login";
import GardeDetails from "./components/app/GardeDetails";
import Solde from "./components/app/Solde";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    
      <BrowserRouter>
            <Fragment>
              <div>
                <Routes>
                  <Route exact path="/" element={<PrivateRoute><DashboardContent/></PrivateRoute>} />
                  <Route exact path="/login" element={<SignInSide/>} /> 
                  <Route exact path="/GardeDetails" element={<GardeDetails/>} /> 
                  <Route exact path="/Solde" element={<Solde/>} /> 
                </Routes>
              </div>
            </Fragment>
        </BrowserRouter>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);