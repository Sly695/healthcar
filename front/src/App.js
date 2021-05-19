import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import Dashboard from "./screens/dashboard";
import SignIn from "./screens/SignIn";
// import BoardSoignant from "./screens/BoardSoignant";
// import BoardAmbulance from "./screens/BoardAmbulance";
import Profil from "./component/ScreenProfil";
// import profilEditSoignant from "./screens/profilEditSoignant";
import ListeTransport from "./component/ScreenList";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/account-edit-client" component={Profil} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/list" component={ListeTransport} />
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
