import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'


import dashboard from './dashboard'
import SignIn from "./screens/SignIn";
// import BoardSoignant from "./screens/BoardSoignant";
// import BoardAmbulance from "./screens/BoardAmbulance";
import Profil from "./component/ScreenProfil";
// import profilEditSoignant from "./screens/profilEditSoignant";
// import ListeTransport from "./screens/ListeTransport";
import dashboard from "./screens/dashboard";

function App() {
  return (
    <Router>
      <Switch>

        <Route exact path="/dashboard" component={dashboard} />

        <Route exact path="/" component={SignIn} />
        <Route exact path="/account-edit-client" component={Profil} />
        <Route exact path="/dashboard" component={dashboard} />
        {/* <Route exact path="/account-client" component={BoardSoignant} />
      
        <Route exact path="/account-ambulance" component={BoardAmbulance} />
        <Route
          exact
          path="/account-edit-ambulance"
          component={profilEditTransport}
        />
        <Route exact path="/list" component={ListeTransport} /> */}
      </Switch>
    </Router>
  );
}

export default App;
