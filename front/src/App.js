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

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/dashboard/account-edit-client" component={Profil} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/list" component={ListeTransport} />
        <Route exact path="/dashboard/booking" component={Booking} />
        <Route
          exact
          path="/list-soignants"
          component={ListeTransportSoignants}
        />
        {/* <Route exact path="/account-client" component={BoardSoignant} />
      
        <Route exact path="/account-ambulance" component={BoardAmbulance} />
        <Route
          exact
          path="/account-edit-ambulance"
          component={profilEditTransport}
        />
         */}
      </Switch>
    </Router>
  );
}

export default App;
