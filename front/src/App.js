import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, DatePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import SignIn from "./screens/SignIn";
import BoardSoignant from "./screens/BoardSoignant";
import BoardAmbulance from "./screens/BoardAmbulance";
import profilEditTransport from "./screens/profilEditTransport";
import profilEditSoignant from "./screens/profilEditSoignant";
import ListeTransport from "./screens/ListeTransport";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/account-client" component={BoardSoignant} />
        <Route
          exact
          path="/account-edit-client"
          component={profilEditSoignant}
        />
        <Route exact path="/account-ambulance" component={BoardAmbulance} />
        <Route
          exact
          path="/account-edit-ambulance"
          component={profilEditTransport}
        />
        <Route exact path="/list" component={ListeTransport} />
      </Switch>
    </Router>
  );
}

export default App;
