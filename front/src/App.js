import React from "react";
import "./App.less";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import Dashboard from "./screens/dashboard";
import SignIn from "./screens/SignIn";
import Booking from "./component/Booking";
import Profil from "./component/ScreenProfil";
// import profilEditSoignant from "./screens/profilEditSoignant";
import ListeTransport from "./component/ScreenList";
import ListeTransportSoignants from "./component/ScreenListSoignants";
import Map from "./component/Map";

import { createStore, combineReducers } from "redux";
import {reducer as formReducer} from 'redux-form';
import { Provider } from "react-redux";
import token from "./reducers/token";
import role from "./reducers/role";
import iduser from "./reducers/iduser";
import userData from "./reducers/userData";
const formEdit = {form: formReducer};
const store = createStore(combineReducers({ token, role, iduser, userData, form: formReducer }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route
            exact
            path="/dashboard/account-edit-client"
            component={Profil}
          />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/list" component={ListeTransport} />
          <Route exact path="/dashboard/booking" component={Booking} />
          <Route exact path="/dashboard/map" component={Map} />
          <Route
            exact
            path="/list-soignants"
            component={ListeTransportSoignants}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
